let form = document.querySelector("form");

class DivideByZeroError extends Error {
  constructor(message) {
    super(message);
    this.name = "DivideByZeroError";
  }
}

window.onerror = function (message, source, lineno, colno, error) {
  console.log("Global error caught by window.onerror:", message);
  return false; // Let the browser log it normally too
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const output = document.querySelector("output");
  const firstRaw = document.querySelector("#first-num").value.trim();
  const secondRaw = document.querySelector("#second-num").value.trim();
  const operator = document.querySelector("#operator").value;

  try {
    const firstNum = Number(firstRaw);
    const secondNum = Number(secondRaw);

    if (firstRaw === "" || Number.isNaN(firstNum)) {
      throw new SyntaxError("First number is not a valid number.");
    }
    if (secondRaw === "" || Number.isNaN(secondNum)) {
      throw new SyntaxError("Second number is not a valid number.");
    }
    if (operator === "/" && secondNum === 0) {
      throw new DivideByZeroError("Cannot divide by zero.");
    }

    let result;
    switch (operator) {
      case "+":
        result = firstNum + secondNum;
        break;
      case "-":
        result = firstNum - secondNum;
        break;
      case "*":
        result = firstNum * secondNum;
        break;
      case "/":
        result = firstNum / secondNum;
        break;
      default:
        throw new Error("Unknown operator.");
    }

    output.textContent = result;
  } catch (err) {
    console.error("Calculation error:", err);
    output.textContent =
      err instanceof Error ? err.message : "Unexpected error";
  } finally {
    console.log("Finished calculation");
  }
});

const errorBtns = Array.from(document.querySelectorAll("#error-btns > button"));

errorBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    const action = event.currentTarget.dataset.action;
    if (action && typeof window[action] === "function") {
      window[action]();
    }
  });
});

function consoleLog() {
  console.log("Console.log demo:", {
    status: "running",
    count: 1,
    next: "check error buttons",
  });
}

function consoleErr() {
  console.error("Console.error demo:", {
    errorCode: 502,
    reason: "Demo error",
  });
}

function consoleCount() {
  console.count("Console Count button clicked");
}

function consoleWarn() {
  console.warn("Console.warn demo: a warning has been issued");
}

function consoleAssert() {
  const valid = false;
  console.assert(valid, "Console.assert demo: value was expected to be true");
}

function consoleClear() {
  console.clear();
  console.log("Console cleared.");
}

function consoleDir() {
  const user = {
    id: 23,
    name: "Sample User",
    permissions: ["read", "write", "debug"],
  };
  console.dir(user);
}

function consoleDirxml() {
  const element = document.getElementById("error-btns");
  console.dirxml(element);
}

function consoleGroupStart() {
  console.group("Grouped Logs");
  console.log("First grouped message");
  console.warn("Second grouped warning");
  console.groupEnd();
}

function consoleGroupEnd() {
  console.log("Group end requested. See previous grouped logs if any.");
}

function consoleTable() {
  const data = [
    { name: "Alice", age: 25, role: "student" },
    { name: "Bob", age: 30, role: "teacher" },
    { name: "Charlie", age: 22, role: "assistant" },
  ];
  console.table(data);
}

function startTimer() {
  console.time("MyTimer");
  console.log("Timer started");
}

function endTimer() {
  console.timeEnd("MyTimer");
}

function consoleTrace() {
  console.trace("Trace button clicked");
}

function triggerGlobalError() {
  randFunc();
}
