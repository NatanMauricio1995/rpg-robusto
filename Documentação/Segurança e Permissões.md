# CAPÍTULO 1 — FILOSOFIA DE SEGURANÇA

## Princípio Geral:
- Tudo é privado por padrão.
- Nenhum usuário recebe acesso automaticamente.
- Toda permissão deve ser explicitamente concedida.

## Princípio Firestore:

    NEGAR TUDO
        ↓
    LIBERAR EXPLICITAMENTE

# CAPÍTULO 2 — PAPÉIS DO SISTEMA

Existem apenas dois papéis principais:
- MESTRE
- JOGADOR

# CAPÍTULO 3 — PERMISSÕES DO MESTRE

O Mestre possui acesso administrativo completo sobre os dados que administra.

Pode:

* Criar
* Consultar
* Editar
* Excluir

Entidades:

* Mundo
* Biblioteca RPG
* Personagens
* Campanhas
* Sessões
* Combates
* Missões
* Relatórios

Também pode:

* Aprovar personagens
* Reprovar personagens
* Aplicar status
* Alterar HP
* Distribuir loot
* Encerrar combate
* Adicionar participantes

# CAPÍTULO 4 — PERMISSÕES DO JOGADOR

O Jogador possui acesso apenas ao próprio conteúdo.

Pode:

* Criar personagem
* Editar personagem próprio
* Consultar campanhas das quais participa
* Consultar combates das quais participa
* Equipar itens
* Desequipar itens

Não pode:

* Aprovar personagens
* Criar campanhas
* Criar combates
* Alterar HP
* Aplicar status
* Distribuir XP
* Distribuir loot
* Editar Biblioteca RPG
* Editar Mundo

# CAPÍTULO 5 — MÓDULO MUNDO

**Classificação:** MÓDULO ADMINISTRATIVO

**Acesso:**
- **Mestre:** Total
- **Jogador:** Nenhum

O jogador não pode visualizar:

* Mundos
* Continentes
* Reinos
* Cidades
* Ambientes
* Locais
* Religiões
* Facções
* Organizações

**Motivo:** Evitar spoilers e metagame.

# CAPÍTULO 6 — MÓDULO BIBLIOTECA RPG

**Classificação:** MÓDULO ADMINISTRATIVO

Entidades:

* Idiomas
* Sentidos
* Perícias
* Proficiências
* Escolas de Magia
* Raças
* Sub-Raças
* Classes
* Subclasses
* Habilidades
* Magias
* Encantamentos
* Itens
* Armas
* Armaduras
* Receitas
* NPCs
* Inimigos

**Acesso:**
- **Mestre:** Total
- **Jogador:** Nenhum

**Motivo:**

Evitar consulta de:

* NPCs secretos
* Inimigos
* Fraquezas
* Resistências
* Loots
* Magias ocultas
* Conteúdo administrativo

# CAPÍTULO 7 — MÓDULO PERSONAGENS

## 7.1 CRIAR
- **Mestre:** Sim
- **Jogador:** Sim

## 7.2 VISUALIZAR
- **Mestre:** Todos os personagens sob sua administração.
- **Jogador:** Apenas os próprios personagens.

## 7.3 EDITAR
- **Mestre:** Sim
- **Jogador:** Apenas os próprios personagens.

## 7.4 EXCLUIR
- **Mestre:** Sim
- **Jogador:** Não

## 7.5 APROVAÇÃO
- **Mestre:** Sim
- **Jogador:** Não

# CAPÍTULO 8 — MÓDULO CAMPANHAS

## 8.1 CRIAR
- **Mestre:** Sim
- **Jogador:** Não

## 8.2 VISUALIZAR
- **Mestre:** Todas as campanhas próprias.
- **Jogador:** Apenas campanhas em que participa.

## 8.3 EDITAR
- **Mestre:** Sim
- **Jogador:** Não

## 8.4 EXCLUIR
- **Mestre:** Sim
- **Jogador:** Não

# CAPÍTULO 9 — PARTICIPANTES DE CAMPANHA

## 9.1 Adicionar Participantes
- **Mestre:** Sim
- **Jogador:** Não

## 9.2 Remover Participantes
- **Mestre:** Sim
- **Jogador:** Não

# CAPÍTULO 10 — MISSÕES

Missões são entidades globais.

- **Criar:** Mestre
- **Editar:** Mestre
- **Excluir:** Mestre
- **Visualizar:** Mestre
- **Jogador:** Não possui acesso administrativo.

# CAPÍTULO 11 — SESSÕES
- **Criar:** Mestre
- **Editar:** Mestre
- **Excluir:** Mestre
- **Visualizar:** Mestre
- **Jogador:** Apenas sessões da própria campanha.

# CAPÍTULO 12 — COMBATES
- **Criar Combate:** Mestre
- **Iniciar Combate:** Mestre
- **Encerrar Combate:** Mestre
**Aplicar Dano:** Mestre
**Aplicar Cura:** Mestre
**Adicionar Status:** Mestre
**Remover Status:** Mestre
**Distribuir XP:** Sistema
**Distribuir Loot:** Mestre

# CAPÍTULO 13 — INVENTÁRIO
## 13.1 Visualizar
- **Mestre:** Sim
- **Jogador:** Próprio inventário

## 13.2 Equipar
- **Mestre:** Sim
- **Jogador:** Sim

## 13.3 Desequipar
- **Mestre:** Sim
- **Jogador:** Sim

## 13.4 Adicionar Item
- **Mestre:** Sim
- **Jogador:** Não

## 13.5 Remover Item
- **Mestre:** Sim
- **Jogador:** Não

# CAPÍTULO 14 — RELATÓRIOS
- **Mestre:** Acesso Total
- **Jogador:** Sem acesso

# CAPÍTULO 15 — STORAGE
## UPLOADS DO MESTRE

Permitido:

* Mundo
* Campanhas
* NPCs
* Inimigos
* Locais
* Itens
* Retrato do personagem

## UPLOADS DO JOGADOR

Permitido:
* Retrato do personagem


# CAPÍTULO 16 — LOGS E AUDITORIA

Registrar:

* Criação
* Edição
* Exclusão
* Aprovação
* Reprovação
* Encerramento de Combate
* Distribuição de Loot
* Subida de Nível

# CAPÍTULO 17 — REGRAS FIRESTORE

**Pode ler:**

* Próprio usuário
* Próprios personagens
* Próprio inventário
* Próprias fichas
* Campanhas em que participa

**Jogador NÃO pode ler:**

* Mundo
* Biblioteca RPG
* Relatórios
* Personagens de terceiros

**Mestre:** Acesso total às entidades administradas.
