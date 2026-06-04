import BaseService from './BaseService';
import LojaRepository from '../repositories/LojaRepository';
class LojaService extends BaseService { constructor() { super(LojaRepository); } }
export default new LojaService();
