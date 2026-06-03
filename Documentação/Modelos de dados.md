
# CAPÍTULO 1 — CONVENÇÕES GERAIS
## 1.1 Padrão de IDs
 - Todas as entidades utilizam ID próprio.

Exemplos:

        USR0001
        MND0001
        REL0001
        FAC0001
        ORG0001
        CNT0001
        REI0001
        CID0001
        AMB0001
        LOC0001

        RAC0001
        SRC0001
        CLS0001
        SCL0001
        
        HAB0001
        MAG0001
        
        ARM0001
        ARD0001        
        ITM0001
        ENC0001
        
        NPC0001
        INI0001
                
        PER0001        
        FCP0001

        CAM0001
        CAP0001
        MIS0001
        SES0001
        COM0001


## 1.2 Datas
 - Todos os documentos possuem:
    - createdAt: Timestamp
    - updatedAt: Timestamp

## 1.3 Imagens
 - Imagem principal:
    imagem: string (URL)

 - Galeria:
    galeria: string[]

## 1.4 Logs
 - Toda alteração relevante gera registro em:
    logs

## 1.5 Moedas
 - Armazenamento único.
    moedas: number
 - Conversão:
    - Cobre = 1
    - Prata = 10
    - Ouro = 100
    - Platina = 1000
   
# CAPÍTULO 2 — CORE
 - usuarios
    - id: string
    - nome: string
    - email: string
    - foto: string
    - tipo:
        - "MESTRE"
        - "JOGADOR"
    - ativo: boolean
    - createdAt
    - updatedAt
 - logs
    - id: string
    - usuarioId: string
    - tipo: string
    - descricao: string
    - entidade: string
    - entidadeId: string
    - createdAt
    - Tipos:
        - CRIACAO
        - EDICAO
        - EXCLUSAO
        - APROVACAO
        - COMBATE
        - SUBIDA_NIVEL
 - configuracoes
    - id: string
    - nomeSistema: string
    - versao: string
    - idiomaPadrao: string

# CAPÍTULO 3 — MUNDO
- mundos
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - lore: string
    - origem: string
    - cosmologia: string
    - createdAt
    - updatedAt
    
- religioes
    - id: string
    - mundoId: string
    - nome: string
    - simbolo: string
    - descricao: string
    - dogmas: string
    - createdAt
    - updatedAt

- faccoes
    - id: string
    - mundoId: string
    - nome: string
    - imagem: string
    - descricao: string
    - objetivos: string
    - aliadosIds: string[]
    - inimigosIds: string[]
    - createdAt
    - updatedAt

- organizacoes
    - id: string
    - mundoId: string
    - faccaoId: string | null
    - nome: string
    - imagem: string
    - descricao: string
    - createdAt
    - updatedAt

- continentes
    - id: string
    - mundoId: string
    - nome: string
    - imagem: string
    - descricao: string
    - historia: string
    - createdAt
    - updatedAt

- reinos
    - id: string
    - continenteId: string
    - nome: string
    - imagem: string
    - descricao: string
    - governanca: string
    - historia: string
    - createdAt
    - updatedAt

- cidades
    - id: string
    - reinoId: string
    - nome: string
    - imagem: string
    - descricao: string
    - populacao: string
    - historia: string
    - createdAt
    - updatedAt

- ambientes
    - id: string
    - cidadeId: string
    - nome: string
    - descricao: string
    - clima: string
    - historia: string
    - createdAt
    - updatedAt

- locais
    - id: string
    - ambienteId: string
    - nome: string
    - descricao: string
    - historia: string
    - galeria: string[]
    - createdAt
    - updatedAt

- lojas
    - id: string
    - localId: string
    - npcId: string
    - nome: string
    - imagem: string
    - descricao: string
    - moedasAceitas: boolean
    - createdAt
    - updatedAt

- lojaItens
    - id: string
    - lojaId: string
    - itemId: string
    - preco: number
    - quantidade: number
    - disponivel: boolean

