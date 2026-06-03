**Objetivo:** Definir todos os fluxos de utilização do sistema para Mestres e Jogadores.

O Documento 06 descreve:

* Fluxos de navegação
* Fluxos de criação
* Fluxos de aprovação
* Fluxos de combate
* Fluxos automáticos
* Fluxos de progressão
* Fluxos de campanhas

# CAPÍTULO 1 — FLUXOS DE ACESSO

## FA-001 — LOGIN
    Abrir Sistema
        ↓
    Tela de Login
        ↓
    Informar Credenciais
        ↓
    Validar Usuário
        ↓
    Home Screen

## FA-002 — RECUPERAÇÃO DE SENHA

    Tela de Login
        ↓
    Esqueci Minha Senha
        ↓
    Informar E-mail
        ↓
    Receber Link
        ↓
    Definir Nova Senha

# CAPÍTULO 2 — FLUXOS DE PERSONAGEM

## FP-001 — CRIAR PERSONAGEM
    Meus Personagens
        ↓
    Novo Personagem
        ↓
    Preencher Dados Gerais
        ↓
    Selecionar Raça
        ↓
    Selecionar Sub-Raça
        ↓
    Selecionar Classe
        ↓
    Selecionar Subclasse
        ↓
    Definir História
        ↓
    Salvar
        ↓
    Pendente de Aprovação

## FP-002 — APROVAÇÃO DO PERSONAGEM

    Personagem Pendente
        ↓
    Mestre Analisa
        ↓
    Aprovar ou Reprovar

## FP-003 — ALTERAÇÃO APÓS APROVAÇÃO

    Jogador Edita
        ↓
    Status:
    Pendente Aprovação
        ↓
    Mestre Aprova
        ↓
    Atualizar Ficha

## FP-004 — SUBIDA DE NÍVEL

    Recebe XP
        ↓
    Verificar Tabela de XP
        ↓
    Subiu de Nível?
        ↓
    Sim
        ↓
    Atualizar Nível
        ↓
    Atualizar Recursos
        ↓
    Atualizar Habilidades
        ↓
    Atualizar Magias
        ↓
    Restaurar HP Total


# CAPÍTULO 3 — FLUXOS DE CAMPANHA

## FC-001 — CRIAR CAMPANHA

    Campanhas
        ↓
    Nova Campanha
        ↓
    Preencher Dados
        ↓
    Selecionar Mundo
        ↓
    Salvar

## FC-002 — ADICIONAR JOGADOR

    Campanha
        ↓
    Participantes
        ↓
    Adicionar Jogador
        ↓
    Selecionar Personagem
        ↓
    Confirmar

## FC-003 — CRIAR # CAPÍTULO

    Campanha
        ↓
    Capítulos
        ↓
    Novo capítulo

## FC-004 — ADICIONAR MISSÃO

    Campanha
        ↓
    Missões
        ↓
    Selecionar Missão Global
        ↓
    Associar à Campanha

## FC-005 — CRIAR SESSÃO

    Campanha
        ↓
    Sessões
        ↓
    Nova Sessão
        ↓
    Adicionar Participantes
        ↓
    Adicionar Imagens
        ↓
    Adicionar Anotações
        ↓
    Salvar

# CAPÍTULO 4 — FLUXOS DE MUNDO

## FM-001 — CRIAR MUNDO

    Mundos
        ↓
    Novo Mundo
        ↓
    Dados Gerais
        ↓
    Lore
        ↓
    Origem
        ↓
    Cosmologia
        ↓
    Salvar

## FM-002 — CRIAR HIERARQUIA GEOGRÁFICA

    Mundo
        ↓
    Continente
        ↓
    Reino
        ↓
    Cidade
        ↓
    Ambiente
        ↓
    Local

## FM-003 — VISUALIZAR WORLDTREE

    Abrir Mundo
        ↓
    WorldTree
        ↓
    Expandir Estrutura

# CAPÍTULO 5 — FLUXOS DA BIBLIOTECA RPG

## FB-001 — CRIAR RAÇA

    Raças
        ↓
    Nova Raça
        ↓
    Preencher Dados
        ↓
    Salvar

## FB-002 — CRIAR CLASSE

    Classes
        ↓
    Nova Classe
        ↓
    Definir Progressão
        ↓
    Salvar

