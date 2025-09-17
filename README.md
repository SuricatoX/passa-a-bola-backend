# Passa a Bola Backend API

API backend para o site Passa a Bola, fornecendo notícias e dados sobre futebol feminino.

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (opcional):
```bash
# Crie um arquivo .env na raiz do projeto
PORT=3001
NODE_ENV=development
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Endpoints

### GET /api/featured-articles
Retorna as notícias em destaque.

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Brazil Women's Team Advances to Final",
      "byline": "Maria Santos • 2 hours ago",
      "image": "https://...",
      "content": "...",
      "category": "Championship",
      "publishedAt": "2024-12-27T10:00:00.000Z",
      "author": {
        "name": "Maria Santos",
        "avatar": "https://..."
      }
    }
  ],
  "total": 5
}
```

### GET /api/articles/:id
Retorna uma notícia específica por ID.

### GET /api/health
Health check da API.

## Estrutura dos Dados

Cada notícia contém:
- `id`: Identificador único
- `title`: Título da notícia
- `byline`: Linha de crédito (autor e tempo)
- `image`: URL da imagem
- `content`: Conteúdo completo da notícia
- `category`: Categoria da notícia
- `publishedAt`: Data de publicação (ISO string)
- `author`: Objeto com nome e avatar do autor

## CORS

A API está configurada para aceitar requisições de qualquer origem para facilitar o desenvolvimento e deploy no GitHub Pages.
# passa-a-bola-backend
