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
  const swaggerWithHost = {
    ...swaggerSpec,
    servers: [
      {
        url: `${req.protocol}://${req.get('host')}`,
        description: 'Dynamic server URL'
      }
    ]
  };
  swaggerUi.setup(swaggerWithHost)(req, res);
});


// Rotas da API
app.use('/cotacao', cotacaoRouter);
app.get('/', (req, res) => res.send('API de Cotação no ar!'));

module.exports = app;
