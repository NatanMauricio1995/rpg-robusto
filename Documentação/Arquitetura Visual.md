**Objetivo:** organizar interface.

# CAPÍTULO 1 — FILOSOFIA VISUAL

## 1.1 Objetivo

A Arquitetura Visual define como o sistema será apresentado aos usuários, quais telas existirão, como será a navegação e quais componentes serão utilizados.

Ela não define regras de negócio nem estrutura de banco de dados.

Seu objetivo é garantir:

* Padronização visual
* Reutilização de componentes
* Facilidade de manutenção
* Experiência consistente para Mestres e Jogadores

## 1.2 Princípios Visuais

O sistema seguirá obrigatoriamente:

### Componentização

Toda tela deve ser construída através de componentes reutilizáveis.

Estrutura:

Página
→ Seções
→ Componentes

Não é permitido criar elementos específicos diretamente nas páginas quando já existir um componente reutilizável equivalente.

### Desktop First

O sistema é prioritariamente desenvolvido para utilização em computadores.

O foco principal é:

* Mestres administrando campanhas
* Criação de conteúdo
* Gerenciamento de combates
* Administração da biblioteca RPG

### Responsividade

O sistema deverá funcionar em:

* Desktop
* Tablet
* Mobile

Com diferenças de comportamento.

Desktop:

* Experiência completa

Tablet:

* Experiência adaptada

Mobile:

* Consulta simplificada


### Combate Assistido

O sistema não substitui o mestre.

O sistema auxilia:

* Consulta rápida
* Controle de HP
* Controle de recursos
* Controle de status
* Controle de XP

A narrativa continua sendo conduzida pelo mestre.

### D&D 5e Adaptado

Todos os componentes devem considerar:

* Níveis
* XP
* CA
* HP
* Recursos
* Magias
* Habilidades

como elementos centrais da experiência.

# CAPÍTULO 2 — LAYOUT MESTRE

## 2.1 Estrutura Geral

Layout padrão:

    ┌─────────────────────────────────────────┐
    │ Header                                  │
    ├──────────────┬──────────────────────────┤
    │              │                          │
    │ Menu Lateral │ Área de Conteúdo         │
    │              │                          │
    │              │                          │
    ├──────────────┴──────────────────────────┤
    │ Footer                                  │
    └─────────────────────────────────────────┘

## 2.2 Header

Exibido em todas as páginas.

Componentes:

* Logo do Sistema
* Pesquisa Global
* Notificações
* Perfil do Usuário

### Pesquisa Global

Permite localizar:

* Personagens
* Campanhas
* NPCs
* Inimigos
* Locais
* Itens

### Notificações

Exemplos:

* Personagem aprovado
* Convite para campanha
* Subida de nível
* Missão concluída

### Perfil

Exibe:

* Nome
* Foto
* Tipo de usuário

Ações:

* Meu Perfil
* Configurações
* Sair

## 2.3 Menu Lateral

Exibido permanentemente no Desktop.

### Menu do Mestre
- Dashboard
- Mundo
- Biblioteca RPG
- Personagens
- Campanhas
- Combates
- Relatórios
- Configurações

### Menu do Jogador
- Dashboard
- Meus Personagens
- Minhas Campanhas
- Combates
- Configurações

## 2.4 Footer

Exibição discreta.

Informações:

* Versão do Sistema
* Direitos Autorais
* Informações técnicas

# CAPÍTULO 3 — NAVEGAÇÃO

## 3.1 Estrutura Principal

- Menu Principal

- Dashboard

- Mundo

- Biblioteca RPG

- Personagens

- Campanhas

- Combates

- Relatórios

- Configurações

## 3.2 Módulo Mundo

Submenu:

* Mundos
* Religiões
* Facções
* Organizações
* Lojas
* Continentes
* Reinos
* Cidades
* Ambientes
* Locais

## 3.3 Módulo Biblioteca RPG

Submenu:

* Idiomas

* Escolas de Magia

* Raças

* Sub-Raças

* Classes

* Subclasses

* Habilidades

* Magias

* Armas

* Armaduras

* Itens

* Encantamentos

* Receitas

* NPCs

* Inimigos



## 3.4 Módulo Personagens

Submenu:

* Lista de Personagens



## 3.5 Módulo Campanhas

Submenu:

* Lista de Campanhas

