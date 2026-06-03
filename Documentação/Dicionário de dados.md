**Objetivo:** Padronizar todos os campos do sistema.

Cada campo deverá possuir: 
* Nome
* Tipo
* Obrigatório
* Valor Padrão
* Validação
* Regra de Negócio
* Observações


# CAPÍTULO 1 — PADRÕES GLOBAIS

## DD-001 — ID

    Campo: id
    Tipo: string
    Obrigatório: Sim
    Formato: AAA0001

**Regra:** Único no sistema.

## DD-002 — createdAt

    Tipo: Timestamp
    Obrigatório: Sim

**Regra:** Preenchido automaticamente.

## DD-003 — updatedAt

    Tipo: Timestamp
    Obrigatório: Sim

**Regra:** Atualizado automaticamente.

## DD-004 — imagem

    Tipo: string
    Obrigatório: Não
    Formato: URL
    Validação: Imagem válida.

## DD-005 — galeria

    Tipo: string[]
    Obrigatório: Não
    Formato: Lista de URLs


# CAPÍTULO 2 — ATRIBUTOS

## DD-010 — forca

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 30
    Valor Inicial: Calculado durante a criação do personagem.

## DD-011 — destreza

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 30
    Valor Inicial: Calculado durante a criação do personagem.


## DD-012 — constituicao

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 30
    Valor Inicial: Calculado durante a criação do personagem.

## DD-013 — inteligencia

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 30
    Valor Inicial: Calculado durante a criação do personagem.


## DD-014 — sabedoria

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 30
    Valor Inicial: Calculado durante a criação do personagem.


## DD-015 — carisma

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 30
    Valor Inicial: Calculado durante a criação do personagem.


## DD-016 — modificador

    Tipo: Calculado
    Fórmula: (Atributo - 10) / 2
    Arredondado para baixo.

## DD-017 — Estrutura de Atributos

Os atributos devem armazenar:

    {
        base: number,
        racial: number,
        subRacial: number,
        classe: number,
        equipamento: number,
        magia: number,
        temporario: number,
        total: number
    }
Usar para:

    - Força
    - Destreza
    - Constituicao
    - Inteligencia
    - Sabedoria
    - Carisma

## DD-018 — Cálculo Automático
    Total = Base + Racial + SubRacial + Classe + Equipamento + + Magia + Temporário

## DD-019 — Bônus Temporários

Utilizado para:
- Magias
- Poções
- Habilidades
- Efeitos de Combate
- Eventos

Ao remover o efeito:

    Temporário = 0

e o sistema recalcula o atributo.

# CAPÍTULO 3 — XP E NÍVEIS

## DD-020 — nivel

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 20
    Valor Inicial: 1

## DD-021 — xp

    Tipo: number
    Obrigatório: Sim
    Valor Inicial: 0

**Regra:** Pertence à Ficha de Campanha.

* Não pertence ao Personagem Base.

## DD-022 — Subida de Nível

    Automática: Sim

**Regra:** 
Ao atingir XP necessária: 
* Atualizar nível
* Atualizar recursos
* Atualizar habilidades
* Atualizar magias
* Restaurar HP

## DD-023 — Valores Compostos

Aplica-se a:
- Atributos
- Proficiência
- CA
- HP Máximo
- Deslocamento

Estrutura base:

    {
        base: number,
        racial: number,
        classe: number,
        equipamento: number,
        magia: number,
        temporario: number,
        total: number
    }

## DD-024 — Cálculo dos Valores Compostos
**Regra:**

    Total = Base + Racial + Classe + Equipamento + Magia + Temporário

**Observação:** Nem todos os campos usarão todos os componentes.

Exemplo:

    Proficiência
    {
        base: 2,
        classe: 1,
        equipamento: 0,
        magia: 0,
        temporario: 0,
        total: 3
    }
   
    CA
    {
        base: 10,
        armadura: 4,
        escudo: 2,
        destreza: 2,
        magia: 0,
        temporario: 0,
        total: 18
    }

    HP
    {
        base: 10,
        constituicao: 3,
        classe: 2,
        equipamento: 0,
        magia: 0,
        temporario: 0,
        total: 15
    }

