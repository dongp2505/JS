"use strict";

let planets = null; // will hold a collection of planet objects from .json
let prompts = null; // will hold an array of prompt strings from .json
let images = [];  // preloader bonus
// Function to fetch the label.json
function fetchLabels() {
    fetch("https://gist.githubusercontent.com/ProfWendi/df54b0d51d29f18c948fe2713eaae470/raw/1de1c325ad688d23b7affdb8f7120a5c84ac989c/labels.json")
    .then(response => response.json())  // Extract JSON data from the response               
    .then(data => {       
        prompts = data;  // put labels into a list of data
    }) 
    // For debugging
    .catch(error => {
        console.log(error);
    })
}

// Function to fetch the planet and create buttons
function fetchPlanetsAndCreateButtons() {
    fetch("https://gist.githubusercontent.com/ProfWendi/df54b0d51d29f18c948fe2713eaae470/raw/1de1c325ad688d23b7affdb8f7120a5c84ac989c/planets.json")
    .then(response => response.json())  // Extract JSON data from the response
    .then(data => {
        planets = data;  // put planets into a list of data

        // Use for loop to create a button, button textContent and button type. Then use addEvent Listener click and mouseover 
        for (let index = 0; index < planets.length; index++) {
            let currentPlanet = planets[index];
            let nav = document.querySelector("main section nav");  // Get the nav in the html
            let button = document.createElement("button");  // Create the button element
            
            let currentButton = currentPlanet.name;  // Declare currentButton equal to the name of the currentPlanet
            button.textContent = currentButton;  // 
            button.type = "button";  // Create type name button for the button element
            button.addEventListener("click", planetData);  // Click the button and will display data of the button by using addEventListener
            button.addEventListener("mouseover", planetData);  // Use addEventListener to hover over when the point mouse hover over the button

            nav.append(button);  // Append button element to navigation element

            // Create image and put it into array images to pre-cache, so that it would load images faster.
            // When the image needs to be used, we can loop through images array and take the image pre-created
            let image = document.createElement("img");  // Create an image element
            image.src = `images/${currentPlanet.img}`;  // Assign source to current planet img
            image.alt = `Picture of ${currentPlanet.name}`;  // Assign alt to current planet name
            images.push(image);  // Add image element to array images
            
        }
    }) 
    // For debugging
    .catch(error => {
        console.log(error);
    })
}

// event handler object: part of Task 3
let planetData = {
    // User function handleEvent
    handleEvent() {
        let planet;  // Declare a new planet
        // Use for loop to take the name of the array planets and make a condition if planets name == target.textContent, it will be break out of the loop
        for (let index = 0; index < planets.length; index++) {
            let name = planets[index].name
            if (name == event.target.textContent) {
                planet = planets[index];
                break;
            }
        }
        let arrayChildren = [];  // Create a new array named arrayChildren
        let div = document.querySelector("main section div");  // Select the div by querySelector main > section > div
        // Create for each loop to take the keyPair from the array prompts
        for (let keyPair of Object.entries(prompts)) {
            // if keyPair not equal URL
            if (keyPair[1] != "URL") {
                let divChild = document.createElement("div");  // Create a div element
                console.log(keyPair);

                let span1 = document.createElement("span");  // Create a span element
                span1.classList.add("lbl");  // Add classList name "lbl" for all span1
                span1.textContent = `${keyPair[1]}: `;  // Add the text content from the array[1] of the keyPair
                divChild.append(span1);  // Append span1 to the divChild

                let span2 = document.createElement("span");  // Create an span element
                // Make condition if keyPair[1] == "Name"
                if (keyPair[1] == "Name") {
                    let anchor = document.createElement("a");  // Create an anchor element
                    anchor.href = planet.url;  // Take the url for the anchor by using url from the planet
                    anchor.target = "planetInfo";  // Take the target equal planetInfo
                    anchor.textContent = planet.name;  // Take textContent for the anchor by using name from the array planet
                    span2.append(anchor);  // Append the anchor to the span
                }   
                // Condition to display distance from sun (km)
                else if (keyPair[1] == "Distance from Sun (km)") {
                    // Take the textContent for the span by using distance from the array planet.
                    // And change to number object to use toLocaleString() to get the number thousand
                    span2.textContent = Number(planet.distance).toLocaleString();  
                }   
                // Condition to display the Mean Solar Day
                else if (keyPair[1] == "Mean Solar Day (Earth days)") {
                    // Take the textContent for the span by using day from the array planet
                    span2.textContent = planet.day;
                }   
                // Condition to display Radius (mean,km)
                else if (keyPair[1] == "Radius (mean, km)") {
                    // Take the textContent for the span by using radius from the array planet
                    // Change to number object to use toLocaleString() to get the number thousand
                    span2.textContent = Number(planet.radius).toLocaleString();
                }   
                // Condition to display Mean Surface Gravity
                else if (keyPair[1] == "Mean Surface Gravity (cm/sec^2)") {
                    // Take the textContext for span by using the gravity from the array planet
                    span2.textContent = planet.gravity;
                }   
                // Condition to display Number of Known Moons
                else if (keyPair[1] == "Number of Known Moons") {
                    // Take the textContext for span by using the moon from the array planet
                    span2.textContent = planet.moons;
                } 
                div.append(span2);  // Append span2 to the div
                divChild.append(span2);  // Append span2 to the divChild

                arrayChildren.push(divChild);  // Add divChild to the arrayChildren
            }
        }
        let lastDiv = document.createElement("div");  // Create the div element named lastDiv
        let image;  // Declare image
        // Use for loop to iterate through all images and check conditions
        // If the images are duplicated, it will break from the loop
        for (let index = 0; index < images.length; index++) {
            let currentImage = images[index];
            // if the src of the currentImage include the planet.img
            if (currentImage.src.includes(planet.img)) {
                // If true, it will assign currentImage to image 
                image = currentImage;
                break;  // Exit the loop when the image is found
            }
        }
        lastDiv.append(image);  // Append image to the lastDiv
        arrayChildren.push(lastDiv);  // Add lastDiv to the arrayChildren
        div.replaceChildren(...arrayChildren);  // Replaces the children of the 'div' element with the elements in the 'arrayChildren' array

    }
}

// 
document.addEventListener("DOMContentLoaded", () => { 
    // Fetch labels from the fetch data.
    fetchLabels();
    // Fetch planets and create buttons from the fetch data
    fetchPlanetsAndCreateButtons();
})



