import { onNavigate } from '../lib/router.js';

export const welcome = () => { // primer layaut
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Inicia Sesión';
  buttonRegister.textContent = 'Registrate';
  title.textContent = 'somos una red social para migrantes retornados';
  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });
  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });
  div.append(title, buttonLogin, buttonRegister);

  return div;
};
