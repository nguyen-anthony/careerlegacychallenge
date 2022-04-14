//TODO: Parent Checkboxes need to be

const randomizeBtn = document.getElementById('randomizeCareerBtn');
const selectedCareer = document.getElementById('careerchoice');
const exportBtn = document.getElementById('export');

//Get all game pack checkboxes
var checkall = document.querySelectorAll('.packCheckBox');

/*
 * Randomize button functionality.
 * Repeatedly randomizes a career choice based on what suboptions are checked for 1.5 seconds and updates the output
 */
let genNum = 1;
randomizeBtn.addEventListener('click', () => {
  var listOfAvailableCareers = document.querySelectorAll(
    'input[class="subOption form-check-input"]:checked'
  );

  if (listOfAvailableCareers.length == 0) {
    selectedCareer.innerHTML = 'No careers selected!';
    alert('Please select some careers in the list!');
  } else {
    var randomize = setInterval(function () {
      var random = Math.floor(Math.random() * listOfAvailableCareers.length);
      selectedCareer.innerHTML = listOfAvailableCareers[random].name;
    }, 10);

    setTimeout(function () {
      clearInterval(randomize);

      setTimeout(function () {
        if (
          confirm(
            'Do you want to play the ' + selectedCareer.innerHTML + ' career?'
          )
        ) {
          $('#completedList').append(
            '<li>Generation ' +
              genNum +
              ' - ' +
              selectedCareer.innerHTML +
              '</li>'
          );
          genNum++;
          let inputCheckbox = document.querySelector(
            'input[name="' + selectedCareer.innerHTML + '"]'
          );
          inputCheckbox.checked = false;
          inputCheckbox.disabled = true;
        }
        checkParent();
      }, 300);
    }, 1500);
  }
});

/*
 * Two parts:
 * 1. Sets indeterminate, checked, or unchecked based on number of subOptions are checked
 * 2. Check all subOptions if game pack option is checked
 */
checkall.forEach(function (check) {
  var subOptions = document.querySelectorAll(
    '#' + CSS.escape(check.id) + '+label+ul input'
  );
  var subOptionList = document.querySelector(
    '#' + CSS.escape(check.id) + '+label+ul'
  );

  for (var i = 0; i < subOptions.length; i++) {
    subOptions[i].onclick = function () {
      var checkedCount = document.querySelectorAll(
        '#' + CSS.escape(check.id) + '+label+ul input:checked'
      ).length;

      check.checked = checkedCount > 0;
      check.indeterminate =
        checkedCount > 0 && checkedCount < subOptions.length;
      if (checkedCount == 0) {
        subOptionList.style.display = 'none';
      } else {
        subOptionList.style.display = 'block';
      }
    };
  }

  check.onclick = function () {
    for (var i = 0; i < subOptions.length; i++) {
      subOptions[i].checked = this.checked;
    }
    if (subOptionList.style.display === 'none') {
      subOptionList.style.display = 'block';
    } else {
      subOptionList.style.display = 'none';
    }
  };
});

function checkParent() {
  checkall.forEach(function (check) {
    var subOptions = document.querySelectorAll(
      '#' + CSS.escape(check.id) + '+label+ul input'
    );
    var subOptionList = document.querySelector(
      '#' + CSS.escape(check.id) + '+label+ul'
    );

    for (var i = 0; i < subOptions.length; i++) {
      var checkedCount = document.querySelectorAll(
        '#' + CSS.escape(check.id) + '+label+ul input:checked'
      ).length;
      var disabledCount = document.querySelectorAll(
        '#' + CSS.escape(check.id) + '+label+ul input:disabled'
      ).length;

      check.checked = checkedCount > 0;
      check.indeterminate =
        checkedCount > 0 && checkedCount < subOptions.length;
      check.disabled = disabledCount == subOptions.length;
      if (checkedCount == 0) {
        subOptionList.style.display = 'none';
      } else {
        subOptionList.style.display = 'block';
      }
    }
  });
}

let completedCareers = [];

function getCompletedCareers() {
  completedCareers = [];
  let listItems = document.querySelectorAll('#completedList li');

  for (let item of listItems) {
    let listItemContent = item.innerHTML;
    let careerName = listItemContent.substring(
      listItemContent.indexOf('-') + 2
    );
    completedCareers.push(careerName);
  }

  return completedCareers;
}

function createCSV() {
  var csv = '';
  csv += completedCareers.join('\n');

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'careerList.txt';
  hiddenElement.click();
}

exportBtn.addEventListener('click', function () {
  getCompletedCareers();
  createCSV();
});