## DD-025 — Progressões Configuráveis
**Regra:** Todo valor composto pode receber progressões vindas de:
- Raça
- Sub-Raça
- Classe
- Subclasse
- Equipamentos
- Magias
- Habilidades
- Efeitos Temporários

# CAPÍTULO 4 — HP E COMBATE

## DD-030 — hpAtual

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0

## DD-031 — hpMaximo

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1

## DD-032 — CA

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0

## DD-033 — HP Zerado

Regra automática: 
    
    Se: 
        HP <= 0

    Então: 
        Status = Caído

## DD-034 — Status de Combate

Valores Permitidos: 
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

# CAPÍTULO 5 — MOEDAS

## DD-040 — moedas

    Tipo: number
    Obrigatório: Sim
    Valor Inicial: 0

Conversão:

    Cobre = 1
    Prata = 10
    Ouro = 100
    Platina = 1000

## DD-041 — Exibição

    Valor interno: 1256
    Exibição: 
        1 Platina
        2 Ouro
        5 Prata
        6 Cobre

# CAPÍTULO 6 — USUÁRIOS

## DD-050 — nome

    Tipo: string
    Obrigatório: Sim
    Mínimo: 3 caracteres
    Máximo: 100 caracteres

## DD-051 — email

    Tipo: string
    Obrigatório: Sim
    Único: Sim
    Formato: [usuario@dominio.com](mailto:usuario@dominio.com)

## DD-052 — foto

    Tipo: string
    Obrigatório: Não
    Formato: URL

## DD-053 — tipo

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - MESTRE
        - JOGADOR

## DD-054 — ativo

    Tipo: boolean
    Obrigatório: Sim
    Valor Inicial: true


# CAPÍTULO 7 — MUNDO

## DD-060 — nome

Aplicável: 
* Mundo
* Religião
* Facção
* Organização
* Continente
* Reino
* Cidade
* Ambiente
* Local

    Tipo: string
    Obrigatório: Sim
    Mínimo: 3 caracteres
    Máximo: 150 caracteres

## DD-061 — descricao
    Tipo: text
    Obrigatório: Sim
    Máximo: 10.000 caracteres

## DD-062 — lore

    Tipo: text
    Obrigatório: Não
    Máximo: 100.000 caracteres

## DD-063 — historia

    Tipo: text
    Obrigatório: Não
    Máximo: 100.000 caracteres

## DD-064 — origem

    Tipo: text
    Obrigatório: Não
    Máximo: 100.000 caracteres

## DD-065 — cosmologia

    Tipo: text
    Obrigatório: Não
    Máximo: 100.000 caracteres

## DD-066 — mundoId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: mundos.id

## DD-067 — continenteId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: continentes.id

## DD-068 — reinoId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: reinos.id

## DD-069 — cidadeId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: cidades.id

## DD-070 — ambienteId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: ambientes.id

## DD-071 — localId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: locais.id


# CAPÍTULO 8 — BIBLIOTECA RPG

## DD-080 — tamanho

    Tipo: enum
    Obrigatório: Sim
    Valores: 
       - MINUSCULO
       - PEQUENO
       - MEDIO
       - GRANDE
       - ENORME
       - COLOSSAL

## DD-081 — deslocamento

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0
Exemplo: 
- 9m
- 12m
- 18m

## DD-082 — expectativaVida

    Tipo: number
    Obrigatório: Não
    Unidade: Anos

## DD-083 — dadoVida

    Tipo: number
    Obrigatório: Sim
Valores Permitidos: 

    4
    6
    8
    10
    12
    20

## DD-084 — idiomasIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: idiomas.id

## DD-085 — sentidosIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: sentidos.id

## DD-086 — resistenciasIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: efeitosCombate.id

## DD-087 — fraquezasIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: efeitosCombate.id

## DD-088 — imunidadesIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: efeitosCombate.id

## DD-089 — habilidadesIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: habilidades.id

## DD-090 — magiasIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: magias.id

# CAPÍTULO 9 — HABILIDADES E MAGIAS

## DD-100 — tipoHabilidade

    Tipo: enum
    Valores: 
        - ATIVA
        - PASSIVA

## DD-101 — recarga

Tipo: enum
Valores: 
    - NENHUMA
    - TURNO
    - DESCANSO_CURTO
    - DESCANSO_LONGO

## DD-102 — usosMaximos

    Tipo: number
    Obrigatório: Não
    Mínimo: 0

