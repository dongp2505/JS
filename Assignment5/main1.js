"use strict";


function fetchLabels() {
    fetch("https://gist.githubusercontent.com/ProfWendi/df54b0d51d29f18c948fe2713eaae470/raw/1de1c325ad688d23b7affdb8f7120a5c84ac989c/labels.json")
    .then(response => response.json())
        
        
    .then(data => {
        planets = null;
        console.log(data);
    })
}
fetchLabels()



let planets = null; // will hold a collection of planet objects from .json
let prompts = null; // will hold an array of prompt strings from .json
//let images = [];  // preloader bonus


// event handler object: part of Task 3
let planetData = {
   
};