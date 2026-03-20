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

    const colonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMinerals = await colonyMineralsResponse.json()

    const existingMineral = colonyMinerals.find(cm => 
    cm.mineralId === mineralId &&
    (cm.colonyId === colonyId || cm.colonyId === undefined)
)

    let response

    if (existingMineral) {
        const updatedQuantity = existingMineral.quantity + quantityToPurchase
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
    if (response.ok) {
        const result = await response.json()
        const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals")
            const facilityMinerals = await facilityMineralsResponse.json()

            const facilityMineral = facilityMinerals.find(fm => fm.facilityId === facilityId && fm.mineralId === mineralId)

            if (facilityMineral) {
                const newQuantity = facilityMineral.quantity - quantityToPurchase

                const facilityMineralId = facilityMineral.id

                console.log("Facility mineral id:", facilityMineralId)
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
            }
        const updatedColonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
        const updatedColonyMinerals = await updatedColonyMineralsResponse.json()
        const thisColonyMinerals = updatedColonyMinerals.filter(cm => cm.colonyId === colonyId)
        setColonyMinerals(thisColonyMinerals)
        document.dispatchEvent(new CustomEvent("stateChanged"))
    } else {
    }
    const customEvent = new CustomEvent("orderSubmitted")
    document.dispatchEvent(customEvent)
}
