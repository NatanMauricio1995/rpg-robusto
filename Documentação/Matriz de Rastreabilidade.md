# 1. OBJETIVO

Este documento estabelece a rastreabilidade entre:

* Regras de Negócio
* Modelos de Dados
* Serviços
* Componentes
* Fluxos
* Permissões

Objetivos:

* Evitar duplicidade
* Evitar regras órfãs
* Facilitar manutenção
* Facilitar implementação
* Facilitar auditoria

---

# 2. MATRIZ DE MÓDULOS

| Módulo         | Documento 02 | Documento 04 | Documento 05 | Documento 10 | Documento 11 |
| -------------- | ------------ | ------------ | ------------ | ------------ | ------------ |
| Biblioteca RPG | ✔            | ✔            | ✔            | ✔            | ✔            |
| Mundo          | ✔            | ✔            | ✔            | ✔            | ✔            |
| Personagens    | ✔            | ✔            | ✔            | ✔            | ✔            |
| Campanhas      | ✔            | ✔            | ✔            | ✔            | ✔            |
| Combates       | ✔            | ✔            | ✔            | ✔            | ✔            |
| Relatórios     | ✔            | ✔            | ✔            | ✔            | ✔            |

---

# 3. MATRIZ DE USUÁRIOS

| Funcionalidade            | Mestre | Jogador |
| ------------------------- | ------ | ------- |
| Criar Personagem          | ✔      | ✔       |
| Editar Personagem Próprio | ✔      | ✔       |
| Aprovar Personagem        | ✔      | ✖       |
| Criar Campanha            | ✔      | ✖       |
| Criar Combate             | ✔      | ✖       |
| Alterar HP                | ✔      | ✖       |
| Alterar Status            | ✔      | ✖       |
| Distribuir Loot           | ✔      | ✖       |
| Visualizar Mundo          | ✔      | ✖       |
| Visualizar Biblioteca RPG | ✔      | ✖       |
| Visualizar Relatórios     | ✔      | ✖       |

Origem:

```text
Documento 08
```

---

# 4. MATRIZ DE PERSONAGENS

## Entidade

```text
personagens
```

Documentos Relacionados:

| Documento     | Utilização          |
| ------------- | ------------------- |
| Documento 05  | Modelo Firestore    |
| Documento 05A | Dicionário de Dados |
| Documento 06  | Fluxos              |
| Documento 08  | Permissões          |
| Documento 10  | Services            |
| Documento 11  | Implementação       |

---

## Services Relacionados

* CharacterService
* ApprovalService
* AttributeService
* EquipmentService
* InventoryService
* SpellService
* SkillService
* ProgressionService

---

## Componentes Relacionados

* CharacterForm
* AttributePanel
* InventoryGrid
* EquipmentPanel
* SpellPanel
* SkillPanel
* ProgressionPanel

---

# 5. MATRIZ DE ATRIBUTOS

## Campos

* Força
* Destreza
* Constituição
* Inteligência
* Sabedoria
* Carisma

---

## Armazenamento

```text
Apenas valor base
```

Origem:

```text
Documento 05A
```

---

## Processamento

Responsável:

```text
AttributeService
```

Origem:

```text
Documento 10
```

---

## Utilização

* Personagens
* Combate
* Perícias
* Proficiências
* Magias

---

# 6. MATRIZ DE XP E NÍVEL

## Campo

```text
xp
```

Documentos:

* Documento 05
* Documento 05A

---

## Serviço

```text
ProgressionService
```

---

## Fluxos

* Encerramento de Combate
* Conclusão de Sessão
* Conclusão de Missão

---

## Regras

* XP concedida por inimigos derrotados
* Subida automática de nível
* Recuperação total de HP ao subir de nível

---

# 7. MATRIZ DE COMBATE

## Entidade

```text
combates
```

---

## Serviços

* CombatService
* LootService
* XPService
* ProgressionService

---

## Componentes

* CombatParticipantCard
* CombatEnemyCard
* CombatAccordion
* CombatHPControl
* CombatStatusPanel
* CombatAttackPanel
* CombatSpellPanel
* CombatSkillPanel
* CombatResourcePanel
* CombatEquipmentPanel
* CombatResistancePanel
* CombatWeaknessPanel
* CombatImmunityPanel
* CombatArmorClassPanel

---

## Permissões

Mestre:

✔ Total

Jogador:

✖ Alteração

---

# 8. MATRIZ DE STATUS

## Lista Oficial

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

## Controle

Responsável:

```text
CombatService
```

---

## Permissão

```text
Somente Mestre
```

---

# 9. MATRIZ DE LOOT

## Origem

```text
Inimigos
```

---

## Tipos

* Loot Fixo
* Loot por Rolagem

---

## Serviço

```text
LootService
```

---

## Fluxo

```text
Encerramento de Combate
```

---

## Destino

```text
Inventário da Ficha da Campanha
```

---

# 10. MATRIZ DE INVENTÁRIO

## Entidade

```text
inventarios
```

---

## Serviços

* InventoryService
* EquipmentService

---

## Componentes

* InventoryGrid
* EquipmentPanel

---

## Regras

* Controle de peso
* Empilhamento
* Equipar
* Desequipar

---

# 11. MATRIZ DE CAMPANHAS

## Entidades

* campanhas
* capitulos
* missoes
* sessoes

---

## Serviço

```text
CampaignService
```

---

## Componentes

* CampaignCard
* ChapterCard
* MissionCard
* SessionCard

---

# 12. MATRIZ DE MUNDO

## Hierarquia

Mundo
→ Continente
→ Reino
→ Cidade
→ Ambiente
→ Local

---

## Serviço

```text
WorldService
```

---

## Componentes

* WorldTree
* LocationCard

---

## Permissão

Mestre:

✔ Total

Jogador:

✖ Nenhum acesso

---

# 13. MATRIZ DE APROVAÇÃO

## Responsável

```text
ApprovalService
```

---

## Entidade

```text
personagens
```

---

## Fluxo

Criado

↓

Pendente Aprovação

↓

Aprovado

ou

↓

Reprovado

---

## Regra

Alteração após aprovação:

↓

Pendente Aprovação

---

# 14. MATRIZ DE RELATÓRIOS

## Módulos

* Personagens
* Campanhas
* Combates
* XP
* Loot

---

## Permissão

Mestre:

✔

Jogador:

✖

---

# 15. MATRIZ DE DEPENDÊNCIAS

## Personagens

Depende de:

* Idiomas
* Sentidos
* Perícias
* Proficiências
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

---

## Campanhas

Depende de:

* Personagens
* Mundo

---

## Combates

Depende de:

* Personagens
* Campanhas
* Inimigos

---

## Relatórios

Depende de:

* Todos os módulos

---

# 16. MATRIZ DE MARCOS

## M1

Sistema de Personagens

---

## M2

Sistema Narrativo

---

## M3

Sistema de Campanhas

---

## M4

Sistema de Combate

---

## M5

Sistema Completo

---

# FECHAMENTO

Documento:

```text
12
```

Nome:

```text
Matriz de Rastreabilidade
```

Versão:

```text
1.0
```

Status:

```text
FECHADO
```
