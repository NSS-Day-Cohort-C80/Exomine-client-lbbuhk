import { setGovernorChoice, getSelectedGovernorId, } from "./TransientState.js"

export const addGovernorListener = async (changeEvent) => {
    if (changeEvent.target.id === "governor") {
        const chosenGovernorId = parseInt(changeEvent.target.value)
        
        if (chosenGovernorId !== 0) {
            const response = await fetch("http://localhost:8088/governors")
            const governors = await response.json()
            const selectedGovernor = governors.find(gov => gov.id === chosenGovernorId)
            
            if (selectedGovernor && selectedGovernor.colonyId) {
                setGovernorChoice(chosenGovernorId, selectedGovernor.colonyId)
            }
        }
        
        
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