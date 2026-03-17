export const addGovernorListener = (changeEvent) => {
    if (changeEvent.target.id === "governor") {
        const chosenOption = parseInt(changeEvent.target.value)
        setGovernorChoice(chosenOption)
    }
}
document.addEventListener("change", addGovernorListener)

export const renderGovernors = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governor = await response.json()

    const governorDropDown = renderGovernors.map((governor) => {
        return `<option value="${governor.id}">${governor.name}</option>`
    })

    return `
        <div>
            <select id="wheel">
                <option value="0">Select a set of wheels...</option>
                ${governorDropDown.join("")}
            </select>
        </div>
    `
}