"use strict";


document.addEventListener("DOMContentLoaded", () => {

    let numLevels = document.getElementById("num")
    displayRadioValue()
    displayCheckboxValue()
    document.body.querySelector("submit").onclick = onSubmitClicked;
})

function onSubmitClicked() {
    console.log("Clicked")
}

function displayRadioValue() {
    var fabric = document.getElementsByName("fabric");

    for (let index = 0; index < fabric.length; index++) {
        if (fabric[index].checked == false) {
            console.log("Fabric: " + fabric[index].value);
        }        
    }
    return fabric;
}

function displayCheckboxValue() {
    var checkbox1 = document.getElementById("hammock");
    var checkbox2 = document.getElementById("tube");
    var checkbox3 = document.getElementById("toy");
    var checkbox4 = document.getElementById("scratch");

    if (checkbox1.checked == false) {
        console.log(checkbox1.value)
    }

}


// const estimatedTotal = 