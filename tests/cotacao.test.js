const request = require('supertest');
const express = require('express');
const app = require('../index'); // ou adapte para exportar o app

describe('API /cotacao', () => {
  test('responde com 200 quando os parâmetros são válidos', async () => {
    const res = await request(app).get('/cotacao')
      .query({
        moeda: 'USD',
        inicio: '05-09-2023',
        fim: '05-09-2023'
      });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.cotacoes)).toBe(true);
  });

  test('retorna 400 quando falta parâmetro', async () => {
    const res = await request(app).get('/cotacao')
      .query({ moeda: 'USD' });
    expect(res.statusCode).toBe(400);
  });
});

describe('API /', () => {
  test('rota raiz responde com 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
