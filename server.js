const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mock das notícias
const featuredArticles = [
  {
    id: 1,
    title: "Brazil Women's Team Advances to Final",
    byline: "Maria Santos • 2 hours ago",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&crop=center",
    content: "The Brazilian women's national team secured their place in the championship final with a stunning 3-1 victory over their rivals. The team showed exceptional teamwork and determination throughout the match.",
    category: "Championship",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    author: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c87c?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 2,
    title: "Rising Star: Ana Silva's Journey",
    byline: "Carlos Mendes • 5 hours ago",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
    content: "Ana Silva's remarkable journey from local leagues to national recognition has been nothing short of inspirational. Her dedication and skill have made her one of the most promising talents in women's football.",
    category: "Player Profile",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    author: {
      name: "Carlos Mendes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 3,
    title: "Championship Preview: What to Expect",
    byline: "Lucia Oliveira • 1 day ago",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=300&fit=crop&crop=center",
    content: "As the championship approaches its climax, we analyze the key factors that will determine the outcome. From team strategies to individual performances, here's what to watch for in the upcoming matches.",
    category: "Analysis",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    author: {
      name: "Lucia Oliveira",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 4,
    title: "New Training Facilities Open for Women's Teams",
    byline: "Roberto Silva • 2 days ago",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    content: "State-of-the-art training facilities have been inaugurated, providing women's teams with world-class infrastructure to develop their skills and compete at the highest level.",
    category: "Infrastructure",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    author: {
      name: "Roberto Silva",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 5,
    title: "Youth Development Program Shows Promising Results",
    byline: "Fernanda Costa • 3 days ago",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center",
    content: "The new youth development program has already produced several talented players who are making their mark in professional leagues. This initiative is shaping the future of women's football.",
    category: "Development",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    author: {
      name: "Fernanda Costa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    }
  }
];

// Rota para obter as notícias em destaque
app.get('/api/featured-articles', (req, res) => {
  try {
    // Simular um pequeno delay para simular uma API real
    setTimeout(() => {
      res.json({
        success: true,
        data: featuredArticles,
        total: featuredArticles.length
      });
    }, 100);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Rota para obter uma notícia específica por ID
app.get('/api/articles/:id', (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = featuredArticles.find(article => article.id === articleId);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Notícia não encontrada'
      });
    }
    
    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Passa a Bola API',
    version: '1.0.0',
    endpoints: {
      featuredArticles: '/api/featured-articles',
      articleById: '/api/articles/:id',
      health: '/api/health'
    }
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📰 API de notícias disponível em http://localhost:${PORT}/api/featured-articles`);
  console.log(`🏥 Health check em http://localhost:${PORT}/api/health`);
});
