# 1. OBJETIVO

Este documento define a ordem oficial de implementação do sistema RPG.

A implementação seguirá o princípio:

```text
Módulos completos antes do próximo módulo.
```

Cada módulo deve ser considerado concluído apenas quando possuir:

* Estrutura visual
* CRUD completo
* Repositories
* Services
* Validações
* Permissões
* Integração Firestore
* Testes básicos

---

# 2. FILOSOFIA DE IMPLEMENTAÇÃO

O sistema é composto por módulos independentes.

```text
Sistema RPG

├── Biblioteca RPG
├── Mundo
├── Personagens
├── Campanhas
├── Combates
└── Relatórios
```

Cada módulo deve ser desenvolvido e homologado antes do início do próximo.

---

# 3. MARCOS DE ENTREGA

## M1 — Sistema de Personagens

Objetivo:

Permitir criar, aprovar e visualizar fichas.

Módulos necessários:

* Biblioteca RPG (parcial)
* Personagens

---

## M2 — Sistema de Campanhas

Objetivo:

Permitir organizar campanhas, sessões e missões.

Módulos necessários:

* Mundo
* Campanhas

---

## M3 — Sistema de Combate

Objetivo:

Permitir gerenciar batalhas completas.

Módulos necessários:

* Inimigos
* Combates

---

## M4 — Sistema Completo

Objetivo:

Sistema totalmente funcional.

Módulos necessários:

* Relatórios
* Ajustes finais
* Homologação

---

# 4. FASE 01 — INFRAESTRUTURA

## Objetivo

Criar a base técnica do projeto.

---

## Entregas

### Projeto Next.js

* Next.js
* TypeScript
* ESLint
* Prettier

---

### Firebase

* Authentication
* Firestore
* Storage

---

### Estrutura de Pastas

```text
src

├── app
├── components
├── modules
├── layouts
├── services
├── repositories
├── hooks
├── contexts
├── firebase
├── utils
├── validations
├── constants
└── styles
```

---

### Resultado Esperado

```text
Projeto inicial funcionando.
Firebase conectado.
Autenticação operacional.
```

---

# 5. FASE 02 — COMPONENTES BASE

## Objetivo

Criar o Design System.

---

## Componentes Obrigatórios

### Formulários

* Button
* TextBox
* TextArea
* Select
* MultiSelect
* Checkbox
* RadioGroup
* DatePicker
* NumberStepper

---

### CRUD

* DataGrid
* CrudToolbar
* SearchBox
* ConfirmDialog

---

### Mídia

* Avatar
* ImageUploader
* ImageGallery

---

### Feedback

* Toast
* Loading
* ErrorBoundary

---

## Resultado Esperado

```text
Biblioteca de componentes pronta.
```

---

# 6. FASE 03 — LAYOUT MESTRE

## Objetivo

Criar estrutura visual definitiva.

---

## Componentes

### Header

* Logo
* Pesquisa
* Notificações
* Perfil

---

### Sidebar

#### Mestre

* Dashboard
* Mundo
* Biblioteca RPG
* Personagens
* Campanhas
* Combates
* Relatórios
* Configurações

#### Jogador

* Dashboard
* Meus Personagens
* Minhas Campanhas
* Combates
* Configurações

---

### Footer

* Informações do sistema

---

### ContentContainer

Container padrão das páginas.

---

## Resultado Esperado

```text
Sistema navegável.
Controle de menus por perfil.
```

---

# 7. FASE 04 — BIBLIOTECA RPG

## Objetivo

Construir todos os submódulos reutilizáveis do sistema.

---

# 7.1 Idiomas

Coleção:

```text
idiomas
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* Service
* Repository
* Formulário
* Grid

---

# 7.2 Sentidos

Coleção:

```text
sentidos
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* Service
* Repository
* Formulário
* Grid

---

# 7.3 Perícias

Coleção:

```text
pericias
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* Service
* Repository
* Formulário
* Grid

---

# 7.4 Proficiências

Coleção:

```text
proficiencias
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* Service
* Repository
* Formulário
* Grid

---

# 7.5 Escolas de Magia

Coleção:

