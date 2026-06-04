Com base nos Documentos 01 a 12, eu não pensaria apenas em ícones de tela. Eu montaria uma **biblioteca oficial de ícones do sistema**, porque eles aparecerão em:

```text
Menu
CRUD
Biblioteca RPG
Mundo
Personagens
Campanhas
Combates
Relatórios
Status
Ações
```

Se você fizer isso agora, evita trocar ícones em 200 telas depois.

---

# 1. SISTEMA

| Entidade      | Ícone      |
| ------------- | ---------- |
| Dashboard     | Home       |
| Configurações | Settings   |
| Perfil        | User       |
| Notificações  | Bell       |
| Pesquisa      | Search     |
| Logs          | ScrollText |
| Relatórios    | BarChart3  |

---

# 2. MUNDO

| Entidade    | Ícone     |
| ----------- | --------- |
| Mundo       | Globe     |
| Continente  | Earth     |
| Reino       | Crown     |
| Cidade      | Building2 |
| Ambiente    | Trees     |
| Local       | MapPin    |
| Religião    | Church    |
| Facção      | Flag      |
| Organização | Shield    |

---

# 3. BIBLIOTECA RPG

| Entidade         | Ícone         |
| ---------------- | ------------- |
| Biblioteca RPG   | Library       |
| Idiomas          | Languages     |
| Sentidos         | Eye           |
| Perícias         | Target        |
| Proficiências    | Award         |
| Escolas de Magia | Sparkles      |
| Raças            | Users         |
| Sub-Raças        | UserRound     |
| Classes          | BookUser      |
| Subclasses       | GraduationCap |
| Habilidades      | Zap           |
| Magias           | WandSparkles  |
| Encantamentos    | Stars         |
| Itens            | Package       |
| Armas            | Swords        |
| Armaduras        | ShieldHalf    |
| Receitas         | Scroll        |
| NPCs             | UserCog       |
| Inimigos         | Skull         |

---

# 4. PERSONAGENS

| Entidade      | Ícone       |
| ------------- | ----------- |
| Personagens   | UserRound   |
| Ficha         | FileUser    |
| Atributos     | Activity    |
| Perícias      | Target      |
| Proficiências | Award       |
| Equipamentos  | Backpack    |
| Inventário    | PackageOpen |
| História      | BookOpen    |
| Progressão    | TrendingUp  |

---

# 5. ATRIBUTOS

| Atributo     | Ícone      |
| ------------ | ---------- |
| Força        | Dumbbell   |
| Destreza     | Hand       |
| Constituição | HeartPulse |
| Inteligência | Brain      |
| Sabedoria    | Eye        |
| Carisma      | Crown      |

---

# 6. RECURSOS

| Recurso    | Ícone      |
| ---------- | ---------- |
| HP         | Heart      |
| Mana       | Droplets   |
| Ki         | Flame      |
| Fúria      | Axe        |
| Inspiração | Star       |
| XP         | Trophy     |
| Nível      | TrendingUp |
| CA         | Shield     |

---

# 7. CAMPANHAS

| Entidade      | Ícone       |
| ------------- | ----------- |
| Campanhas     | Map         |
| Participantes | Users       |
| Capítulos     | BookMarked  |
| Missões       | ScrollText  |
| Sessões       | Calendar    |
| Galeria       | Images      |
| Anotações     | NotebookPen |

---

# 8. COMBATE

| Entidade    | Ícone         |
| ----------- | ------------- |
| Combate     | CrossedSwords |
| Iniciativa  | Timer         |
| Turno       | PlayCircle    |
| Ataques     | Sword         |
| Magias      | WandSparkles  |
| Habilidades | Zap           |
| Loot        | Coins         |
| XP          | Trophy        |
| Status      | CircleAlert   |

---

# 9. STATUS DE COMBATE

Eu faria ícones próprios para cada status.

| Status       | Ícone       |
| ------------ | ----------- |
| Agarrado     | Handshake   |
| Amedrontado  | Ghost       |
| Atordoado    | Stars       |
| Caído        | ArrowDown   |
| Cego         | EyeOff      |
| Enfeitiçado  | Sparkles    |
| Envenenado   | Skull       |
| Exausto      | BatteryLow  |
| Incapacitado | Ban         |
| Inconsciente | Bed         |
| Invisível    | ScanLine    |
| Paralisado   | PauseCircle |
| Petrificado  | Mountain    |
| Restrito     | Link        |
| Surdo        | EarOff      |

---

# 10. LOOT E ECONOMIA

| Entidade | Ícone           |
| -------- | --------------- |
| Platina  | Coins           |
| Ouro     | Coins           |
| Prata    | Coins           |
| Cobre    | Coins           |
| Peso     | Weight          |
| Valor    | BadgeDollarSign |
| Comércio | Store           |

---

# 11. CRUD

| Ação     | Ícone    |
| -------- | -------- |
| Novo     | Plus     |
| Editar   | Pencil   |
| Excluir  | Trash2   |
| Duplicar | Copy     |
| Salvar   | Save     |
| Cancelar | X        |
| Exportar | Download |
| Importar | Upload   |
| Aprovar  | Check    |
| Reprovar | CircleX  |

---

# 12. MENU OFICIAL

Se eu fosse desenhar o menu agora, ele ficaria:

```text
🏠 Dashboard

🌍 Mundo
 ├── 🌎 Mundos
 ├── 👑 Reinos
 ├── 🏙️ Cidades
 ├── ⛪ Religiões
 ├── 🚩 Facções
 └── 🛡️ Organizações

📚 Biblioteca RPG
 ├── 🗣️ Idiomas
 ├── 👁️ Sentidos
 ├── 🎯 Perícias
 ├── 🏅 Proficiências
 ├── ✨ Magias
 ├── 👥 Raças
 ├── 🎓 Classes
 ├── ⚡ Habilidades
 ├── 📦 Itens
 ├── ⚔️ Armas
 ├── 🛡️ Armaduras
 ├── 🤖 NPCs
 └── ☠️ Inimigos

👤 Personagens

🗺️ Campanhas

⚔️ Combates

📊 Relatórios

⚙️ Configurações
```

Minha recomendação é padronizar tudo usando a biblioteca Lucide (Lucide React), porque ela já possui praticamente todos esses ícones, funciona perfeitamente com Next.js e mantém um visual consistente em todo o sistema.
