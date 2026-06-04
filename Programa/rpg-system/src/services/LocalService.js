import BaseService from './BaseService';
import LocalRepository from '../repositories/LocalRepository';
class LocalService extends BaseService { constructor() { super(LocalRepository); } }
export default new LocalService();
