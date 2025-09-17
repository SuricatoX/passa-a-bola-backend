const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mock das notícias
const featuredArticles = [
  {
    id: 1,
    title: "Seleção Brasileira Feminina Avança para a Final",
    byline: "Maria Santos • há 2 horas",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&crop=center",
    content: "A seleção brasileira feminina garantiu sua vaga na final do campeonato com uma vitória impressionante de 3-1 sobre suas rivais. A equipe mostrou trabalho em equipe excepcional e determinação durante toda a partida.",
    category: "Campeonato",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    author: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c87c?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 2,
    title: "Estrela em Ascensão: A Jornada de Ana Silva",
    byline: "Carlos Mendes • há 5 horas",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
    content: "A jornada notável de Ana Silva das ligas locais ao reconhecimento nacional tem sido nada menos que inspiradora. Sua dedicação e habilidade a tornaram uma das talentos mais promissores do futebol feminino.",
    category: "Perfil de Jogadora",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    author: {
      name: "Carlos Mendes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 3,
    title: "Prévia do Campeonato: O Que Esperar",
    byline: "Lucia Oliveira • há 1 dia",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=300&fit=crop&crop=center",
    content: "Conforme o campeonato se aproxima do clímax, analisamos os fatores-chave que determinarão o resultado. Das estratégias das equipes às performances individuais, aqui está o que observar nas próximas partidas.",
    category: "Análise",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    author: {
      name: "Lucia Oliveira",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 4,
    title: "Novas Instalações de Treinamento Abrem para Equipes Femininas",
    byline: "Roberto Silva • há 2 dias",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    content: "Instalações de treinamento de última geração foram inauguradas, fornecendo às equipes femininas infraestrutura de classe mundial para desenvolver suas habilidades e competir no mais alto nível.",
    category: "Infraestrutura",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    author: {
      name: "Roberto Silva",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 5,
    title: "Programa de Desenvolvimento Juvenil Mostra Resultados Promissores",
    byline: "Fernanda Costa • há 3 dias",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center",
    content: "O novo programa de desenvolvimento juvenil já produziu várias jogadoras talentosas que estão se destacando nas ligas profissionais. Esta iniciativa está moldando o futuro do futebol feminino.",
    category: "Desenvolvimento",
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

// Rota raiz para health check da Coolify
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Passa a Bola API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
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
