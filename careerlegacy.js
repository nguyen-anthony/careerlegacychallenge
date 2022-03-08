const careerRows = document.getElementsByClassName("careerRow");
var parentCheckBoxes = document.querySelectorAll(".packCheckBox");
// var subOptions = document.querySelectorAll(".subOption");


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

var checkall = document.querySelectorAll('.packCheckBox');

checkall.forEach(function (check) {
  var subOptions = document.querySelectorAll('#' + CSS.escape(check.id) + '+label+ul input');

  for (var i = 0; i < subOptions.length; i++) {
    subOptions[i].onclick = function () {
      var checkedCount = document.querySelectorAll('#' + CSS.escape(check.id) + '+label+ul input:checked').length;

      check.checked = checkedCount > 0;
      check.indeterminate = checkedCount > 0 && checkedCount < subOptions.length;
    }
  }
});

checkall.forEach(function (check) {
  check.onclick = function () {
    var checkedCount = document.querySelectorAll('#' + CSS.escape(check.id) + '+label+ul input');
    for (var i = 0; i < checkedCount.length; i++) {
      checkedCount[i].checked = this.checked;
    }
  }
});