import { welcome } from '../components/welcome.js';
import { login } from '../components/login.js';
import { register } from '../components/register.js';

export const routes = {
  '/': welcome,
  '/login': login,
  '/register': register,
};
