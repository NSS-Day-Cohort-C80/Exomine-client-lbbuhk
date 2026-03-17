//import { setFacilityChoice } from "./TransientState.js"

const handleFacilityChoice = (changeEvent) => {
    if(changeEvent.target.dataset.type === "facility") {
        const convertedToInteger = parseInt(changeEvent.target.value)
        setFacilityChoice(convertedToInteger)
    }
}


export const renderFacilities = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()
    
    const facilitiesHTML = facilities.map(
        (facility) => {
            return `<option data-type="facility" name="${facility.name}" value="${facility.id}" />${facility.name}</option>`
        }
    )

    let html = `
        <div>
            <select id="facility">
                <option value="0">Select a facility</option>
                `
    html += facilitiesHTML.join("")
    html += `
        </select>
    </div>
    `

    return html
}

