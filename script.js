function calculateResult() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
if (name === "" || roll === "" ||
    document.getElementById("marks1").value === "" ||
    document.getElementById("marks2").value === "" ||
    document.getElementById("marks3").value === "") {

    alert("Please fill all the fields!");
    return;
}
    let marks1 = Number(document.getElementById("marks1").value);
    let marks2 = Number(document.getElementById("marks2").value);
    let marks3 = Number(document.getElementById("marks3").value);
if ( marks1<0||marks1>100||
     marks2<0||marks2>100|| 
     marks3<0||marks3>100) 
     { 
        alert("Marks should be between 0 and 100!"); 
        return;
     }
    let total = marks1 + marks2 + marks3;
    let percentage = (total / 300) * 100;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }
let performanceMessage = "";

if (percentage >= 90) {
    performanceMessage = "Excellent Performance!";
} else if (percentage >= 75) {
    performanceMessage = "Very Good Performance!";
} else if (percentage >= 60) {
    performanceMessage = "Good Performance!";
} else if (percentage >= 50) {
    performanceMessage = "You Passed, Keep Improving!";
} else {
    performanceMessage = "Needs Improvement, Keep Working!";
}

let subjectPerformance =
    "Data Structures: " + marks1 + "/100<br>" +
    "Digital Electronics: " + marks2 + "/100<br>" +
    "Mathmatics: " + marks3 + "/100";

document.getElementById("result").innerHTML =
    "Name: " + name + "<br>" +
    "Roll Number: " + roll + "<br>" +
    "Total Marks: " + total + "/300<br>" +
    "Percentage: " + percentage.toFixed(2) + "%<br>" +
    "Grade: " + grade + "<br>" +
    "Status: " + (percentage >= 50 ? "PASS" : "FAIL") + "<br>" +
    "Performance: " + performanceMessage + "<br><br>" +
    subjectPerformance;

document.getElementById("progress-bar").style.width = percentage + "%";
if (percentage >= 50) {
    document.getElementById("result").style.borderColor = "green";
} else {
    document.getElementById("result").style.borderColor = "red";
}
} function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks1").value = "";
    document.getElementById("marks2").value = "";
    document.getElementById("marks3").value = "";

    document.getElementById("result").innerHTML = "";
    document.getElementById("progress-bar").style.width = "0%";
} 
function printResult() {
    const result = document.getElementById("result");
    if (result.innerHTML === "") {
        alert("Please calculate the result first!");
        return;
    }

    window.print();
}
