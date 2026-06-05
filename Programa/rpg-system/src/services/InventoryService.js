import BaseService from './BaseService';
import fichaInventarioRepository from '../repositories/FichaInventarioRepository';
import equipmentService from './EquipmentService';
import personagemRepository from '../repositories/PersonagemRepository';
import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';
import armaRepository from '../repositories/ArmaRepository';
import armaduraRepository from '../repositories/ArmaduraRepository';

/**
 * InventoryService - Responsável por gerenciar inventário e carga
 * Conforme Capítulo 10 da Arquitetura BackEnd, RN-092 e DD-220 a DD-229
 */
class InventoryService extends BaseService {
  constructor() {
    super(fichaInventarioRepository);
  }

  /**
   * Adiciona um item ao inventário (DD-229)
   */
  async addItem(fichaCampanhaId, itemData) {
    const { itemId, itemTipo, quantidade = 1 } = itemData;
    
    // Verifica se já existe o item (se for empilhável - DD-122)
    // TODO: CONTEXTO_INSUFICIENTE_PARA_VERIFICAR_EMPILHAVEL
    
    return await fichaInventarioRepository.create({
      fichaCampanhaId,
      itemId,
      itemTipo,
      quantidade,
      equipado: false,
      quebrado: false
    });
  }

  /**
   * Remove um item do inventário
   */
  async removeItem(id) {
    return await fichaInventarioRepository.delete(id);
  }

  /**
   * Equipar um item do inventário (FI-002 / DD-223)
   */
  async equipItem(id, equipado = true) {
    if (equipado) {
      const registro = await fichaInventarioRepository.findById(id);
      if (!registro) throw new Error('Item não encontrado no inventário.');

      const ficha = await campanhaPersonagemRepository.findById(registro.fichaCampanhaId);
      const personagem = await personagemRepository.findById(ficha.personagemId);
      
      const equipamento = await armaRepository.findById(registro.itemId) || 
                          await armaduraRepository.findById(registro.itemId);

      if (equipamento) {
        const validation = equipmentService.validateRequirements(personagem, equipamento, ficha.nivel);
        if (!validation.isValid) {
          throw new Error(`Não atende aos requisitos: ${validation.errors.join(', ')}`);
        }
      }
    }
    return await fichaInventarioRepository.update(id, { equipado });
  }

  /**
   * RN-095: Gatilho pós-alteração de nível/atributos -> Desequipar automático
   */
  async checkEquippedRequirements(fichaCampanhaId) {
    const items = await fichaInventarioRepository.findAll(); // Idealmente filtrar por fichaCampanhaId
    const fichaItems = items.filter(i => i.fichaCampanhaId === fichaCampanhaId && i.equipado);
    
    if (fichaItems.length === 0) return;

    const ficha = await campanhaPersonagemRepository.findById(fichaCampanhaId);
    const personagem = await personagemRepository.findById(ficha.personagemId);

    for (const item of fichaItems) {
      const equipamento = await armaRepository.findById(item.itemId) || 
                          await armaduraRepository.findById(item.itemId);
      
      if (equipamento) {
        const validation = equipmentService.validateRequirements(personagem, equipamento, ficha.nivel);
        if (!validation.isValid) {
          await this.equipItem(item.id, false);
        }
      }
    }
  }

  /**
   * Calcula o peso total (DD-225)
   */
  calculateWeight(items = []) {
    return items.reduce((total, item) => total + (item.peso * item.quantidade), 0);
  }

  /**
   * Injeta equipamentos iniciais na ficha de campanha (RN-016)
   */
  async initializeInitialEquipment(fichaCampanhaId, classeId) {
    const equipamentosIniciais = await equipmentService.getInitialEquipment(classeId);
    
    for (const eq of equipamentosIniciais) {
      await this.addItem(fichaCampanhaId, {
        itemId: eq.id,
        itemTipo: eq.tipoDanoId ? 'ARMA' : (eq.caBase ? 'ARMADURA' : 'ITEM'), // Simplificação
        quantidade: 1
      });
    }
  }
}

export default new InventoryService();
