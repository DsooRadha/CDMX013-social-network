/* eslint-disable max-len */
import { onNavigate } from '../main.js';
import { userLogin } from '../lib/auth.js';

const validateRegister = (e) => {
  e.preventDefault();
  const messageError = document.getElementById('messageErrorLogin');
  const messageErrorPassword = document.getElementById('messageErrorPasswordLogin');
  const messageErrorCatch = document.getElementById('messageErrorCatchLogin');

  messageError.innerHTML = '';
  messageErrorPassword.innerHTML = '';

  const emailValueLogin = document.getElementById('inputEmailLogin').value;
  const passwordValueLogin = document.getElementById('inputPasswordLogin').value;

  if (emailValueLogin === '') {
    messageError.innerHTML = 'Ingresa un correo electrónico';
  }
  if (passwordValueLogin === '') {
    messageErrorPassword.innerHTML = 'Ingresa una contraseña';
  } else {
    userLogin(emailValueLogin, passwordValueLogin)
      .then(() => {
        onNavigate('/homepage');
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        if (errorCode === 'auth/wrong-password') {
          messageErrorCatch.innerHTML = 'Contraseña incorrecta';
        }
        if (errorCode === 'auth/user-not-found') {
          messageErrorCatch.innerHTML = 'Correo no registrado';
        }
      });
  }
};
export const login = () => {
  const divLogin = document.createElement('div');
  divLogin.className = 'login';
  const email = document.createElement('p');
  const password = document.createElement('p');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.className = 'emailLogin';
  inputEmail.setAttribute('placeholder', 'correo electronico');
  inputEmail.setAttribute('id', 'inputEmailLogin');
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', 'min. 6 caracteres');
  inputPassword.setAttribute('id', 'inputPasswordLogin');
  const returnButton = document.createElement('button');
  returnButton.setAttribute('id', 'btnReturnLogin');
  returnButton.src = './img/comuniapp.png';
  const sendButton = document.createElement('button');
  sendButton.setAttribute('id', 'btnSendlogin');
  const imgLogo = document.createElement('img');
  imgLogo.src = './img/logo.png';
  imgLogo.setAttribute('id', 'logoImg');
  const messageErrorPassword = document.createElement('p');
  messageErrorPassword.className = 'messageError';
  messageErrorPassword.id = 'messageErrorPasswordLogin';
  const messageError = document.createElement('p');
  messageError.className = 'messageError';
  messageError.id = 'messageErrorLogin';
  const messageErrorCatch = document.createElement('p');
  messageErrorCatch.className = 'messageError';
  messageErrorCatch.id = 'messageErrorCatchLogin';

  email.textContent = 'Correo electronico';
  password.textContent = 'Contraseña';
  sendButton.textContent = 'INGRESAR';
  returnButton.textContent = 'Regresar';

  returnButton.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });

  sendButton.addEventListener('click', validateRegister);

  divLogin.append(returnButton, imgLogo, email, inputEmail, messageError, password, inputPassword, messageErrorPassword, messageErrorCatch, sendButton);
  return divLogin;
};
