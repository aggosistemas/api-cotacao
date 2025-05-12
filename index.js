const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const cotacaoRouter = require('./routes/cotacao');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', cors(), (req, res, next) => {
  swaggerSpec.servers = [
    { url: `${req.protocol}://${req.get('host')}` }
  ];
  swaggerUi.setup(swaggerSpec)(req, res, next);
});


app.use('/cotacao', cotacaoRouter);
app.get('/', (req, res) => res.send('API de Cotação no ar!'));

module.exports = app; // Exporta somente o app, sem escutar a porta
