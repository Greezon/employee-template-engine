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
employeeStart();
function employeeStart() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: ["Manager", "Engineer", "Intern", "Exit Application"],
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
        name: "officeNumber",
        message: "Enter Office Number.",
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
      startEmployee();
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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