## DD-103 — nivelMagia

    Tipo: number
    Obrigatório: Sim
    Valores: 0 a 9

## DD-104 — escolaMagiaId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: escolasMagia.id

## DD-105 — alcance

    Tipo: string
    Obrigatório: Não

Exemplos: 
- Toque

        9m
        18m
        36m

## DD-106 — area

    Tipo: string
    Obrigatório: Não

Exemplos: 

    Cone 6m
    Esfera 9m
    Linha 18m

## DD-107 — componentes

    Tipo: array
    Valores: 
        - V
        - S
        - M

# CAPÍTULO 10 — EQUIPAMENTOS

## DD-120 — peso

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0
    Unidade: Kg

## DD-121 — valor
    Tipo: number
    Obrigatório: Sim
    Mínimo: 0

**Representação:** Valor convertido em cobre

## DD-122 — empilhavel
    Tipo: boolean
    Obrigatório: Sim

## DD-123 — equipado
    Tipo: boolean
    Obrigatório: Sim
    Valor Inicial: false

## DD-124 — quebrado
    Tipo: boolean
    Obrigatório: Sim
    Valor Inicial: false
    Controle: Mestre

## DD-125 — raridade
    Tipo: enum
    Valores: 
        - COMUM
        - INCOMUM
        - RARO
        - EPICO
        - LENDARIO

## DD-126 — tipoDanoId

    Tipo: string
    Obrigatório: Não
    Relacionamento: efeitosCombate.id

## DD-127 — categoriaArma

    Tipo: enum
    Valores: 
        - SIMPLES
        - MARCIAL

## DD-128 — categoriaArmadura

    Tipo: enum
    Valores: 
        - LEVE
        - MEDIA
        - PESADA

# CAPÍTULO 11 — RECEITAS E CRAFTING

## DD-140 — ingredientes

    Tipo: array
    Obrigatório: Sim
    Estrutura: 
        - itemId
        - quantidade

## DD-141 — resultadoTipo
    Tipo: enum
    Valores: 
        - ITEM
        - ARMA
        - ARMADURA

## DD-142 — resultadoQuantidade

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1

## DD-143 — nivelMinimo

    Tipo: number 
    Obrigatório: Não
    Mínimo: 1
    Máximo: 20

## DD-144 — classeId

    Tipo: string
    Obrigatório: Não
    Relacionamento: classes.id

## DD-145 — ferramentaId

    Tipo: string
    Obrigatório: Não
    Relacionamento: proficienciasFerramentas.id

# CAPÍTULO 12 — NPCs E INIMIGOS

## DD-150 — personalidade

    Tipo: text
    Obrigatório: Não
    Máximo: 10.000 caracteres

## DD-151 — faccaoId

    Tipo: string
    Obrigatório: Não
    Relacionamento: faccoes.id

## DD-152 — organizacaoId

    Tipo: string
    Obrigatório: Não
    Relacionamento: organizacoes.id

## DD-153 — missoesIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: missoes.id

## DD-154 — lojasIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: lojas.id

## DD-155 — nivel

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 20

## DD-156 — hpBase

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1

## DD-157 — caBase

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0

## DD-158 — xpConcedida

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0

**Regra:** 
Utilizada para distribuição automática de XP.

## DD-159 — armasIds

    Tipo: array
    Obrigatório: Não
    Relacionamento: armas.id

## DD-160 — lootFixo

    Tipo: array
    Obrigatório: Não
    Estrutura: 
        - itemId
        - quantidade

## DD-161 — lootRolagem

        Tipo: array
        Obrigatório: Não
    Estrutura: 
        - valorMinimo
        - valorMaximo
        - itemId
        - quantidade

## DD-162 — múltiplasInstâncias

**Regra:** 
O mesmo inimigo pode aparecer várias vezes no mesmo combate.

**Exemplo:** 
 - 3 Goblins
 - 5 Esqueletos
 - 2 Lobos

Cada instância possui: 
* HP próprio
* Status próprios
* Controle próprio

# CAPÍTULO 13 — PERSONAGENS

## DD-170 — usuarioId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: usuarios.id

## DD-171 — nomePersonagem

    Tipo: string
    Obrigatório: Sim
    Mínimo: 3 caracteres
    Máximo: 100 caracteres

