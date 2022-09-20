import { onNavigate } from '../main.js';
import { registerWithGoogle,observador } from '../lib/auth.js';

observador();

export const welcome = () => {
  const div = document.createElement('div');
  div.className = 'welcome';
  const buttonCreateAccount = document.createElement('button');
  buttonCreateAccount.className = 'btnRegister';
  const buttonSignInGoogle = document.createElement('button');
  buttonSignInGoogle.className = 'btngoogle';
  const buttonSignIn = document.createElement('button');
  buttonSignIn.className = 'btnSignIn';
  const title = document.createElement('img');
  title.src = './img/comuniapp.png';
  title.className = 'nameApp';
  const subtitle = document.createElement('h2');
  const description = document.createElement('p');
  const welcomeImage = document.createElement('img');
  welcomeImage.className = 'welcomeImg';

  buttonCreateAccount.textContent = 'Crear Cuenta';
  buttonSignInGoogle.textContent = 'Continuar con Google';
  buttonSignIn.textContent = 'Iniciar Sesión';
  title.textContent = 'ComuniApp';
  subtitle.textContent = 'TODOS SOMOS MIGRANTES';
  description.textContent = 'Aquí encontrarás una comunidad que te hará sentir en casa';
  welcomeImage.src = './img/migrant.png';

  buttonCreateAccount.addEventListener('click', () => {
    onNavigate('/createAccount');
  });

  buttonSignIn.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonSignInGoogle.addEventListener('click', () => {
    registerWithGoogle()
      .then(() => {
        onNavigate('/homepage');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });

  div.append(title, welcomeImage, subtitle, buttonCreateAccount, buttonSignInGoogle, buttonSignIn, description);
  return div;
};
