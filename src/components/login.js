import { onNavigate } from '../lib/router.js';

export const login = () => { // primer layaut
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonBack = document.createElement('button');

  button.textContent = 'Entrar';
  buttonBack.textContent = 'Regresar';
  title.textContent = 'Inicia Sesión';
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  div.append(title, inputEmail, inputPass, button, buttonBack);

  return div;
};
