// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
var passwordOptions = {
  numberChar: 0,
  specialChar: false,
  lowerCaseChar: false,
  upperCaseChar: false,
  numbers: false,

  amounts: {
    amtSpecialChar: 0,
    amtLowerCaseChar: 0,
    amtUpperCaseChar: 0,
    amtNumbers: 0, 
  },
  

  assignAmts: function(){
    var howManyTrue = [this.specialChar, this.lowerCaseChar, this.upperCaseChar, this.numbers].filter(function(i){
      return i == true;
    }).length;
    for(var j = 0; j < howManyTrue; j++){
      if(this.specialChar){
        this.amounts.amtSpecialChar += getRandomInt(1, this.numberChar -howManyTrue);
        this.numberChar = this.numberChar - this.amounts.amtSpecialChar;
        howManyTrue += -1;
      } 
      if(this.lowerCaseChar){
        this.amounts.amtLowerCaseChar += getRandomInt(1, this.numberChar -howManyTrue);
        this.numberChar = this.numberChar - this.amounts.amtLowerCaseChar;
        howManyTrue += -1;
      }
      if(this.upperCaseChar){
        this.amounts.amtUpperCaseChar += getRandomInt(1, this.numberChar -howManyTrue);
        this.numberChar = this.numberChar - this.amounts.amtUpperCaseChar;
        howManyTrue += -1;
      }
      if(this.numbers){
        this.amounts.amtNumbers += getRandomInt(1, this.numberChar -howManyTrue);
        this.numberChar = this.numberChar - this.amounts.amtNumbers;
        howManyTrue += -1;
      }
      
   } 
  },
}
// Function to prompt user for password options
function getPasswordOptions() {
   var numberOfChar = prompt("How many characters long do you want your password? (8-128 incl.)")
   if(isNaN(numberOfChar) || numberOfChar < 8 || numberOfChar > 128){
      alert("Please ensure you inputted an interger between 8 and 128 inclusive.")
      getPasswordOptions();
      return;
   }
   console.log(~~numberOfChar)
   passwordOptions.numberChar = ~~numberOfChar;
   if(confirm("Include special characters?")){
      passwordOptions.specialChar = true;
   }
   if(confirm("Include lowercase characters?")){
      passwordOptions.lowerCaseChar = true;
   }
   if(confirm("Include uppercase characters?")){
      passwordOptions.upperCaseChar = true;
   }
   if(confirm("Include numbers?")){
      passwordOptions.numbers = true;
   }
  }


// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

// Function to generate password with user input
function generatePassword() {

}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

getPasswordOptions();
passwordOptions.assignAmts();
console.log(passwordOptions);
// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);