function calcularMediaAluno(a1, a2, a3) {
  if (a1 === undefined || a2 === undefined) {
    throw Error("Notas a1 ou a2 não informadas ");
  }
  if (a1 < 0 || a2 < 0) {
    throw Error("Notas a1 ou a2 não podem ser negativo");
  }
  if (a3 === undefined) {
    return a1 * 0.4 + a2 * 0.6;
  }
  if (a3 < 0) {
    throw Error("Nota a3 não pode ser negativa");
  } else {
    let media0 = a1 * 0.4 + a2 * 0.6;
    let media1 = a1 * 0.4 + a3 * 0.6;
    let media2 = a3 * 0.4 + a2 * 0.6;
    return Math.max(media0, media1, media2);
  }
  return 0;
}
module.exports = { calcularMediaAluno };