## DD-172 — racaId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: racas.id

## DD-173 — subRacaId

    Tipo: string
    Obrigatório: Não
    Relacionamento: subRacas.id

## DD-174 — classeId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: classes.id

## DD-175 — subclasseId

    Tipo: string
    Obrigatório: Não
    Relacionamento: subclasses.id

## DD-176 — statusPersonagem

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - VIVO
        - MORTO
        - DESAPARECIDO
        - APOSENTADO

## DD-177 — historia

    Tipo: text
    Obrigatório: Não
    Máximo: 100.000 caracteres

## DD-178 — aparencia

    Tipo: text
    Obrigatório: Não
    Máximo: 20.000 caracteres

## DD-179 — jogadorNome

    Tipo: string
    Obrigatório: Sim

**Regra:** Exibir na ficha do personagem.

## DD-180 — aprovacao

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - PENDENTE
        - APROVADO
        - REPROVADO

## DD-181 — observacaoAprovacao

    Tipo: text
    Obrigatório: Não
    Utilização: Comentários do mestre.

## DD-182 — dataAprovacao

    Tipo: Timestamp
    Obrigatório: Não

## DD-183 — aprovadoPor

    Tipo: string
    Obrigatório: Não
    Relacionamento: usuarios.id

# CAPÍTULO 14 — FICHAS DE CAMPANHA

## DD-190 — campanhaId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: campanhas.id

## DD-191 — nivel

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1
    Máximo: 20
    Valor Inicial: 1

## DD-192 — xp

    Tipo: number

    Obrigatório: Sim

    Valor Inicial: 0

## DD-193 — hpAtual

    Tipo: number
    Obrigatório: Sim

## DD-194 — hpMaximo

    Tipo: number
    Obrigatório: Sim

## DD-195 — caAtual

    Tipo: number
    Obrigatório: Sim

## DD-196 — moedas

    Tipo: number
    Obrigatório: Sim
    Valor Inicial: 0

## DD-197 — statusCombate

    Tipo: array
    Obrigatório: Não
    Valores: Status Oficiais de Combate

## DD-198 — subidaAutomatica

**Regra:** Ao atingir XP necessária: 
- Atualizar Nível
- Adicionar Habilidades
- Adicionar Magias
- Atualizar Recursos
- Restaurar HP

## DD-199 — magiasConhecidas

    Tipo: array
    Obrigatório: Não

**Regra:** Guardar apenas as magias permitidas ao personagem.

## DD-200 — habilidadesConhecidas

    Tipo: array
    Obrigatório: Não

**Regra:** Adicionar automaticamente conforme progressão.

# CAPÍTULO 15 — RECURSOS

## DD-210 — recursoNome
    Tipo: string
    Obrigatório: Sim

## DD-211 — recursoAtual

    Tipo: number
    Obrigatório: Sim

## DD-212 — recursoMaximo

    Tipo: number
    Obrigatório: Sim

## DD-213 — recuperacao

    Tipo: enum

    Valores: 
        - TURNO
        - DESCANSO_CURTO    
        - DESCANSO_LONGO
        - MANUAL

## DD-214 — recuperacaoAutomatica

    Tipo: boolean
    Obrigatório: Sim

## DD-215 — descansoCurto

**Regra:** Pode recuperar recursos específicos.

## DD-216 — descansoLongo

**Regra:** Recupera todos os recursos configurados.

# CAPÍTULO 16 — INVENTÁRIO

## DD-220 — itemTipo

    Tipo: enum
    Valores: 
        - ITEM
        - ARMA
        - ARMADURA

## DD-221 — itemId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: 
        itens.id
            ou
        armas.id
            ou
        armaduras.id

## DD-222 — quantidade

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1

## DD-223 — equipado

    Tipo: boolean
    Obrigatório: Sim

## DD-224 — quebrado

    Tipo: boolean
    Obrigatório: Sim
    Controle: Mestre

## DD-225 — pesoAtual

    Tipo: Calculado
**Regra:** Somatório dos pesos dos itens.

## DD-226 — pesoMaximo

    Tipo: Calculado

**Regra:** Baseado na capacidade de carga do personagem.

## DD-227 — limitePeso

**Regra:** O personagem possui limite de carga.

