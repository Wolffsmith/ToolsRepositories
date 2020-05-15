import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ToolsRepository from '../repositories/ToolsRepository';
import CreateToolService from '../services/CreateToolService';

const toolsRouter = Router();

// Roda padrão para o get, se usada sozinha irá trazer todas tools
toolsRouter.get('/', async (request, response) => {
  const toolsRepository = getCustomRepository(ToolsRepository);

  const tools = await toolsRepository.find();

  // Se usada com query param
  // irá trazer somente as tools que contém aquela tag
  const tagToSearch = request.query.tag || '';

  if (!(tagToSearch === '')) {
    const toolsByTag = tools.filter((tool) =>
      tool.tags.includes(`#${tagToSearch}`)
    );

    return response.json(toolsByTag);
  }

  return response.json(tools);
});

toolsRouter.post('/', async (request, response) => {
  const { name, link, description, tags } = request.body;

  const createTool = new CreateToolService();

  const tool = await createTool.execute({
    name,
    link,
    description,
    tags,
  });

  return response.json(tool);
});

toolsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const toolsRepository = getCustomRepository(ToolsRepository);

  const tool = await toolsRepository.findOne(id);

  if (!tool) {
    throw new AppError('The tool selected to be deleted, does not exists');
  }

  await toolsRepository.delete(tool.id);

  return response.json({ message: 'Tool Deleted with Success' });
});

export default toolsRouter;
