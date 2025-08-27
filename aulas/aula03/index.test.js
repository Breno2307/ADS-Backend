import { soma, divisao } from "./index.js";

if (soma(1, 1) === 2) {
  console.log("Passou");
} else {
  console.error("Deu ruim");
}
if (soma(1, 0) === 1) console.log("passou");
else console.error("deu ruim");

if (soma(1, -1) === 0) console.log("passou");
else console.error("deu ruim");

if (divisao(1, 1) === 1) console.log("passou");
else console.error("deu ruim");

if (divisao(1, 0) === undefined) console.log("passou");
else console.error("deu ruim");

if (divisao(1, -1) === -1) console.log("passou");
else console.error("deu ruim");

if (divisao(0, 1) === 0) console.log("passou");
else console.error("deu ruim");
