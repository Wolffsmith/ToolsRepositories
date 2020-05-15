import { EntityRepository, Repository } from 'typeorm';

import Tool from '../models/Tools';
// Criei uma pesquisa pelo nome do repositório, para poder validar se o nome
// que está sendo cadastrada já existe
@EntityRepository(Tool)
class ToolsRepository extends Repository<Tool> {
  public async findByName(name: string): Promise<Tool | null> {
    const findName = await this.findOne({
      where: { name },
    });

    return findName || null;
  }
}

export default ToolsRepository;
