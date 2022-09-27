"use strict";

const url = "https://petlatkea.dk/2021/hogwarts/students.json";
const bloodUrl = "https://petlatkea.dk/2021/hogwarts/families.json";

const studentList = {};
//template over hvad objecter skal indeholde
const StudentTemplate = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  house: "",
  image: "",
  blood: "",
  expelled: false,
  prefect: false,
  squad: false,
};

//let for filtering
let allStudents = [];
let filter = "all";
let filteredStudents = [];
let filterButtons;

//Expelled student list
let explldStudArray = [];
// let chosenStudent;
let temp = document.querySelector("template");
let container = document.querySelector("section");

//let for sorting
let sortThis = "sorting";

//let for blood-status
let bloodStatus;

//hacking

let systemHacked = false;

window.addEventListener("DOMContentLoaded", init);

//==========================used for filter ==================================

const searchField = document.querySelector(".search");
searchField.addEventListener("input", startSearch);
let showNumberOfStudentsShown = document.querySelector(
  ".numberofstudentsshown"
);

//======================her starter vi rigtigt hæ====================================

//henta data fra json og adder evetlistner
async function init() {
  filterButtons = document.querySelectorAll(`[data-action="filter"]`);

  filterButtons.forEach((filterbutton) => {
    filterbutton.addEventListener("click", clickFilterButton);

    //looks after changes in the options under #sortingList
    document.querySelector("#sortingList").onchange = function () {
      valgtSorting(this.value);
    };

    //hacking
    document.querySelector(".hacked").addEventListener("click", hackTheSystem);
  });

  studentList.studentObjects = [];
  studentList.studentJSON = [];
  await loadJSON();
  // makebuttons();
}

async function loadJSON() {
  const JSONData = await fetch(url);
  //studentList.studentJSON = await JSONData.json();
  const studentJSON = await JSONData.json();

  prepareObjects(studentJSON);
}

//===================================search function her wuhu============================

//serach function made here
function startSearch(event) {
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

  showNumberOfStudentsShown.textContent = searchStudentList.length;
  displayList(searchStudentList);
}

//===========================================filter her ==========================================

// make good damn filter work

function clickFilterButton(filterButton) {
  filter = filterButton.target.dataset.filter;

  const filteredStudents = filterStudents();

  displayList(filteredStudents);
}