# CAPÍTULO 4 — BIBLIOTECA RPG
 - idiomas
    - id: string
    - nome: string
    - descricao: string

 - escolasMagia
    - id: string
    - nome: string
    - descricao: string
 
 - pericias
    - id: string
    - nome: string
    - atributoBase: string
    - descricao: string

 - sentidos
    - id: string
    - nome: string
    - descricao: string

 - efeitosCombate
    - id: string
    - nome: string
    - descricao: string
    Exemplos:
        Fogo
        Gelo
        Veneno
        Radiante
        Necrótico
        Contundente
        Perfurante
        Cortante

 - proficienciasArmas
    - id: string
    - nome: string
    - descricao: string

 - proficienciasArmaduras
    - id: string
    - nome: string
    - descricao: string

 - proficienciasFerramentas
    - id: string
    - nome: string
    - descricao: string
 
 - proficienciasInstrumentos
    - id: string
    - nome: string
    - descricao: string

 - racas
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - tamanho: string
    - deslocamento: number
    - expectativaVida: number
    - forca: number
    - destreza: number
    - constituicao: number
    - inteligencia: number
    - sabedoria: number
    - carisma: number
    - idiomasIds: string[]
    - sentidosIds: string[]
    - resistenciasIds: string[]
    - fraquezasIds: string[]
    - imunidadesIds: string[]
    - habilidadesIds: string[]
    - magiasIds: string[]
 
 - subRacas
    - id: string
    - racaId: string
    - nome: string
    - descricao: string
    - forca: number
    - destreza: number
    - constituicao: number
    - inteligencia: number
    - sabedoria: number
    - carisma: number
    - habilidadesIds: string[]
    - magiasIds: string[]

 - classes
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - dadoVida: number
    - nivelMaximo: 20

 - subclasses
    - id: string
    - classeId: string
    - nome: string
    - descricao: string

 - habilidades
    - id: string
    - nome: string
    - descricao: string
    - nivelMinimo: number
    - tipo:
        - "ATIVA"
        - "PASSIVA"
    - recarga:
        - "NENHUMA"
        - "TURNO"
        - "DESCANSO_CURTO"
        - "DESCANSO_LONGO"
    - usosMaximos: number
    - possuiEscalonamento: boolean
    - escalonamento: string
    - createdAt
    - updatedAt

 - magias
    - id: string
    - nome: string
    - descricao: string
    - escolaMagiaId: string
    - nivel: number
    - tempoConjuracao: string
    - alcance: string
    - area: string
    - componentes: string[]
    - duracao: string
    - dano: string
    - cdBase: number
    - possuiEscalonamento: boolean
    - escalonamento: string
    - createdAt
    - updatedAt

 - armas
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - tipo:
        - "CORPO_A_CORPO"
        - "DISTANCIA"
    - categoria:
        - "SIMPLES"
        - "MARCIAL"
    - dano: string
    - tipoDanoId: string
    - alcance: string
    - peso: number
    - valor: number
    - habilidadesIds: string[]
    - encantamentosIds: string[]
    - createdAt
    - updatedAt

 - armaduras
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - categoria:
        - "LEVE"
        - "MEDIA"
        - "PESADA"
    - caBase: number
    - permiteDestreza: boolean
    - limiteDestreza: number
    - peso: number
    - valor: number
    - encantamentosIds: string[]
    - createdAt
    - updatedAt

 - itens
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - tipo:
        - "CONSUMIVEL"
        - "MATERIAL"
        - "QUEST"
        - "TESOURO"
        - "OUTRO"
    - peso: number
    - valor: number
    - empilhavel: boolean
    - efeito: string
    - encantamentosIds: string[]
    - createdAt
    - updatedAt

 - encantamentos
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - raridade:
        - "COMUM"
        - "INCOMUM"
        - "RARO"
        - "EPICO"
        - "LENDARIO"
    - tipo:
        - "ARMA"
        - "ARMADURA"
        - "ITEM"
    - efeitos: string
    - modificadores: string
    - habilidadesIds: string[]
    - magiasIds: string[]
    - restricoes: string
    - valor: number
    - createdAt
    - updatedAt

 - receitas
    - id: string
    - nome: string
    - descricao: string
    - ingredientes: 
        [
            {
                itemId: string,
                quantidade: number
            }
        ]
    - resultadoTipo:
        - "ITEM"
        - "ARMA"
        - "ARMADURA"
    - resultadoId: string
    - resultadoQuantidade: number
    - nivelMinimo: number
    - classeId: string | null
    - ferramentaId: string | null
    - createdAt
    - updatedAt

 - npcs
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - personalidade: string
    - historia: string
    - localId: string
    - faccaoId: string | null
    - organizacaoId: string | null
    - missoesIds: string[]
    - lojasIds: string[]
    - createdAt
    - updatedAt
 - inimigos
    - id: string
    - nome: string
    - imagem: string
    - descricao: string
    - nivel: number
    - forca: number
    - destreza: number
    - constituicao: number
    - inteligencia: number
    - sabedoria: number
    - carisma: number
    - hpBase: number
    - caBase: number
    - deslocamento: number
    - resistenciasIds: string[]
    - fraquezasIds: string[]
    - imunidadesIds: string[]
    - habilidadesIds: string[]
    - magiasIds: string[]
    - armasIds: string[]
    - xpConcedida: number
    - createdAt
    - updatedAt

 - inimigoLootFixo
    - id: string
    - inimigoId: string
    - itemId: string
    - quantidade: number

 - inimigoLootRolagem
    - id: string
    - inimigoId: string
    - itemId: string
    - valorMinimo: number
    - valorMaximo: number
    - quantidade: number

