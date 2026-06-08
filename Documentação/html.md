**Objetivo:** Padronizar a estrutura HTML de todos os componentes e páginas do sistema.

# CAPÍTULO 1 — ESTRUTURA SEMÂNTICA BASE

## 1.1 Layout Principal
O layout mestre deve seguir a estrutura semântica padrão do HTML5 para garantir acessibilidade e SEO.

```html
<div class="app-container">
  <header>
    <!-- Logo, Pesquisa, Perfil -->
  </header>
  
  <div class="body-wrapper">
    <aside>
      <!-- Menu Lateral -->
    </aside>
    
    <main>
      <!-- Conteúdo da Página -->
    </main>
  </div>
  
  <footer>
    <!-- Informações do Sistema -->
  </footer>
</div>
```

## 1.2 Estrutura de Página (ContentContainer)
Cada página dentro do `main` deve seguir uma hierarquia de títulos clara.

```html
<section class="page-container">
  <nav aria-label="Breadcrumb">
    <!-- Breadcrumb -->
  </nav>

  <header class="page-header">
    <h1>Título da Página</h1>
  </header>

  <div class="page-content">
    <!-- Seções e Componentes -->
  </div>
</section>
```

---

# CAPÍTULO 2 — COMPONENTES CRUD

## 2.1 Toolbar (CrudToolbar)
Deve utilizar elementos de ação claros e agrupados.

```html
<div class="crud-toolbar" role="toolbar" aria-label="Ações de Gerenciamento">
  <div class="actions-group">
    <button class="btn btn-primary">Novo</button>
    <button class="btn btn-secondary">Exportar</button>
  </div>
  
  <div class="search-group">
    <input type="search" placeholder="Pesquisar..." aria-label="Pesquisar registros" />
  </div>
</div>
```

## 2.2 DataGrid
Utilização obrigatória de `<table>` semântica para dados tabulares.

```html
<div class="datagrid-container">
  <table class="datagrid">
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Status</th>
        <th scope="col" class="actions-header">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Exemplo</td>
        <td><span class="status-pill success">Ativo</span></td>
        <td class="actions">
          <button aria-label="Visualizar">👁️</button>
          <button aria-label="Editar">✍️</button>
          <button aria-label="Excluir">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

# CAPÍTULO 3 — FORMULÁRIOS E INPUTS

## 3.1 Campo de Entrada (TextBox / TextArea)
Deve sempre associar o `label` ao `input`.

```html
<div class="form-group">
  <label for="input-id">Nome do Campo</label>
  <input type="text" id="input-id" name="input-name" required aria-required="true" />
  <span class="error-message" id="input-id-error">Campo obrigatório</span>
</div>
```

## 3.2 Seletores (Select / MultiSelect)
Para MultiSelect, utilizar containers que permitam a remoção de itens (tags/pills).

```html
<div class="form-group">
  <label>Idiomas</label>
  <div class="multiselect-container">
    <div class="selected-items">
      <span class="pill">Comum <button aria-label="Remover">×</button></span>
    </div>
    <select>
      <!-- Opções -->
    </select>
  </div>
</div>
```

---

# CAPÍTULO 4 — COMPONENTES RPG

## 4.1 Painel de Atributos (AttributePanel)
Estrutura de grid para exibição técnica.

```html
<div class="attribute-grid">
  <article class="attribute-card">
    <span class="attr-label">Força</span>
    <span class="attr-value">18</span>
    <span class="attr-modifier">+4</span>
  </article>
  <!-- Outros atributos -->
</div>
```

## 4.2 Barras de Recurso (HPBar / ManaBar)
Utilizar elementos de progresso semânticos ou ARIA.

```html
<div class="resource-container">
  <label id="hp-label">HP: 35 / 35</label>
  <div class="progress-bar-wrapper" role="progressbar" aria-labelledby="hp-label" aria-valuenow="35" aria-valuemin="0" aria-valuemax="35">
    <div class="progress-fill" style="width: 100%;"></div>
  </div>
</div>
```

## 4.3 Ficha de Personagem (Scroll Contínuo)
Seções delimitadas por `section` e IDs para navegação âncora se necessário.

```html
<article class="character-sheet">
  <section id="resumo">
    <h2>Resumo</h2>
    <!-- Conteúdo -->
  </section>
  
  <section id="atributos">
    <h2>Atributos</h2>
    <!-- Conteúdo -->
  </section>
  
  <section id="habilidades">
    <h2>Habilidades</h2>
    <!-- Conteúdo -->
  </section>
</article>
```

---

# CAPÍTULO 5 — PADRÕES DE ACESSIBILIDADE (A11Y)

1.  **Imagens**: Todo elemento `<img>` deve possuir `alt`. Se decorativo, `alt=""`.
2.  **Botões**: Devem possuir texto descritivo ou `aria-label` se utilizarem apenas ícones.
3.  **Contraste**: Seguir o tema medieval garantindo legibilidade sobre o fundo de pergaminho.
4.  **Foco**: Manter o `outline` visível para navegação via teclado.
5.  **Modais**: Utilizar `role="dialog"` e `aria-modal="true"`.