```text
escolasMagia
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* Service
* Repository
* Formulário
* Grid

---

# 7.6 Raças

Coleção:

```text
racas
```

Dependências:

```text
Idiomas
Sentidos
```

Entrega:

* CRUD
* RaceService
* RaceRepository
* RaceForm
* RaceGrid
* Associação de Idiomas
* Associação de Sentidos
* Bônus Raciais
* Validações

---

# 7.7 Sub-Raças

Coleção:

```text
subRacas
```

Dependências:

```text
Raças
```

Entrega:

* CRUD
* SubRaceService
* SubRaceRepository
* SubRaceForm
* SubRaceGrid
* Associação com Raça
* Bônus de Sub-Raça
* Validações

---

# 7.8 Classes

Coleção:

```text
classes
```

Dependências:

```text
Perícias
Proficiências
```

Entrega:

* CRUD
* ClassService
* ClassRepository
* ClassForm
* ClassGrid
* Progressão de Classe
* Recursos de Classe
* Equipamentos Iniciais
* Habilidades de Classe
* Magias de Classe
* Validações

---

# 7.9 Subclasses

Coleção:

```text
subclasses
```

Dependências:

```text
Classes
```

Entrega:

* CRUD
* SubclassService
* SubclassRepository
* SubclassForm
* SubclassGrid
* Progressão
* Recursos
* Habilidades

---

# 7.10 Habilidades

Coleção:

```text
habilidades
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* SkillService
* SkillRepository
* SkillForm
* SkillGrid
* Recursos Consumidos
* Recarga
* Usos

---

# 7.11 Magias

Coleção:

```text
magias
```

Dependências:

```text
Escolas de Magia
```

Entrega:

* CRUD
* SpellService
* SpellRepository
* SpellForm
* SpellGrid
* Dano
* Cura
* Alcance
* Área
* Componentes
* Concentração
* Ritual

---

# 7.12 Encantamentos

Coleção:

```text
encantamentos
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* EnchantmentService
* EnchantmentRepository
* EnchantmentForm
* EnchantmentGrid

---

# 7.13 Itens

Coleção:

```text
itens
```

Dependências:

```text
Nenhuma
```

Entrega:

* CRUD
* ItemService
* ItemRepository
* ItemForm
* ItemGrid
* Peso
* Valor
* Empilhamento

---

# 7.14 Armas

Coleção:

```text
armas
```

Dependências:

```text
Itens
```

Entrega:

* CRUD
* WeaponService
* WeaponRepository
* WeaponForm
* WeaponGrid
* Dano
* Tipo
* Alcance
* Munição
* Propriedades

---

# 7.15 Armaduras

Coleção:

```text
armaduras
```

Dependências:

```text
Itens
```

Entrega:

* CRUD
* ArmorService
* ArmorRepository
* ArmorForm
* ArmorGrid
* CA
* Penalidades
* Requisitos

---

# MARCO M1

## Sistema de Personagens Liberado

Ao finalizar:

```text
Idiomas
Sentidos
Perícias
Proficiências
Escolas de Magia

Raças
Sub-Raças

Classes
Subclasses

Habilidades
Magias

Encantamentos

Itens
Armas
Armaduras
```

o sistema estará apto a iniciar o desenvolvimento do módulo Personagens.

---

# 8. FASE 05 — PERSONAGENS

## Objetivo

Permitir criação, aprovação e gerenciamento completo de personagens.

---

# 8.1 Cadastro de Personagens

Coleção:

```text
personagens
```

Dependências:

```text
M1 completo
```

Entrega:

* CharacterForm
* CharacterRepository
* CharacterService
* Aprovação
* Validações
* Upload de Retrato

---

# 8.2 Sistema de Aprovação

Responsável:

```text
ApprovalService
```

Entrega:

* Aprovar
* Reprovar
* Solicitar Ajustes
* Histórico de Aprovações

---

# 8.3 Ficha de Personagem

Abas:

* Resumo
* Atributos
* Perícias
* Proficiências
* Habilidades
* Magias
* Equipamentos
* Inventário
* História

---

# 8.4 AttributeService

Entrega:

* calculateAttribute()
* calculateAllAttributes()
* calculateModifier()

Regras:

```text
Personagem armazena apenas atributos base.

O sistema calcula os valores finais.
```

---

# 8.5 Equipamentos

Componentes:

* EquipmentPanel
* EquipmentSelector

Funcionalidades:

* Equipar
* Desequipar
* Aplicar bônus

---

# 8.6 Inventário

Componentes:

* InventoryGrid
* InventoryItemModal

Funcionalidades:

* Adicionar item
* Remover item
* Empilhar item
* Controle de peso

---

# 8.7 Magias

Componentes:

* SpellPanel
* SpellSelector

Funcionalidades:

* Aprender
* Esquecer
* Preparar
* Utilizar

---

# 8.8 Habilidades

Componentes:

* SkillPanel

Funcionalidades:

* Usar habilidade
* Controle de usos
* Recarga automática

---

# 8.9 Recursos

Componentes:

* ResourcePanel

Funcionalidades:

* Mana
* Ki
* Fúria
* Inspiração
* Recursos customizados

---

# 8.10 Progressão

Responsável:

```text
ProgressionService
```

Funcionalidades:

* XP
* Subida de nível automática
* Novas habilidades
* Novas magias
* Atualização de recursos
* Recuperação total de HP ao subir de nível

---

# RESULTADO ESPERADO DA FASE 05

```text
Jogador cria personagem.

