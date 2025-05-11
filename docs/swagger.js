const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cotação de Moedas - Banco Central',
      version: '1.0.0',
      description: 'Consulta cotações de moedas usando a API do Banco Central (OLINDA)',
    },
    servers: [
      {
        url: 'http://192.168.49.2:30081',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
