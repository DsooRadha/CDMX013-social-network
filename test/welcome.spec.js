/**
 * @jest-environment jsdom
 */
import { welcome } from '../src/components/welcome.js';

jest.mock('../src/lib/imports.js');
jest.mock('../src/main.js');
jest.mock('../src/lib/auth.js');

describe('Los test de auth', () => {
  test('El componente es una funcion', () => {
    expect(typeof welcome).toBe('function');
  });
});
