import BaseService from './BaseService';
import MissaoRepository from '../repositories/MissaoRepository';
class MissaoService extends BaseService { constructor() { super(MissaoRepository); } }
export default new MissaoService();
