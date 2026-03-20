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

export const setGovernorChoice = (governorId, colonyId) => {
    state.selectedGovernorId = governorId
    state.selectedColonyId = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
    console.log(state.selectedColonyId) 
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

        document.dispatchEvent(new CustomEvent("stateChanged"))

    }

export const spaceCartButton = async () => {
   
    const colonyId = state.selectedColonyId
    const mineralId = state.selectedMineralId
    const facilityId = state.selectedFacilityId
    const quantityToPurchase = 1



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
            
            // Now decrease facility minerals by 1
            const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals")
            const facilityMinerals = await facilityMineralsResponse.json()
            
            
            
            // Find the facility mineral entry
            const facilityMineral = facilityMinerals.find(fm => fm.facilityId === facilityId && fm.mineralId === mineralId)
            
           
            
            // Wait for facility mineral update to complete
            if (facilityMineral) {
                const newQuantity = facilityMineral.quantity - quantityToPurchase
                
                
                // Use the facility mineral's id if it exists, otherwise use array index
                const facilityMineralId = facilityMineral.id
                
                console.log("Facility mineral id:", facilityMineralId)
                
                // Update facility minerals
                const updateResponse = await fetch(`http://localhost:8088/facilityMinerals/${facilityMineralId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: facilityMineralId,
                        facilityId: facilityId,
                        mineralId: mineralId,
                        quantity: newQuantity
                    })
                })
                
                console.log("Facility update response status:", updateResponse.status)
            } else {
                console.log("No matching facility mineral found for facilityId:", facilityId, "mineralId:", mineralId)
            }
            
            // Fetch updated colonyMinerals and update state
            const updatedColonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
            const updatedColonyMinerals = await updatedColonyMineralsResponse.json()
            
            // Filter to just this colony's minerals
            const thisColonyMinerals = updatedColonyMinerals.filter(cm => cm.colonyId === colonyId)
            console.log("Updated colony minerals:", thisColonyMinerals)
            
            setColonyMinerals(thisColonyMinerals)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        } else {
            const errorText = await response.text()
            console.error("Backend error:", errorText)
        }
        
        const customEvent = new CustomEvent("orderSubmitted")
        document.dispatchEvent(customEvent)
}