Ao clicar em Campanhas:

Abrir:

* Lista de Campanhas

Não abrir:

* Última campanha acessada



## 3.6 Módulo Combates

Submenu:

* Lista de Combates



## 3.7 Relatórios

Submenu:

* Campanhas
* Personagens
* Inimigos
* Combates



## 3.8 Configurações

Submenu:

* Perfil
* Preferências
* Sistema



# CAPÍTULO 4 — DASHBOARD

## 4.1 Tela Inicial

Ao entrar no sistema:

Abrir:

HOME SCREEN

Não abrir:

Dashboard diretamente.



## 4.2 Home Screen

Elementos:

Imagem ilustrativa de RPG

Mensagem de boas-vindas

Acesso rápido

Atalhos principais



Exemplo:

"Bem-vindo ao Sistema RPG"

Botões:

* Minhas Campanhas
* Meus Personagens
* Dashboard



## 4.3 Dashboard Mestre

Objetivo:

Exibir tudo que necessita atenção.



Cards Principais

* Campanhas Ativas
* Personagens
* NPCs
* Inimigos
* Missões
* Combates



Cards Secundários

* Sessões Hoje
* Combates Abertos
* Missões Pendentes
* Últimos Logs



Ações Rápidas

* Nova Campanha
* Novo Personagem
* Novo Inimigo
* Novo Combate



## 4.4 Dashboard Jogador

Objetivo:

Mostrar progresso do jogador.



Cards

* Personagens
* Campanhas
* Sessões Recentes



Informações

* XP Recente
* Última Sessão
* Última Campanha Acessada



## 4.5 Permissões Visuais

### Mestre

Visualiza:

* Todos os personagens ligados às suas campanhas
* Todas as campanhas administradas
* Todos os combates
* Todos os NPCs
* Todos os inimigos



### Jogador

Visualiza apenas:

* Seus personagens
* Suas campanhas
* Seus dados



Jogadores não podem visualizar fichas de outros jogadores.



## 4.6 Fluxo Inicial

Login

↓

Home Screen

↓

Dashboard

↓

Módulo Selecionado

↓

Tela Específica



# CAPÍTULO 5 — COMPONENTES BASE

## 5.1 Objetivo

Todos os módulos do sistema devem utilizar componentes reutilizáveis.

É proibido criar componentes específicos quando já existir um componente padrão equivalente.



## 5.2 Componentes de Formulário

## Button

Função:

Executar ações.

Variações:

* Primary
* Secondary
* Success
* Warning
* Danger

Estados:

* Normal
* Hover
* Disabled
* Loading



## TextBox

Função:

Entrada de texto.

Tipos:

* Texto
* Número
* E-mail
* Senha
* URL



## TextArea

Função:

Textos longos.

Utilizado em:

* Descrições
* Histórias
* Lore
* Anotações
* Missões



## Select

Função:

Seleção única.



## MultiSelect

Função:

Seleção múltipla.

Utilizado em:

* Idiomas
* Resistências
* Fraquezas
* Imunidades
* Habilidades
* Magias
* Facções



## Checkbox

Função:

Ativar ou desativar opções.



## RadioGroup

Função:

Escolha única entre opções.



## DatePicker

Função:

Seleção de datas.



## NumberStepper

Função:

Valores numéricos incrementais.

Utilizado em:

* XP
* Quantidade
* Peso
* Valores



## 5.3 Componentes de Mídia

### ImageUploader

Permite:

* Upload
* URL

Conforme definido na arquitetura funcional.



### ImageGallery

Exibição de múltiplas imagens.

Utilizado em:

* Locais
* Campanhas
* Sessões



### Avatar

Representação visual de:

* Personagens
* Jogadores
* NPCs



## 5.4 Componentes de Navegação

## Tabs

Utilizado em:

* Campanhas
* Classes
* NPCs
* Inimigos
* Diversos módulos



## Breadcrumb

Exemplo:

Mundo

→ Continente

→ Reino

→ Cidade



## 5.5 Componentes de Feedback

## Loading

Tipos:

* Global
* Grid
* Upload
* Card



## Toast

Tipos:

* Success
* Error
* Warning
* Info



## ConfirmDialog

Utilizado para:

* Exclusões
* Ações irreversíveis



# CAPÍTULO 6 — CRUD PADRÃO

## 6.1 Estrutura Oficial

