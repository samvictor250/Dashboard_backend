import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { login, register } from './auth.controller';
import * as authService from './auth.service';

// Helpers to create mock req/res
const mockRequest = (body = {}) => ({ body } as any);
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
};

describe('auth.controller', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 401 when user not found or password wrong', async () => {
    vi.spyOn(authService, 'findUser').mockResolvedValue(null as any);

    const req = mockRequest({ email: 'noone@example.com', password: 'pass' });
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email ou senha inválidos' });
  });

  it('should return token and user when login successful', async () => {
    const fakeUser = { id: 'u1', email: 'a@b.com', password: 'pwd', name: 'User' } as any;
    vi.spyOn(authService, 'findUser').mockResolvedValue(fakeUser as any);

    const req = mockRequest({ email: 'a@b.com', password: 'pwd' });
    const res = mockResponse();

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: { id: fakeUser.id, name: fakeUser.name, email: fakeUser.email }
    });
  });

  it('should create user on register', async () => {
    const created = { id: 'u2', email: 'x@y.com', name: 'New' } as any;
    vi.spyOn(authService, 'createUser').mockResolvedValue(created as any);

    const req = mockRequest({ email: 'x@y.com', password: 'pw', name: 'New' });
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });
});
