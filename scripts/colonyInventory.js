import { getSelectedGovernorId } from "./TransientState.js"
 
export const renderColonyInventory = async () => {

    // if (!getSelectedGovernorId()) {
    //     return `<div class="select">Select a governor to view colony inventory</div>`
    // }
    const selectedGovernorId = getSelectedGovernorId()
    const governorResponse = await fetch("http://localhost:8088/governors")
    const governors = await governorResponse.json()
    const coloniesResponse = await fetch("http://localhost:8088/colonies")
    const colonies = await coloniesResponse.json()
    const colonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMineral = await colonyMineralsResponse.json()
    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()

    const governor = governors.find(gArray => gArray.id === selectedGovernorId)
    if (!governor) {
        return `<div class="error">Please select a governor.</div>`
    }
    
    const colonyId = governor.colonyId
    const colony = colonies.find(cArray => cArray.id === colonyId)
    let colonyName
    if (colony) {
        colonyName = colony.name
    } else {
        colonyName = "Unknown"
    }
    
    const colonyMinerals = colonyMineral.filter(cmArray => cmArray.colonyId === colonyId)
    
    if (colonyMinerals.length === 0) {
        return `
            <div class="inventory-empty">
                <div><strong>${colonyName}</strong> has no minerals in inventory.</div>
            </div>`
        
    }

    const inventoryItems = colonyMinerals.map(colonyMineralsArray => {
            const mineral = minerals.find(mArray => mArray.id === colonyMineralsArray.mineralId)
            if (!mineral) return ""
            return `
                <li class="inventory-item">
                    <div class="item-name">${mineral.name}</div>
                    <div class="item-qty">${colonyMineralsArray.quantity} tons</div>
                </li>`
            
        }).join("")
    
    return `
        <div class="colony-info">
            <h2>${colonyName}</h2>
            <ul class="inventory-list">
                ${inventoryItems}
            </ul>
        </div>`
    
}