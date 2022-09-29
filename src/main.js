import { welcome } from './components/welcome.js';
import { createAccount } from './components/createAccount.js';
import { login } from './components/login.js';
import { homepage } from './components/homepage.js';
import { loginStateUser } from './lib/auth.js';

const routes = {
  '/': welcome,
  '/createAccount': createAccount,
  '/login': login,
  '/homepage': homepage,
};

const root = document.getElementById('root');

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.replaceChildren(routes[pathname]());
};

const component = routes[window.location.pathname];

loginStateUser();

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};

root.appendChild(component());
