import { setFacilityChoice, setMineralId, getSelectedFacilityId, getSelectedGovernorId, getSelectedMineralId } from "./TransientState.js"




const handleFacilityChoice = (changeEvent) => {
    if(changeEvent.target.dataset.type === "facility") {
        const convertedToInteger = parseInt(changeEvent.target.value)
        setFacilityChoice(convertedToInteger)
        document.dispatchEvent(new CustomEvent("facilitySelected"))
    }
}

const handleFacilityMineralChoice = (changeEvent) => {
    if(changeEvent.target.type === "radio") {
        const convertedToInteger = parseInt(changeEvent.target.value)
        setMineralId(convertedToInteger)
        document.dispatchEvent(new CustomEvent("radioMineralSelected"))
    }
}

export const renderFacilities = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()
    const selectedFacilityId = getSelectedFacilityId()
    const facilitiesHTML = facilities.map(
        (facility) => {
            let saveSelection = ""
            if (facility.id === selectedFacilityId) {
                saveSelection = "selected"
            }
            return `<option name="${facility.name}" value="${facility.id}" ${saveSelection}>${facility.name}</option>` 
        }
    )

    let html = `
        <div>
            <select data-type="facility" id="facility">
                <option value="0">Select a facility</option>
                `
    html += facilitiesHTML.join("")
    html += `
        </select>
    </div>
    `

    return html
}

export const renderFacilityInventory = async () => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    const minerals = await response.json()
    const selectedGovernorId = getSelectedGovernorId()
    const selectedFacilityId = getSelectedFacilityId() 
    const selectedMineralId = getSelectedMineralId()
    if (!selectedGovernorId) {
        return ""
    }

    let facilityName = ""
    const mineralsHTML = minerals.map(
        (mineral) => {
            if (mineral.facilityId === selectedFacilityId) {
                if(!facilityName) {
                    facilityName = `for ${mineral.facility.name}`
                }
            let saveSelection = ""
            if (mineral.mineral.id === selectedMineralId) {
                saveSelection = "checked"
            }
                return `
                <li>
                    <input type="radio" name="mineral" value="${mineral.mineral.id}" ${saveSelection} /> 
                    ${mineral.quantity} tons of ${mineral.mineral.name}
                </li>
                `
            } else {
                return ""
            }
        }).join("")

        let html =`
        <div>
            <h2>Facility Minerals ${facilityName}</h2>
            <ul>
                ${mineralsHTML}
            </ul>
        </div>`
    return html
}

document.addEventListener("change", handleFacilityChoice)
document.addEventListener("change", handleFacilityMineralChoice)