# CAPÍTULO 5 — PERSONAGENS
 - personagens
    - id: string
    - usuarioId: string
    - nome: string
    - imagem: string
    - historia: string
    - aparencia: string
    - personalidade: string
    - racaId: string
    - subRacaId: string | null
    - classeId: string
    - subclasseId: string | null
    - status:
        - "VIVO"
        - "MORTO"
        - "DESAPARECIDO"
        - "APOSENTADO"
    - forca: number
    - destreza: number
    - constituicao: number
    - inteligencia: number
    - sabedoria: number
    - carisma: number
    - idiomasIds: string[]
    - sentidosIds: string[]
    - createdAt
    - updatedAt

 - personagensAprovacoes
    - id: string
    - personagemId: string
    - status:
        - "PENDENTE"
        - "APROVADO"
        - "REPROVADO"
    - observacao: string
    - aprovadoPor: string

 - fichasCampanha
    - id: string
    - personagemId: string
    - campanhaId: string
    - nivel: number
    - xp: number
    - hpAtual: number
    - hpMaximo: number
    - caAtual: number
    - moedas: number
    - statusIds: string[]
    - createdAt
    - updatedAt

 - fichaRecursos
    - id: string
    - fichaCampanhaId: string
    - nome: string
    - atual: number
    - maximo: number
    
    Exemplos:
        - Ki
        - Fúria
        - Canalizar Divindade
        - Pontos de Feitiçaria

 - fichaMagias
    - id: string
    - fichaCampanhaId: string
    - magiaId: string

 - fichaHabilidades
    - id: string
    - fichaCampanhaId: string
    - habilidadeId: string

 - fichaInventario
    - id: string
    - fichaCampanhaId: string
    - itemTipo:
        - "ITEM"
        - "ARMA"
        - "ARMADURA"
    - itemId: string
    - quantidade: number
    - equipado: boolean
    - quebrado: boolean

 - fichaEquipamentos
    - id: string
    - fichaCampanhaId: string
    - armaPrincipalId: string | null
    - armaSecundariaId: string | null
    - armaduraId: string | null
    - escudoId: string | null

# CAPÍTULO 6 — CAMPANHAS
 - campanhas
    - id: string
    - nome: string
    - imagem: string
    - sinopse: string
    - mundoId: string
    - mestreId: string
    - status:
        - "PLANEJAMENTO"
        - "ATIVA"
        - "PAUSADA"
        - "FINALIZADA"
    - createdAt
    - updatedAt

 - campanhaParticipantes
    - id: string
    - campanhaId: string
    - usuarioId: string
    - personagemId: string
    - createdAt

 - capitulos
    - id: string
    - campanhaId: string
    - nome: string
    - ordem: number
    - descricao: string
    - createdAt
    - updatedAt

 - missoes
    - id: string
    - nome: string
    - descricao: string
    - tipo:
        - "PRINCIPAL"
        - "SECUNDARIA"
        - "OCULTA"
    - localId: string | null
    - xpRecompensa: number
    - createdAt
    - updatedAt

 - campanhaMissoes
    - id: string
    - campanhaId: string
    - missaoId: string
    - status:
        - "DISPONIVEL"
        - "EM_ANDAMENTO"
        - "CONCLUIDA"
        - "FALHADA"

 - sessoes
    - id: string
    - campanhaId: string
    - capituloId: string | null
    - numeroSessao: number
    - titulo: string
    - descricao: string
    - dataSessao: Timestamp
    - xpSessao: number
    - observacoesMestre: string
    - createdAt: Timestamp
    - updatedAt: Timestamp

 - sessaoParticipantes
    - id: string
    - sessaoId: string
    - usuarioId: string
    - personagemId: string
    - presente: boolean

 - sessaoImagens
    - id: string
    - sessaoId: string
    - imagem: string
    - descricao: string

 - sessaoAnotacoes
    - id: string
    - sessaoId: string
    - titulo: string
    - conteudo: string
    - ordem: number

