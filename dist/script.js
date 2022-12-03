"use strict";
const calculatorTextArea = document.getElementById('calculator');
const result = document.getElementById('result');
const finalResult = document.getElementById('finalResult');
const calculate = (expression) => {
    try {
        if (expression.match(/[a-zA-Z&#$<>{}]/g))
            throw new Error();
        return new Function(`return (${expression})`)();
    }
    catch (e) {
        return null;
    }
};
const round = (value) => Math.round(value * 1000) / 1000;
const isNumber = (value) => {
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }
    else {
        return false;
    }
};
const calculator = () => {
    localStorage.setItem('calculator', calculatorTextArea.value);
    const lineBreakerRegex = /\r?\n/;
    const expressions = calculatorTextArea.value.split(lineBreakerRegex);
    const results = expressions.map((expression) => calculate(expression));
    result.innerHTML = `<div>
    ${results
        .map((result) => `<div>${isNumber(result) ? round(result) : '...'}</div>`)
        .join('')}
  </div>
  `;
    const total = round(results.filter(isNumber).reduce((a, b) => a + b, 0));
    result.innerHTML += `<div id="finalResult" title="Copiar Resultado">${total}</div>`;
    const finalResult = document.getElementById('finalResult');
    finalResult.addEventListener('click', () => {
        navigator.clipboard.writeText(total.toString());
    });
};
calculatorTextArea.value = localStorage.getItem('calculator') || '';
calculatorTextArea.addEventListener('input', calculator);
calculator();
//# sourceMappingURL=script.js.map