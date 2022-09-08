import { routes } from './routes.js';

export const onNavigate = (pathname) => { // pathname=nombre de ruta
    const root = document.getElementById('root');
    window.history.pushState(// sintaxis: history.pushState(state, title, [,url])
        {}, // state
        pathname,
        window.location.origin + pathname, // url
    );
    root.removeChild(root.firstChild); // para desaparecer muchas cosas puede ser un for while
    root.appendChild(routes[pathname]());
};
