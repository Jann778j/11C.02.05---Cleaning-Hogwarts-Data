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

window.addEventListener("DOMContentLoaded", init);

async function init() {
  console.log("init her");

  studentList.studentObjects = [];
  studentList.studentJSON = [];
  await loadJSON();
}

async function loadJSON() {
  console.log("json her");

  const JSONData = await fetch(url);
  studentList.studentJSON = await JSONData.json();

  console.log(studentList.studentJSON);
  prepareObjects();
}

function prepareObjects() {
  console.log("prepare here");
  studentList.studentJSON.forEach((jsonObject) => {
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
    // student.middleName = navn.substring(firstSpace, lastSpace);

    //lastname

    let lastName = navn.substring(lastSpace).trim();
    student.lastName =
      lastName.substring(0, 1).toUpperCase() + lastName.substring(1);
    // student.lastName = navn.substring(lastSpace);

    // student.lastName = delNavn[0].substring(2, 3).lastIndexOf(" ");

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

    console.log(student.lastName);
    studentList.studentObjects.push(student);

    if (navn[0] == " ") {
      navn.shift();
    }
  });

  displayList();
}

function displayList() {
  // clear the list
  const studentListShow = document.querySelector("#list");
  studentList.studentObjects.forEach((student) => {
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
