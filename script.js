let methods = {
  add: (a, b) => a + b,
  substract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

let num1;
let num2;
let operator;

const operate = function (num1, operator, num2) {
  return methods[operator](num1)(num2);
};

const container = document.querySelector("#container");
const result = document.createElement("div")
result.setAttribute('class', 'result')
result.textContent = ""
const inputArea = document.createElement("div")
inputArea.setAttribute('class', 'input');
const opArea = document.createElement("div")
opArea.setAttribute('class', 'op');

// Get 1-9 in an array
const NUMS = Array.from(Array(9).keys()).map(d => d + 1) 
// Add the other buttons
const INPUTS = NUMS.concat( ["C", 0, "."]);

const OPERATORS = ["+", "−", "×", "÷","="]

for (const i of INPUTS){
    let div = document.createElement("div");
    div.textContent = i;
    inputArea.appendChild(div)
}

for (const i of OPERATORS){
    let div = document.createElement("div");
    div.textContent = i;
    opArea.appendChild(div)
}

container.appendChild(result)
container.appendChild(inputArea);
container.appendChild(opArea)

let value = "";
let answer;

function updateDisplay(text){
    if (text === "C"){
        result.textContent = "";
    }
    else {result.textContent += text}
}


container.addEventListener("click", (e) => {
    let text = e.target.textContent;
    value += text;
    console.log(value)
    if (text === "="){
        // Check if logic is correct
        if (OPERATORS.concat(".").includes(value.slice(0,1))){
            updateDisplay("C");
            updateDisplay("Error!")
        }
        // If incorrect, return error message


        // If correct, return evaluation
        return;
}

else if (text === "C"){
    updateDisplay(text);
    value = "";
}
else {
    updateDisplay(text);
}

})