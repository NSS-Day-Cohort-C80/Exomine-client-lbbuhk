* main.js
    * call relevant functions and render html.
    * add event change listeners that will re-render the page when a change occurs. (4?)

* transientState.js
    * hold selected mineral purchases before it's saved to the permanent state.
    * create and export setter functions.

    const transientState = {
        mineralId: null,
        facilityId: null,
        governorId: null
    }

* governors.js
    * render governor selection dropdown menu.
    * import governor setter function.

* facilities.js
    * render the dropdown menu of available facilities.
    * import facilities setter function.
    * render the amount of minerals available for purchase from the selected facility --- MiningFacilityMineral table in the ERD

* colonyInventory.js 
    * render the colony's current inventory (the displayed colony is dependant on the currently selected governor) --- ColonyMineral table in the ERD
    * pushing transient data should update the colony inventory

* spaceCart.js
    * render transient data that the governor wishes to purchase for the colony.
    * render a purchase mineral button that commits transient data to permanent data.

* main.css
    * make it look pretty

* index.html
    * boilerplate go brrr