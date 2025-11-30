import { Router } from 'express';
import { login, register } from './auth.controller';

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Usuário criado com sucesso
 *       "400":
 *         description: Erro na criação
 */
router.post('/register', register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna token
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       "200":
 *         description: Login realizado
 *       "401":
 *         description: Credenciais inválidas
 */
router.post('/login', login);

export default router;