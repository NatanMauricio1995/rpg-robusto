import BaseRepository from '../../../../repositories/BaseRepository';
class ItemRepository extends BaseRepository { constructor() { super('itens'); } }
export default new ItemRepository();
