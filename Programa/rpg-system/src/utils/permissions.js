import { ROLES } from '../constants/roles';

/**
 * Validações de permissões do sistema.
 * Conforme Documento de Segurança e Permissões (Cap. 2-6)
 * 
 * @param {string} role - A role do usuário atual (MESTRE ou JOGADOR).
 * @param {string} [userId] - ID do usuário logado (para checagem de propriedade).
 * @param {string} [ownerId] - ID do dono do recurso (para checagem de propriedade).
 */

// MESTRE: Sim | JOGADOR: Não (Cap. 8.1)
export const canCreateCampaign = (role) => {
  return role === ROLES.MESTRE;
};

// MESTRE: Sim | JOGADOR: Não (Cap. 7.5)
export const canApproveCharacter = (role) => {
  return role === ROLES.MESTRE;
};

// MESTRE: Total | JOGADOR: Nenhum (Cap. 5)
export const canManageWorld = (role) => {
  return role === ROLES.MESTRE;
};

// MESTRE: Total | JOGADOR: Nenhum (Cap. 6)
export const canManageLibrary = (role) => {
  return role === ROLES.MESTRE;
};

// MESTRE: Sim (Criar/Iniciar/Encerrar) | JOGADOR: Não (Cap. 12)
export const canManageCombat = (role) => {
  return role === ROLES.MESTRE;
};

// MESTRE: Acesso Total | JOGADOR: Sem acesso (Cap. 14)
export const canViewReports = (role) => {
  return role === ROLES.MESTRE;
};

// MESTRE: Sim | JOGADOR: Sim (Cap. 7.1)
export const canCreateCharacter = (role) => {
  return role === ROLES.MESTRE || role === ROLES.JOGADOR;
};

// MESTRE: Sim | JOGADOR: Apenas os próprios (Cap. 7.3)
export const canEditCharacter = (role, userId, ownerId) => {
  if (role === ROLES.MESTRE) return true;
  return role === ROLES.JOGADOR && userId === ownerId;
};

// MESTRE: Sim | JOGADOR: Próprio inventário (Cap. 13.1)
export const canViewInventory = (role, userId, ownerId) => {
  if (role === ROLES.MESTRE) return true;
  return role === ROLES.JOGADOR && userId === ownerId;
};

// MESTRE: Sim | JOGADOR: Sim (Cap. 13.2 e 13.3)
export const canEquipItem = (role, userId, ownerId) => {
  if (role === ROLES.MESTRE) return true;
  return role === ROLES.JOGADOR && userId === ownerId;
};
