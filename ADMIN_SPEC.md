# Especificação Técnica: Painel Administrativo LN Máquinas

Este documento serve como guia para a implementação da área administrativa (Backoffice) do sistema, focada no gerenciamento dinâmico de produtos e banners (Carrossel).

## 1. Arquitetura de Estado (Front-end First)
Como o backend ainda será desenvolvido, utilizaremos o **Zustand** (`store.ts`) para gerenciar o estado global da aplicação, transformando as constantes estáticas em dados mutáveis.

### Refatoração Necessária na `store.ts`
- **Estado Inicial**: Carregar os dados de `MOCK_PRODUCTS` e `SLIDES` (atualmente na Home) como estado inicial.
- **Actions**:
  - `addProduct(product)`
  - `updateProduct(id, product)`
  - `deleteProduct(id)`
  - `updateBanner(id, bannerData)`
  - `addBanner(bannerData)` (Opcional)
  - `deleteBanner(id)` (Opcional)

## 2. Estrutura de Rotas
Implementar via `react-router-dom` dentro de um novo layout administrativo.

| Rota | Descrição | Componente Sugerido |
|------|-----------|---------------------|
| `/admin/login` | Tela de login simples (mockup: admin/admin) | `AdminLogin.tsx` |
| `/admin` | Dashboard (Visão geral, métricas simples) | `AdminDashboard.tsx` |
| `/admin/produtos` | Listagem de produtos (CRUD - Read) | `AdminProducts.tsx` |
| `/admin/produtos/novo` | Formulário de criação | `ProductForm.tsx` |
| `/admin/produtos/:id` | Formulário de edição | `ProductForm.tsx` |
| `/admin/banners` | Gerenciamento do Carrossel da Home | `AdminBanners.tsx` |

## 3. Detalhamento de Funcionalidades

### A. Autenticação (Simulada)
- Criar um contexto ou estado simples `isAuthenticated`.
- Proteção de rotas `/admin` (Redirecionar para login se não autenticado).

### B. Módulo de Produtos (CRUD)
**Listagem (Data Table):**
- Colunas: Imagem (Miniatura), Nome, Categoria, Preço, Status (Em Estoque/Esgotado), Ações (Editar, Excluir).
- Filtros: Barra de busca por nome.

**Formulário:**
- **Nome**: Input Texto (Obrigatório).
- **Categoria**: Select (Máquinas, Peças, Tecnologia).
- **Preço**: Input Numérico (Máscara de moeda R$).
- **Descrição**: Textarea.
- **Imagem**: Input Texto (URL) - *Nota: Explicar ao usuário que upload real requer backend, por hora usar URLs externas.*
- **Em Estoque**: Toggle/Switch boolean.

### C. Módulo de Banners (Home)
Permitir editar os slides que aparecem na Home.
- **Campos**: Título, Subtítulo, Texto do Botão (CTA), Link de destino, URL da Imagem de Fundo.

## 4. Diretrizes de UI/UX (Admin)
- **Layout**: Sidebar lateral fixa escura (Brand Dark), área de conteúdo clara.
- **Estilo**: Utilizar classes utilitárias do Tailwind já configuradas.
- **Feedback**: Usar `window.alert` ou um componente de Toast simples para confirmar salvamento/exclusão.
- **Responsividade**: O painel deve ser utilizável em mobile (menu hambúrguer).

## 5. Instruções para Implementação
1. **Passo 1**: Atualizar `store.ts` para conter os dados de Produtos e Banners.
2. **Passo 2**: Atualizar `Home.tsx` e `Products.tsx` para lerem os dados da `store` ao invés das constantes diretas.
3. **Passo 3**: Criar componente `AdminLayout`.
4. **Passo 4**: Implementar as telas de CRUD conectando às actions da store.
