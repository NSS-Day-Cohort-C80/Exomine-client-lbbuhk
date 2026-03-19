import { renderGovernors } from "./governors.js"
import { renderFacilities, renderFacilityInventory } from "./facilities.js"
import { mineralToPurchase, spaceCartButton, addOrderButtonListener } from "./spaceCart.js"
import { renderColonyInventory } from "./colonyInventory.js"


const container = document.querySelector("#container")

const render = async () => {
    const governorsHTML = await renderGovernors()
    const facilitiesHTML = await renderFacilities()
    const facilityInventoryHTML = await renderFacilityInventory()
    const colonyInventoryHTML = await renderColonyInventory()
    const spaceCartHTML = await mineralToPurchase()
    const spaceButton = spaceCartButton()



    const composedHTML = `
    <h1>Solar System Mining Marketplace</h1>
    <div class="main-wrapper">
        <!-- Left Column -->
        <div class="left-column">
            <article class="dropdown_menus">
                <section class="dropdown_governor_choices">
                    <h2>Choose a governor</h2>
                    ${governorsHTML}
                </section>
                <section class="dropdown_facility_choices">
                    <h2>Choose a facility</h2>
                    ${facilitiesHTML}
                </section>
            </article>
            
            <section class="facility_inventory">
                ${facilityInventoryHTML}
            </section>
        </div>
        
        <!-- Right Column -->
        <div class="right-column">
            <section class="radio_facility_inventory">
                <h2>Colony Minerals</h2>
                ${colonyInventoryHTML}
            </section>
            
            <article class="customOrders">
                <h2>Space Cart</h2>
                ${spaceButton}
                ${spaceCartHTML}
            </article>
        </div>
    </div>
`

container.innerHTML = composedHTML

// Attach the event listener to the button after it's rendered to the DOM
addOrderButtonListener()
}

document.addEventListener("facilitySelected", render)
document.addEventListener("governorSelected", render)
document.addEventListener("radioMineralSelected", render)
document.addEventListener("mineralsPurchased", render)
render()