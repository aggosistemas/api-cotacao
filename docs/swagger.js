const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Cotação',
    version: '1.0.0',
    description: 'Consulta de cotação de moedas',
  },
  servers: [], // será definido dinamicamente em runtime
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // ou onde estão suas anotações
};

module.exports = require('swagger-jsdoc')(options);
