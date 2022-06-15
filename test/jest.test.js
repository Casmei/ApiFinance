test('Devo conhecer as principais assertivas do jest', () => {
    let numero = null;
    expect(numero).toBeNull();
    numero = 1;
    expect(numero).not.toBeNull();
    expect(numero).toBe(1);
    expect(numero).toEqual(1);
});

test('Devo saber trabalhar com objetos', () => {
    const objeto = {
        nome: 'João',
        mail: 'joao@mail.com'
    };
    expect(objeto).toHaveProperty('nome', 'João');
});
