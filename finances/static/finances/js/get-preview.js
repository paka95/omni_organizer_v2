import { buildPreview } from "./build-preview.js";


document.addEventListener("DOMContentLoaded", function(e) {
    // call the GetPreview endpoint at template's onload
    buildPreview();

    const specifiedDate = document.getElementById("input-cell-date-sm-preview");
    specifiedDate.addEventListener('change', () => {
        // call the GetPreview endpoint with the changed date, so that it shows expenses based on this date
        buildPreview();
    })
})