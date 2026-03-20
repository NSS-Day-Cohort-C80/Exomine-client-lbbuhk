import { getSelectedMineralId, getSelectedFacilityId, setColonyMinerals, getSelectedGovernorId } from "./TransientState.js"
import { spaceCartButton as submitOrder } from "./TransientState.js"


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
    document.querySelector("#spaceCartBtn").addEventListener("click", async () => {
        const selectedFacility = getSelectedFacilityId()
        const selectedMineral = getSelectedMineralId()
        const selectedGovernor = getSelectedGovernorId()

        if (!selectedFacility || !selectedMineral || !selectedGovernor) {
           
            return
        }

        try {
            // Call the TransientState spaceCartButton to submit the order
            await submitOrder()
            
           
            
            // Dispatch custom event to trigger UI refresh
            document.dispatchEvent(new CustomEvent("mineralsPurchased"))
            
        } catch (error) {
            
        }
    })
}

// Listen for order submission success
document.addEventListener("orderSubmitted", async () => {
    // You can add any additional UI updates here after order is submitted
    console.log("Order submitted successfully")
})