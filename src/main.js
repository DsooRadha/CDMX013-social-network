import { routes } from './lib/routes.js';

window.onpopstate = () => {
  const root = document.getElementById('root');
  const component = routes[window.location.pathname];
  root.removeChild(root.firstChild);
  root.append(component());
};

window.addEventListener('load', () => {
  const component = routes[window.location.pathname];
  const root = document.getElementById('root');
  root.appendChild(component());
});
