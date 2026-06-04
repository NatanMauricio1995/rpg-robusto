**Objetivo:**(595) 
*Padronizar todos os componentes visuais do sistema.*

**Princípio:**

    Página
        ↓
    Seções
        ↓
    Componentes
        ↓
    Subcomponentes

Nenhuma página deve conter HTML de negócio diretamente.

# CAPÍTULO 1 — FILOSOFIA DE COMPONENTIZAÇÃO
## Regra 1
Tudo reutilizável vira componente.

### Errado
    <input />
    <button />
    <select />

diretamente nas páginas.

### Correto
    <TextBox />
    <Button />
    <Select />

## Regra 2
Página apenas orquestra.

Exemplo:

    <PersonagemForm />
    <InventarioGrid />
    <SpellPanel />

# CAPÍTULO 2 — ESTRUTURA DE PASTAS
    src
    ├── app
    ├── components
    ├── modules
    ├── layouts
    ├── hooks
    ├── services
    ├── repositories
    ├── contexts
    ├── firebase
    ├── styles
    ├── utils
    ├── constants
    └── validations

    Estrutura unificada com Arquitetura BackEnd e Camada de Serviços.
    Referência canônica: Arquitetura BackEnd cap. 3.

# CAPÍTULO 3 — COMPONENTES BASE
## Button
    label
    icon
    variant
    disabled
    loading
    onClick

## TextBox
    label
    value
    onChange
    required
    disabled
    error

## TextArea
    label
    value
    rows
    onChange

## Select
    label
    options
    value
    onChange

## MultiSelect
    label
    options
    values
    onChange

## Checkbox
    label
    checked
    onChange

## NumberStepper
    value
    min
    max
    step
    onChange

# CAPÍTULO 4 — COMPONENTES CRUD
## CrudToolbar
**Ações:**

    Novo
    Editar
    Excluir
    Duplicar
    Exportar

## SearchBox
    placeholder
    value
    onSearch

## DataGrid

**Props:**

    columns
    rows
    pagination
    sorting
    filters

## ConfirmDialog

    title
    message
    confirm
    cancel

# CAPÍTULO 5 — COMPONENTES DE MÍDIA
## Avatar
    src
    fallback
    size

## ImageUploader
    value
    onUpload
    accept

## ImageGallery
    images
    onRemove

# CAPÍTULO 6 — COMPONENTES RPG
## AttributePanel
**Responsável por:**
- Força
- Destreza
- Constituição
- Inteligência
- Sabedoria
- Carisma

## Estrutura

    base
    modificadores[]
    total

## ResourcePanel
**Exibir:**
- HP
- Ki
- Fúria
- Mana
- etc

## CurrencyPanel
**Exibir:**
- Platina
- Ouro
- Prata
- Cobre

a partir do valor único.

## EquipmentPanel
**Exibir:**
- Arma Principal
- Arma Secundária
- Armadura
- Escudo

## InventoryGrid
**Exibir:**
- Item
- Quantidade
- Peso
- Valor

## SkillPanel
**Exibir:**
- Nome
- Descrição
- Usos
- Recarga

## SpellPanel
**Exibir:**
- Nome
- Nível
- Escola
- Dano
- CD

## ProgressionPanel
**Exibir:**
- XP
- Nível
- Próximo Nível

# CAPÍTULO 7 — COMPONENTES DE MUNDO
## WorldTree
**Visualização:**

    Mundo
    └── Continente
        └── Reino
            └── Cidade
                └── Ambiente
                    └── Local

## LocationCard
**Exibir:**
- Imagem
- Nome
- Descrição

# CAPÍTULO 8 — COMPONENTES DE CAMPANHA
## CampaignCard
- imagem
- nome
- status
- participantes

## ChapterCard
- nome
- ordem
- descricao

## MissionCard
- nome
- tipo
- status

## SessionCard
- nome
- data
- participantes

# CAPÍTULO 9 — COMPONENTES DE COMBATE

## CombatParticipantCard *(Modo compacto)*
Exibe:
- Nome
- HP
- CA
- Status

## CombatEnemyCard
Mesmo padrão.

## CombatAccordion *(Modo expandido)*
Expande:
- Ataques
- Magias
- Habilidades
- Equipamentos
- Resistências
- Fraquezas
- Imunidades

## CombatHPControl
Ações:
- Dano
- Cura

## CombatStatusPanel
Lista oficial:
- Agarrado
- Amedrontado
- Atordoado
- Caído
- Cego
- Enfeitiçado
- Envenenado
- Exausto
- Incapacitado
- Inconsciente
- Invisível
- Paralisado
- Petrificado
- Restrito
- Surdo

## CombatAttackPanel
Exibir:
- Ataque
- Acerto
- Dano
- Tipo

## CombatSpellPanel
Exibir:
- Magia
- CD
- Dano
- Alcance

## CombatSkillPanel
Exibir:
- Habilidade
- Usos
- Recarga

## CombatResistancePanel
Lista de resistências.

## CombatWeaknessPanel
Lista de fraquezas.

## CombatImmunityPanel
Lista de imunidades.

# CAPÍTULO 10 — COMPONENTES DE LAYOUT
## Header
Elementos:
- Logo
- Pesquisa
- Notificações
- Perfil

## Sidebar
Menus:
- Dashboard
- Mundo
- Biblioteca RPG
- Personagens
- Campanhas
- Combates
- Relatórios
- Configurações

## Footer
Informações do sistema.

## ContentContainer
Wrapper padrão das páginas.

# CAPÍTULO 11 — COMPONENTES DE FEEDBACK
## Loading
Tipos:
- Global
- Local

## Toast
Tipos:
- Sucesso
- Erro
- Aviso
- Informação

## ErrorBoundary
Captura:
- Erros React

# CAPÍTULO 12 — HOOKS PADRÃO
## useAuth
- usuario
- login
- logout

## useFirestore
- create
- update
- delete
- find

## useStorage
- upload
- remove

## useCombat
- dano
- cura
- status
- encerrar

## CAPÍTULO 13 — CONTEXTS
- AuthContext
- ThemeContext
- CombatContext
- CampaignContext

# CAPÍTULO 14 — PADRÕES OBRIGATÓRIOS
- **PO-001:** Não acessar Firestore diretamente nas páginas.
- **PO-002:** Usar Services.
- **PO-003:** Usar Hooks.
- **PO-004:** Componentes não conhecem Firestore.
- **PO-005:** Página não contém lógica de negócio.