import { getSelectedMineralId, getSelectedFacilityId } from "./TransientState.js"




export const mineralToPurchase = async () => {
    
    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()
    
    const facilitiesResponse = await fetch("http://localhost:8088/facilities")
    const facilities = await facilitiesResponse.json()

    const selectedFacility = getSelectedFacilityId()
    const selectedMineral = getSelectedMineralId()

    const mineral = minerals.find(mArray => mArray.id === selectedMineral)
    const facility = facilities.find(fArray => fArray.id === selectedFacility)
    
    if(!selectedFacility || !selectedMineral) {
        return ""
    } else {
        return`<p> 1 ton of ${mineral.name} from ${facility.name}</p>`
    }
}


export const spaceCartButton = () => {
    return `<button id="spaceCartBtn">Purchase Mineral</button>`
}

export const addOrderButtonListener = () => {
    document.querySelector("#spaceCartBtn").addEventListener("click", () => {
        spaceCartButton()
    })
}

/**
import { getSelectedMineralId } from "./TransientState"

const mineralsResponse = await fetch("http://localhost:8088/minerals")
const minerals = await mineralsResponse.json()
const facilitiesResponse = await fetch("http://localhost:8088/facilities")
const facilities = await facilitiesResponse.json()
const selectedFacility = getSelectedfacilityId()
const selectedMineral = getSelectedMineralId()

 */