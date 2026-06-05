import BaseService from './BaseService';
import resourceRepo from '../repositories/FichaRecursoRepository';
import fichaRepo from '../repositories/CampanhaPersonagemRepository';
import combatSrv from './CombatService';
import progressionSrv from './ProgressionService';

/**
 * ResourceService - Responsável por recursos de classe (Mana, Ki, Fúria, etc)
 * Conforme Capítulo 15 da Arquitetura BackEnd, RN-028, RN-037, RN-038
 */
class ResourceService extends BaseService {
  constructor() {
    super(resourceRepo);
  }

  /**
   * Consome uma quantidade de um recurso específico
   * @param {string} characterId - ID da Ficha de Campanha
   * @param {string} resourceName - Nome do recurso (ex: "Ki", "Mana")
   * @param {number} amount - Quantidade a consumir
   */
  async consumeResource(characterId, resourceName, amount) {
    const resource = await resourceRepo.findByFichaAndName(characterId, resourceName);
    if (!resource) {
      return { success: false, error: { message: `Recurso "${resourceName}" não encontrado.` } };
    }

    if (resource.atual < amount) {
      return { success: false, error: { message: `Quantidade insuficiente de ${resourceName}.` } };
    }

    const novoValor = resource.atual - amount;
    await resourceRepo.update(resource.id, { atual: novoValor });
    return { success: true, data: { ...resource, atual: novoValor } };
  }

  /**
   * Restaura uma quantidade de um recurso específico
   * @param {string} characterId - ID da Ficha de Campanha
   * @param {string} resourceName - Nome do recurso
   * @param {number} amount - Quantidade a restaurar
   */
  async restoreResource(characterId, resourceName, amount) {
    const resource = await resourceRepo.findByFichaAndName(characterId, resourceName);
    if (!resource) {
      return { success: false, error: { message: `Recurso "${resourceName}" não encontrado.` } };
    }

    const novoValor = Math.min(resource.maximo, resource.atual + amount);
    await resourceRepo.update(resource.id, { atual: novoValor });
    return { success: true, data: { ...resource, atual: novoValor } };
  }

  /**
   * Realiza um descanso curto, recuperando recursos específicos (DD-215)
   * RN-037, RN-038
   */
  async shortRest(characterId) {
    try {
      const resources = await resourceRepo.findByFicha(characterId);
      const shortRestResources = resources.filter(r => r.recuperacao === 'DESCANSO_CURTO');

      // Recuperar recursos de descanso curto
      for (const res of shortRestResources) {
        // RN-038: Modificadores seriam aplicados aqui se existissem no modelo
        await resourceRepo.update(res.id, { atual: res.maximo });
      }

      // RN-089 / RN-090: Delegar recuperação de HP
      // TODO: CombatService.applyHealing exige um combatId. 
      // Em um descanso curto, o mestre deve aplicar a cura via painel ou o sistema deve ser expandido.
      
      return { success: true, message: "Descanso curto concluído." };
    } catch (e) {
      return { success: false, error: { message: e.message } };
    }
  }

  /**
   * Realiza um descanso longo, recuperando todos os recursos e HP (DD-216)
   * RN-037, RN-038
   */
  async longRest(characterId) {
    try {
      const resources = await resourceRepo.findByFicha(characterId);
      
      // Recuperar todos os recursos configurados para descanso (DD-216)
      for (const res of resources) {
        if (res.recuperacao === 'DESCANSO_LONGO' || res.recuperacao === 'DESCANSO_CURTO') {
          await resourceRepo.update(res.id, { atual: res.maximo });
        }
      }

      // RN-089 / RN-090: Delegar recuperação total de HP
      // Como o CombatService não possui cura fora de combate, utilizamos a ficha diretamente 
      // ou delegamos para o orquestrador de progressão se houvesse um método de restauro total.
      const ficha = await fichaRepo.findById(characterId);
      if (ficha) {
        await fichaRepo.update(characterId, { hpAtual: ficha.hpMaximo });
      }

      return { success: true, message: "Descanso longo concluído. Recursos e HP restaurados." };
    } catch (e) {
      return { success: false, error: { message: e.message } };
    }
  }
}

export default new ResourceService();
