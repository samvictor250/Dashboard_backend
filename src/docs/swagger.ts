import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dashboard API',
      version: '1.0.0',
      description: 'API para o Dashboard de Métricas (Eng. de Software)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/app.ts', './src/modules/**/*.ts'],
};

export const specs = swaggerJsdoc(options);