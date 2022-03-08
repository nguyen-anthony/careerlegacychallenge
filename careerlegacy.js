const careerRows = document.getElementsByClassName("careerRow");
var parentCheckBoxes = document.querySelectorAll(".packCheckBox");
var subOptions = document.querySelectorAll(".subOption");


const randomizeBtn = document.getElementById("randomizeCareerBtn");
const selectedCareer = document.getElementById("careerchoice");

randomizeBtn.addEventListener("click", () => {
  var listOfAvailableCareers = document.querySelectorAll(
    'input[class="subOption"]:checked'
  );

  var randomize = setInterval(function () {
    var random = Math.floor(Math.random() * listOfAvailableCareers.length);
    selectedCareer.innerHTML = listOfAvailableCareers[random].name;
  }, 10);

  setTimeout(function () {
    clearInterval(randomize);
  }, 1500);
});


console.log(document.querySelectorAll(".testClass input"));