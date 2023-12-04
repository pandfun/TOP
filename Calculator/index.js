const resPara = document.querySelector(".res-target")
const calBtnContainer = document.querySelector(".num-btns")

const calBtn = calBtnContainer.querySelectorAll("button")

let selectedOpBtn
let number1 = 0
let number2 = 0

let canClearRes = true

calBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let btnVal = e.target.innerText

        if (btnVal === "A/C") {
            resPara.innerText = "0"
            if (selectedOpBtn) selectedOpBtn.classList.remove("highlight")

            return
        } else if (btnVal >= "0" && btnVal <= "9") {
            if (!selectedOpBtn) {
                number1 = number1 * 10 + Number(btnVal)
            } else {
                number2 = number2 * 10 + Number(btnVal)
            }
        } else if (btnVal === "=") {
            resPara.innerText = calculate(
                number1,
                number2,
                selectedOpBtn.innerText
            )
            canClearRes = true
            if (selectedOpBtn) selectedOpBtn.classList.remove("highlight")

            number1 = 0
            number2 = 0

            return
        } else {
            // If there is an existing operator selected, replace it
            if (selectedOpBtn) selectedOpBtn.classList.remove("highlight")

            selectedOpBtn = e.target
            e.target.classList.add("highlight")
        }

        // For special conditions where clicking a button
        // should clear anything there in result window
        if (canClearRes) {
            resPara.innerText = btnVal
            canClearRes = false

            return
        }

        resPara.innerText += btnVal
    })
})

const calculate = (a, b, op) => {
    a = Number(a)
    b = Number(b)

    switch (op) {
        case "+":
            return a + b
        case "-":
            return a - b
        case "*":
            return a * b
        case "/":
            if (b == 0) return "Invalid Operation"
            return a / b
        default:
            "Unknown behaviour"
    }
}
