import { getSelectedMineralId } from "./TransientState"

const mineralsResponse = await fetch("http://localhost:8088/minerals")
const minerals = await mineralsResponse.json()
const selectedMineral = getSelectedMineralId()
const mineral = minerals.find(mArray => mArray.id === selectedMineral.mineralId)
export const mineralToPurchase = () => {return`<h2> ${mineral.name}</h2>`}



export const spaceCartButton = () => {
    return `<button id="spaceCartBtn">Purchase Mineral</button>`
}

export const addOrderButtonListener = () => {
    document.querySelector("#spaceCartBtn").addEventListener("click", () => {
        spaceCartButton()
    })
}