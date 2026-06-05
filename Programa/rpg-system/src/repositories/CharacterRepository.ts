import BaseRepository from './BaseRepository';
import { Character } from '../models/Character';

export default class CharacterRepository extends BaseRepository<Character> {
  constructor() {
    super('personagens');
  }

  async findByUserId(userId: string): Promise<Character[]> {
    return this.findByField('userId', userId);
  }
}
