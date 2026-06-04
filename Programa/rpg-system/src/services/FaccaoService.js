import BaseService from './BaseService';
import FaccaoRepository from '../repositories/FaccaoRepository';
class FaccaoService extends BaseService { constructor() { super(FaccaoRepository); } }
export default new FaccaoService();