Mestre aprova personagem.

Ficha completa funcional.

Inventário funcional.

Equipamentos funcionais.

Magias funcionais.

Progressão funcional.
```
# 9. FASE 06 — MUNDO

## Objetivo

Implementar toda a estrutura geográfica e narrativa do universo.

---

# 9.1 Mundos

Coleção:

```text
mundos
```

Dependências:

```text
Nenhuma
```

Entrega:

* WorldForm
* WorldGrid
* WorldService
* WorldRepository
* Cadastro de Lore
* Cadastro de Cosmologia
* Cadastro de Origem

---

# 9.2 Continentes

Coleção:

```text
continentes
```

Dependências:

```text
Mundos
```

Entrega:

* ContinentForm
* ContinentGrid
* Associação ao Mundo
* História
* Lore

---

# 9.3 Reinos

Coleção:

```text
reinos
```

Dependências:

```text
Continentes
```

Entrega:

* KingdomForm
* KingdomGrid
* Governo
* História
* Organização Política

---

# 9.4 Cidades

Coleção:

```text
cidades
```

Dependências:

```text
Reinos
```

Entrega:

* CityForm
* CityGrid
* População
* História
* Informações Gerais

---

# 9.5 Ambientes

Coleção:

```text
ambientes
```

Dependências:

```text
Cidades
```

Entrega:

* EnvironmentForm
* EnvironmentGrid
* Clima
* Descrição
* História

---

# 9.6 Locais

Coleção:

```text
locais
```

Dependências:

```text
Ambientes
```

Entrega:

* LocationForm
* LocationGrid
* Galeria
* Mapa
* História

---

# 9.7 Religiões

Coleção:

```text
religioes
```

Dependências:

```text
Nenhuma
```

Entrega:

* ReligionForm
* ReligionGrid
* Dogmas
* Divindades
* História

---

# 9.8 Facções

Coleção:

```text
faccoes
```

Dependências:

```text
Nenhuma
```

Entrega:

* FactionForm
* FactionGrid
* Objetivos
* Alinhamento
* História

---

# 9.9 Organizações

Coleção:

```text
organizacoes
```

Dependências:

```text
Facções (Opcional)
```

Entrega:

* OrganizationForm
* OrganizationGrid
* Hierarquia
* Objetivos
* História

---

# 9.10 WorldTree

Componente:

```text
WorldTree
```

Estrutura:

Mundo
└── Continente
└── Reino
└── Cidade
└── Ambiente
└── Local

Entrega:

* Navegação Hierárquica
* Pesquisa
* Expansão/Recolhimento

---

# RESULTADO ESPERADO DA FASE 06

```text
Universo completo cadastrado.

Hierarquia geográfica funcional.

Lore centralizada.

WorldTree funcional.
```

---

# MARCO M2

## Sistema Narrativo Liberado

Módulos concluídos:

```text
Mundo

Continentes

Reinos

Cidades

Ambientes

Locais

Religiões

Facções

Organizações
```

---

# 10. FASE 07 — CAMPANHAS

## Objetivo

Permitir gerenciamento completo de campanhas.

---

# 10.1 Campanhas

Coleção:

```text
campanhas
```

Dependências:

```text
Personagens
Mundo
```

Entrega:

* CampaignForm
* CampaignGrid
* CampaignService
* CampaignRepository

---

# 10.2 Participantes

Funcionalidades:

* Adicionar Participante
* Remover Participante
* Controle de Aprovação
* Controle de Mestre

---

# 10.3 Capítulos

Coleção:

```text
capitulos
```

Entrega:

* ChapterForm
* ChapterGrid
* Ordenação Cronológica

---

# 10.4 Missões

Coleção:

```text
missoes
```

Entrega:

* MissionForm
* MissionGrid
* Missões Principais
* Missões Secundárias
* Missões Ocultas

---

# 10.5 Sessões

Coleção:

```text
sessoes
```

Entrega:

* SessionForm
* SessionGrid
* Participantes
* XP da Sessão
* Anotações do Mestre

---

# 10.6 Galeria

Coleção:

```text
sessaoImagens
```

Entrega:

* Upload
* Galeria
* Visualização

---

# 10.7 Anotações

Coleção:

```text
sessaoAnotacoes
```

Entrega:

* Notas
* Eventos
* Histórico

---

# RESULTADO ESPERADO DA FASE 07

```text
Campanhas completas.

