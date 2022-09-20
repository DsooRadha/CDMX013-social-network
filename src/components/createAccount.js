import { onNavigate } from '../main.js';
import { register } from '../lib/auth.js';

export const createAccount = () => {
  const divcreateAccount = document.createElement('div');
  divcreateAccount.setAttribute('id', 'createAccount');
  const email = document.createElement('p');
  const password = document.createElement('p');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.className = 'emailRegister';
  inputEmail.setAttribute('placeholder', 'correo electronico');
  inputEmail.setAttribute('id', 'inputEmail');
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', 'min. 6 caracteres');
  inputPassword.setAttribute('id', 'inputPassword');
  const returnButton = document.createElement('button');
  returnButton.setAttribute('id', 'btnReturn');
  returnButton.src = './img/comuniapp.png';
  const sendButton = document.createElement('button');
  sendButton.setAttribute('id', 'btnSend');
  const imgLogo = document.createElement('img');
  imgLogo.src = './img/logo.png';
  const messageError = document.createElement('p');
  messageError.className = 'messageError';
  messageError.id = 'messageError'
  const messageErrorPassword = document.createElement('p');
  messageErrorPassword.className = 'messageError';
  messageErrorPassword.id = 'messageErrorPassword'

  email.textContent = 'Correo electronico';
  password.textContent = 'Contraseña';
  sendButton.textContent = 'REGISTRARSE';
  returnButton.textContent = 'Regresar';

  returnButton.addEventListener('click', () => {
    onNavigate('/');
  });

  sendButton.addEventListener('click', validateAndRecord)

  divcreateAccount.append(returnButton, imgLogo, email, inputEmail, messageError, password, inputPassword, messageErrorPassword, sendButton);
  return divcreateAccount;
};

const validateAndRecord = (e) => {

  const messageError = document.getElementById('messageError');
  const messageErrorPassword = document.getElementById('messageErrorPassword');

  e.preventDefault();
  messageError.innerHTML = ''
  messageErrorPassword.innerHTML = ''

  const emailValue = document.getElementById('inputEmail').value;
  const passwordValue = document.getElementById('inputPassword').value;

  if (emailValue === '') {
    messageError.innerHTML = 'Ingresa un correo electrónico';
  }

  else if (passwordValue === '' || passwordValue.length < 6) {
    messageErrorPassword.innerHTML = 'Ingresa una contraseña';
  }

  register(emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      onNavigate('/homepage');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        messageError.innerHTML = 'Este correo ya está registrado';
      }
    });
};