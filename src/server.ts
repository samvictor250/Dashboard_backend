import express from 'express';

const app = express();
const port = 3000;

// Middleware para ler JSON
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
  res.json({ status: "API Online", message: "Backend rodando!" });
});

// Iniciar
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});