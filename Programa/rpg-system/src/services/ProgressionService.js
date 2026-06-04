import personagemRepository from '../repositories/PersonagemRepository';

/**
 * ProgressionService - Responsável pela lógica de XP, Nível e Progressão
 * Conforme Capítulo 14 da Arq. BackEnd e RN-019 a RN-024
 */
class ProgressionService {
  constructor() {
    this.MAX_LEVEL = 20;
    // Tabela de XP baseada no padrão d20 (XP acumulada para atingir o nível)
    this.XP_TABLE = [
      0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 
      85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
    ];
  }

  /**
   * Adiciona XP a um personagem e processa subida de nível
   * RN-090: ProgressionService é o único autorizado a alterar XP
   */
  async addXP(personagemId, xpGanha) {
    const personagem = await personagemRepository.findById(personagemId);
    if (!personagem) throw new Error('Personagem não encontrado.');

    let currentXP = (personagem.xp || 0) + xpGanha;
    let currentLevel = personagem.nivel || 1;
    let leveledUp = false;

    // Loop de subida de nível (pode subir mais de um nível por vez)
    while (this.checkLevelUp(currentXP, currentLevel)) {
      personagem.nivel = currentLevel + 1;
      this.applyLevelUp(personagem);
      currentLevel = personagem.nivel;
      leveledUp = true;
    }

    const updateData = {
      xp: currentXP,
      nivel: currentLevel,
      updatedAt: new Date()
    };

    if (leveledUp) {
      updateData.hpAtual = personagem.hpAtual;
      updateData.hpMaximo = personagem.hpMaximo;
      updateData.habilidadesDesbloqueadas = personagem.habilidadesDesbloqueadas;
      updateData.magiasDesbloqueadas = personagem.magiasDesbloqueadas;
    }

    await personagemRepository.update(personagemId, updateData);
    
    return {
      leveledUp,
      newLevel: currentLevel,
      totalXP: currentXP
    };
  }

  /**
   * Valida se a XP atual atinge o limiar do próximo nível
   */
  checkLevelUp(currentXP, currentLevel) {
    if (currentLevel >= this.MAX_LEVEL) return false;
    const nextLevelXP = this.XP_TABLE[currentLevel + 1];
    return currentXP >= nextLevelXP;
  }

  /**
   * Aplica modificações de nível síncronas no objeto
   */
  applyLevelUp(personagem) {
    // DD-022: Cálculo de HP Máximo (Nível anterior + dado de vida médio + Mod. Const)
    // Aqui usamos um valor fixo médio de 6 + Mod. Const para simplificação síncrona
    const modConstituicao = Math.floor(((personagem.atributos?.constituicao || 10) - 10) / 2);
    const hpGain = Math.max(1, 6 + modConstituicao); 
    
    personagem.hpMaximo = (personagem.hpMaximo || 10) + hpGain;

    this.restoreHP(personagem);
    this.unlockAbilities(personagem);
    this.unlockSpells(personagem);

    return personagem;
  }

  /**
   * RN-022: Recuperação total de HP ao subir de nível
   */
  restoreHP(personagem) {
    personagem.hpAtual = personagem.hpMaximo;
    return personagem;
  }

  /**
   * RN-023: Desbloqueia habilidades baseadas na Classe/Nível
   */
  unlockAbilities(personagem) {
    // Lógica de consulta à coleção de Classes para extrair novas habilidades
    // Por ser síncrono no objeto, preparamos a estrutura de dados
    if (!personagem.habilidadesDesbloqueadas) personagem.habilidadesDesbloqueadas = [];
    return personagem;
  }

  /**
   * RN-024: Desbloqueia espaços/magias baseadas na Classe/Nível
   */
  unlockSpells(personagem) {
    // Lógica de consulta à tabela de espaços de magia da Classe
    if (!personagem.magiasDesbloqueadas) personagem.magiasDesbloqueadas = [];
    return personagem;
  }
}

export default new ProgressionService();