## FB-003 — CRIAR MAGIA

    Magias
        ↓
    Nova Magia
        ↓
    Selecionar Escola
        ↓
    Definir Nível
        ↓
    Salvar

## FB-004 — CRIAR INIMIGO

    Inimigos
        ↓
    Novo Inimigo
        ↓
    Definir Atributos
        ↓
    Definir XP
        ↓
    Definir Loot
        ↓
    Salvar

## FB-005 — CRIAR ITEM

    Itens
        ↓
    Novo Item
        ↓
    Definir Tipo
        ↓
    Definir Efeito
        ↓
    Salvar

# CAPÍTULO 6 — FLUXOS DE COMBATE

## FCB-001 — CRIAR COMBATE

    Campanha
        ↓
    Combates
        ↓
    Novo Combate
        ↓
    Selecionar Participantes
        ↓
    Selecionar Inimigos
        ↓
    Salvar

## FCB-002 — APLICAR DANO

    Combate
        ↓
    Selecionar Alvo
        ↓
    Aplicar Dano
        ↓
    Atualizar HP

## FCB-003 — APLICAR CURA

    Combate
        ↓
    Selecionar Alvo
        ↓
    Aplicar Cura
        ↓
    Atualizar HP

## FCB-004 — GERENCIAR STATUS

    Combate
        ↓
    Selecionar Participante
        ↓
    Gerenciar Status
        ↓
    Adicionar ou Remover Status
        ↓
    Salvar

## FCB-005 — HP ZERADO

    HP <= 0
        ↓
    Aplicar Status: CAÍDO

## FCB-006 — ENCERRAR COMBATE

    Encerrar Combate
        ↓
    Calcular XP
        ↓
    Distribuir XP
        ↓
    Calcular Loot
        ↓
    Salvar HP Final
        ↓
    Verificar Subida de Nível
        ↓
    Restaurar HP dos que Subiram

# CAPÍTULO 7 — FLUXOS DE INVENTÁRIO

## FI-001 — ADICIONAR ITEM

    Inventário
        ↓
    Adicionar Item
        ↓
    Selecionar Item
        ↓
    Definir Quantidade

## FI-002 — EQUIPAR ITEM

    Inventário
        ↓
    Equipar
        ↓
    Atualizar Equipamentos

## FI-003 — MARCAR EQUIPAMENTO QUEBRADO

    Equipamento
        ↓
    Marcar Como Quebrado

Controle exclusivo do Mestre.


# CAPÍTULO 8 — FLUXOS DE CRAFTING

## FCR-001 — PRODUZIR ITEM

    Selecionar Receita
        ↓
    Verificar Ingredientes
        ↓
    Consumir Ingredientes
        ↓
    Gerar Resultado
        ↓
    Adicionar ao Inventário


# CAPÍTULO 9 — FLUXOS DE RELATÓRIOS

## FR-001 — RELATÓRIO DE CAMPANHAS

    Relatórios
        ↓
    Campanhas
        ↓
    Selecionar Período
        ↓
    Gerar Relatório

## FR-002 — RELATÓRIO DE PERSONAGENS

    Relatórios
        ↓
    Personagens
        ↓
    Gerar Relatório

## FR-003 — RELATÓRIO DE COMBATES

    Relatórios
        ↓
    Combates
        ↓
    Gerar Relatório

# CAPÍTULO 10 — FLUXOS AUTOMÁTICOS

## FS-001 — APROVAÇÃO

    Personagem Alterado
        ↓
    Status: Pendente Aprovação

## FS-002 — XP

    Combate Encerrado
        ↓
    Adicionar XP

## FS-003 — SUBIDA DE NÍVEL

    XP Atualizada
        ↓
    Verificar Tabela
        ↓
    Subir Nível

## FS-004 — RESTAURAÇÃO DE HP

    Subiu de Nível
        ↓
    Restaurar HP Total

## FS-005 — STATUS CAÍDO

    HP <= 0
        ↓
    Aplicar Status: Caído

## FS-006 — LOOT

    Inimigo Derrotado
        ↓
    Processar Loot Fixo
        ↓
    Processar Tabela de Rolagem
        ↓
    Adicionar ao Inventário