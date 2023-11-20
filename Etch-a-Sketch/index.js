const renderBtn = document.getElementById("render-btn")
const rowInput = document.getElementById("row-input")
const colInput = document.getElementById("col-input")
const clrBtn = document.getElementById("clear-render")

renderBtn.addEventListener("click", () => {
    const rows = rowInput.value
    const cols = colInput.value

    if (rows === NaN || cols === NaN) {
        alert("Please enter a valid number!")
        return
    }

    if (rows > 100 || cols > 100) {
        alert("Did not render")
        return
    }

    renderGrid(rows, cols)
})

clrBtn.addEventListener("click", () => {
    const rows = rowInput.value
    const cols = colInput.value

    if (rows === NaN || cols === NaN) {
        alert("Please enter a valid number!")
        return
    }

    if (rows > 100 || cols > 100) {
        alert("Did not render")
        return
    }

    renderGrid(rows, cols)
})

const renderGrid = (rows, cols) => {
    const containerDiv = document.querySelector(".container")
    containerDiv.innerHTML = ""

    for (let i = 0; i < rows; ++i) {
        const rowContainerDiv = document.createElement("div")
        rowContainerDiv.classList.add("row-container")

        for (let i = 0; i < cols; ++i) {
            gridBoxDiv = document.createElement("div")
            gridBoxDiv.classList.add("grid-box")

            // gridBoxDiv.innerHTML = `${i}`

            gridBoxDiv.addEventListener("mouseover", (e) => {
                handleGridHovering(e.target)
            })

            rowContainerDiv.appendChild(gridBoxDiv)
        }

        containerDiv.appendChild(rowContainerDiv)
    }
}

const handleGridHovering = (targetDiv) => {
    if (targetDiv) {
        targetDiv.style.backgroundColor = `rgb(${Math.random() * 255}, ${
            Math.random() * 255
        }, ${Math.random() * 255})`
        console.log("inside hover")
    }
}
