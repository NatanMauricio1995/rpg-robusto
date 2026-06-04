/**
 * BaseService - Centralizes common business logic
 */
export default class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id) {
    return await this.repository.findById(id);
  }

  async search(filters) {
    return await this.repository.search(filters);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async save(id, data) {
    this.validate(data);
    const payload = this.transform(data);

    if (id) {
      return await this.repository.update(id, payload);
    } else {
      return await this.repository.create(payload);
    }
  }

  /**
   * Overridable validation method
   */
  validate(data) {
    if (!data) throw new Error('Dados não fornecidos.');
    return true;
  }

  /**
   * Overridable transform method (DTO)
   */
  transform(data) {
    return data;
  }
}
