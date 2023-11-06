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
  return methods[operator](num1)(num2);
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
const inputArea = document.createElement("div")
inputArea.setAttribute("class", "input");

// Get 1-9 in an array
const NUMS = Array.from(Array(9).keys()).map((d) => d + 1);
// Add the other buttons
const INPUTS = NUMS.concat(["C", 0, "."]);

const OPERATORS = ["+", "−", "×", "÷", "="];
for (const i of INPUTS) {
  let div = document.createElement("div");
  div.textContent = i;
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
container.appendChild(inputArea)



let value = "";
let answer;

function updateDisplay(text) {
  if (text === "C") {
    result.textContent = "";
  } else {
    result.textContent += text;
  }
}

function clickFunc(e){
    let text = e.target.textContent;
    value += text;
    console.log(value);
    if (text === "=") {
      // Check if logic is correct; if incorrect, return error message
  
      if (OPERATORS.concat(".").includes(value.slice(0, 1))) {
        updateDisplay("C");
        updateDisplay("Error!");
      }
      // If correct, return evaluation

  
    } else if (text === "C") {
      updateDisplay(text);
      value = "";
    } else {
      updateDisplay(text);
    }
  }

inputArea.addEventListener("click", clickFunc);
