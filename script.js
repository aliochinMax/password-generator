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
    specialChar: 0,
    lowerCaseChar: 0,
    upperCaseChar: 0,
    numbers: 0, 
  },
  

  assignAmts: function(){
    var splitTotal = 0;
    var randomAmt = 0;

    function setAmountProperty(property){
      randomAmt = ~~Math.trunc((passwordOptions.numberChar/howManyTrue)+getRandomInt(1,passwordOptions.numberChar/(howManyTrue**1.5) ,false));
      splitTotal += randomAmt;
      if(splitTotal == passwordOptions.numberChar){
        randomAmt += -1;
        splitTotal += -1;
      }
      if(true){
        passwordOptions.amounts[property] = randomAmt;
      }
    }

    var howManyTrue = [this.specialChar, this.lowerCaseChar, this.upperCaseChar, this.numbers].filter(function(i){
      return i == true;
    }).length;
    
    setAmountProperty("specialChar");
    setAmountProperty("lowerCaseChar");
    setAmountProperty("upperCaseChar");
    if(this.numbers){
      this.amounts.numbers = this.numberChar - splitTotal;
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

function getRandomInt(min, max, isPos){
  min = Math.ceil(min);
  max = Math.floor(max);
  if(isPos){
  return Math.floor(Math.random() * (max - min) + min); 
  }
  else{
    switch(getRandomInt(1,3,true)){
      case 1:
        return Math.floor(Math.random() * (max - min) + min)*-1
      case 2:
        return Math.floor(Math.random() * (max - min) + min)
    }
  }
}



// Function to generate password with user input
function generatePassword() {
  var options = passwordOptions;
  var randomIndex =0;
  var finalPasswordArr = [];
  var avalibleIndexes = [];
  var properties = [options.specialChar, options.lowerCaseChar, options.upperCaseChar, options.numbers];
  var charArrs = [specialCharacters, lowerCasedCharacters, upperCasedCharacters, numericCharacters];
  var amounts = [options.amounts.specialChar, options.amounts.lowerCaseChar, options.amounts.upperCaseChar, options.amounts.numbers]
  for(var i = 0; i < options.numberChar; i++){
    finalPasswordArr.push("");
  }
  finalPasswordArr.forEach(function(item, i){
      avalibleIndexes.push(i);
  
  })
    for(var i =0; i<properties.length; i++){
      if(properties[i]){
      for(var j=0; j<amounts[i]; j++){
        randomIndex = getRandomInt(0, avalibleIndexes.length, true);
        finalPasswordArr[avalibleIndexes[randomIndex]] = getRandom(charArrs[i]);
        avalibleIndexes.splice(randomIndex,1);
      }
    }
    }
  return finalPasswordArr.join("");
  }
  
 
 




// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  console.log(password);
  var passwordText = document.querySelector('#password');
  passwordText.value = password;
}

test = "specialChar"
//console.log(passwordOptions.amounts[test]);

getPasswordOptions();
passwordOptions.assignAmts();
writePassword();
// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);