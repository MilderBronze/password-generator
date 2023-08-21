const slider = document.getElementById("slider");
const number = document.getElementById("number");
let password = "";
let passwordLength = 10;
slider.addEventListener("input", function (event) {
  number.textContent = event.target.value;
  passwordLength = event.target.value;
});

//generating random numbers between a to b
const randomnumbers = (a, b) => {
  return Math.floor(Math.random() * (b + 1 - a)) + a;
};

const generateRandomNumber = () => {
  return randomnumbers(1, 9);
};
//generating random uppercase letters

const randomUpperCaseLetters = () => {
  // so i need to randomly generate a number between 65: A and 91: Z
  return String.fromCharCode(randomnumbers(65, 90));
};

//generating random lowercase letters
const randomLowerCaseLetters = () => {
  // so i need to randomly generate a number between 65: a and 91: z
  return String.fromCharCode(randomnumbers(97, 122));
};

const symbols = "!@#$%^&*(){}|/?`~";

//generating random symbols

const randomSymbols = () => {
  const randomSymbolIndex = randomnumbers(0, symbols.length);
  return symbols.charAt(randomSymbolIndex);
};

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

let allCheckedBoxes = [uppercaseCheckbox];
const checkboxes = document.querySelectorAll(".checkbox");

const update = () => {
  for (let checkbox of checkboxes) {
    if (checkbox.checked && !allCheckedBoxes.includes(checkbox)) {
      allCheckedBoxes.push(checkbox);
    } else if (allCheckedBoxes.includes(checkbox) && !checkbox.checked) {
      let index = allCheckedBoxes.indexOf(checkbox);
      allCheckedBoxes.splice(index, 1);
    }
  }
};

for (let checkbox of checkboxes) {
  checkbox.addEventListener("click", update);
}
const input_box = document.getElementById("input_box");
const generate_password = document.getElementById("generate_password");
generate_password.addEventListener("click", () => {
  password = "";
  let arr = [];
  if (allCheckedBoxes.includes(uppercaseCheckbox)) {
    arr.push(randomUpperCaseLetters);
  }
  if (allCheckedBoxes.includes(lowercaseCheckbox)) {
    arr.push(randomLowerCaseLetters);
  }
  if (allCheckedBoxes.includes(numbersCheckbox)) {
    arr.push(generateRandomNumber);
  }
  if (allCheckedBoxes.includes(symbolsCheckbox)) {
    arr.push(randomSymbols);
  }
  console.log(arr.length);
  for (let i = 0; i < arr.length; i++) {
    password += arr[i]();
  }
  // for filling up the remaining elements
  for (let i = arr.length; i < passwordLength; i++) {
    const randomInt = randomnumbers(0, arr.length - 1);
    password += arr[randomInt]();
  }
  input_box.value = password;
});
