
const form = document.querySelector("form");
const buttons = form.querySelectorAll("button");
const label = document.querySelector("#input");
const userInput = form.elements["userInput"];



label.textContent = "";
userInput.value = "";

function handleSubmitClick(textContent) {
  if (textContent === equalsSign) {
    handleEqualsClick(label, userInput);
  } else if (textContent === percentageSign) {
    handlePercentageClick(userInput, label);
  } else {
    handleOtherOperatorsClick(textContent, userInput, label);
  }
}

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    switch (this.type) {
      case "submit":
        handleSubmitClick(this.textContent);
        break;
      case "reset":
        handleResetClick(label, form);
        break;
      case "button":
        handleButtonClick(this.textContent, userInput);
        break;
      default:
        break;
    }
  });
});

userInput.addEventListener("input", function() {
  this.value = this.value.match(/[0-9.]*/)[0];
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
});

form.addEventListener("reset", function() {
  clearResult();
});



const percentageSign = "%";
const minusSign = "-";
const equalsSign = "=";
const plusMinusSign = "+/-";
let result;

function clearResult() {
  result = undefined;
}

function cleanExpression(expression) {
  return expression
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/x/g, "*")
    .replace(/X/g, "*")
    .replace(/\s/g, "")
    .replace(/%/g, " / 100");
}

function calculate(expression) {
  try {
    return eval(cleanExpression(expression));
  } catch (error) {
    form.reset();
    clearResult();
    label.textContent = "";
    console.log(error);
  }
}

function handleEqualsClick(label, userInput) {
  if (!result) {
    if (userInput.value) {
      label.textContent = `${label.textContent} ${userInput.value}`;
      result = calculate(label.textContent);
      userInput.value = result;
    }
  } else {
    label.textContent = result;
  }
}

function handlePercentageClick(userInput, label) {
  if (userInput.value) {
    label.textContent = `${label.textContent} ${userInput.value} %`;
    result = userInput.value / 100;
    userInput.value = result;
  }
}

function handleMinusClick(userInput) {
  userInput.value = minusSign;
}

function handleOtherOperatorsClick(operator, userInput, label) {
  if (userInput.value) {
    const expression = result
      ? `${label.textContent} ${operator}`
      : `${label.textContent} ${userInput.value} ${operator}`;
    result = result && undefined;
    label.textContent = expression;
    userInput.value = "";
  } else {
    if (operator === minusSign) {
      handleMinusClick(userInput);
    }
  }
}

function handleResetClick(label, form) {
  label.innerHTML = "";
  form.reset();
}

function handleButtonClick(textContent, userInput) {
  if (textContent === plusMinusSign) {
    userInput.value = +userInput.value * -1;
  } else {
    userInput.value = `${userInput.value}${textContent}`;
  }
}

