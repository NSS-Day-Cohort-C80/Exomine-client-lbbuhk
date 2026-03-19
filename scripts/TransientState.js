const state = {
    selectedMineralId: null,
    selectedFacilityId: null,
    selectedGovernorId: null,
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
   
   const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    }
// const response = await fetch("http://localhost:8088/facilityMinerals?_expand=facility&_expand=mineral", postOptions)
// const facilityInfo = await response.json()
// const customEvent = new CustomEvent("orderSubmitted")
// document.dispatchEvent(customEvent)
// }

// const governorsResponse = await fetch("http://localhost8088:/governors")
// const governors = await governorsResponse.json()
// /*

//     PUT method 
// colonyMinerals.quantity++
// facilityMinerals.quantity--
// } else {
//     POST method
//     colonyMinerals.push(
//         {
//             "colonyId": response,
//             "mineralId": 4,
//             "quantity": 1
//         }
//     )
// }
// */
// if (governors.id === selectedGovernorId) {
//     const govColId = governors.colonyId
//     if (govColId === colonies.id) {
//         const colonyName = colonies.name
//         return colonyName
//     }
}