# CAPÍTULO 7 — COMBATES
 - combates
    - id: string
    - campanhaId: string
    - sessaoId: string | null
    - nome: string
    - descricao: string
    - status:
        - "ABERTO"
        - "ENCERRADO"
    - xpTotal: number
    - createdAt: Timestamp
    - updatedAt: Timestamp

 - combateParticipantes
    - id: string
    - combateId: string
    - fichaCampanhaId: string
    - hpInicial: number
    - hpAtual: number
    - caAtual: number
    - caido: boolean
    - morto: boolean

 - combateParticipanteStatus
    - id: string
    - combateParticipanteId: string
    - status:
        - "AGARRADO"
        - "AMEDRONTADO"
        - "ATORDOADO"
        - "CAIDO"
        - "CEGO"
        - "ENFEITICADO"
        - "ENVENENADO"
        - "EXAUSTO"
        - "INCAPACITADO"
        - "INCONSCIENTE"
        - "INVISIVEL"
        - "PARALISADO"
        - "PETRIFICADO"
        - "RESTRITO" 
        - "SURDO"

 - combateInimigos
    - id: string
    - combateId: string
    - inimigoId: string
    - nomeExibicao: string
    - hpInicial: number
    - hpAtual: number
    - caAtual: number
    - caido: boolean
    - morto: boolean

 - combateInimigoStatus
    - id: string
    - combateInimigoId: string
    - status:
        - "AGARRADO"
        - "AMEDRONTADO"
        - "ATORDOADO"
        - "CAIDO"
        - "CEGO"
        - "ENFEITICADO"
        - "ENVENENADO"
        - "EXAUSTO"
        - "INCAPACITADO"
        - "INCONSCIENTE"
        - "INVISIVEL"
        - "PARALISADO"
        - "PETRIFICADO"
        - "RESTRITO"
        - "SURDO"

 - combateXP
    - id: string
    - combateId: string
    - fichaCampanhaId: string
    - xpRecebida: number

 - combateLoot
    - id: string
    - combateId: string
    - fichaCampanhaId: string
    - itemTipo:
        - "ITEM"
        - "ARMA"
        - "ARMADURA"
    - itemId: string
    - quantidade: number
 
 - combateResultado
    - id: string
    - combateId: string
    - fichaCampanhaId: string
    - hpFinal: number
    - xpRecebida: number

# CAPÍTULO 8 — RELACIONAMENTOS
## Hierarquia Geográfica
    Mundo
    └── Continente
        └── Reino
            └── Cidade
                └── Ambiente
                    └── Local

 - Relacionamentos:
    mundos
        1:N continentes

    continentes
        1:N reinos

    reinos
        1:N cidades

    cidades
        1:N ambientes

    ambientes
        1:N locais

## Raças
    Raça
        1:N Sub-Raças

## Classes
    Classe
        1:N Subclasses

## Personagem
    Personagem
        1:N Fichas de Campanha

## Campanha
    Campanha
        1:N Participantes

    Campanha
        1:N Sessões

    Campanha
        1:N Combates

    Campanha
        N:N Missões

## NPCs
    NPC
        N:1 Local

    NPC
        N:1 Facção

    NPC
        N:1 Organização




## Lojas
    Loja
        N:1 Local

    Loja
        N:1 NPC

    Loja
        N:N Itens

## Combates
    Combate
        1:N Participantes

    Combate
        1:N Inimigos

    Combate
        1:N Loot

    Combate
        1:N XP

# CAPÍTULO 9 — ÍNDICES FIRESTORE
 - campanhas
    - mestreId + status
    - status
    - nome

 - personagens
    - usuarioId
    - nome
    - status

 - fichasCampanha
    - text
    - personagemId
    - campanhaId
    - nivel
    - xp

 - missoes
    - tipo
    - nome

 - npcs
    - localId
    - faccaoId
    - organizacaoId

 - locais
    - ambienteId
    - nome

 - inimigos
    - nome
    - nivel

 - combates
    - campanhaId
    - status

# CAPÍTULO 10 — PADRÕES DE CONSULTA

## Buscar Personagens do Jogador
    where("usuarioId", "==", usuarioId)

## Buscar Campanhas do Mestre
    where("mestreId", "==", mestreId)

## Buscar Locais de um Ambiente
    where("ambienteId", "==", ambienteId)

## Buscar Sub-Raças
    where("racaId", "==", racaId)

## Buscar Subclasses
    where("classeId", "==", classeId)

## Buscar Combates da Campanha
    where("campanhaId", "==", campanhaId)

# CAPÍTULO 11 — REGRAS DE PERFORMANCE

## Evitar
    - Documentos gigantes.

## Preferir
    - Tabelas auxiliares.

## Não armazenar
    - Histórico completo de combate
    - Logs de rodada
    - Ações individuais

## Armazenar apenas
    - XP
    - Loot
    - HP Final