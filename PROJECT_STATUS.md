# Status do Projeto: LN Máquinas e Peças Agrícolas

## 1. Visão Geral
O projeto é uma aplicação web **Single Page Application (SPA)** desenvolvida em React, focada em catálogo de produtos agrícolas. O sistema possui uma área pública (Loja/Catálogo) e uma área administrativa privada (Backoffice) para gestão de conteúdo.

A arquitetura é **Serverless-ish** no momento, utilizando o **Zustand** com persistência no `localStorage` do navegador para simular um banco de dados, permitindo que as alterações no painel administrativo reflitam na loja pública instantaneamente no mesmo navegador (ideal para demonstrações ou MVP).

## 2. O Que Já Foi Feito (Completed)

### Infraestrutura e Configuração
- [x] Configuração do **Vite + React + TypeScript**.
- [x] Integração do **Tailwind CSS** para estilização.
- [x] Configuração de Rotas com **HashRouter** (Compatibilidade total com Hostinger/HostGator sem necessidade de rewrite rules complexas).
- [x] **Zustand Store**: Gerenciamento de estado global para Produtos, Banners e Autenticação.
- [x] **Persistência**: Dados salvos no LocalStorage (`ln-maquinas-storage`).

### Área Pública (Front-end)
- [x] **Home**:
  - Carrossel dinâmico (Dados vindos da Store).
  - Vitrine de Destaques.
  - Navegação por categorias.
- [x] **Catálogo de Produtos**:
  - Filtros por categoria.
  - Busca em tempo real.
  - Card de produto com botão "Tenho Interesse" (Link direto para WhatsApp com mensagem pré-definida).
- [x] **Páginas Institucionais**: Sobre Nós e Contato.
- [x] **Layout**: Navbar responsiva e Footer completo.

### Área Administrativa (Backoffice)
- [x] **Autenticação**: Sistema de login simples (proteção de rota).
- [x] **Dashboard**: Visão geral com métricas (Total de produtos, valor de catálogo, itens esgotados).
- [x] **CRUD de Produtos**:
  - Listagem com busca.
  - Adicionar novo produto.
  - Editar produto existente.
  - Excluir produto.
  - Controle de estoque (Switch On/Off).
- [x] **Gestão de Banners**: Edição de textos e imagens do carrossel da Home.

## 3. O Que Falta Fazer (Roadmap / Next Steps)

Para tornar o sistema pronto para produção e entrega final, a IA deve focar nestes pontos:

### Prioridade Alta (Funcionalidade)
1. **Upload de Imagens**:
   - *Atual*: O sistema usa campos de texto para URLs de imagem.
   - *Necessário*: Integrar uma solução de upload (ex: Cloudinary Free Tier, Imgur API, ou um script PHP simples na Hostinger) para que o cliente possa subir fotos do computador.
2. **Formulário de Contato Funcional**:
   - *Atual*: Apenas simula envio (`console.log`).
   - *Necessário*: Integrar com **EmailJS** ou **Formspree** para enviar emails reais para a empresa.
3. **SEO (Search Engine Optimization)**:
   - *Necessário*: Implementar `React Helmet Async` para alterar Título e Meta Description dinamicamente em cada rota (essencial para e-commerce).

### Prioridade Média (Refinamento)
4. **Segurança da Autenticação**:
   - *Atual*: Login hardcoded (`admin/admin`).
   - *Necessário*: Mover credenciais para variáveis de ambiente ou integrar com Firebase Auth para segurança real.
5. **Depoimentos**:
   - Implementar a seção de depoimentos na Home (previsto no prompt original).

### Prioridade Baixa (DevOps/Deploy)
6. **Build & Deploy**:
   - Gerar build final (`npm run build`).
   - Criar arquivo `.htaccess` simples (se necessário) para redirecionamento HTTPS na Hostinger.

## 4. Estrutura de Dados Atual (Types)

### Produto (`Product`)
- `id`: string
- `name`: string
- `category`: Enum (Máquinas, Peças, Tecnologia)
- `price`: number
- `description`: string
- `imageUrl`: string (URL externa)
- `inStock`: boolean

### Banner (`Slide`)
- `id`: number
- `image`: string (URL)
- `title`, `subtitle`, `text`: strings
- `cta`: string (Texto do botão)
- `link`: string (Rota interna)

## 5. Como Continuar
Para continuar o desenvolvimento, solicite à IA:
> "Implemente o SEO utilizando React Helmet Async em todas as páginas."
> "Integre o EmailJS no formulário de contato."
> "Crie uma solução de upload de imagens usando [Serviço Escolhido]."
