/*
  slidepuzzle.js
  DESCRIPTION: Click event handling and helper functions for puzzle squares
*/

const TOTAL_IMAGES = 9;
const IMAGE_WIDTH  = 110;
const IMAGE_HEIGHT = 110;

let images = [];
let squares = [];

function loadImages() {
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    images[i] = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
    images[i].src = "images/" + i + ".gif";
  }
}

function loadSquares() {
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    squares[i] = document.getElementById("" + i);
    squares[i].appendChild(images[i]);
  }
}

function addSquareListeners() {
  if (squares.length == 0) {
    console.error("[ERROR] Squares did not load.");
    return;
  }

  // Add click event listeners to all squares
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    squares[i].addEventListener("click", (clickEvent) => {
      console.log("[DEBUG] Clicked " + clickEvent.currentTarget.id);

      // Use values of i to decide which squares to check
      // If square_i is in 1st or 2nd column, check left square
      if ((i % 3) - 1 >= 0) {
        console.log("[DEBUG] Checking Left...");
        if (squares[i - 1].firstChild.src.endsWith("8.gif")) {
          console.log("[DEBUG] Found square " + (i - 1) + " empty");
          swapImages(squares[i], squares[i - 1]);
          checkWin();
          return;
        }
      }

      // If square_i is 0th or 1st column, check right square
      if ((i + 1) % 3 > 0) {
        console.log("[DEBUG] Checking Right...");
        if (squares[i + 1].firstChild.src.endsWith("8.gif")) {
          console.log("[DEBUG] Found square " + (i + 1) + " empty");
          swapImages(squares[i], squares[i + 1]);
          checkWin();
          return;
        }
      }

      // If square_i is in 1st or 2nd row, check top
      if (i / 3 >= 1) {
        console.log("[DEBUG] Checking Top...");
        if (squares[i - 3].firstChild.src.endsWith("8.gif")) {
          console.log("[DEBUG] Found square " + (i - 3) + " empty");
          swapImages(squares[i], squares[i - 3]);
          checkWin();
          return;
        }
      }

      // If square_i is in 0th or 1st row, check bottom
      if (i / 3 < 2) {
        console.log("[DEBUG] Checking Bottom...");
        if (squares[i + 3].firstChild.src.endsWith("8.gif")) {
          console.log("[DEBUG] Found square " + (i + 3) + " empty");
          swapImages(squares[i], squares[i + 3]);
          checkWin();
          return;
        }
      }
    });
  }
}

function shuffleImages() {
  do {
    for (let i = 0; i < 100; i++) {
      //randomly swap 100 times
      let tempImage;
      let index1 = Math.floor(Math.random() * Math.floor(TOTAL_IMAGES - 1));
      let index2 = Math.floor(Math.random() * Math.floor(TOTAL_IMAGES - 1));
      tempImage = images[index1];
      images[index1] = images[index2];
      images[index2] = tempImage;
    }
  } while (!isValidPuzzle(images));
}

//we have here a 3 X 3 puzzle, therefore the number of inversions in the
// arrangement must be even for the puzzle to be solvable
// i.e. 4,5,2,3,1 => 3 + 3 + 1 + 1 = 8 inversions
//an inversion happens when one number is greater than the
//numbers after it ( 4 > 2,3,1 ; 5 > 2,3,1 etc.)
function isValidPuzzle(imgArray) {

  // int array to hold number set
  let permutation = [];
  let inversions = 0;

  // The squares aren't numbered, get their number from their
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    let imgSrc = images[i].src;
    permutation[i] = imgSrc.substring(imgSrc.length - 5, imgSrc.length - 4);
    console.log("[DEBUG] Permutation: " + permutation[i]);
  }

  // Find number of inversions
  for (let j = 0; j < permutation.length - 1; j++) {
    for (let i = j; i < permutation.length - 1; i++) {
      if (permutation[i + 1] < permutation[j]) {
        inversions++;
      }
    }
  }

  // If there is an even number of inversions, the puzzle is a-ok
  if (inversions % 2 !== 0) {
    console.log("[INFO] Puzzle is not valid");
  }

  return inversions % 2 == 0 ? true : false;
}

function swapImages(square1, square2) {
  let temp = square1.firstChild.src;
  square1.firstChild.src = square2.firstChild.src;
  square2.firstChild.src = temp;
}

function checkWin() {
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    let imgSrc = squares[i].firstChild.src;
    let imgNumber = imgSrc.substring(imgSrc.length - 5, imgSrc.length - 4);
    if (i !== parseInt(imgNumber)) {
      return;
    }
  }

  alert("YOU WIN");
}

window.addEventListener('load', (event) => {
  loadImages();
  shuffleImages();
  loadSquares();
  addSquareListeners();
  console.log('Page is fully loaded');
});