Todas as telas administrativas devem seguir:

    ┌──────────────────────────────────────┐
    │ Título                               │
    ├──────────────────────────────────────┤
    │ Toolbar                              │
    ├──────────────────────────────────────┤
    │ Filtros                              │
    ├─────────────┬────────────────────────┤
    │ Grid        │ Formulário             │
    │             │                        │
    └─────────────┴────────────────────────┘



## 6.2 CrudToolbar

Botões padrão:

* Novo
* Editar
* Excluir
* Duplicar
* Exportar



## 6.3 SearchBox

Pesquisa rápida.

Permite:

* Busca textual
* Busca parcial
* Busca instantânea



## 6.4 DataGrid

Recursos obrigatórios:

* Paginação
* Ordenação
* Filtros
* Seleção
* Pesquisa



## 6.5 Formulários

Abertura:

Modal

Conforme decisão oficial:

Cadastros grandes não utilizarão páginas próprias.



Exemplos:

* Raças
* Classes
* Inimigos
* Personagens



## 6.6 Organização dos Campos

Regra:

Campos relacionados devem ser agrupados por abas.

Exemplo:

Classe

Dados Gerais

Perícias

Proficiências

Equipamentos

Progressão



# CAPÍTULO 7 — MÓDULO MUNDO

## 7.1 Objetivo

Gerenciar toda a estrutura narrativa do mundo.



## 7.2 Mundo

Abas:

### Dados Gerais

Campos:

* Nome
* Imagem
* Descrição



### Lore

Campos:

* História
* Eventos importantes



### Origem

Campos:

* Criação do mundo
* Mitos



### Cosmologia

Campos:

* Planos
* Divindades
* Estrutura cósmica



### Relacionamentos

Campos:

* Religiões
* Facções
* Organizações



## 7.3 Religiões

Abas:

### Dados Gerais

* Nome
* Símbolo
* Descrição



### Dogmas

* Crenças
* Regras



### Relacionamentos

* Mundo



## 7.4 Facções

Abas:

### Dados Gerais

* Nome
* Imagem
* Descrição



### Objetivos

* Objetivos
* Metas



### Relações

* Aliados
* Inimigos



## 7.5 Organizações

Abas:

### Dados Gerais

* Nome
* Imagem
* Descrição



### Relações

* Facção
* Mundo



## 7.6 Lojas

Abas:

### Dados Gerais

* Nome
* Imagem
* Descrição



### Proprietário

* NPC



### Estoque

* Itens
* Preços
* Quantidade



### Localização

* Local



## 7.7 Continentes

Abas:

* Dados Gerais
* História
* Relacionamentos



## 7.8 Reinos

Abas:

* Dados Gerais
* Governança
* História



## 7.9 Cidades

Abas:

* Dados Gerais
* População
* História



## 7.10 Ambientes

Abas:

* Dados Gerais
* Clima
* História



## 7.11 Locais

Abas:

### Dados Gerais

* Nome
* Descrição



### Mapa

* Imagem
* Coordenadas



### Galeria

* Imagens



### História

* Lore local



### Relacionamentos

Exibir automaticamente:

* NPCs
* Lojas
* Missões

Conforme UX oficial.



## 7.12 WorldTree

Visualização oficial:

    Mundo
    └── Continente
    └── Reino
    └── Cidade
    └── Ambiente
    └── Local

Sem painel lateral.

Sem modo mapa.

Sem visualização alternativa.



# CAPÍTULO 8 — BIBLIOTECA RPG

## 8.1 Estrutura Geral

Todas as entidades utilizam:

Grid + Formulário Modal



## 8.2 Idiomas

Abas:

### Dados Gerais

* Nome
* Descrição



## 8.3 Escolas de Magia

Abas:

### Dados Gerais

* Nome
* Descrição



## 8.4 Raças

Abas:

### Dados Gerais

* Nome
* Imagem
* Descrição
* Tamanho
* Deslocamento
* Expectativa de Vida



### Atributos

* Força
* Destreza
* Constituição
* Inteligência
* Sabedoria
* Carisma



### Idiomas

* MultiSelect



### Sentidos

* MultiSelect



### Resistências

* MultiSelect



### Fraquezas

* MultiSelect



### Imunidades

* MultiSelect



### Habilidades

* MultiSelect



### Magias

