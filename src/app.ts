import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger';
import authRoutes from './modules/auth/auth.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Documentação
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da Aplicação
app.use('/auth', authRoutes);

/**
 * @openapi
 * /:
 * get:
 * summary: Health Check
 * description: Verifica se a API está online
 * responses:
 * 200:
 * description: Sucesso
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: string
 * example: Online
 * message:
 * type: string
 * example: API Dashboard Eng. Software rodando!
 */
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'Online',
    message: 'API Dashboard Eng. Software rodando com sucesso!' 
  });
});

export default app;