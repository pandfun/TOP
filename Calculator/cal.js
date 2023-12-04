const result = document.querySelector(".res-target");
const calcBtns = document.querySelectorAll("button");

calcBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btnClickHandler(btn);
    });
});

// Flag to specify if the screen can be cleared before printing
let canClearRes = true;
let selectedOperator = undefined;

let num1 = 0; // First number
let num2 = 0; // Second number

let n1DeciLen = 0; // Number of decimal places for n1
let n2DeciLen = 0; // Number of decimal places for n2

let n1Deci = false; // If n1 has decimal places
let n2Deci = false; // If n2 has decimal places

const btnClickHandler = (clickedBtn) => {
    const clickedBtnTxt = clickedBtn.innerText;

    if (clickedBtnTxt == "A/C") {
        handleAcClick();
    } else if (clickedBtnTxt >= "0" && clickedBtnTxt <= "9") {
        handleNumClick(clickedBtn);
    } else if (clickedBtnTxt === ".") {
        handleDotClick();
    } else if (clickedBtnTxt === "=") {
        handleEqClick();
    } else {
        handleOpClick(clickedBtn);
    }
};

// A/C button clicked
const handleAcClick = (ClearRes = true) => {
    if (selectedOperator != undefined) {
        selectedOperator.classList.remove("highlight");
        selectedOperator = undefined;
    }

    console.log(`ClearRes vaue = ${ClearRes}`);

    if (ClearRes) {
        // Executed when function called on 'A/C click

        result.innerText = "0";

        console.log("here");

        num1 = Number(0);
        num2 = Number(0);

        n1Deci = false;
        n2Deci = false;

        n1DeciLen = 0;
        n2DeciLen = 0;

        canClearRes = true;
    } else {
        // Executed when function is called in '=' handler

        num1 = Number(result.innerText);

        num2 = Number(0);
        n2Deci = false;
        n2DeciLen = 0;
    }
};

// Number button clicked
const handleNumClick = (clickedBtn) => {
    let curNum = Number(clickedBtn.innerText);

    if (selectedOperator == undefined) {
        if (n1Deci) {
            for (let i = 0; i <= n1DeciLen; ++i) curNum / 10;
            n1DeciLen++;
            num1 = num1 + curNum;
        } else num1 = num1 * 10 + curNum;
    } else {
        if (n2Deci) {
            for (let i = 0; i <= n2DeciLen; ++i) curNum / 10;
            n2DeciLen++;
            num2 = num2 + curNum;
        } else num2 = num2 * 10 + curNum;
    }

    if (canClearRes) {
        result.innerText = clickedBtn.innerText;
        canClearRes = false;
        return;
    }

    result.innerText += clickedBtn.innerText;
};

// Decial (.) button clicked
const handleDotClick = () => {
    if (canClearRes) {
        canClearRes = false;
        result.innerText = ".";
    } else result.innerText += ".";

    if (selectedOperator === undefined) n1Deci = true;
    else n2Deci = true;
};

// Equal (=) button clicked
const handleEqClick = () => {
    result.innerText = String(
        calculate(num1, num2, selectedOperator.innerText)
    );

    if (result.innerText === "Err" || result.innerText === "0") {
        handleAcClick();
    } else handleAcClick(false);
};

// Operator button clicked
const handleOpClick = (clickedBtn) => {
    if (selectedOperator != undefined) {
        num1 = calculate(num1, num2, selectedOperator.innerText);
        num2 = 0;

        result.innerText = String(num1);

        selectedOperator.classList.remove("highlight");
    }

    selectedOperator = clickedBtn;
    clickedBtn.classList.add("highlight");

    result.innerText += clickedBtn.innerText;
};

// Calculate the result
const calculate = (num1, num2, op) => {
    console.log(num1);
    console.log(num2);
    console.log(op);

    switch (op) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) return "Err";

            return num1 / num2;
        case "%":
            if (num2 === 0) return "Err";

            return num1 % num2;
        default:
            return "Err";
    }
};