Sessões registradas.

Missões organizadas.

Capítulos funcionais.
```

---

# MARCO M3

## Sistema de Campanhas Liberado

Módulos concluídos:

```text
Campanhas

Participantes

Capítulos

Missões

Sessões

Galeria

Anotações
```

---

# 11. FASE 08 — COMBATE

## Objetivo

Criar painel tático completo.

---

# 11.1 Inimigos

Coleção:

```text
inimigos
```

Dependências:

```text
Habilidades
Magias
Itens
```

Entrega:

* EnemyForm
* EnemyGrid
* XP Concedida
* Loot
* Resistências
* Fraquezas
* Imunidades

---

# 11.2 Combates

Coleção:

```text
combates
```

Dependências:

```text
Campanhas
Personagens
Inimigos
```

Entrega:

* CombatPage
* CombatService
* CombatRepository

---

# 11.3 Participantes

Componentes:

* CombatParticipantCard
* CombatEnemyCard

Modo Compacto:

* Nome
* HP
* CA
* Status

---

# 11.4 CombatAccordion

Painéis:

* Ataques
* Magias
* Habilidades
* Recursos
* Equipamentos
* Resistências
* Fraquezas
* Imunidades

---

# 11.5 Controle de HP

Componente:

```text
CombatHPControl
```

Funcionalidades:

* Aplicar Dano
* Aplicar Cura
* Histórico

---

# 11.6 Controle de CA

Componente:

```text
CombatArmorClassPanel
```

Exibição:

* CA Atual
* Origem dos bônus
* Valor Final

---

# 11.7 Controle de Status

Componente:

```text
CombatStatusPanel
```

Controle exclusivo do Mestre.

Status Oficiais:

* Agarrado
* Amedrontado
* Atordoado
* Caído
* Cego
* Enfeitiçado
* Envenenado
* Exausto
* Incapacitado
* Inconsciente
* Invisível
* Paralisado
* Petrificado
* Restrito
* Surdo

---

# 11.8 Sistema de Loot

Responsável:

```text
LootService
```

Funcionalidades:

* Loot Fixo
* Loot por Rolagem
* Distribuição Manual

---

# 11.9 Sistema de XP

Responsável:

```text
XPService
```

Funcionalidades:

* Somatório de XP
* Distribuição automática
* Registro

---

# 11.10 Progressão Pós Combate

Responsável:

```text
ProgressionService
```

Funcionalidades:

* Verificar subida de nível
* Aplicar progressão
* Restaurar HP dos personagens que subiram de nível

---

# RESULTADO ESPERADO DA FASE 08

```text
Combate completo.

XP automática.

Loot funcional.

Subida de nível automática.

Painel tático completo.
```
# 12. FASE 09 — RELATÓRIOS

## Objetivo

Disponibilizar informações consolidadas para análise e acompanhamento das campanhas.

---

# 12.1 Relatório de Personagens

Fonte:

```text
personagens
fichasCampanha
```

Indicadores:

* Nível
* XP
* Classe
* Raça
* Status
* Equipamentos
* Peso carregado

Filtros:

* Campanha
* Jogador
* Classe
* Raça

Exportação:

* Excel
* CSV

---

# 12.2 Relatório de Campanhas

Fonte:

```text
campanhas
sessoes
missoes
```

Indicadores:

* Quantidade de Participantes
* Quantidade de Sessões
* Quantidade de Missões
* Quantidade de Combates

Filtros:

* Campanha
* Mestre
* Status

Exportação:

* Excel
* CSV

---

# 12.3 Relatório de Combates

Fonte:

```text
combates
combateParticipantes
combateInimigos
```

Indicadores:

* Participantes
* Inimigos
* XP Concedida
* Loot Distribuído

Filtros:

* Campanha
* Sessão
* Data

Exportação:

* Excel
* CSV

---

# 12.4 Relatório de XP

Fonte:

```text
fichasCampanha
combates
```

Indicadores:

* XP Atual
* XP Obtida
* Nível Atual
* Subidas de Nível

Filtros:

* Campanha
* Personagem

Exportação:

* Excel
* CSV

---

# 12.5 Relatório de Loot

Fonte:

```text
combates
inventarios
```

Indicadores:

* Itens Recebidos
* Quantidades
* Valor Total
* Origem do Loot

Filtros:

* Campanha
* Personagem
* Item

Exportação:

* Excel
* CSV

---

# 12.6 Dashboard do Mestre

Indicadores:

* Campanhas Ativas
* Personagens Ativos
* Sessões Realizadas
* Combates Realizados
* XP Distribuída
* Loot Distribuído

Atualização:

```text
Tempo real
```

---

# RESULTADO ESPERADO DA FASE 09

```text
Relatórios completos.