**Quando ultrapassado:** Aplicar penalidades conforme regras do sistema.

## DD-228 — equipamentos

    Estrutura: 
        Arma Principal
        Arma Secundária
        Armadura
        Escudo

## DD-229 — movimentação de inventário

**Regra:** 
Todo item recebido por: 
- Loot
- Compra
- Crafting
- Recompensa

deve atualizar automaticamente o inventário da ficha.

# CAPÍTULO 17 — CAMPANHAS

## DD-230 — nomeCampanha

    Tipo: string
    Obrigatório: Sim
    Mínimo: 3 caracteres
    Máximo: 150 caracteres

## DD-231 — imagemCampanha

    Tipo: string
    Obrigatório: Não
    Formato: URL

## DD-232 — sinopse

    Tipo: text
    Obrigatório: Sim
    Máximo: 20.000 caracteres

## DD-233 — mundoId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: mundos.id

## DD-234 — mestreId

    Tipo: string
    Obrigatório: Sim
    Relacionamento: usuarios.id

## DD-235 — statusCampanha

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - PLANEJAMENTO
        - ATIVA
        - PAUSADA
        - FINALIZADA

## DD-236 — participantes

    Tipo: array
    Obrigatório: Não
    Relacionamento: campanhaParticipantes

## DD-237 — multiplosMundos

**Regra:** Uma campanha pertence a um único mundo.

# CAPÍTULO 18 — # CAPÍTULOS

## DD-240 — ordem

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1

## DD-241 — nomeCapitulo

    Tipo: string
    Obrigatório: Sim
    Máximo: 150 caracteres

## DD-242 — descricaoCapitulo

    Tipo: text
    Obrigatório: Não

## DD-243 — cronologia

**Regra:** devem possuir ordem cronológica.


# CAPÍTULO 19 — MISSÕES

## DD-250 — tipoMissao

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - PRINCIPAL
        - SECUNDARIA
        - OCULTA

## DD-251 — xpRecompensa

    Tipo: number
    Obrigatório: Sim
    Mínimo: 0

## DD-252 — statusMissao

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - DISPONIVEL
        - EM_ANDAMENTO
        - CONCLUIDA
        - FALHADA

## DD-253 — localRelacionado

    Tipo: string
    Obrigatório: Não
    Relacionamento: locais.id

## DD-254 — reutilizacao

**Regra:** Missões são globais.

Podem ser reutilizadas em várias campanhas.

## DD-255 — alteraçãoGlobal

**Regra:** Alterar missão altera todas as campanhas vinculadas.


# CAPÍTULO 20 — SESSÕES

## DD-260 — numeroSessao

    Tipo: number
    Obrigatório: Sim
    Mínimo: 1

## DD-261 — tituloSessao

    Tipo: string
    Obrigatório: Sim
    Máximo: 150 caracteres

## DD-262 — dataSessao

    Tipo: Timestamp
    Obrigatório: Sim

## DD-263 — xpSessao

    Tipo: number
    Obrigatório: Não
    Mínimo: 0

## DD-264 — observacoesMestre

    Tipo: text
    Obrigatório: Não

Uso exclusivo do Mestre.

## DD-265 — participantesSessao

    Tipo: array
    Obrigatório: Não
    Relacionamento: sessaoParticipantes

## DD-266 — imagensSessao

    Tipo: array
    Obrigatório: Não
    Relacionamento: sessaoImagens

## DD-267 — anotacoesSessao

    Tipo: array
    Obrigatório: Não
    Relacionamento: sessaoAnotacoes

# CAPÍTULO 21 — COMBATES

## DD-270 — nomeCombate

    Tipo: string
    Obrigatório: Sim
    Máximo: 150 caracteres

## DD-271 — statusCombate

    Tipo: enum
    Obrigatório: Sim
    Valores: 
        - ABERTO
        - ENCERRADO

## DD-272 — xpTotal

    Tipo: number
    Obrigatório: Sim
    Valor Inicial: 0

## DD-273 — participantesCombate

    Tipo: array
    Obrigatório: Não
    Relacionamento: combateParticipantes

## DD-274 — inimigosCombate

    Tipo: array
    Obrigatório: Não
    Relacionamento: combateInimigos

## DD-275 — hpInicial

    Tipo: number
    Obrigatório: Sim

