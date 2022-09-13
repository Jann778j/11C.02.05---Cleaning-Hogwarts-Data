"use strict";

const url = "https://petlatkea.dk/2021/hogwarts/students.json";
const studentList = {};

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
window.addEventListener("DOMContentLoaded", init);

//

//henta data fra json og adder evetlistner
async function init() {
  console.log("init her");

  filterButtons = document.querySelectorAll(`[data-action="filter"]`);

  filterButtons.forEach((filterbutton) => {
    filterbutton.addEventListener("click", clickFilterButton);
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

// make good damn filter work

function clickFilterButton(filterButton) {
  console.log("filterClicked right here ");

  filter = filterButton.target.dataset.filter;

  const filteredStudents = filterStudents();

  displayList(filteredStudents);
}

function isSlytherin(student) {
  console.log("isSlytherin");
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function isHufflepuff(student) {
  console.log("isHufflepuff");
  if (student.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function isGryffindor(student) {
  console.log("isGryffindor");
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function isRavenclaw(student) {
  console.log("isRavenclaw");
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function isAll(student) {
  console.log("isAll");
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
    filteredStudents = allStudents.filter(isSlytherin);
  } else if (filter === "ravenclaw") {
    filteredStudents = allStudents.filter(isRavenclaw);
  } else if (filter === "hufflepuff") {
    filteredStudents = allStudents.filter(isHufflepuff);
  } else if (filter === "gryffindor") {
    filteredStudents = allStudents.filter(isGryffindor);
  } else {
    filteredStudents = allStudents.filter(isAll);
  }

  return filteredStudents;
}

// function makebuttons() {
//   console.log("ready");
//   document
//     .querySelectorAll("[data-action='filter']")
//     .forEach((button) => button.addEventListener("click", selectFilter));
// }

//good damn filter still not working....

// her bliver hver template fyldt ud på den ønskede måde ved hjælp af strings

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
