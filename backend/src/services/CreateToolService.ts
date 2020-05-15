import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Tool from '../models/Tools';
import ToolsRepository from '../repositories/ToolsRepository';

interface Request {
  name: string;
  link: string;
  description: string;
  tags: string;
}

class CreateToolService {
  public async execute({
    name,
    link,
    description,
    tags,
  }: Request): Promise<Tool> {
    const toolsRepository = getCustomRepository(ToolsRepository);

    const findToolWithSameName = await toolsRepository.findByName(name);

    if (findToolWithSameName) {
      throw new AppError('One Tool with this name already exists');
    }

    const tool = toolsRepository.create({
      name,
      link,
      description,
      tags,
    });

    await toolsRepository.save(tool);

    return tool;
  }
}

export default CreateToolService;
