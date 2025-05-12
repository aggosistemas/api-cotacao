const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger: configura dinamicamente o host da requisição
app.use('/api-docs', (req, res, next) => {
  swaggerSpec.servers = [
    {
      url: `${req.protocol}://${req.get('host')}`,
      description: 'URL dinâmica detectada pelo host da requisição'
    }
  ];
  swaggerUi.setup(swaggerSpec)(req, res, next);
});

app.use('/cotacao', require('./routes/cotacao'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
