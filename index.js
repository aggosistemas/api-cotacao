const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const cotacaoRouter = require('./routes/cotacao');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger configurado dinamicamente com CORS
app.use('/api-docs', swaggerUi.serve, (req, res) => {
  const host = process.env.KUBERNETES_SERVICE_HOST 
    ? `http://${process.env.EXTERNAL_IP || '34.170.169.239'}` // Use seu IP externo ou variável de ambiente
    : `${req.protocol}://${req.get('host')}`;

  const swaggerWithHost = {
    ...swaggerSpec,
    servers: [
      {
        url: host,
        description: process.env.KUBERNETES_SERVICE_HOST ? 'Production Kubernetes' : 'Local development'
      }
    ]
  };
  swaggerUi.setup(swaggerWithHost)(req, res);
});


// Rotas da API
app.use('/cotacao', cotacaoRouter);
app.get('/', (req, res) => res.send('API de Cotação no ar!'));

module.exports = app;
