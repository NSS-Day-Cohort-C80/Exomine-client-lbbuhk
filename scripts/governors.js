import { setGovernorChoice, getSelectedGovernorId } from "./TransientState.js"

export const addGovernorListener = (changeEvent) => {
    if (changeEvent.target.id === "governor") {
        const chosenOption = parseInt(changeEvent.target.value)
        setGovernorChoice(chosenOption)
        document.dispatchEvent(new CustomEvent("governorSelected"))
    }
}
document.addEventListener("change", addGovernorListener)

export const renderGovernors = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governor = await response.json()
    const selectedGovernorId = getSelectedGovernorId()

    const governorDropDown = governor.map((governor) => {
        let saveSelection = ""
        if (governor.id === selectedGovernorId) {
            saveSelection = "selected"
        }
        return `<option value="${governor.id}" ${saveSelection}>${governor.name}</option>`
    })
      return `<div>
            <select id="governor">
                <option value="0">Choose a governor...</option>
                ${governorDropDown.join("")}
            </select>
        </div>
        `
}