* MultiSelect



### Sub-Raças Relacionadas

Exibição automática.



## 8.5 Sub-Raças

Abas:

* Dados Gerais
* Atributos
* Idiomas
* Sentidos
* Resistências
* Fraquezas
* Imunidades
* Habilidades
* Magias



## 8.6 Classes

Abas:

### Dados Gerais

* Nome
* Imagem
* Descrição
* Dado de Vida



### Subclasses

Lista vinculada.



### Progressão

Tabela por nível.



### Habilidades

Lista vinculada.



### Magias

Lista vinculada.



## 8.7 Subclasses

Abas:

* Dados Gerais
* Progressão
* Habilidades
* Magias



## 8.8 Habilidades

Abas:

### Dados Gerais

* Nome
* Descrição



### Custos

* Recursos
* Consumo



### Efeitos

* Bônus
* Condições



### Progressão

* Escalonamento



## 8.9 Magias

Abas:

### Dados Gerais

* Nome
* Escola
* Nível



### Conjuração

* Componentes
* Alcance
* Área



### Efeitos

* Dano
* Condições



### Escalonamento

* Progressão por nível



## 8.10 Armas

Abas:

* Dados Gerais
* Combate
* Encantamentos
* Habilidades



## 8.11 Armaduras

Abas:

* Dados Gerais
* Defesa
* Encantamentos
* Habilidades



## 8.12 Itens

Abas:

* Dados Gerais
* Efeitos
* Encantamentos



## 8.13 Encantamentos

Abas:

* Dados Gerais
* Efeitos
* Modificadores
* Restrições



## 8.14 Receitas

Abas:

* Dados Gerais
* Ingredientes
* Resultado
* Requisitos



## 8.15 NPCs

Abas:

* Dados Gerais
* Personalidade
* História
* Facções
* Organizações
* Missões
* Lojas



## 8.16 Inimigos

Abas:

* Dados Gerais
* Atributos
* Resistências
* Fraquezas
* Imunidades
* Habilidades
* Magias
* Equipamentos
* Loot
* XP



# CAPÍTULO 9 — MÓDULO PERSONAGENS

## 9.1 Objetivo

O módulo de personagens é responsável por:

* Criação de personagens
* Aprovação pelo mestre
* Evolução
* Equipamentos
* Inventário
* Histórico



## 9.2 Lista de Personagens

Layout:

Grid + Formulário Modal



Campos Visíveis

* Retrato
* Nome
* Raça
* Classe
* Nível
* Status



Status possíveis

* Vivo
* Morto
* Desaparecido
* Aposentado



Permissões

### Jogador

Visualiza:

* Apenas seus personagens



### Mestre

Visualiza:

* Todos os personagens ligados às campanhas que administra



## 9.3 Cadastro de Personagem

Abertura:

Modal



## 9.4 Ficha de Personagem

Decisão Oficial:

Página Única

Não utilizar abas.

Estrutura:
- Resumo
- Atributos
- Perícias
- Habilidades
- Magias
- Equipamentos
- Inventário
- História

Tudo em scroll vertical.

## 9.5 Seção Resumo

Exibir:

* Retrato
* Nome
* Jogador
* Raça
* Sub-Raça
* Classe
* Subclasse
* Nível
* XP
* HP
* CA
* Status

## 9.6 Seção Atributos

Utiliza:

AttributePanel

Exibir:

* Força
* Destreza
* Constituição
* Inteligência
* Sabedoria
* Carisma

Mostrar:

* Valor
* Modificador

## 9.7 Seção Perícias

Exibir:

* Nome
* Proficiência
* Bônus Final



## 9.8 Seção Habilidades

Utiliza:

SkillPanel



Exibir:

* Nome
* Descrição
* Usos
* Recarga



## 9.9 Seção Magias

Utiliza:

SpellPanel



Exibir:

* Nome
* Escola
* Nível
* Alcance
* Dano



Mostrar também:

Espaços de Magia



## 9.10 Seção Equipamentos

Utiliza:

EquipmentPanel



Exibir:

* Arma Principal
* Arma Secundária
* Armadura
* Escudo
* Acessórios



## 9.11 Seção Inventário

Utiliza:

InventoryGrid



Exibir:

* Item
* Quantidade
* Peso
* Valor



Mostrar:

* Peso Atual
* Peso Máximo



