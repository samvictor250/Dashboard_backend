import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, pass: string, name: string) => {
  return await prisma.user.create({
    data: { email, password: pass, name },
  });
};

export const findUser = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};