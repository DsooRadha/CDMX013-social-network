/**
 * @jest-environment jsdom
 */

import { createAccount } from '../src/components/createAccount.js';

jest.mock('../src/lib/imports.js');
jest.mock('../src/main.js');
jest.mock('../src/lib/auth.js');
// jest.mock('../src/components/createAccount.js');

describe('Los test de createAccount', () => {
  test('El componente es una funcion', () => {
    expect(typeof createAccount).toBe('function');
  });
  test('Existe el boton de registrar', () => {
    const elemento = createAccount();
    const boton = elemento.querySelector('#btnSend');
    expect(boton).not.toBeNull();
  });
  test('El input de correo no esta vacio', () => {
    const element = createAccount();
    const boton = element.querySelector('#btnSend');
    const email = element.querySelector('.emailRegister');
    const mensaje = element.querySelector('.messageError');
    // const password = elemento.querySelector('#inputPassword');
    email.value = 'usuario@correo.com';
    boton.click();
    expect(mensaje).not.toBeNull();
  });
});
