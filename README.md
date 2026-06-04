# RPG Robusto

Sistema completo de gerenciamento de RPG de mesa baseado em D&D 5e Adaptado, desenvolvido para auxiliar Mestres e Jogadores no gerenciamento de mundos, personagens, campanhas, combates e progressão.

---

# Visão Geral

O RPG Robusto é uma plataforma web criada para centralizar todos os elementos necessários para uma campanha de RPG de mesa.

O sistema foi projetado para:

- Auxiliar Mestres na administração do universo do jogo
- Facilitar a criação e evolução de personagens
- Organizar campanhas e sessões
- Gerenciar combates
- Automatizar cálculos e progressão
- Centralizar toda a biblioteca de regras e conteúdos

O objetivo não é substituir o Mestre, mas fornecer ferramentas para tornar a experiência mais organizada.

---

# Principais Características

## Biblioteca RPG

Cadastro e gerenciamento de:

- Idiomas
- Sentidos
- Perícias
- Proficiências
- Efeitos de Combate
- Escolas de Magia
- Raças
- Sub-Raças
- Classes
- Subclasses
- Habilidades
- Magias
- Encantamentos
- Itens
- Armas
- Armaduras
- Receitas
- NPCs
- Inimigos

---

## Mundo

Criação completa de universos de campanha.

Hierarquia:

```text
Mundo
 └── Continente
      └── Reino
           └── Cidade
                └── Ambiente
                     └── Local
```

Também inclui:

- Religiões
- Facções
- Organizações
- Cosmologia
- Lore
- História

---

## Personagens

Criação completa de fichas.

Funcionalidades:

- Seleção de raça
- Seleção de sub-raça
- Seleção de classe
- Seleção de subclasse
- Aplicação automática de modificadores
- Inventário
- Equipamentos
- Progressão automática
- Controle de XP
- Controle de recursos
- Controle de magias
- Aprovação por mestre

---

## Campanhas

Gerenciamento completo de campanhas.

Recursos:

- Criação de campanhas
- Convite de jogadores
- Participantes
- Sessões
- Missões
- Diário de campanha
- Compartilhamento de informações

---

## Combates

Sistema de combate assistido.

Recursos:

- Iniciativa
- Turnos
- Rodadas
- Aplicação de status
- Controle de HP
- Controle de recursos
- Distribuição de XP
- Distribuição de loot

---

## Relatórios

Indicadores e estatísticas do sistema.

Exemplos:

- XP distribuída
- Personagens criados
- Combates realizados
- Campanhas ativas
- Evolução dos jogadores

---

# Arquitetura do Sistema

O projeto segue arquitetura modular.

```text
Sistema RPG

├── Biblioteca RPG
├── Mundo
├── Personagens
├── Campanhas
├── Combates
└── Relatórios
```

Cada módulo possui:

- Componentes
- Serviços
- Repositórios
- Regras de negócio
- Permissões
- Modelos de dados

---

# Tecnologias

## Front-End

- Next.js
- React
- TypeScript
- CSS Modules

## Back-End

- Firebase Authentication
- Firebase Firestore
- Firebase Storage

## Ferramentas

- ESLint
- Prettier

---

# Estrutura de Pastas

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
├── validations
├── constants
├── utils
└── styles
```

---

# Modelo de Usuários

O sistema possui dois perfis.

## Mestre

Permissões:

- Criar
- Editar
- Excluir
- Aprovar personagens
- Criar campanhas
- Gerenciar combates
- Distribuir XP
- Distribuir loot
- Administrar mundo
- Administrar biblioteca RPG

---

## Jogador

Permissões:

- Criar personagem
- Editar personagem próprio
- Participar de campanhas
- Participar de combates
- Gerenciar equipamentos

Restrições:

- Não pode aprovar personagens
- Não pode criar campanhas
- Não pode criar combates
- Não pode editar o mundo
- Não pode editar a biblioteca RPG

---

# Regras Gerais

## Progressão

- Nível máximo: 20
- XP distribuída automaticamente
- Evolução automática
- Desbloqueio automático de habilidades
- Desbloqueio automático de magias

---

## Raças e Classes

Ao selecionar uma raça:

- Modificadores são aplicados automaticamente

Ao selecionar uma sub-raça:

- Bônus são acumulados

Ao selecionar uma classe:

- Proficiências
- Equipamentos
- Perícias
- Progressão

são configurados automaticamente.

---

# Segurança

Princípios adotados:

```text
Negar Tudo
      ↓
Liberar Explicitamente
```

Todos os acessos são controlados por:

- Papel do usuário
- Regras de negócio
- Regras do Firestore

---

# Fluxo Principal

```text
Login
   ↓
Dashboard
   ↓
Personagens
   ↓
Campanhas
   ↓
Combates
   ↓
Progressão
```

---

# Roadmap

## Fase 1

Infraestrutura

- Next.js
- Firebase
- Autenticação
- Firestore
- Storage

---

## Fase 2

Design System

- Componentes base
- Formulários
- Uploads
- Feedback visual

---

## Fase 3

Mundo

- Mundos
- Continentes
- Reinos
- Cidades
- Ambientes
- Locais

---

## Fase 4

Biblioteca RPG

- Raças
- Classes
- Magias
- Itens
- Equipamentos
- NPCs

---

## Fase 5

Personagens

- Criação
- Evolução
- Inventário

---

## Fase 6

Campanhas

- Sessões
- Missões
- Participantes

---

## Fase 7

Combates

- Iniciativa
- Turnos
- Status
- XP

---

## Fase 8

Relatórios

- Indicadores
- Estatísticas
- Exportações

---

# Documentação

A documentação completa encontra-se em:

```text
Documentação/

├── Visão geral.md
├── Arquitetura Funcional.md
├── Arquitetura Visual.md
├── Arquitetura de Componentes FrontEnd.md
├── Arquitetura BackEnd e Camada de Serviços.md
├── Fluxos do Sistema.md
├── Modelos de dados.md
├── Dicionário de dados.md
├── Regras de negócio.md
├── Segurança e Permissões.md
├── Plano de Implementação dos módulos.md
├── Roadmap de Desenvolvimento.md
└── Matriz de Rastreabilidade.md
```

---

# Objetivo Final

Construir uma plataforma robusta para gerenciamento de RPG de mesa, permitindo que Mestres e Jogadores tenham acesso a um ambiente completo para criação, evolução e administração de campanhas, personagens e mundos de forma organizada, segura e escalável.