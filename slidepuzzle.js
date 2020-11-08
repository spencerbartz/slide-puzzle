/*
  slidepuzzle.js
  DESCRIPTION: Click event handling and helper functions for puzzle squares
*/

const TOTAL_IMAGES    = 9;
const IMAGE_WIDTH     = 110;
const IMAGE_HEIGHT    = 110;
const IMG_FILE_TYPE   = "jpg"
const EMPTY_SPACE_NUM = 2;

let images = [];
let squares = [];

/**
 * loadImages()
 * receives: none
 * returns: none
 * Instantiates JavaScript Image Objects and listens for their load events
 */
function loadImages() {
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    images[i] = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);

    images[i].addEventListener('load', () => {
      console.log("Image: " + images[i] + " src" + images[i].src);
    });

    images[i].src = "images/" + i + "." + IMG_FILE_TYPE;
  }
}

/**
 * loadSquares()
 * receives: none
 * returns: none
 * Grabs "squares" (ids of <td> elements on slidepuzzle.php) and appends
 * corresponding image to them
 */
function loadSquares() {
  for (let i = 0; i < TOTAL_IMAGES; i++) {
    squares[i] = document.getElementById("" + i);
    squares[i].appendChild(images[i]);
  }
}

/**
 * addSquareListeners()
 * receives: none
 * returns: none - ends execution
 * Sets up click listening logic for all squares.
 * The 9 squares are treated as an array_i = 0 to 8, over which we iterate
 * to add the click listeners. We use the value of i to determine 
 * which clicks are valid and what effect they have.
 */
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
        if (squares[i - 1].firstChild.src.endsWith(EMPTY_SPACE_NUM + "." + IMG_FILE_TYPE)) {
          console.log("[DEBUG] Found square " + (i - 1) + " empty");
          swapImages(squares[i], squares[i - 1]);
          checkWin();
          return;
        }
      }

      // If square_i is 0th or 1st column, check right square
      if ((i + 1) % 3 > 0) {
        console.log("[DEBUG] Checking Right...");
        if (squares[i + 1].firstChild.src.endsWith(EMPTY_SPACE_NUM + "." + IMG_FILE_TYPE)) {
          console.log("[DEBUG] Found square " + (i + 1) + " empty");
          swapImages(squares[i], squares[i + 1]);
          checkWin();
          return;
        }
      }

      // If square_i is in 1st or 2nd row, check top
      if (i / 3 >= 1) {
        console.log("[DEBUG] Checking Top...");
        if (squares[i - 3].firstChild.src.endsWith(EMPTY_SPACE_NUM + "." + IMG_FILE_TYPE)) {
          console.log("[DEBUG] Found square " + (i - 3) + " empty");
          swapImages(squares[i], squares[i - 3]);
          checkWin();
          return;
        }
      }

      // If square_i is in 0th or 1st row, check bottom
      if (i / 3 < 2) {
        console.log("[DEBUG] Checking Bottom...");
        if (squares[i + 3].firstChild.src.endsWith(EMPTY_SPACE_NUM + "." + IMG_FILE_TYPE)) {
          console.log("[DEBUG] Found square " + (i + 3) + " empty");
          swapImages(squares[i], squares[i + 3]);
          checkWin();
          return;
        }
      }
    });
  }
}

/**
 * shuffleImages()
 * receives: none
 * returns: none
 * Iterates over images[] 100 times, chooses 2 random indices and swaps the values
 * subscripted by them.
 */
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

/**
 * isValidPuzzle()
 * @param {Image} imgArray[] 
 * returns: true if puzzle is valid, false otherwise.
 * PUZZLE VALIDITY:
 * We have here a 3 X 3 puzzle, therefore the number of inversions in the
 * arrangement must be EVEN for the puzzle to be valid (solvable).
 * An inversion happens when one number is greater than the 
 * numbers after it ( 4 > 2,3,1 ; 5 > 2,3,1 etc.)
 * E.g. 4,5,2,3,1 => 3 + 3 + 1 + 1 = 8 inversions. 8 is an even number. Puzzle is valid.
 */
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

/**
 * swapImages
 * @param {td} square1 
 * @param {td} square2
 * Swaps the src of the images of two <td>s. This animates our
 * "empty space" and photo square swap click effect.
 */
function swapImages(square1, square2) {
  let temp = square1.firstChild.src;
  square1.firstChild.src = square2.firstChild.src;
  square2.firstChild.src = temp;
}

/**
 * checkWin()
 * receives: none
 * returns: none
 * Iterates over all <td> elements in squares[] to see if the image numbers
 * are in order. If they are, the game is won.
 */
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

/**
 * load()
 * Loads iamges, shuffles the <td> list that has the images,
 * attaches the Image() objects to the <td> squares, adds click listeners.
 */
window.addEventListener('load', (event) => {
  loadImages();
  shuffleImages();
  loadSquares();
  addSquareListeners();
  console.log('Page is fully loaded');
});
