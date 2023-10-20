'use strict';
const display = document.querySelector(".display");
const numeros = document.querySelectorAll("[id *= number]");
const operadores = document.querySelectorAll("[id *= Operador]");
const igual = document.querySelector("#resultado");

let newNumber = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;


const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent);
        newNumber = true;
        switch (operador){
            case "+" : atualizarDisplay(numeroAnterior + numeroAtual)
            break; 
            case "-" : atualizarDisplay(numeroAnterior - numeroAtual)
            break;
            case "×" : atualizarDisplay(parseFloat(numeroAnterior * numeroAtual).toFixed(2))
            break;
            case "÷" : atualizarDisplay(parseFloat(numeroAnterior / numeroAtual).toFixed(2))
            break;
            default : display.textContent = "error";
        }
    }
}
const selecionarOperador = (event) => {
    if(!newNumber){
        calcular();
        newNumber = true;
        operador = event.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
    }
}
const atualizarDisplay = (text) => {
    if(newNumber){
        display.textContent = text
        newNumber = false;
    }else {
        display.textContent += text
    }
}
const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
const limparDisplay = () => display.textContent = "";

const limparCalculo = () => {
    limparDisplay();
    operador =  undefined;
    newNumber = true;
    numeroAnterior = undefined;
}
const removerCaracter = () => display.textContent = display.textContent = display.textContent.slice(0, -1);

const trocarSinal = () => {
    newNumber = true;
    atualizarDisplay(display.textContent = parseFloat(display.textContent) * -1)    
}
const decimalNumber = () =>  display.textContent.indexOf('.') !== -1;
const existeValor = () =>  display.textContent.length > 0;

const inserirVirgula = () => {
    if(!decimalNumber()){
        existeValor() ? atualizarDisplay('.') : atualizarDisplay('0.')
    }
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
operadores.forEach( operador => operador.addEventListener('click', selecionarOperador));
igual.addEventListener('click', ativarIgual)
document.querySelector("#limpadorDisplay").addEventListener('click',limparDisplay);
document.querySelector("#limpadorCalc").addEventListener('click', limparCalculo);
document.querySelector("#backspace").addEventListener('click', removerCaracter);
document.querySelector("#maisMenos").addEventListener('click', trocarSinal);
document.querySelector("#virgula").addEventListener('click', inserirVirgula);

const keyTeclas = {
    '0'         : 'number0',
    '1'         : 'number1',
    '2'         : 'number2',
    '3'         : 'number3',
    '4'         : 'number4',
    '5'         : 'number5',
    '6'         : 'number6',
    '7'         : 'number7',
    '8'         : 'number8',
    '9'         : 'number9',
    '/'         : 'OperadorDivisor',
    '*'         : 'OperadorMultiplicar',
    'x'         : 'OperadorMultiplicar',
    'X'         : 'OperadorMultiplicar',
    '-'         : 'OperadorSubtrair',
    '+'         : 'OperadorSomar',
    'Enter'     : 'resultado',
    'Backspace' : 'backspace',
    'C'         : 'limpadorDisplay',
    'c'         : 'limpadorDisplay',
    'l'         : 'limpadorCalc',
    'L'         : 'limpadorCalc',
    ','         : 'virgula',
    '.'         : 'virgula'
}

const mapearTeclado = (event) => {
    const tecla = event.key;
    if(keyTeclas[tecla] !== undefined){
        document.getElementById(keyTeclas[tecla]).click();
    }
}
document.addEventListener('keydown', mapearTeclado);