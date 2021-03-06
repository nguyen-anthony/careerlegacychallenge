const $tabsToDropdown = $('.tabs-to-dropdown');

function generateDropdownMarkup(container) {
  const $navWrapper = container.find('.nav-wrapper');
  const $navPills = container.find('.nav-pills');
  const firstTextLink = $navPills.find('li:first-child a').text();
  const $items = $navPills.find('.nav-item');
  const markup = `
    <div class="dropdown d-md-none">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${firstTextLink}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
        ${generateDropdownLinksMarkup($items)}
      </div>
    </div>
  `;
  $navWrapper.prepend(markup);
}

function generateDropdownLinksMarkup(items) {
  let markup = '';
  items.each(function () {
    const textLink = $(this).find('a').text();
    markup += `<a class="dropdown-item" href="#">${textLink}</a>`;
  });

  return markup;
}

function showDropdownHandler(e) {
  // works also
  //const $this = $(this);
  const $this = $(e.target);
  const $dropdownToggle = $this.find('.dropdown-toggle');
  const dropdownToggleText = $dropdownToggle.text().trim();
  const $dropdownMenuLinks = $this.find('.dropdown-menu a');
  const dNoneClass = 'd-none';
  $dropdownMenuLinks.each(function () {
    const $this = $(this);
    if ($this.text() == dropdownToggleText) {
      $this.addClass(dNoneClass);
    } else {
      $this.removeClass(dNoneClass);
    }
  });
}

function clickHandler(e) {
  e.preventDefault();
  const $this = $(this);
  const index = $this.index();
  const text = $this.text();
  $this.closest('.dropdown').find('.dropdown-toggle').text(`${text}`);
  $this
    .closest($tabsToDropdown)
    .find(`.nav-pills li:eq(${index}) a`)
    .tab('show');
}

function shownTabsHandler(e) {
  // works also
  //const $this = $(this);
  const $this = $(e.target);
  const index = $this.parent().index();
  const $parent = $this.closest($tabsToDropdown);
  const $targetDropdownLink = $parent.find('.dropdown-menu a').eq(index);
  const targetDropdownLinkText = $targetDropdownLink.text();
  $parent.find('.dropdown-toggle').text(targetDropdownLinkText);
}

$tabsToDropdown.each(function () {
  const $this = $(this);
  const $pills = $this.find('a[data-toggle="pill"]');

  generateDropdownMarkup($this);

  const $dropdown = $this.find('.dropdown');
  const $dropdownLinks = $this.find('.dropdown-menu a');

  $dropdown.on('show.bs.dropdown', showDropdownHandler);
  $dropdownLinks.on('click', clickHandler);
  $pills.on('shown.bs.tab', shownTabsHandler);
});

/* CLC-Specific JS */

$(document).ready(function () {
  if (location.hash == '#cs') {
    document.getElementById('pills-tracker-tab').click();
  }
  checkCareersCookie();
});

const randomizeBtn = document.getElementById('randomizeCareerBtn');
const selectedCareer = document.getElementById('careerchoice');
const exportBtn = document.getElementById('export');
const saveBtn = document.getElementById('saveCookie');
const clearBtn = document.getElementById('clear');

//Get all game pack checkboxes
var checkall = document.querySelectorAll('.packCheckBox');

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function checkCareersCookie() {
  let careers = getCookie('careers');
  if (careers != '') {
    let careersList = careers.split(',');
    console.log(careersList);
    for (let career of careersList) {
      $('#completedList').append(
        '<li>Generation ' + genNum + ' - ' + career + '</li>'
      );
      genNum++;
      let inputCheckbox = document.querySelector(
        'input[name="' + career + '"]'
      );
      inputCheckbox.checked = false;
      inputCheckbox.disabled = true;
      checkParent();
    }
  }
}

function clearCookie() {
  if (
    confirm(
      'Please use the export button to backup your progress.\n Are you sure you want to clear all saved progress and start over?'
    )
  ) {
    setCookie('careers', '', -1);
    location.hash = 'cs';
    location.reload();
  }
}

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
      subOptions[i].checked = this.checked && !subOptions[i].disabled;
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
      if (disabledCount == subOptions.length) {
        check.disabled = true;
        check.labels[0].style.textDecoration = 'line-through';
      }
      // check.disabled = disabledCount == subOptions.length;
      //var label = $("label[for='" + $(this).attr('id') + "']");
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

saveBtn.addEventListener('click', function () {
  alert(
    "Saving uses a cookie on your browser. If you clear your browser's cookies, your progress will be deleted. Highly recommend that you export your data as well!"
  );
  let careers = getCompletedCareers();
  setCookie('careers', careers, 30);
});

clearBtn.addEventListener('click', function () {
  clearCookie();
});

document
  .getElementById('fileInput')
  .addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  let careerListFromFile = event.target.result.split('\n');
  console.log(careerListFromFile);
  for (let career of careerListFromFile) {
    $('#completedList').append(
      '<li>Generation ' + genNum + ' - ' + career + '</li>'
    );
    genNum++;
    let inputCheckbox = document.querySelector('input[name="' + career + '"]');
    inputCheckbox.checked = false;
    inputCheckbox.disabled = true;
    checkParent();
  }
}

// $(function () {
//   $('#pills-rules').load('rules.html');
// });
