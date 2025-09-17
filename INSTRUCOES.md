# Instruções de Execução - Passa a Bola

## Backend (API)

### 1. Instalar dependências
```bash
cd passa-a-bola-backend
npm install
```

### 2. Executar o servidor
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3001`

### 3. Testar a API
```bash
# Testar health check
curl http://localhost:3001/api/health

# Testar notícias
curl http://localhost:3001/api/featured-articles
```

## Frontend (Website)

### 1. Instalar dependências
```bash
cd passa-a-bola-website
npm install
```

### 2. Executar o frontend
```bash
npm run dev
```

O site estará rodando em `http://localhost:8080`

## Deploy para Produção

### Backend
1. Deploy em Heroku, Railway, ou similar
2. Atualizar a URL no `vite.config.ts` do frontend

### Frontend
1. Build para produção:
```bash
npm run build
```

2. Deploy no GitHub Pages (já configurado)

## Estrutura da API

### Endpoints disponíveis:
- `GET /api/featured-articles` - Lista todas as notícias em destaque
- `GET /api/articles/:id` - Busca uma notícia específica por ID
- `GET /api/health` - Health check da API

### Exemplo de resposta:
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

## Funcionalidades Implementadas

✅ API backend com Express
✅ Endpoint para notícias em destaque
✅ Hook personalizado para gerenciar notícias
✅ Integração com fetch no frontend
✅ Estados de loading e error
✅ Fallback para dados mock em caso de erro
✅ Botão de refresh para recarregar notícias
✅ Skeleton loading durante carregamento
✅ Compatível com GitHub Pages
