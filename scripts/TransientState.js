const state = {
    selectedMineralId: null,
    selectedFacilityId: null,
    selectedGovernorId: null,
    colonyMinerals: [],
    selectedColonyId: null
}

// setter functions
export const setFacilityChoice = (facilityId) => {
    state.selectedFacilityId = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setGovernorChoice = (governorId) => {
    state.selectedGovernorId = governorId
    document.dispatchEvent(new CustomEvent("stateChanged")) 
}

export const setMineralId = (mineralId) => {
    state.selectedMineralId = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyMinerals = (minerals) => {
    state.colonyMinerals = minerals
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setSelectedColonyId = (colonyId) => {
    state.selectedColonyId = colonyId
}

// getter functions
export const getSelectedFacilityId = () => {
    return state.selectedFacilityId
}

export const getSelectedGovernorId = () => {
    return state.selectedGovernorId
}

export const getSelectedMineralId = () => {
    return state.selectedMineralId
}

export const getColonyMinerals = () => {
    return state.colonyMinerals
}

export const getSelectedColonyId = () => {
    return state.selectedColonyId
}

export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */  
        document.dispatchEvent(new CustomEvent("stateChanged"))

    }

export const spaceCartButton = async () => {
   
    const colonyId = state.selectedColonyId
    const mineralId = state.selectedMineralId
    const facilityId = state.selectedFacilityId
    const quantityToPurchase = 1

    console.log("Attempting purchase - Colony:", colonyId, "Mineral:", mineralId, "Facility:", facilityId)

    try {
        // First, fetch all colonyMinerals to check if this colony already has this mineral
        const colonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
        const colonyMinerals = await colonyMineralsResponse.json()
        
        // Find if this colony already owns this mineral
        const existingMineral = colonyMinerals.find(cm => cm.colonyId === colonyId && cm.mineralId === mineralId)
        
        let response
        
        if (existingMineral) {
            // UPDATE existing entry - increase quantity
            const updatedQuantity = existingMineral.quantity + quantityToPurchase
            console.log("Updating existing mineral with id:", existingMineral.id, "New quantity:", updatedQuantity)
            
            response = await fetch(`http://localhost:8088/colonyMinerals/${existingMineral.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: existingMineral.id,
                    colonyId: colonyId,
                    mineralId: mineralId,
                    quantity: updatedQuantity
                })
            })
        } else {
            // CREATE new entry
            console.log("Creating new mineral entry. Quantity:", quantityToPurchase)
            
            response = await fetch("http://localhost:8088/colonyMinerals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    colonyId: colonyId,
                    mineralId: mineralId,
                    quantity: quantityToPurchase
                })
            })
        }
        
        console.log("Response status:", response.status)
        
        if (response.ok) {
            const result = await response.json()
            console.log("Purchase successful:", result)
            
            // Wait a moment, then fetch updated colonyMinerals
            setTimeout(async () => {
                const updatedColonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
                const updatedColonyMinerals = await updatedColonyMineralsResponse.json()
                
                // Filter to just this colony's minerals
                const thisColonyMinerals = updatedColonyMinerals.filter(cm => cm.colonyId === colonyId)
                console.log("Updated colony minerals:", thisColonyMinerals)
                
                setColonyMinerals(thisColonyMinerals)
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }, 100)
        } else {
            const errorText = await response.text()
            console.error("Backend error:", errorText)
        }
        
        const customEvent = new CustomEvent("orderSubmitted")
        document.dispatchEvent(customEvent)
    } catch (error) {
        console.error("Error submitting order:", error)
        const customEvent = new CustomEvent("orderSubmitted")
        document.dispatchEvent(customEvent)
    }
}