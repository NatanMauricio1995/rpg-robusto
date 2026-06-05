# REGRAS DE NEGÓCIO CONSOLIDADAS


## 1. Hierarquia Geográfica
**RN-001:** Todo registro possui ID único obrigatório.\
**RN-002:** Todo Mundo deve possuir nome único.\
**RN-003:** Toda Religião pertence a um Mundo.\
**RN-004:** Toda Facção pertence a um Mundo.\
**RN-005:** Uma Organização pode existir sem Facção.\
**RN-006:** Todo Continente pertence a um Mundo.\
**RN-007:** Todo Reino pertence a um Continente.\
**RN-008:** Toda Cidade pertence a um Reino.\
**RN-009:** Todo Ambiente pertence a uma Cidade.\
**RN-010:** Todo Local pertence a um Ambiente.\
**RN-011:** Não é permitido quebrar a hierarquia:

    Mundo
        → Continente
            → Reino
                → Cidade
                    → Ambiente
                        → Local

## 2. Raças e Classes
**RN-012:** Toda Sub-Raça pertence a uma Raça.\
**RN-013:** Toda Subclasse pertence a uma Classe.\
**RN-014:** Ao selecionar uma Raça, todos os modificadores são aplicados automaticamente.\
**RN-015:** Ao selecionar uma Sub-Raça,seus modificadores são somados aos da Raça.\
**RN-016:** Ao selecionar uma Classe, o sistema aplica automaticamente:
- Proficiências
- Perícias
- Equipamentos Iniciais
- Progressão

**RN-017:** A Subclasse só pode ser escolhida após atingir o nível mínimo de desbloqueio.\
**RN-018:** O nível máximo do sistema é 20.

## 3. XP e Progressão
**RN-019:** XP é obtida exclusivamente através de inimigos derrotados.\
**RN-020:** Ao encerrar um combate, o sistema calcula automaticamente a XP obtida.\
**RN-021:** A XP é distribuída automaticamente aos participantes do combate.\
**RN-022:** Ao atingir a XP necessária, o personagem sobe de nível automaticamente.\
**RN-023:** Ao subir de nível, o sistema desbloqueia automaticamente:
- Habilidades
- Magias
- Recursos
- Espaços de Magia

**RN-024:** Ao subir de nível, o HP é restaurado completamente.

## 4. Personagens
**RN-025:** Cada personagem possui uma Ficha de Campanha para cada campanha em que participa.\
**RN-026:** Inventário é individual por campanha.\
**RN-027:** Moedas são individuais por campanha.\
**RN-028:** Recursos são individuais por campanha.\
**RN-029:** Um personagem pode participar de várias campanhas.\
**RN-030:** Um jogador pode possuir vários personagens.\
**RN-031:** A história do personagem precisa ser aprovada pelo mestre para ser considerada oficial.

## 5. Combates
**RN-032:** O combate não armazena histórico de ações.\
**RN-033:** O combate não armazena iniciativa.\
**RN-034:** O combate armazena apenas:
- Participantes
- Inimigos
- HP Atual

**RN-035:** O sistema controla automaticamente:
- HP
- Espaços de Magia
- Pontos de Ki
- Pontos de Feitiçaria
- Fúria
- Canalizar Divindade
- Inspiração de Bardo
- Dados de Vida
- Dados de Superioridade

**RN-036:** Existem dois tipos de descanso:
- Curto
- Longo

**RN-037:** Descansos recuperam recursos automaticamente.\
**RN-038:** Raças, Classes, Subclasses, Habilidades e Magias podem alterar a recuperação de recursos.\
**RN-039:** NPCs são exclusivamente narrativos.\
**RN-040:** NPCs não possuem ficha completa de combate.\
**RN-041:** Divindades são cadastradas como NPCs.\
**RN-042:** Inimigos possuem sistema de Loot.\
**RN-043:** Loot pode ser:
- Garantido
- Opcional

**RN-044:** Loot Opcional exige rolagem de dado.\
**RN-045:** O sistema informa a rolagem necessária, mas o mestre continua responsável pela rolagem.

## 6. Crafting e Receitas
**RN-046:** Crafting utiliza receitas cadastradas.\
**RN-047:** Receitas consomem ingredientes para gerar resultados.

## 7. Campanha
**RN-048:** Campanhas pertencem obrigatoriamente a um Mundo.\
**RN-049:** Uma campanha possui apenas um Mestre.\
**RN-050:** Uma campanha pode possuir até 5 jogadores.\
**RN-051:** A estrutura da campanha é:

    Campanha
        → Capítulos
        → Missões (globais, associadas à campanha)
        → Sessões
            → Combates
**RN-052:** Missões são entidades globais e reutilizáveis. São associadas a campanhas via tabela `campanhaMissoes`. Não pertencem obrigatoriamente a um capítulo.\
**RN-053:** Sessões pertencem a uma campanha. O vínculo a um capítulo é opcional (`capituloId` pode ser nulo).\
**RN-054:** Combates podem existir sem sessão vinculada.\
**RN-055:** O sistema opera exclusivamente em Português

