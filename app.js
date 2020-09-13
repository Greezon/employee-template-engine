const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeInfo = [];

addManager();

function employeeStart() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: ["Engineer", "Intern", "Exit Application"],
      },
    ])
    .then(function (userChoice) {
      switch (userChoice.options) {
        case "Manager":
          addManager();
          break;
        case "Intern":
          addIntern();
          break;
        case "Engineer":
          addEngineer();
          break;
        default:
          const html = render(employeeInfo);
          if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
          }
          fs.writeFileSync(outputPath, html)
          console.log(html)

      }
    });
}

function addManager() {
  console.log("Every team has to have exactly 1 Manager.")
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "Enter Manager Name.",
      },
      {
        type: "input",
        name: "employeeId",
        message: "Enter Manager ID.",
      },
      {
        type: "email",
        name: "employeeEmail",
        message: "Enter Manager email.",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter Manager Office Number.",
      },
    ])
    .then(function (userEntry) {
      var newEmployee = new Manager(
        userEntry.employeeName,
        userEntry.employeeId,
        userEntry.employeeEmail,
        userEntry.officeNumber
      );
      employeeInfo.push(newEmployee);
      employeeStart();
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "Enter Employee Name.",
      },
      {
        type: "input",
        name: "employeeId",
        message: "Enter Employee ID.",
      },
      {
        type: "email",
        name: "employeeEmail",
        message: "Enter Employee email.",
      },
      {
        type: "input",
        name: "github",
        message: "What is your Github Information?",
      },
    ])
    .then(function (userEntry) {
      var newEmployee = new Engineer(
        userEntry.employeeName,
        userEntry.employeeId,
        userEntry.employeeEmail,
        userEntry.github
      );
      employeeInfo.push(newEmployee);
      employeeStart();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "Enter Employee Name.",
      },
      {
        type: "input",
        name: "employeeId",
        message: "Enter Employee ID.",
      },
      {
        type: "email",
        name: "employeeEmail",
        message: "Enter Employee email.",
      },
      {
        type: "input",
        name: "school",
        message: "Enter School Information",
      },
    ])
    .then(function (userEntry) {
      var newEmployee = new Intern(
        userEntry.employeeName,
        userEntry.employeeId,
        userEntry.employeeEmail,
        userEntry.school
      );
      employeeInfo.push(newEmployee);
      employeeStart();
    });
}

