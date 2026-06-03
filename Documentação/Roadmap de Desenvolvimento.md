# Filosofia
**Regra principal:**
 - Construir primeiro as dependências.
 - Construir por último os consumidores.

Exemplo:

    Raça
      ↓
    Classe
      ↓
    Personagem
      ↓
    Campanha
      ↓ 
    Combate
    
# CAPÍTULO 1 — PREPARAÇÃO DO PROJETO

**Objetivo:** 
*Criar a base técnica.*

### Etapa 1.1 - Criar projeto

    npx create-next-app

### Etapa 1.2 - Configurar

    ESLint
    Prettier
    Alias

### Etapa 1.3 - Estrutura de pastas

    src
        components
        layouts
        modules
        services
        hooks
        contexts
        lib
        firebase
        styles

## Etapa 1.4 - Entrega

    Projeto inicial funcionando.

# CAPÍTULO 2 — INFRAESTRUTURA
## Objetivo

*Criar a camada de acesso aos dados.*

### Etapa 2.1 - Firebase
**Configurar:**

    Auth
    Firestore
    Storage
    Serviços

### Etapa 2.2 - Criar

    authService
    firestoreService
    storageService
    Entrega
    Login funcionando
    Banco funcionando
    Upload funcionando

# CAPÍTULO 3 — COMPONENTES BASE
**Objetivo:**

*Criar o Design System.*

**Componentes:**
* Button
* TextBox
* TextArea
* Select
* MultiSelect
* Checkbox
* RadioGroup
* NumberStepper
* DatePicker

**Feedback:**
* Toast
* Loading
* ConfirmDialog

**Upload:**
* ImageUploader
* ImageGallery
* Avatar

**Entrega:**
* Biblioteca de componentes pronta.

# CAPÍTULO 4 — LAYOUT MESTRE
**Objetivo:**

*Criar a estrutura visual definitiva.*

**Construir:**
* Header
* Sidebar
* Footer
* ContentContainer
* Rotas
* Dashboard
* Mundo
* Biblioteca
* Personagens
* Campanhas
* Combates
* Relatórios

**Entrega:**
* Sistema navegável.

# CAPÍTULO 5 — MUNDO

**Objetivo:**
*Criar toda hierarquia geográfica.*

**Ordem:**
- 5.1 Mundos
- 5.2 Continentes
- 5.3 Reinos
- 5.4 Cidades
- 5.5 Ambientes
- 5.6 Locais
- 5.7 WorldTree

**Entrega**
- Mundo completo funcionando.

# CAPÍTULO 6 — BIBLIOTECA RPG
**Objetivo:**
*Cadastrar todas as entidades base.*

**Ordem:**
- 6.1 Idiomas
- 6.2 Sentidos
- 6.3 Efeitos de Combate
- 6.4 Perícias
- 6.5 Proficiências
    - Armas
    - Armaduras
    - Ferramentas
    - Instrumentos
- 6.6 Escolas de Magia
- 6.7 Raças
- 6.8 Sub-Raças
- 6.9 Classes
- 6.10 Subclasses
- 6.11 Habilidades
- 6.12 Magias
- 6.13 Encantamentos
- 6.14 Itens
- 6.15 Armas
- 6.16 Armaduras
- 6.17 Receitas
- 6.18 NPCs
- 6.19 Inimigos

**Entrega:**
- Biblioteca RPG completa.

# CAPÍTULO 7 — PERSONAGENS
**Objetivo:**
*Criar fichas.*

**Ordem:**
- 7.1 Cadastro de Personagem
- 7.2 Sistema de Aprovação
- 7.3 Atributos Compostos
    - Base
    - Raça
    - Classe
    - Equipamento
    - Magia
    - Temporário
- 7.4 Magias
- 7.5 Habilidades
- 7.6 Equipamentos
- 7.7 Inventário
- 7.8 Recursos
- 7.9 Progressão

**Entrega:**
- Ficha completa funcionando.

# CAPÍTULO 8 — CAMPANHAS
**Objetivo:**
*Criar gerenciamento de campanhas.*

**Ordem:**
- 8.1 Campanhas
- 8.2 Participantes
- 8.3 Capítulos
- 8.4 Missões
- 8.5 Sessões
- 8.6 Anotações
- 8.7 Galerias

**Entrega:**
- Campanhas completas.

# CAPÍTULO 9 — COMBATE
**Objetivo:**
*Criar painel tático.*

**Ordem:**
- 9.1 CombatParticipantCard
- 9.2 CombatEnemyCard
- 9.3 CombatAccordion
- 9.4 CombatHPControl
- 9.5 CombatStatusPanel
- 9.6 CombatAttackPanel
- 9.7 CombatSpellPanel
- 9.8 CombatSkillPanel
- 9.9 CombatEquipmentPanel
- 9.10 CombatResourcePanel
- 9.11 CombatResistancePanel
- 9.12 CombatWeaknessPanel
- 9.13 CombatImmunityPanel
- 9.14 Distribuição de XP
- 9.15 Loot
- 9.16 Subida de Nível

**Entrega:**
- Combate completo.

# CAPÍTULO 10 — RELATÓRIOS
**Ordem:**
- 10.1 Campanhas
- 10.2 Personagens
- 10.3 Combates
- 10.4 XP
- 10.5 Loot

**Entrega:**
- Relatórios completos.

# CAPÍTULO 11 — TESTES
**Testes:**
- CRUD
- Permissões
- Combate
- XP
- Inventário
- Campanhas

**Entrega:**
- Sistema validado.

# CAPÍTULO 12 — PUBLICAÇÃO
**Produção:**
- Configuração:
    - Firebase Hosting, ou
    - Vercel
**Backup:**
- Firestore
- Storage
**Entrega**
- Sistema Online

# ORDEM REAL DE IMPLEMENTAÇÃO

1. Infraestrutura

2. Componentes Base

3. Layout Mestre

4. Mundo

5. Biblioteca RPG

6. Personagens

7. Campanhas

8. Combates

9. Relatórios

10. Testes

11. Publicação