## 9.12 Seção História

Exibir:

* História
* Aparência
* Personalidade



Fluxo:

Jogador cria

↓

Mestre aprova

↓

História oficial



## 9.13 Ficha de Campanha

Visualização complementar.

Exibir:

* Campanha
* XP
* Nível
* HP Atual
* Recursos
* Equipamentos
* Inventário



# CAPÍTULO 10 — MÓDULO CAMPANHAS

## 10.1 Objetivo

Gerenciar campanhas completas.



## 10.2 Lista de Campanhas

Visualização:

CampaignCard



Exibir:

* Imagem
* Nome
* Status
* Participantes



Status:

* Planejamento
* Ativa
* Pausada
* Finalizada



## 10.3 Cadastro de Campanha

Modal



Campos:

* Nome
* Imagem
* Sinopse
* Mundo
* Mestre



## 10.4 Tela da Campanha

Organização oficial:

Abas



Abas:

* Resumo
* Participantes
* Capítulos
* Missões
* Sessões
* Combates
* Anotações



## 10.5 Aba Resumo

Exibir:

* Nome
* Imagem
* Sinopse
* Status
* Mundo
* Mestre



## 10.6 Aba Participantes

Exibir:

* Jogadores
* Personagens



Ações:

* Adicionar
* Remover



## 10.7 Aba Capítulos

Utiliza:

ChapterCard



Exibir:

* Nome
* Ordem
* Descrição



## 10.8 Aba Missões

Utiliza:

MissionCard



Tipos:

* Principal
* Secundária
* Oculta



Exibir:

* Nome
* Status
* Local



## 10.9 Aba Sessões

Utiliza:

SessionCard



Exibir:

* Nome
* Participantes
* Data



Acesso:

* Anotações
* Imagens



## 10.10 Aba Combates

Exibir:

* Nome
* Participantes
* Status



Ações:

* Criar Combate
* Abrir Combate



## 10.11 Aba Anotações

Uso exclusivo do mestre.



Campos:

* Texto Livre
* Imagens
* Observações



## 10.12 Fluxo da Campanha

Criar Campanha

↓

Adicionar Jogadores

↓

Adicionar Personagens

↓

Criar Capítulos

↓

Criar Missões

↓

Criar Sessões

↓

Criar Combates



# CAPÍTULO 11 — MÓDULO COMBATE

## 11.1 Objetivo

O combate é um:

Painel Tático de Consulta Rápida

Não é um sistema automatizado de combate.



## 11.2 Lista de Combates

Exibir:

* Nome
* Campanha
* Participantes
* Status



## 11.3 Tela de Combate

Visualização oficial:

CombatAccordion



Participantes iniciam:

Recolhidos



## 11.4 Modo Compacto

CombatParticipantCard

CombatEnemyCard



Exibir:

* Nome
* HP
* CA
* Quantidade de Status



Exemplo:

Salem

HP: 35/35

CA: 17

Status: 2



## 11.5 Modo Detalhado

Exibir:

* Nome
* HP
* CA
* Status
* Ataques
* Magias
* Habilidades
* Recursos
* Equipamentos
* Resistências
* Fraquezas
* Imunidades



## 11.6 CombatHPControl

Permitir:

* Aplicar Dano
* Aplicar Cura



Modo rápido:

-1

-5

-10

+1

+5

+10



Modo personalizado:

Valor

Aplicar Dano

Aplicar Cura



## 11.7 CombatArmorClassPanel

Exibir:

* CA Atual

Opcional:

* CA Base
* Armadura
* Escudo
* CA Final



## 11.8 CombatStatusPanel

Controle exclusivo do mestre.



Lista Oficial

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



## 11.9 Comportamento Automático

Quando:

HP <= 0

Aplicar automaticamente:

Caído



## 11.10 CombatAttackPanel

Exibir:

* Nome
* Acerto
* Dano
* Tipo



Opcional:

* Munição



## 11.11 CombatSpellPanel

Exibir:

* Nome
* Nível
* Dano
* Alcance
* Área
* CD



## 11.12 CombatSkillPanel

Exibir:

* Nome
* Usos
* Recarga



## 11.13 CombatResourcePanel

Exibir:

* HP
* CA
* Ki
* Fúria
* Espaços de Magia
* Recursos Especiais



## 11.14 CombatEquipmentPanel

