# CAPÍTULO 1 — FILOSOFIA
 
## Princípio Fundamental
- Página NÃO conversa com Firestore.
- Componente NÃO conversa com Firestore.
- Hook NÃO conhece regra de negócio.
- Firestore NÃO contém lógica.
- Toda regra deve passar por Services.

## Fluxo Oficial:

 Página
  ↓
 Hook
  ↓
 Service
  ↓
 Repository
  ↓a
 Firestore

  
# CAPÍTULO 2 — CAMADAS DO SISTEMA
## Camada 1 - UI
**Responsável:**
- Renderização
- Eventos

Não executa regras.

## Camada 2 - Hooks
**Responsável:**
- Estado
- Integração com Services

Não executa regras de negócio.

## Camada 3 - Services
**Responsável:**
- Regras de negócio
- Validações
- Processamentos

Camada principal do sistema.

## Camada 4 - Repositories

**Responsável:**

- Comunicação com Firestore

Não possui regras.

## Camada 5 - Firebase

**Responsável:**

*Persistência 

# CAPÍTULO 3 — ESTRUTURA DE PASTAS
 
 src
 ├── app
 ├── components
 ├── hooks
 ├── modules
 ├── services
 ├── repositories
 ├── firebase
 ├── contexts
 ├── layouts
 ├── styles
 ├── utils
 ├── constants
 └── validations

**Notas:**
- `layouts/` contém Header, Sidebar, Footer e ContentContainer
- `styles/` contém tokens de design e CSS global
- `repositories/` e `validations/` são exclusivos do backend/service layer
- Esta estrutura é a versão unificada e sobrescreve a listagem do doc de Frontend
  
# CAPÍTULO 4 — REPOSITORIES
  
**Objetivo:** Centralizar acesso ao Firestore.

Exemplo:
 
 PersonagemRepository

Funções:
 
 create()
 update()
 delete()
 findById()
 findAll()

**Regra:**
- Repositories **NÃO** executam cálculos.
- Repositories **NÃO** executam regras.

# CAPÍTULO 5 — SERVICES

**Objetivo:** Centralizar regras de negócio.

# CAPÍTULO 6 — AUTH SERVICE
**Responsável:**
- Login
- Logout
- Recuperação de senha

**Métodos:**

 login()
 logout()
 resetPassword()
 register()

# CAPÍTULO 7 — PERSONAGEM SERVICE
**Responsável:**
- Criar personagem
- Atualizar personagem
- Aprovação
- Reprovação

**Métodos:**

 createCharacter()
 updateCharacter()
 approveCharacter()
 rejectCharacter()
 validateCharacter()

Regras:

- Aprovação
- Validação
- Alteração pós-aprovação
  
# CAPÍTULO 8 — ATTRIBUTE SERVICE
 
**Responsável:**
- Calcular atributos.

**Métodos:**

 calculateAttribute()
 calculateModifier()
 calculateAllAttributes()

**Utiliza:**
- Base
- Modificadores
- Total

**Regra:**
- Nenhuma tela calcula atributo.
 
# CAPÍTULO 9 — PROFICIENCY SERVICE
**Responsável:**
- Calcular proficiências.

**Métodos:**

 calculateProficiency()
 calculateAllProficiencies()

# CAPÍTULO 10 — INVENTORY SERVICE
**Responsável:**
* Adicionar item
* Remover item
* Equipar item
* Desequipar item

**Métodos:**

 addItem()
 removeItem()
 equipItem()
 unequipItem()

Também calcula:

 Peso
 Capacidade de carga
 
# CAPÍTULO 11 — EQUIPMENT SERVICE
  
**Responsável:**
- Aplicar bônus de equipamentos.

**Métodos:**
 equipWeapon()

 equipArmor()

 equipShield()

 calculateEquipmentBonuses()

# CAPÍTULO 12 — SPELL SERVICE
  
**Responsável:**
* Magias conhecidas
* Magias preparadas
* Espaços de magia

**Métodos:**

 learnSpell()
 forgetSpell()
 prepareSpell()
 calculateSpellSlots()

# CAPÍTULO 13 — SKILL SERVICE


**Responsável:**

* Habilidades
* Usos
* Recargas

**Métodos:**

 useSkill()
 resetSkill()
 calculateSkillUses()

# CAPÍTULO 14 — PROGRESSION SERVICE
**Responsável:**
* XP
* Nível
* Progressão
**Métodos:**
 addXP()
 calculateLevel()
 levelUp()

**Regras:**
- Subida automática.
  
# CAPÍTULO 15 — RESOURCE SERVICE
**Responsável:**
* Ki
* Fúria
* Mana
* Recursos de classe

**Métodos:**

 consumeResource()
 restoreResource()
 shortRest()
 longRest()
 
# CAPÍTULO 16 — CAMPAIGN SERVICE
 **Responsável:**
* Campanhas
* Participantes
* Sessões

**Métodos:**

 createCampaign()
 addParticipant()
 removeParticipant()
 createSession()

# CAPÍTULO 17 — COMBAT SERVICE
**Responsável:**
- Combate.

**Métodos:**

 createCombat()
 startCombat()
 endCombat()

**Métodos de combate:**

 applyDamage()
 applyHealing()
 applyStatus()
 removeStatus()

**Regra:**
- Somente CombatService altera HP.

# CAPÍTULO 18 — LOOT SERVICE
  
**Responsável:**
- Distribuição de loot.

**Métodos:**

    calculateFixedLoot()
    calculateRollLoot()
    generateLoot()

  
# CAPÍTULO 19 — XP SERVICE

**Classificação:** Utilitário interno — NÃO é um Service público.

**Responsável:**
- Cálculo e distribuição de XP ao encerrar combate.

**Métodos:**

    calculateXP()
    distributeXP()

**Regra:** XPService é utilizado exclusivamente pelo ProgressionService.
Nenhuma outra camada (Hook, Página, outro Service) pode chamar XPService diretamente.
A única entrada pública para XP é: ProgressionService.addXP()

**Motivo:** A RN-90 define que ProgressionService é o único autorizado a alterar XP.
XPService implementa a lógica de cálculo/distribuição como detalhe interno desse fluxo.

# CAPÍTULO 20 — WORLD SERVICE
**Responsável:**
- Mundo.

**Métodos:**

    createWorld()
    createContinent()
    createKingdom()
    createCity()
    createEnvironment()
    createLocation()

# CAPÍTULO 21 — APPROVAL SERVICE
**Responsável:**
- Fluxos de aprovação.

**Métodos:**

    approve()
    reject()
    requestReview()

  # CAPÍTULO 22 — AUDIT SERVICE

**Responsável:**
- Logs.

**Métodos:**

    createLog()
    createAudit()
  
# CAPÍTULO 23 — STORAGE SERVICE
  
**Responsável:**
- Uploads.

**Métodos:**

    uploadImage()
    removeImage()

# CAPÍTULO 24 — FIREBASE FUNCTIONS
  
Utilizar apenas para:

* Processamentos pesados
* Rotinas automáticas
* Segurança adicional

Não utilizar para: CRUD simples.
  