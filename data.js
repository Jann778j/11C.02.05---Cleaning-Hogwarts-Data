"use strict";

const url = "https://petlatkea.dk/2021/hogwarts/students.json";
const studentList = {};
//template over hvad objecter skal indeholde
const StudentTemplate = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  house: "",
  image: "",
};

// used for filter studetns
let allStudents = [];
let filter;
let filteredStudents = [];

let filterButtons;

let sortThis = "sorting";

window.addEventListener("DOMContentLoaded", init);

//==========================used for filter ==================================

const searchField = document.querySelector(".search");
searchField.addEventListener("input", initSearch);
let showNumberOfStudent = document.querySelector(".numberofstudentsshown");

//======================her starter vi rigtigt hæ====================================

//henta data fra json og adder evetlistner
async function init() {
  console.log("init her");

  filterButtons = document.querySelectorAll(`[data-action="filter"]`);

  filterButtons.forEach((filterbutton) => {
    filterbutton.addEventListener("click", clickFilterButton);

    //looks after changes in the options under #sortingList
    document.querySelector("#sortingList").onchange = function () {
      selectedSorting(this.value);
    };
  });

  studentList.studentObjects = [];
  studentList.studentJSON = [];
  await loadJSON();
  // makebuttons();
}

async function loadJSON() {
  console.log("json her");

  const JSONData = await fetch(url);
  //studentList.studentJSON = await JSONData.json();
  const studentJSON = await JSONData.json();

  //console.log(studentList.studentJSON);
  prepareObjects(studentJSON);
}

//===================================search function her wuhu============================

//serach function made here
function initSearch(event) {
  console.log("im here");
  let searchStudentList = allStudents.filter((student) => {
    let name = "";
    if (student.lastName === null) {
      name = student.firstName;
    } else {
      name = student.firstName + " " + student.lastName;
    }
    return name.toLowerCase().includes(event.target.value);
  });

  // this will show number og student in the search

  showNumberOfStudent.textContent = `number of students: ${searchStudentList.length}`;
  displayList(searchStudentList);
}

//===========================================filter her ==========================================

// make good damn filter work

function clickFilterButton(filterButton) {
  console.log("filterClicked right here ");

  filter = filterButton.target.dataset.filter;

  const filteredStudents = filterStudents();

  displayList(filteredStudents);
}

