import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // O Pacote da sua parte
import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger';
import authRoutes from './modules/auth/auth.routes';

const app = express();

// --- (Sua Parte) SEGURANÇA AVANÇADA COM HELMET ---
app.use(helmet({
  // 1. Content Security Policy (CSP): Previne ataques de injeção de scripts (XSS)
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Só aceita scripts do próprio site
      scriptSrc: ["'self'", "'unsafe-inline'"], // Permite scripts inline (necessário para alguns frameworks)
      objectSrc: ["'none'"], // Bloqueia plugins (Flash, Java)
      upgradeInsecureRequests: [], // Força HTTPS
    },
  },
  // 2. Hide Powered-By: Remove o cabeçalho que diz "Sou feito em Express" (Dificulta para hackers saberem a tecnologia)
  hidePoweredBy: true,
  // 3. X-Frame-Options: Impede que seu site seja colocado num iframe (Clickjacking)
  frameguard: { action: 'deny' },
  // 4. HSTS: Força o navegador a usar sempre HTTPS (Strict Transport Security)
  hsts: {
    maxAge: 31536000, // 1 ano
    includeSubDomains: true,
    preload: true,
  },
  // 5. X-Content-Type-Options: Previne que o navegador "adivinhe" o tipo de arquivo (MIME Sniffing)
  noSniff: true,
}));

// --- Fim da Sua Parte ---

app.use(express.json());
app.use(cors());

// Rotas e Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/auth', authRoutes);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'Secure', // Mudei para Secure pra mostrar que tá blindado
    message: 'API Dashboard Blindada com Helmet!' 
  });
});

export default app;