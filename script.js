let methods = {
  "+": (a, b) => a + b,
  "−": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

let num1;
let num2;
let operator;

const operate = function (num1, operator, num2) {
  return methods[operator](num1, num2);
};

const container = document.querySelector("#container");
const result = document.createElement("div");
result.setAttribute("class", "result");
result.textContent = "";
const numArea = document.createElement("div");
numArea.setAttribute("class", "num");
const opArea = document.createElement("div");
opArea.setAttribute("class", "op");

// To contain the divs for number and operator buttons
const inputArea = document.createElement("div");
inputArea.setAttribute("class", "input");

// Get 1-9 in an array
const NUMS = Array.from(Array(9).keys()).map((d) => d + 1);
// Add the other buttons
const INPUTS = NUMS.concat(["C", 0, "."]);

const OPERATORS = ["+", "−", "×", "÷", "="];

for (const i of INPUTS) {
  let div = document.createElement("div");
  div.textContent = i;
  if (i === ".") {
    div.setAttribute("class", "decimal");
  }
  else if (i === "C") {
    div.setAttribute("class", "cancel");
  }
  numArea.appendChild(div);
}

for (const i of OPERATORS) {
  let div = document.createElement("div");
  div.textContent = i;

  opArea.appendChild(div);
}

inputArea.appendChild(numArea);
inputArea.appendChild(opArea);

container.appendChild(result);
container.appendChild(inputArea);

let value = "";
let is_eval = false;
let allow_decimal = true;

function updateDisplay(text) {
  if (
    result.textContent.match("Error! Please clear and start again") ||
    result.textContent.match("Are you trying to be funny?")
  ) {
    result.textContent = "";
  }
  if (text === "C") {
    result.textContent = "";
  } else {
    result.textContent += text;
  }
}

function clickFunc(e) {
  let text = e.target.textContent;

  if (text === "."){
    text = allow_decimal ? "." : "";
  }

  value += text;

  console.log(value);

  let numArr = Array.from(
    value.matchAll(/\-{0,1}\.{0,1}\d{1,}\.{0,1}\d{0,}/g)
  ).flat();
  let opArr = value
    .split(/\.{0,1}\d{1,}/)
    .filter((d) => d !== "" && d !== "." && d !== "-");
  console.log(numArr, opArr);

  // If user enters [num] after receiving a result, reset to the new [num]
  if (is_eval && NUMS.includes(Number(text))) {
    updateDisplay("C");
    value = text;
    is_eval = false;
  }



  // Disable decimal button if 1) 1st num already has a decimal
  // 2) 2nd num already has a decimal if input is [num] [op] [num]

  let decimalBtn = document.querySelector(".decimal")
  if (text === "." && numArr.length === 1 && numArr[0].includes(".") || text === "." && numArr.length > 1 && numArr[1].includes(".") ){
    allow_decimal = false;
    decimalBtn.style.setProperty('opacity', '0.5');

  }

  if (numArr.length > 1 && !numArr[1].includes(".")){
    allow_decimal = true;
    decimalBtn.style.setProperty('opacity', '1');
  }

  updateDisplay(text);

  // If user enters "=" or a 2nd operator after entering [num] [op] [num]
  if (text === "=" || (numArr.length === 2 && opArr.length === 2)) {
    [num1, num2] = numArr.map((d) => Number(d));
    operator = opArr[0];

    // Then check if logic is correct; if incorrect, return error message
    if (
      OPERATORS.includes(value.slice(0, 1)) ||
      opArr[0].length > 1 ||
      (numArr.length === 1 && opArr.length === 1)
    ) {
      updateDisplay("C");
      updateDisplay("Error! Please clear and start again");
      value = "";
    } else if (num2 === 0 && operator === "÷") {
      updateDisplay("C");
      updateDisplay("Are you trying to be funny?");
      value = "";
    }

    // Otherwise,if logic is correct, evaluate
    else {
      let roundedValue = Math.round(operate(num1, operator, num2) * 100) / 100;
      // If 2nd operator is "=", display only the result. Otherwise, display result & next operator
      value = roundedValue.toString() + opArr[1];
      value = value.replace("=", "");
      updateDisplay("C");
      updateDisplay(value);
      is_eval = true;
      allow_decimal = true;
      decimalBtn.style.setProperty('opacity', '1');
    }
  } else if (text === "C") {
    updateDisplay(text);
    value = "";
  }
}

inputArea.addEventListener("click", clickFunc);
