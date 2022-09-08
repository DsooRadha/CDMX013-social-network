import { onNavigate } from '../lib/router.js';

export const register = () => { // primer layaut
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonBack = document.createElement('button');

  button.textContent = 'Crear Cuenta';
  buttonBack.textContent = 'Regresar';
  title.textContent = 'Registro de nueva cuenta';
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  div.append(title, inputEmail, inputPass, button, buttonBack);

  return div;
};
