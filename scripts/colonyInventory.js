import database from "./database.js"
import { transientState } from "./transientState.js"
 
export const renderColonyInventory = () => {
    if (!transientState.governorId) {
        return <div class="select">Select a governor to view colony inventory</div>
    }
    
    const governor = database.governors.find(gArray => gArray.id === transientState.governorId)
    if (!governor) {
        return <div class="error">Governor not found</div>
    }
    
    const colonyId = governor.colonyId
    const colony = database.colonies.find(cArray => cArray.id === colonyId)
    let colonyName
    if (colony) {
        colonyName = colony.name
    } else {
        colonyName = "Unknown"
    }
    
    const colonyMinerals = database.colonyMineral.filter(cmArray => cmArray.colonyId === colonyId)
    
    if (colonyMinerals.length === 0) {
        return `
            <div class="inventory-empty">
                <div><strong>${colonyName}</strong> has no minerals in inventory.</div>
            </div>`
        
    }
    
    const inventoryItems = colonyMinerals.map(colonyMinerals => {
            const mineral = database.minerals.find(mArray => mArray.id === colonyMinerals.mineralId)
            if (!mineral) return ""
            return `
                <li class="inventory-item">
                    <div class="item-name">${mineral.name}</div>
                    <div class="item-qty">${colonyMinerals.quantity} tons</div>
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