function ifStudentSlytherin(student) {
  console.log("ifStudentSlytherin");
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function ifStudentHufflepuff(student) {
  console.log("ifStudentHufflepuff");
  if (student.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function ifStudentGryffindor(student) {
  console.log("ifStudentGryffindor");
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function ifStudentRavenclaw(student) {
  console.log("ifStudentRavenclaw");
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function ifStudentAll(student) {
  console.log("ifStudentAll");
  if (student) {
    return true;
  } else {
    return false;
  }
}

function filterStudents() {
  console.log("Filtering My Students by: ", filter);

  filteredStudents = [];

  if (filter === "slytherin") {
    filteredStudents = allStudents.filter(ifStudentSlytherin);
  } else if (filter === "ravenclaw") {
    filteredStudents = allStudents.filter(ifStudentRavenclaw);
  } else if (filter === "hufflepuff") {
    filteredStudents = allStudents.filter(ifStudentHufflepuff);
  } else if (filter === "gryffindor") {
    filteredStudents = allStudents.filter(ifStudentGryffindor);
  } else {
    filteredStudents = allStudents.filter(ifStudentAll);
  }

  return filteredStudents;
}
//
//
//
//=========================================sort her============================================
//

//sorting start here!!

function selectedSorting(event) {
  //checks what option is clicked
  sortThis = event;
  console.log(`Use this ${sortThis}`);
  //sortList(sortThis);
  buildList();
}

function sortList(sortedList) {
  //based on what is clicked, calls the matching function
  //let sortedList = allStudents (the array);

  if (sortThis === "firstnamea-z") {
    sortedList = sortedList.sort(sortThisFirstnameAZ);
  } else if (sortThis === "firstnamez-a") {
    sortedList = sortedList.sort(sortThisFirstnameZA);
  } else if (sortThis === "lastnamea-z") {
    sortedList = sortedList.sort(sortThisLastnameAZ);
  } else if (sortThis === "lastnamez-a") {
    sortedList = sortedList.sort(sortThisLastnameZA);
  } else if (sortThis === "housea-z") {
    sortedList = sortedList.sort(sortThisHouseAZ);
  } else if (sortThis === "housez-a") {
    sortedList = sortedList.sort(sortThisHouseZA);
  }

  return sortedList;
}

//sorts by firstName a-z
function sortThisFirstnameAZ(firstnameA, firstnameB) {
  if (firstnameA.firstName < firstnameB.firstName) {
    return -1;
  } else {
    return 1;
  }
}

//sorts by firstName z-a
function sortThisFirstnameZA(firstnameA, firstnameB) {
  if (firstnameA.firstName < firstnameB.firstName) {
    return 1;
  } else {
    return -1;
  }
}

//sorts by lastName a-z
function sortThisLastnameAZ(lastnameA, lastnameB) {
  if (lastnameA.lastName < lastnameB.lastName) {
    return -1;
  } else {
    return 1;
  }
}

//sorts by lastName z-a
function sortThisLastnameZA(lastnameA, lastnameB) {
  if (lastnameA.lastName < lastnameB.lastName) {
    return 1;
  } else {
    return -1;
  }
}

//sorts by house a-z
function sortThisHouseAZ(houseA, houseB) {
  if (houseA.house < houseB.house) {
    return -1;
  } else {
    return 1;
  }
}

//sorts by house z-a
function sortThisHouseZA(houseA, houseB) {
  if (houseA.house < houseB.house) {
    return 1;
  } else {
    return -1;
  }
}

// virker fnadme nu
function buildList() {
  let currentList = filterStudents(allStudents);
  currentList = sortList(currentList);

  displayList(currentList);
}

//============================================sort og filter slut her===============================

// her bliver hver template fyldt ud på den ønskede måde ved hjælp af strings

//
//====================================== lav indholdet til objectet/templaten her=================================

function prepareObjects(JSONData) {
  console.log("prepare here");

  // filteredStudents = allStudents;
  // displayList(allStudents);

  JSONData.forEach((jsonObject) => {
    const student = Object.create(studentList);
    let navn = jsonObject.fullname.toLowerCase().trim();
    let delNavn = navn.split(" ");
    const lastSpace = jsonObject.fullname.lastIndexOf(" ");
    const firstSpace = jsonObject.fullname.indexOf(" ");
    const house = jsonObject.house.toLowerCase().trim();

    //firstname done
    student.firstName =
      delNavn[0].substring(0, 1).toUpperCase() + delNavn[0].substring(1);

    //middlename

    student.middleName =
      navn
        .substring(navn.indexOf(" "), navn.lastIndexOf(" "))
        .trim()
        .substring(0, 1)
        .toUpperCase() +
      navn
        .substring(navn.indexOf(" "), navn.lastIndexOf(" "))
        .trim()
        .substring(1);

    //lastname

    let lastName = navn.substring(lastSpace).trim();
    student.lastName =
      lastName.substring(0, 1).toUpperCase() + lastName.substring(1);

    // nickname

    if (navn.includes(`"`)) {
      let nickName = navn
        .substring(navn.indexOf(`"`) + 1, navn.lastIndexOf(`"`))
        .toUpperCase();

      student.nickName = nickName[0] + nickName.substring(1).toLowerCase();
      student.middleName = "";
    }

    //house
    student.house = house.substring(0, 1).toUpperCase() + house.substring(1);

    //image
    student.image =
      student.lastName.toLowerCase() +
      "_" +
      delNavn[0].substring(0, 1).toLowerCase();

    if (student.lastName == "Patil") {
      student.image =
        student.lastName.toLowerCase() + "_" + delNavn[0].toLowerCase();
    }

    //console.log(student.lastName);
    allStudents.push(student);

    if (navn[0] == " ") {
      navn.shift();
    }
  });

  displayList(allStudents);
}
//======================================vis objecter her =============================================
// her vises de forskellige studerende inde i deres små hygge objecter lol

function displayList(displayStudents) {
  // clear the list
  const studentListShow = document.querySelector("#list");
  studentListShow.textContent = "";

  displayStudents.forEach((student) => {
    const template = document.querySelector("#student");
    let klon = template.cloneNode(true).content;

    // udsriver fristname
    klon.querySelector(
      ".firstName"
    ).textContent = `firstname: ${student.firstName}`;

    // udskriver lastname - leanne har kun e navn så hendes fornavn vises osm efternanv OGSÅ??!!
    klon.querySelector(
      ".lastName"
    ).textContent = `lastname: ${student.lastName}`;

    // udskriver middlename
    klon.querySelector(
      ".middleName"
    ).textContent = `middlename: ${student.middleName}`;

    // udskriver nickname
    klon.querySelector(
      ".nickName"
    ).textContent = `nickname: ${student.nickName}`;

    // udskriver house
    klon.querySelector(".house").textContent = `house: ${student.house}`;

    //nogle billeder kommer frem andre gøre ikke??? - 3 billeder mangler ??
    klon.querySelector(".image").src = `images/${student.image}.png`;

    studentListShow.appendChild(klon);
  });
}
