import { buildPreview } from "./build-preview.js";


document.addEventListener("DOMContentLoaded", function(e) {
    buildPreview();

    const specifiedDate = document.getElementById("input-cell-date-sm-preview");
    specifiedDate.addEventListener('change', () => {
        buildPreview();
    })
})