import { renderGovernors } from "./governors.js"
import { renderFacilities } from "./facilities.js"
import { renderSpaceCart } from "./spaceCart.js"
import { renderColonyInventory } from "./colonyInventory.js"


const container = document.querySelector("#container")

const render = async () => {
    const governorsHTML = await renderGovernors()
    const facilitiesHTML = await renderFacilities()
    const colonyInventoryHTML = /*await*/ renderColonyInventory()
    const spaceCartHTML = /*await*/ renderSpaceCart()




    const composedHTML = 
    `
        <h1>Solar System Mining Marketplace</h1>
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
        
     <section class="radio_facility_inventory">
         <h2>Facility Minerals</h2>
         ${colonyInventoryHTML}
     </section>
        

     <article class="order">
         ${buttonHTML}
     </article>

     <article class="customOrders">
         <h2>Space Cart</h2>
         ${spaceCartHTML}
    </article>
`
    container.innerHTML = composedHTML
}

render()