Exibir:

* Arma Principal
* Arma Secundária
* Armadura
* Escudo



## 11.15 CombatResistancePanel

Exibir:

Resistências Ativas



## 11.16 CombatWeaknessPanel

Exibir:

Fraquezas Ativas



## 11.17 CombatImmunityPanel

Exibir:

Imunidades Ativas



## 11.18 Busca Tática

Campo:

Pesquisar



Exemplos:

* Bola de Fogo
* Espada Longa
* Fúria



Resultado:

Destacar quem possui o item procurado.



## 11.19 Indicadores Visuais

Destacar:

* HP Baixo
* Caído
* Morto



## 11.20 Permissões

### Mestre

Pode:

* Alterar HP
* Aplicar Cura
* Aplicar Status
* Remover Status
* Encerrar Combate



### Jogador

Pode apenas:

* Consultar



# CAPÍTULO 12 — RESPONSIVIDADE

## 12.1 Objetivo

Garantir que o sistema funcione em diferentes dispositivos sem comprometer a experiência principal.

A prioridade oficial do projeto é:

```text
Desktop First
Tablet Responsivo
Mobile Consulta
```



## 12.2 Desktop

Resolução alvo:

```text
≥ 1280px
```

Experiência Completa.



### Comportamentos

Menu:

```text
Sempre aberto
```



Grid:

```text
Todas as colunas visíveis
```



Formulários:

```text
Grid à esquerda

Formulário à direita
```



Combate:

```text
Modo Completo

Accordion

Painéis Táticos
```



WorldTree:

```text
Exibição Completa
```



## 12.3 Tablet

Faixa:

```text
768px até 1279px
```



### Comportamentos

Menu:

```text
Retrátil
```



Grid:

```text
Colunas reduzidas
```



Formulários:

```text
Priorizar largura
```



Combate:

```text
Modo Compacto por padrão
```



WorldTree:

```text
Exibição simplificada
```



## 12.4 Mobile

Faixa:

```text
Até 767px
```



### Objetivo

Consulta rápida.

Não é ambiente principal de administração.



### Comportamentos

Menu:

```text
Hambúrguer
```



Grid:

```text
Transformado em Cards
```



Formulários:

```text
Limitados
```



Combate:

```text
Consulta apenas
```



Campanhas:

```text
Consulta apenas
```



Personagens:

```text
Consulta completa
```



## 12.5 Componentes Responsivos

Todos os componentes devem adaptar:

```text
Largura

Altura

Fonte

Espaçamento
```

automaticamente.



## 12.6 Prioridade de Conteúdo

Em telas pequenas:

Exibir primeiro:

```text
Nome

HP

CA

Status
```

Ocultar inicialmente:

```text
Detalhes avançados
```



# CAPÍTULO 13 — UX OFICIAL

## 13.1 Home Screen

Tela inicial oficial.

Ao fazer login:

```text
Home Screen
```

Não abrir Dashboard diretamente.



### Elementos

Imagem ilustrativa.

Mensagem de boas-vindas.

Botões rápidos.



Exemplo:

```text
Bem-vindo ao Sistema RPG
```



Atalhos:

```text
Minhas Campanhas

Meus Personagens

Dashboard
```



## 13.2 Perfil Mestre

O Mestre:

```text
Administra campanhas
```

Não é tratado como jogador.



Permissões:

```text
Criar conteúdo

Editar conteúdo

Aprovar personagens

Gerenciar combates
```



## 13.3 Perfil Jogador

Permissões:

```text
Criar personagem

Editar personagem próprio

Consultar campanhas
```



Não pode:

```text
Editar campanha

Editar mundo

Editar biblioteca RPG
```



## 13.4 Personagens

Jogador visualiza:

```text
Somente seus personagens
```



Mestre visualiza:

```text
Todos os personagens
ligados às campanhas
que administra
```



## 13.5 Privacidade

Jogadores:

```text
Não podem visualizar
personagens de outros jogadores
```



## 13.6 Ficha do Personagem

Estrutura oficial:

```text
Página Única
```



Organização:

```text
Resumo

Atributos

Perícias

Habilidades

Magias

Equipamentos

Inventário

História
```



## 13.7 Campanhas

Estrutura oficial:

```text
Abas
```



Abas:

```text
Resumo

Participantes

Capítulos

Missões

Sessões

Combates

Anotações
```



