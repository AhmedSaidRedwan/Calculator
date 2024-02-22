const toggleElement = document.querySelector(".themes__toggle");
const toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};

const toggleDarkThemeWithEnter = (event) => {
  if (event.key === "Enter") {
    toggleDarkTheme();
  }
};

toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);
toggleElement.addEventListener("click", toggleDarkTheme);

// Logic For Calculate
let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElement = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberBottonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateScreen(currentNumber);
};

const resetBottonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteBottonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateScreen(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};
const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) executeOperation();
  }
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberBottonHandler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetBottonHandler();
          break;
        case "Backspace":
          deleteBottonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};
keyElement.forEach(keyElementsHandler);

//Use keyboard as input source
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  "Backspace",
  "Enter",
  "c",
];

window.addEventListener("keydown", (event) => {
  keyboardWithoutHover(event.key);
});

const keyboardWithoutHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 100);
  }
};