function ifStudentSlytherin(student) {
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function ifStudentHufflepuff(student) {
  if (student.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function ifStudentGryffindor(student) {
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function ifStudentRavenclaw(student) {
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function isPrefect(student) {
  if (student.prefect === true) {
    return true;
  }
  return false;
}

function ifStudentAll(student) {
  if (student) {
    return true;
  } else {
    return false;
  }
}

function filterStudents() {
  filteredStudents = [];

  if (filter === "slytherin") {
    filteredStudents = allStudents.filter(ifStudentSlytherin);
  } else if (filter === "ravenclaw") {
    filteredStudents = allStudents.filter(ifStudentRavenclaw);
  } else if (filter === "hufflepuff") {
    filteredStudents = allStudents.filter(ifStudentHufflepuff);
  } else if (filter === "gryffindor") {
    filteredStudents = allStudents.filter(ifStudentGryffindor);
  } else if (filter === "prefect") {
    filteredStudents = allStudents.filter(isPrefect);
  } else if (filter === "expelled") {
    //ret stort S her
    filteredStudents = explldStudArray;
  } else {
    filteredStudents = allStudents.filter(ifStudentAll);
  }

  showNumberOfStudentsShown.textContent = filteredStudents.length;

  return filteredStudents;
}
//
//
//
//=========================================sort her============================================
//

//sorting start here!!

function valgtSorting(event) {
  //checks what option is clicked
  sortThis = event;
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

    //Registering hyphen
    let hyphen = student.lastName.indexOf("-");

    if (hyphen == -1) {
      student.lastName =
        student.lastName.substring(0, 1).toUpperCase() +
        student.lastName.substring(1).toLowerCase();
    } else {
      student.lastName =
        //First part of lastname being cleansed
        student.lastName.substring(0, 1).toUpperCase() +
        student.lastName.substring(1, hyphen).toLowerCase() +
        //Last part of lastname being cleansed
        student.lastName.substring(hyphen, hyphen + 2).toUpperCase() +
        student.lastName.substring(hyphen + 2).toLowerCase();
    }
    // nickname

    if (navn.includes(`"`)) {
      let nickName = navn
        .substring(navn.indexOf(`"`) + 1, navn.lastIndexOf(`"`))
        .toUpperCase();

      student.nickName = nickName[0] + nickName.substring(1).toLowerCase();
      student.middleName = "";
    }

    //Gender
    let gender = jsonObject.gender.trim().toLowerCase();
    student.gender = gender.substring(0, 1).toUpperCase() + gender.substring(1);

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
    } else if (hyphen) {
      student.image =
        student.lastName.substring(hyphen + 1).toLowerCase() +
        `_${student.firstName.substring(0, 1).toLowerCase()}`;
    }

    //===================blod status her============================================

    loadStudentBloodJSON();

    async function loadStudentBloodJSON() {
      const response = await fetch(bloodUrl);
      const studentBloodJSON = await response.json();
      student.bloodStatus = checkStudentBloodStatus(studentBloodJSON);

      checkStudentBloodStatus(studentBloodJSON);
    }

    function checkStudentBloodStatus(studentBloodJSON) {
      if (studentBloodJSON.pure.includes(student.lastName) == true) {
        return "Pureblood";
      } else if (studentBloodJSON.half.includes(student.lastName) == true) {
        return "Halfblood";
      } else {
        return "Muggle-born";
      }
    }
    student.squad = false;
    student.expelled = false;
    student.prefect = false;

    allStudents.push(student);

    // if (navn[0] == " ") {
    //   navn.shift();
    // }
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

    //navne der vises på forsiden

    klon.querySelector(
      ".firstName"
    ).textContent = `${student.firstName} ${student.middleName} ${student.lastName}`;
    // udsriver fristname
    // klon.querySelector(
    //   ".firstName"
    // ).textContent = `firstname: ${student.firstName}`;

    // // udskriver lastname - leanne har kun e navn så hendes fornavn vises osm efternanv OGSÅ??!!
    // klon.querySelector(
    //   ".lastName"
    // ).textContent = `lastname: ${student.lastName}`;

    // // udskriver middlename
    // klon.querySelector(
    //   ".middleName"
    // ).textContent = `middlename: ${student.middleName}`;

    // // udskriver nickname
    // klon.querySelector(
    //   ".nickName"
    // ).textContent = `nickname: ${student.nickName}`;

    // // udskriver gender

    // klon.querySelector(".gender").textContent = `gender: ${student.gender}`;

    // udskriver house
    klon.querySelector(".house").textContent = `house: ${student.house}`;

    //nogle billeder kommer frem andre gøre ikke??? - 3 billeder mangler ??
    klon.querySelector(".image").src = `images/${student.image}.png`;

    if (student.firstName === "Seamus") {
      klon.querySelector(".image").src = "images/finnigan_s.png";
    }

    if (student.firstName === "Leanne") {
      klon.querySelector(".image").src = "images/missing_studetns.png";
    }

    if (student.expelled === true) {
      student.squad = false;
      student.prefect = false;
    }

    klon
      .querySelector("li")
      .addEventListener("click", () => visDetails(student));
    studentListShow.appendChild(klon);
  });
}
//===========================popup lyfeeeee================================
function visDetails(student) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";

  // house colors here

  if (student.house == "Slytherin") {
    popup.querySelector(".house_colors").style.backgroundColor = "#1a472a";
    popup.querySelector(".house_colors").style.margin = "1em";
    popup.querySelector(".crest").src = "images/slytherin.png";
  }

  if (student.house == "Gryffindor") {
    popup.querySelector(".house_colors").style.backgroundColor = "#740001";
    popup.querySelector(".house_colors").style.margin = "1em";
    popup.querySelector(".crest").src = "images/gryffindor.png";
  }

  if (student.house == "Ravenclaw") {
    popup.querySelector(".house_colors").style.backgroundColor = "#0e1a40";
    popup.querySelector(".house_colors").style.margin = "1em";
    popup.querySelector(".crest").src = "images/ravenclaw.png";
  }

  if (student.house == "Hufflepuff") {
    popup.querySelector(".house_colors").style.backgroundColor = "#ecb939";
    popup.querySelector(".house_colors").style.margin = "1em";
    popup.querySelector(".crest").src = "images/hufflepuff.png";
  }

  //====================================

  popup.querySelector(
    ".firstName"
  ).textContent = `firstname: ${student.firstName}`;

  popup.querySelector(".middleName").textContent = `${student.middleName}`;

  popup.querySelector(
    ".lastName"
  ).textContent = `lastname: ${student.lastName}`;

  popup.querySelector(
    ".nickName"
  ).textContent = `nickname: ${student.nickName}`;

  popup.querySelector(".gender").textContent = `gender: ${student.gender}`;

  popup.querySelector(".house").textContent = `house: ${student.house}`;

  popup.querySelector(".image").src = `images/${student.image}.png`;

  popup.querySelector(".blood").textContent = `blood: ${student.bloodStatus}`;

  if (student.prefect === true) {
    popup.querySelector(".prefect").textContent = "is a prefect";
    popup.querySelector(".prefect").style.color = "green";
  } else if (student.prefect == false) {
    popup.querySelector(".prefect").style.color = "grey";
    popup.querySelector(".prefect").textContent = "is not a prefect";
  }

  if (student.expelled === true) {
    // popup.querySelector("#expellbutton").remove();
    popup.querySelector(".expelled").textContent =
      "this student is expelled!!!";
    popup.querySelector(".expelled").style.color = "red";
  } else if (student.expelled === false) {
    popup.querySelector(".expelled").style.color = "grey";
    popup.querySelector(".expelled").textContent = "attending student";
  } else {
  }

  if (student.squad === true) {
    popup.querySelector(".squad").textContent =
      "this student is added to the squad";
    popup.querySelector(".squad").style.color = "#ecb939";
  } else if (student.squad === false) {
    popup.querySelector(".squad").style.color = "grey";
    popup.querySelector(".squad").textContent = "student not on the squad";
  }

  //expell, prefect and squad
  popup.querySelector("#expellbutton").addEventListener("click", clickExpell);

  popup.querySelector("#prefectbutton").addEventListener("click", clickprefect);
  // ================squad made here ===========
  popup.querySelector("#squadbutton").addEventListener("click", clickSquad);
  //=========================================

  function clickExpell() {
    // if (student.expelled === true)
    if (student.firstName === "Janne") {
      student.expelled = false;
      alert("this hacker cant be expelled hæhæhæ");
    } else {
      if (student.expelled === true) {
        // student.expelled = false;
        alert("student is alredey expelled!!!!");
        // document.querySelector(".expelled").textContent = "Attending";
        // } else if (student.expelled === "impossible") {
        //   alert("studetn is to good");
      } else {
        expellStudent(student);
      }
    }

    buildList();
  }

  function clickprefect() {
    if (student.expelled === false) {
      if (student.prefect === true) {
        student.prefect = false;
        // document.querySelector("#popup .prefect").textContent =
        //   "student is not a prefect";
      } else {
        makeStudentPrefect(student);
      }
    } else {
      alert("this student is freaking expelled, and can NOT be prefect!!!!");
    }
    // document.querySelector("#popup .prefect").textContent = "student is a prefect";

    buildList();
  }

  function clickSquad() {
    console.log("squad");

    if (systemHacked === true) {
      student.squad = true;
      setTimeout(removeSquadHack, 3000);

      function removeSquadHack(student) {
        student.squad = false;
        document.querySelector(
          ".squad"
        ).textContent = `squad: ${student.squad}`;
      }
    }
    if (student.expelled === false) {
      if (
        student.house === "Slytherin" ||
        student.bloodStatus === "Pureblood"
      ) {
        if (student.squad === true) {
          student.squad = false;
        } else {
          makeSquad(student);
        }
      } else {
        student.squad = false;
        alert(
          "This student is not cool enough to join the inquisitorial squad!"
        );
      }
    } else {
      alert(
        "this student is expelled and can for sure NOT be on the squad..!!"
      );
    }
  }

  document.querySelector("#popup").addEventListener("click", () => {
    popup.style.display = "none";

    popup
      .querySelector("#expellbutton")
      .removeEventListener("click", clickExpell);

    popup
      .querySelector("#prefectbutton")
      .removeEventListener("click", clickprefect);
    // ================squad made here ===========
    popup
      .querySelector("#squadbutton")
      .removeEventListener("click", clickSquad);
  });

  // chosenStudent = student;
}

function expellStudent(chosenStudent) {
  //removes expelled student form allStudArray list
  console.log("chosenStudent", chosenStudent);
  if (chosenStudent.expelled === false) {
    allStudents.splice(allStudents.indexOf(chosenStudent), 1);
    chosenStudent.expelled = true;
    explldStudArray.push(chosenStudent);
  }

  buildList();
}

//=======================squad

function makeSquad(chosenStudent) {
  console.log("you are in sqaus");
  chosenStudent.squad = true;
}

function removeSquad(chosenStudent) {
  console.log("you are not in sqaus");
  chosenStudent.squad = false;
}

function makeStudentPrefect(chosenStudent) {
  const prefects = allStudents.filter((student) => student.prefect);

  // const numberOfPrefects = prefects.length;
  const other = prefects.filter(
    (student) => student.house === chosenStudent.house
  );
  // .shift();

  if (other.length >= 2) {
    removeAorB(other[0], other[1]);
  } else {
    makePrefect(chosenStudent);
  }

  function removeAorB(otherA, otherB) {
    document.querySelector("#remove_aorb").classList.remove("hide");
    document
      .querySelector("#remove_aorb .close")
      .addEventListener("click", closeDialog);
    document
      .querySelector("#remove_aorb #removea")
      .addEventListener("click", clickRemoveA);
    document
      .querySelector("#remove_aorb #removeb")
      .addEventListener("click", clickRemoveB);

    //Show names on buttons
    document.querySelector("[data-field=prefectA]").textContent =
      otherA.firstName;
    document.querySelector("[data-field=prefectB]").textContent =
      otherB.firstName;

    function closeDialog() {
      document.querySelector("#remove_aorb").classList.add("hide");
      document
        .querySelector("#remove_aorb .close")
        .removeEventListener("click", closeDialog);
      document
        .querySelector("#remove_aorb #removea")
        .removeEventListener("click", clickRemoveA);
      document
        .querySelector("#remove_aorb #removeb")
        .removeEventListener("click", clickRemoveB);
    }

    function clickRemoveA() {
      //if removeA:
      removePrefect(otherA);
      makePrefect(chosenStudent);
      buildList();
      closeDialog();
    }

    function clickRemoveB() {
      //else - if removeB
      removePrefect(otherB);
      makePrefect(chosenStudent);
      buildList();
      closeDialog();
    }
    //Ask user to ignorre orr removie a orr b
    //if ignoree - do nothing
  }

  function removePrefect(prefectStudent) {
    prefectStudent.prefect = false;
  }

  function makePrefect(chosenStudent) {
    chosenStudent.prefect = true;
  }
}

// HACKING
function hackTheSystem() {
  if (systemHacked === false) {
    console.log("System Hacked");
    document
      .querySelector(".hacked")
      .removeEventListener("click", hackTheSystem);

    const mig = Object.create(student);

    mig.firstName = "Janne";
    mig.lastName = "Hjuler-Jensen";
    mig.middleName = "";
    mig.nickName = "hackhackhacker";
    mig.gender = "girl";
    mig.house = "Gryffindor";
    mig.image = "mig";
    mig.bloodStatus = "muggle";
    mig.prefect = true;
    mig.expelled = false;
    mig.squad = true;

    hackBloodStatus();
    console.log(mig);

    //if you use push it ends up ind the buttom after the others
    //if you use unshift it ends up in the top infront of the others
    allStudents.push(mig);
    buildList();

    systemHacked = true;
  } else {
    alert("System is already hacked!");
  }
  setTimeout(function () {
    alert("You have been hacked!");
  }, 1000);
}

function hackBloodStatus() {
  console.log("bloodhack");
  allStudents.forEach((student) => {
    if (student.bloodStatus === "muggle") {
      student.bloodStatus = "pureblood";
    } else if (student.bloodStatus === "halfblood") {
      student.bloodStatus = "pureblood";
    } else {
      let bloodRandomNum = Math.floor(Math.random() * 3);
      if (bloodRandomNum == 0) {
        student.bloodStatus = "muggle";
      } else if (bloodRandomNum == 1) {
        student.bloodStatus = "halfblood";
      } else {
        student.bloodStatus = "pureblood";
      }
    }
    student.squad = false;
  });
}

// function addSquad() {
//   console.log("addSquad");
//   if (systemHacked === true) {
//     setTimeout(function () {
//       clickSquad();
//     }, 1000);
//   }
//   allStudents[index].squad = true;
//   // document.querySelector("#squadbutton").classList.add("clickedbutton");
// }

// function removeSquad() {
//   // document.querySelector("#isbtn").classList.remove("clickedbutton");
//   if (systemHacked === true) {
//     setTimeout(function () {
//       alert("The system is hacked, remember? You can't do that.. MUHAHA!");
//     }, 100);
//   }
//   allStudents[index].squad = false;
// }
