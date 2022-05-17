import { getRepository, Repository } from 'typeorm';

import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from './implementations/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specificationFound = await this.repository.findOne({ name });
    return specificationFound;
  }
}

export { SpecificationsRepository };