Exportação funcional.

Dashboard operacional.
```

---

# MARCO M4

## Sistema Completo

Módulos concluídos:

```text
Biblioteca RPG

Mundo

Personagens

Campanhas

Combates

Relatórios
```

---

# 13. FASE 10 — HOMOLOGAÇÃO

## Objetivo

Validar integralmente o sistema.

---

# 13.1 Testes de Infraestrutura

Validar:

* Firebase Auth
* Firestore
* Storage

Critério:

```text
100% operacional
```

---

# 13.2 Testes de Segurança

Validar:

* Permissões do Mestre
* Permissões do Jogador
* Regras Firestore

Critério:

```text
Nenhum acesso indevido
```

---

# 13.3 Testes da Biblioteca RPG

Validar:

* CRUD
* Relacionamentos
* Exclusões
* Atualizações

Critério:

```text
Todos os submódulos funcionais
```

---

# 13.4 Testes de Personagem

Validar:

* Criação
* Aprovação
* Edição
* Progressão
* Inventário
* Equipamentos
* Magias
* Habilidades

Critério:

```text
Ficha completa funcional
```

---

# 13.5 Testes de Campanhas

Validar:

* Participantes
* Capítulos
* Missões
* Sessões

Critério:

```text
Campanha completa funcional
```

---

# 13.6 Testes de Combate

Validar:

* Dano
* Cura
* Status
* XP
* Loot
* Subida de Nível

Critério:

```text
Combate completo funcional
```

---

# 13.7 Testes de Relatórios

Validar:

* Indicadores
* Exportações
* Filtros

Critério:

```text
Dados consistentes
```

---

# RESULTADO ESPERADO DA FASE 10

```text
Sistema validado.

Sistema homologado.

Sistema pronto para produção.
```

---

# 14. CRITÉRIOS OFICIAIS DE ACEITE

## M1 — Sistema de Personagens

Aceite:

* Biblioteca RPG mínima concluída
* Personagens concluídos
* Aprovação concluída
* Inventário concluído

---

## M2 — Sistema Narrativo

Aceite:

* Mundo concluído
* WorldTree concluída
* Religiões concluídas
* Facções concluídas
* Organizações concluídas

---

## M3 — Sistema de Campanhas

Aceite:

* Campanhas concluídas
* Sessões concluídas
* Missões concluídas
* Participantes concluídos

---

## M4 — Sistema de Combate

Aceite:

* Combates concluídos
* XP concluída
* Loot concluído
* Progressão automática concluída

---

## M5 — Sistema Completo

Aceite:

* Relatórios concluídos
* Segurança concluída
* Homologação concluída

---

# 15. DEFINIÇÃO DE CONCLUSÃO DO PROJETO

O projeto será considerado concluído quando:

* Todos os módulos estiverem implementados
* Todos os serviços estiverem operacionais
* Todas as permissões estiverem validadas
* Todos os relatórios estiverem funcionando
* Todos os critérios de aceite estiverem aprovados

---

# RESUMO EXECUTIVO

## Ordem Oficial de Implementação

```text
Fase 01 — Infraestrutura

Fase 02 — Componentes Base

Fase 03 — Layout Mestre

Fase 04 — Biblioteca RPG

Fase 05 — Personagens

Fase 06 — Mundo

Fase 07 — Campanhas

Fase 08 — Combates

Fase 09 — Relatórios

Fase 10 — Homologação
```

---

## Marcos Oficiais

```text
M1 — Sistema de Personagens

M2 — Sistema Narrativo

M3 — Sistema de Campanhas

M4 — Sistema de Combate

M5 — Sistema Completo
```

---

# FECHAMENTO

Documento:

```text
11
```

Nome:

```text
Plano de Implementação dos Módulos
```

Versão:

```text
1.0
```

Status:

```text
FECHADO
```
