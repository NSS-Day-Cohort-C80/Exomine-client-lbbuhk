export const addWheelListener = (changeEvent) => {
    if (changeEvent.target.id === "governor") {
        const chosenOption = parseInt(changeEvent.target.value)
        setWheelChoice(chosenOption)
    }
}
document.addEventListener("change", addWheelListener)

export const Governors = async () => {
    const response = await fetch("http://localhost:8088/wheels")
    const wheels = await response.json()

    const wheelDropDown = wheels.map((wheel) => {
        return `<option value="${wheel.id}">${wheel.size}</option>`
    })

    return `
        <div>
            <select id="wheel">
                <option value="0">Select a set of wheels...</option>
                ${wheelDropDown.join("")}
            </select>
        </div>
    `
}