## DD-276 — hpFinal

    Tipo: number
    Obrigatório: Sim

## DD-277 — caido

    Tipo: boolean
    Obrigatório: Sim

## DD-278 — morto

    Tipo: boolean
    Obrigatório: Sim

## DD-279 — statusCombateAtivos

    Tipo: array
    Obrigatório: Não
    Valores: Lista Oficial de Status

## DD-280 — buscaTatica

**Regra:** Permite localizar: 
- Magias
- Habilidades
- Equipamentos
- Ataques

durante o combate.

## DD-281 — encerramentoCombate

**Regra:** Ao encerrar: 
- Distribuir XP
- Distribuir Loot
- Salvar HP Final
- Verificar Subida de Nível
- Restaurar HP dos que subiram

# CAPÍTULO 22 — LOOT

## DD-290 — lootFixo

    Tipo: array
    Obrigatório: Não

## DD-291 — lootRolagem

    Tipo: array
    Obrigatório: Não
    Estrutura: 
        - valorMinimo
        - valorMaximo
        - itemId
        - quantidade

## DD-292 — resultadoLoot

    Tipo: array
    Obrigatório: Não

**Regra:** Guardar apenas loot efetivamente recebido.

## DD-293 — distribuicaoLoot

**Regra:** Controle manual do Mestre.

# CAPÍTULO 23 — RELATÓRIOS


## DD-300 — relatorioCampanhas

    Exibe: 
    - Campanhas
    - Sessões
    - Combates
    - Participantes

## DD-301 — relatorioPersonagens

    Exibe: 
    - Nível
    - XP
    - Equipamentos
    - Inventário

## DD-302 — relatorioCombates

    Exibe: 
    - Participantes
    - Inimigos
    - XP
    - Loot

## DD-303 — exportacao

    Formatos: 
    - Excel
    - CSV


# CAPÍTULO 24 — LOGS E AUDITORIA

## DD-310 — usuarioLog

    Relacionamento: usuarios.id

## DD-311 — tipoLog

    Valores: 
        - CRIACAO
        - EDICAO
        - EXCLUSAO
        - APROVACAO
        - COMBATE
        - SUBIDA_NIVEL

## DD-312 — entidade

Exemplos:

    - Personagem
    - Campanha
    - Missão
    - Combate

## DD-313 — entidadeId

    Relacionamento: Registro alterado.

## DD-314 — descricao

    Tipo: text
    Obrigatório: Sim

## DD-315 — auditoria

**Regra:** 
Registrar: 
    Criação
    Edição
    Exclusão
    Aprovação
    Subida de Nível


# CAPÍTULO 25 — REGRAS AUTOMÁTICAS DO SISTEMA

## DD-320 — HP Zero

**Regra:** 

    HP <= 0
        ↓
    Aplicar Status: CAÍDO

## DD-321 — XP

**Regra:** XP concedida pelos inimigos derrotados.

## DD-322 — Subida de Nível

**Regra:** Automática.

## DD-323 — Atualização de Recursos

**Regra:** Ao subir de nível.

## DD-324 — Atualização de Habilidades

**Regra:** Automática conforme progressão.

## DD-325 — Atualização de Magias

**Regra:** Automática conforme progressão.

## DD-326 — Recuperação de HP

**Regra:** Ao subir de nível: Restaurar HP Total.

## DD-327 — Crafting

**Regra:** 
    Consumir ingredientes.
        ↓
    Gerar resultado. A
        ↓
    Atualizar inventário.

## DD-328 — Aprovação

**Regra:** 
    Alteração de personagem aprovado: 
        ↓
    Pendente Aprovação.

## DD-329 — Controle de Peso

**Regra:** Peso calculado automaticamente.

## DD-330 — Controle de Moedas

**Regra:** Armazenamento único.

Conversão automática para exibição.

## DD-331 — Status de Combate

**Regra:** Aplicação e remoção controladas pelo Mestre.

## DD-332 — Equipamentos Quebrados

**Regra:** Marcados manualmente pelo Mestre.

## DD-333 — Descanso Curto

**Regra:** Recupera recursos configurados.

## DD-334 — Descanso Longo

**Regra:** Recupera recursos configurados.

## DD-335 — Progressão

**Regra:** Baseada em D&D 5e Adaptado.

Nível máximo: 
20