## 8. Combate Tático
**RN-056:** Participantes e inimigos devem exibir seus ataques durante o combate.\
**RN-057:** Participantes e inimigos devem exibir suas habilidades durante o combate.\
**RN-058:** Participantes e inimigos devem exibir suas magias durante o combate.\
**RN-059:** O combate deve utilizar visualização expansível (Accordion).\
**RN-060:** O combate deve possuir modo compacto e modo detalhado.\
**RN-061:** O mestre pode aplicar dano e cura diretamente no card do participante.\
**RN-062:** O mestre pode adicionar e remover status de batalha manualmente.\
**RN-063:** Os status não são removidos automaticamente pelo sistema.\
**RN-064:** Os status são controlados exclusivamente pelo mestre.\
**RN-065:** O combate funciona como painel tático de consulta rápida.\
**RN-066:** Participantes e inimigos devem exibir a Classe de Armadura (CA) durante o combate.\
**RN-067:** A CA deve ser visível tanto no modo compacto quanto no modo detalhado.\
**RN-068:** O sistema deve recalcular a CA automaticamente ao alterar equipamentos, habilidades, magias ou efeitos que afetem defesa.\
**RN-069:** O combate deve armazenar a CA atual dos participantes.\
**RN-070:** O combate deve armazenar os status ativos dos participantes.\
**RN-071:** Os status ativos são definidos exclusivamente pelo mestre.

## 9. Segurança
**RN-072:** O módulo Mundo é exclusivo do Mestre.\
**RN-073:** Jogadores não possuem acesso administrativo ao módulo Biblioteca RPG (não podem criar, editar ou excluir). Durante a criação de personagem, o sistema apresenta seletores filtrados de Raças, Classes, Magias e Habilidades — mas isso é uma consulta interna do Service, não acesso direto à biblioteca.\
**RN-074:** Toda alteração em personagem aprovado gera: **PENDENTE_APROVACAO**\
**RN-075:** Jogadores não alteram informações de combate.\
**RN-076:** Relatórios são exclusivos do Mestre.\
**RN-077:** Nenhuma alteração crítica pode ocorrer sem registro.
    
    Regra Base: DENY ALL Jogador

**RN-078:** Jogadores não podem visualizar personagens de outros jogadores.\
**RN-079:** Jogadores não possuem acesso ao módulo Mundo.\
**RN-080:** Jogadores não possuem acesso ao módulo Biblioteca RPG.\
**RN-081:** Jogadores não podem alterar HP.\
**RN-082:** Jogadores não podem alterar status.\
**RN-083:** Jogadores não podem iniciar ou encerrar combates.\
**RN-084:** Todo personagem aprovado que sofrer alteração retorna para: **PENDENTE_APROVACAO**

## 10. Regras Arquiteturais
**RN-84:** Nenhuma página acessa Firestore.\
**RN-85:** Nenhum componente acessa Firestore.\
**RN-86:** Nenhum componente possui regra de negócio.\
**RN-87:** Toda regra passa por Service.\
**RN-88:** Repository não possui regra.\
**RN-89:** CombatService é o único autorizado a alterar HP.\
**RN-90:** ProgressionService é o único autorizado a alterar XP e nível do personagem. O XPService é um utilitário interno usado exclusivamente pelo ProgressionService para calcular e distribuir XP ao encerrar combates — nunca deve ser chamado diretamente por outras camadas.\
**RN-91:** ApprovalService é o único autorizado a aprovar personagens.
**RN-92:** InventoryService é o único autorizado a alterar inventário.

## 11. Progressão e Fórmulas Base

**RN-093:** A tabela de XP por nível segue o padrão D&D 5e adaptado:

| Nível | XP Necessária | Bônus de Proficiência |
|-------|--------------|----------------------|
| 1     | 0            | +2                   |
| 2     | 300          | +2                   |
| 3     | 900          | +2                   |
| 4     | 2.700        | +2                   |
| 5     | 6.500        | +3                   |
| 6     | 14.000       | +3                   |
| 7     | 23.000       | +3                   |
| 8     | 34.000       | +3                   |
| 9     | 48.000       | +4                   |
| 10    | 64.000       | +4                   |
| 11    | 85.000       | +4                   |
| 12    | 100.000      | +4                   |
| 13    | 120.000      | +5                   |
| 14    | 140.000      | +5                   |
| 15    | 165.000      | +5                   |
| 16    | 195.000      | +5                   |
| 17    | 225.000      | +6                   |
| 18    | 265.000      | +6                   |
| 19    | 305.000      | +6                   |
| 20    | 355.000      | +6                   |

**RN-094:** Fórmula de HP máximo por nível:
- Nível 1: Dado de Vida máximo + Modificador de Constituição
- Níveis 2+: (Dado de Vida ÷ 2 + 1) + Modificador de Constituição por nível adicional
- Exemplo: Guerreiro (d10), CON 16 (mod +3), nível 3 → HP = 10 + 3 + (6 + 3) + (6 + 3) = 31

**RN-095:** Fórmula do Bônus de Proficiência: definido pela tabela da RN-093 conforme o nível atual do personagem na ficha de campanha.

**RN-096:** Crafting — validação de requisitos: antes de executar uma receita, o sistema valida se o personagem possui a classe exigida (`classeId`) e a proficiência de ferramenta exigida (`ferramentaId`). Se algum requisito não for atendido, o crafting é bloqueado com mensagem de erro.

**RN-097:** Dado de vida permitidos para classes: d4, d6, d8, d10, d12. O valor d20 listado anteriormente em elementos fixos é um erro — d20 é exclusivamente dado de verificação, não dado de vida.

**RN-098:** Um equipamento pode exigir:
- Proficiências
- Classes
- Nível mínimo
- Atributos mínimos
- Raças

**RN-099**
A validação ocorre:
- Ao equipar
- Ao criar personagem
- Ao subir de nível

**RN-100:** Caso o personagem deixe de atender um requisito, o equipamento deve ser desequipado automaticamente.