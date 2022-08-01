var currentNumber = "";
var previousNumber = "";
var operator = "";


function add(num1, num2) {
  return num1 + num2;

}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return "ERROR";
  return num1 / num2;
}

function operate(op, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  if (op === "+") {
    return add(num1, num2)
  }
  else if (op === "-") {
    return subtract(num1, num2)
  }
  else if (op === "x") {
    return multiply(num1, num2)
  }
  else {
    console.log(num2)
    if (num2 === 0) { return "ERROR" }
    return divide(num1, num2)
  }
}

const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const negate = document.querySelector(".negate");
const equal = document.querySelector(".equal")
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".op");
const dot = document.querySelector(".dot")
const backspace = document.querySelector(".backspace")

backspace.addEventListener('click', () => {
  if (currentNumber.length !== 0) {
    // doesnt work after equals (equals sets length to 0)
    if (currentNumber.length === 1) {
      currentNumber = ""
      display.textContent = "0"
    }
    else {
      currentNumber = currentNumber.slice(0, -1);
      display.textContent = currentNumber;
    }
  }


})

dot.addEventListener('click', () => {
  if (!currentNumber.includes(".")) {
    currentNumber = currentNumber + ".";
    display.textContent = currentNumber;
  }

})

clear.addEventListener('click', () => {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  display.textContent = "0";

})

negate.addEventListener('click', () => {
  currentNumber = -(Number(currentNumber))
  currentNumber = "" + currentNumber;
  display.textContent = currentNumber;

})

equal.addEventListener('click', () => {
  if (!previousNumber || !currentNumber) {
    return
  }
  let result = operate(operator, previousNumber, currentNumber);
  if (result % 1 !== 0) {
    result = Math.round(result * 10) / 10
  }
  display.textContent = result;
  previousNumber = result;
  currentNumber = "";

})

numbers.forEach(number => number.addEventListener('click', (e) => {
  clickNumber(e.target.textContent);
}));

operators.forEach(op => op.addEventListener('click', (e) => {
  clickOp(e.target.textContent);
}));


function clickNumber(number) {
  if (currentNumber.length > 15) return;
  currentNumber += number;
  display.textContent = currentNumber;
}

function clickOp(op) {
  if (!operator) {
    previousNumber = currentNumber;
    currentNumber = "";
  }
  else {
    if (previousNumber && currentNumber) {
      let result = operate(operator, previousNumber, currentNumber)
      if (result % 1 !== 0) {
        result = Math.round(result * 10) / 10
      }
      previousNumber = result;
      currentNumber = ""
      display.textContent = result
    }
  }
  operator = op;
}