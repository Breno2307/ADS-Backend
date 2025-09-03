const { calcularMediaAluno } = require("../src/calcularMediaAluno.js");

test("verificando se existe a função", function () {
  expect(calcularMediaAluno).toBeDefined();
});
test("Notas a1 ou a2 não informadas", function () {
  expect(() => calcularMediaAluno()).toThrow("Notas a1 ou a2 não informadas");
});
test("Notas a1 ou a2 não podem ser negativo", function () {
  expect(() => calcularMediaAluno(-1, -2)).toThrow(
    "Notas a1 ou a2 não podem ser negativo"
  );
});
test("Nota a3 não definida", function () {
  expect(calcularMediaAluno(6, 9)).toBeCloseTo(7.8);
});
test("Nota a3 não pode ser negativa", function () {
  expect(() => calcularMediaAluno(1, 2, -3)).toThrow(
    "Nota a3 não pode ser negativa"
  );
});
test("Melhor combinação a3 com a1",function(){
    expect(calcularMediaAluno(0,9,6)).toBeCloseTo(7.8)
})
test("Melhor combinação a3 com 2",function(){
    expect(calcularMediaAluno(6,0,9)).toBeCloseTo(7.8)
})
