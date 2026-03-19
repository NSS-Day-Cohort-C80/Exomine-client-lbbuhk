import { renderGovernors } from "./governors.js"
import { renderFacilities, renderFacilityInventory } from "./facilities.js"
import { /*renderSpaceCart,*/ spaceCartButton } from "./spaceCart.js"
import { renderColonyInventory } from "./colonyInventory.js"


const container = document.querySelector("#container")

const render = async () => {
    const governorsHTML = await renderGovernors()
    const facilitiesHTML = await renderFacilities()
    const facilityInventoryHTML = await renderFacilityInventory()
    const colonyInventoryHTML = await renderColonyInventory()
//    const spaceCartHTML = /*await*/ renderSpaceCart()
    const spaceButton = spaceCartButton()



    const composedHTML = `
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
          <section class="facility_inventory">
            ${facilityInventoryHTML}
        </section>
      </article>
        
      <section class="radio_facility_inventory">
          ${colonyInventoryHTML}
      </section>
        

      <article class="order">
      <h2>Space Cart</h2>
          ${spaceButton}
      </article>`

//       <article class="customOrders">
//           <h2>Space Cart</h2>
//           ${spaceCartHTML}
//       </article>
//   `
    container.innerHTML = composedHTML
}

document.addEventListener("facilitySelected", render)
document.addEventListener("governorSelected", render)
document.addEventListener("radioMineralSelected", render)

render()
