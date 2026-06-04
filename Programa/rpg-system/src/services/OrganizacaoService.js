import BaseService from './BaseService';
import OrganizacaoRepository from '../repositories/OrganizacaoRepository';
class OrganizacaoService extends BaseService { constructor() { super(OrganizacaoRepository); } }
export default new OrganizacaoService();
