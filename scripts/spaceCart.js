

export const spaceCartButton = () => {
    return `<button id="spaceCartBtn">Purchase Mineral</button>`
}

export const addOrderButtonListener = () => {
    document.querySelector("#spaceCartBtn").addEventListener("click", () => {
        spaceCartButton()
    })
}