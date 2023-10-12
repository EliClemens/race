// Author: Eli Clemens
// Class: CIS131-102
// Date:10-11-2023
// Get references to HTML elements. const because I do not want them to change no matter what
const movingObject = document.getElementById("movingObject"); // Get the moving object element
const otherObject = document.getElementById("otherObject"); // Get the other object element
const raceWidth = document.getElementById("raceWidth"); // Get the race width element
const startButton = document.getElementById("startButton"); // Get the start button element

// Initialize variables
let jesus = 0; // Position of Jesus
let buddha = 0; // Position of Buddha
const raceWidthValue = raceWidth.offsetWidth; // Length of the race track
const finishLine = raceWidthValue; // The end of the race track

// Initialize speeds for Buddha and Jesus
let speed1 = getRandomSpeed(10, 30); // Speed for Buddha
let speed2 = getRandomSpeed(10, 30); // Speed for Jesus

let raceStarted = false; // Flag to track if the race has started. Maybe I could have used a while loop

// Store the original background image URL (adjust the path as needed)
let originalBackgroundImage = 'url(images/background.jpg)';//allow background to be called

// Create a div element to display the winner
const winnerDiv = document.createElement("div");//create div for winner image and text
winnerDiv.style.position = "absolute";//this puts it on top of the background image 
winnerDiv.style.top = "10px";//adds this to where the race started
winnerDiv.style.left = "10px";
winnerDiv.style.color = "brown"
winnerDiv.style.fontSize = "24px";

// Event listener for the start button
startButton.addEventListener("click", function () {//click event listener
  if (!raceStarted) {//if race has not started do this:
    // Start the race
    startButton.style.backgroundColor = "green";//button is green
    raceStarted = true;//start race

    // Generate new random speeds for each racer
    speed1 = getRandomSpeed(10, 30);
    speed2 = getRandomSpeed(10, 30);

    // Reset the background image to the original before the race starts
    document.body.style.backgroundImage = originalBackgroundImage;

    moveObjects(); // Start moving the objects
  }
});

// Function to generate a random speed between a range
function getRandomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to move the objects
function moveObjects() {
  jesus += speed1; // Move Jesus however many pixels every time the code loops
  buddha += speed2; // Move Buddha by however many pixels the random number generator made

  // Update the positions of the objects
  movingObject.style.left = jesus + "px";//add px to make a distance to move instead of just a number
  otherObject.style.left = buddha + "px";

  if (jesus > finishLine || buddha > finishLine) {//if either hits 
    if (jesus > finishLine) {
      // Buddha wins, display a message in the winnerDiv
      winnerDiv.textContent = "Buddha Wins!";
      document.body.appendChild(winnerDiv);//add pic to body in top left corner for 3 seconds

       // Create an image element for Jesus and append it to the winnerDiv
       let jesusImage = document.createElement("img");//create img tag
       jesusImage.src = "images/buddha_wins.jpeg"; // Replace with the actual image path with an image 
       jesusImage.style.width = "500px"; // Set the image width
       winnerDiv.appendChild(jesusImage);//add pic to the top left for 3 seconds

      // Delay the reset actions for 3 seconds
      setTimeout(function () {//anonymous function, and 3000 milliseconds timeout
        document.body.removeChild(winnerDiv); // Remove the winner message
        resetObjects(); // Reset the objects and race
      }, 3000);
    } else if (buddha > finishLine) {
      // Jesus wins, display a message in the winnerDiv
      winnerDiv.textContent = "Jesus Wins!";
      document.body.appendChild(winnerDiv);

       // Create an image element for Buddha and append it to the winnerDiv
       const buddhaImage = document.createElement("img");
       buddhaImage.src = "images/jesus_wins.jpeg"; // Replace with the actual image path
       buddhaImage.style.width = "300px"; //300 looks better than 500 like in jesus
       winnerDiv.appendChild(buddhaImage);

      // Delay the reset actions for 3 seconds
      setTimeout(function () {
        document.body.removeChild(winnerDiv); // Remove the winner message
        resetObjects(); // Reset the objects and race
      }, 3000);
    }
  } else {
    // Continue moving the objects using requestAnimationFrame
    requestAnimationFrame(moveObjects);
  }
}

// Function to reset the objects
function resetObjects() {
  jesus = 0; // Reset Jesus's position
  buddha = 0; // Reset Buddha's position

  // Reset the positions of the objects
  movingObject.style.left = jesus + "px";//do this again to make them race again
  otherObject.style.left = buddha + "px";//do this again to make them race again

  raceStarted = false; // Indicate that the race is not started yet
}