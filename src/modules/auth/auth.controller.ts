import { Request, Response } from 'express';
import { createUser, findUser } from './auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUser(email);
    if (!user || user.password !== password) {
       return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    return res.json({ 
      token: "token-de-acesso-simulado-jwt-123", 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await createUser(email, password, name);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar usuário' });
  }
};