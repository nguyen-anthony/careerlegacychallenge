var parentCheckBoxes = document.querySelectorAll(".packCheckBox");

const randomizeBtn = document.getElementById("randomizeCareerBtn");
const selectedCareer = document.getElementById("careerchoice");

/*
* Randomize button functionality.
* Repeatedly randomizes a career choice based on what suboptions are checked for 1.5 seconds and updates the output
*/
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

//Get all game pack checkboxes
var checkall = document.querySelectorAll('.packCheckBox');

/*
* Two parts:
* 1. Sets indeterminate, checked, or unchecked based on number of subOptions are checked
* 2. Check all subOptions if game pack option is checked
*/
checkall.forEach(function (check) {
  var subOptions = document.querySelectorAll('#' + CSS.escape(check.id) + '+label+ul input');

  for (var i = 0; i < subOptions.length; i++) {
    subOptions[i].onclick = function () {
      var checkedCount = document.querySelectorAll('#' + CSS.escape(check.id) + '+label+ul input:checked').length;

      check.checked = checkedCount > 0;
      check.indeterminate = checkedCount > 0 && checkedCount < subOptions.length;
    }
  }

  check.onclick = function () {
    var subOptions = document.querySelectorAll('#' + CSS.escape(check.id) + '+label+ul input');
    for (var i = 0; i < subOptions.length; i++) {
      subOptions[i].checked = this.checked;
    }
  }
});
