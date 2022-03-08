// window.onload = function () {
//   loadTable();
// };

// function loadTable() {
//   $(document).ready(function () {
//     // FETCHING DATA FROM JSON FILE
//     $.getJSON("careers.json", function (data) {
//       var career = "";

//       // ITERATING THROUGH OBJECTS
//       $.each(data, function (key, value) {
//         //CONSTRUCTION OF ROWS HAVING
//         // DATA FROM JSON OBJECT
//         career +=
//           '<tr class="careerRow" data-packId="' +
//           value.pack_id +
//           '" data-careerId="' +
//           value.career_id +
//           '">';
//         career += '<td class="careerName">' + value.career_name + "</td>";
//         // career += "<td>" + value.career_id + "</td>";

//         career += "<td>" + value.pack_name + "</td>";

//         career += "</tr>";
//       });

//       //INSERTING ROWS INTO TABLE
//       $("#table").append(career);
//     });
//   });
// }

// //Sorting capabilitlies for the table
// const getCellValue = (tr, idx) =>
//   tr.children[idx].innerText || tr.children[idx].textContent;

// const comparer = (idx, asc) => (a, b) =>
//   ((v1, v2) =>
//     v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
//       ? v1 - v2
//       : v1.toString().localeCompare(v2))(
//     getCellValue(asc ? a : b, idx),
//     getCellValue(asc ? b : a, idx)
//   );

// // do the work...
// document.querySelectorAll("th").forEach((th) =>
//   th.addEventListener("click", () => {
//     const table = th.closest("table");
//     Array.from(table.querySelectorAll("tr:nth-child(n+2)"))
//       .sort(
//         comparer(
//           Array.from(th.parentNode.children).indexOf(th),
//           (this.asc = !this.asc)
//         )
//       )
//       .forEach((tr) => table.appendChild(tr));
//   })
// );

//////////////////////////

const careerRows = document.getElementsByClassName("careerRow");
var parentCheckBoxes = document.querySelectorAll(".packCheckBox");
var subOptions = document.querySelectorAll(".subOption");

//Row filters based on checkbox
parentCheckBoxes.forEach((checkbox) =>
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      for (var i = 0; i < careerRows.length; i++) {
        if (careerRows[i].dataset.packid == checkbox.value) {
          careerRows[i].style.display = "table-row";
        }
      }
    } else {
      for (var i = 0; i < careerRows.length; i++) {
        if (careerRows[i].dataset.packid == checkbox.value) {
          careerRows[i].style.display = "none";
        }
      }
    }
    
  })
);

subOptions.forEach((option) =>
  option.addEventListener("change", () => {
    if (option.checked) {
      for (var i = 0; i < careerRows.length; i++) {
        if (careerRows[i].dataset.careerid == option.value) {
          careerRows[i].style.display = "table-row";
        }
      }
    } else {
      for (var i = 0; i < careerRows.length; i++) {
        if (careerRows[i].dataset.careerid == option.value) {
          careerRows[i].style.display = "none";
        }
      }
    }
  })
);

const randomizeBtn = document.getElementById("randomizeCareerBtn");
const selectedCareer = document.getElementById("careerchoice");
// randomizeBtn.addEventListener("click", () => {
//   var listOfAvailableCareers = document.querySelectorAll("td");
//   for(var i = 0; i < listOfAvailableCareers.length; i++){
//     console.log(listOfAvailableCareers[i].innerHTML)
//   }
// );

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