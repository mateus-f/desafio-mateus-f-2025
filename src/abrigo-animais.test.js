import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Gato não divide brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA, RATO, LASER', 'BOLA,RATO', 'Mimi,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco aceita brinquedos fora de ordem se tiver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE', 
      'RATO,NOVELO',
      'Rex,Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');  
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');   
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Pessoa não pode levar mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO', 'RATO,CAIXA', 'Rex,Bebe,Bola,Mimi,Zero');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Bebe - abrigo');
    expect(resultado.lista).toContain('Bola - pessoa 1');
    expect(resultado.lista).toContain('Mimi - abrigo');
    expect(resultado.lista).toContain('Zero - abrigo');
    expect(resultado.lista.length).toBe(5);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLINHA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar duplicidade de animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar duplicidade de brinquedo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

});