## 13.8 Combate

Ao abrir:

```text
Todos os participantes
recolhidos
```



Motivo:

```text
Reduzir poluição visual
```



## 13.9 Busca Tática

Campo obrigatório.

Permite localizar:

```text
Magias

Ataques

Habilidades

Equipamentos
```



## 13.10 Indicadores Visuais

Sistema deve destacar:

```text
HP Baixo

Caído

Morto
```



## 13.11 Comportamento de HP

Quando:

```text
HP <= 0
```

Aplicar:

```text
Status Caído
```

automaticamente.



## 13.12 WorldTree

Visualização oficial:

```text
Árvore Simples
```



Estrutura:

```text
Mundo

└── Continente

    └── Reino

        └── Cidade

            └── Ambiente

                └── Local
```



## 13.13 Tela de Local

Ao abrir um Local:

Exibir automaticamente:

```text
Descrição

História

Galeria

NPCs

Lojas

Missões
```



## 13.14 Tela de Raça

Exibir automaticamente:

```text
Sub-Raças relacionadas
```



## 13.15 Tela de Classe

Estrutura:

```text
Dados Gerais

Subclasses

Progressão

Habilidades

Magias
```



## 13.16 CRUD

Layout oficial:

```text
Grid à esquerda

Formulário à direita
```



## 13.17 Cadastros Grandes

Utilizar:

```text
Modal
```



Exemplos:

```text
Raças

Classes

Personagens

Inimigos
```



# CAPÍTULO 14 — CATÁLOGO OFICIAL DE COMPONENTES

## 14.1 Componentes de Formulário

```text
Button

TextBox

TextArea

Select

MultiSelect

Checkbox

RadioGroup

DatePicker

NumberStepper
```



## 14.2 Componentes de Mídia

```text
ImageUploader

ImageGallery

Avatar
```



## 14.3 Componentes de Navegação

```text
Tabs

Breadcrumb

Sidebar

Header
```



## 14.4 Componentes CRUD

```text
DataGrid

CrudToolbar

SearchBox

ConfirmDialog

Loading

Toast
```



## 14.5 Componentes RPG

```text
AttributePanel

ResourcePanel

CurrencyPanel

InventoryGrid

EquipmentPanel

SkillPanel

SpellPanel

ProgressionPanel
```



## 14.6 Componentes Mundo

```text
WorldTree

LocationCard
```



## 14.7 Componentes Campanhas

```text
CampaignCard

ChapterCard

MissionCard

SessionCard
```



## 14.8 Componentes Combate

```text
CombatAccordion

CombatParticipantCard

CombatEnemyCard

CombatHPControl

CombatArmorClassPanel

CombatStatusPanel

CombatAttackPanel

CombatSpellPanel

CombatSkillPanel

CombatResourcePanel

CombatEquipmentPanel

CombatResistancePanel

CombatWeaknessPanel

CombatImmunityPanel
```



## 14.9 Componentes Futuros

Reservados para expansão:

```text
MapViewer

Timeline

QuestTracker

LootPanel

CraftingPanel

DiceRollPanel
```



## 14.10 Hierarquia Oficial dos Componentes

```text
Página

└── Seções

    └── Componentes

        └── Subcomponentes
```



Exemplo:

```text
Combate

└── CombatAccordion

    ├── CombatHPControl

    ├── CombatStatusPanel

    ├── CombatAttackPanel

    ├── CombatSpellPanel

    ├── CombatSkillPanel

    └── CombatEquipmentPanel
```



# FECHAMENTO DO DOCUMENTO 04

Arquitetura Visual concluída.

Capítulos:

```text
Capítulo 1 — Filosofia Visual

Capítulo 2 — Layout Mestre

Capítulo 3 — Navegação

Capítulo 4 — Dashboard

Capítulo 5 — Componentes Base

Capítulo 6 — CRUD Padrão

Capítulo 7 — Mundo

Capítulo 8 — Biblioteca RPG

Capítulo 9 — Personagens

Capítulo 10 — Campanhas

Capítulo 11 — Combate

Capítulo 12 — Responsividade

Capítulo 13 — UX Oficial

Capítulo 14 — Catálogo de Componentes
```

Versão:

```text
Documento 04
Arquitetura Visual
v1.0
Status: FECHADO
```
