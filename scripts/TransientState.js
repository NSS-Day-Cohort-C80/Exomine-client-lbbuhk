const state = {
    selectedMineralId: null,
    selectedFacilityId: null,
    selectedGovernorId: null
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

// getter functions
export const getSelectedFacilityId = () => {
    return state.selectedFacilityId
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
