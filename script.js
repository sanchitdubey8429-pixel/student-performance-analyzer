function calculateResult() {
    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;

    const subjectRows = document.querySelectorAll(".subject-row");

    if (name === "" || roll === "") {
        alert("Please enter student name and roll number!");
        return;
    }

    if (subjectRows.length === 0) {
        alert("Please add at least one subject!");
        return;
    }

    let total = 0;
    let subjectPerformance = "";

    for (const row of subjectRows) {
        const subjectName = row.querySelector(".subject-name").value;
        const marks = Number(row.querySelector(".subject-marks").value);

        if (subjectName === "" || row.querySelector(".subject-marks").value === "") {
            alert("Please fill all subject details!");
            return;
        }

        if (marks < 0 || marks > 100) {
            alert("Marks should be between 0 and 100!");
            return;
        }

        total += marks;

        subjectPerformance +=
            subjectName + ": " + marks + "/100<br>";
    }

    const maxMarks = subjectRows.length * 100;
    const percentage = (total / maxMarks) * 100;

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

    let performanceMessage;

    if (percentage >= 90) {
        performanceMessage = "Excellent Performance!";
    } else if (percentage >= 80) {
        performanceMessage = "Very Good Performance!";
    } else if (percentage >= 70) {
        performanceMessage = "Good Performance!";
    } else if (percentage >= 50) {
        performanceMessage = "You Passed, Keep Improving!";
    } else {
        performanceMessage = "Needs Improvement, Keep Working!";
    }

    document.getElementById("result").innerHTML =
        "Name: " + name + "<br>" +
        "Roll Number: " + roll + "<br>" +
        "Total Marks: " + total + "/" + maxMarks + "<br>" +
        "Percentage: " + percentage.toFixed(2) + "%<br>" +
        "Grade: " + grade + "<br>" +
        "Status: " + (percentage >= 50 ? "PASS" : "FAIL") + "<br>" +
        "Performance: " + performanceMessage + "<br><br>" +
        subjectPerformance;
document.getElementById("result-popup").style.display = "flex";
    document.getElementById("progress-bar").style.width = percentage + "%";
const chartBars = document.getElementById("chart-bars");
chartBars.innerHTML = "";

for (const row of subjectRows) {
    const subjectName = row.querySelector(".subject-name").value;
    const marks = Number(row.querySelector(".subject-marks").value);

    const bar = document.createElement("div");
    bar.className = "chart-bar";

    bar.innerHTML = `
        <span>${subjectName}</span>
        <div class="bar-background">
            <div class="bar-fill" style="width: ${marks}%">
                ${marks}
            </div>
        </div>
    `;

    chartBars.appendChild(bar);
}
const savedResults = JSON.parse(localStorage.getItem("studentResults")) || [];

savedResults.push({
    name: name,
    roll: roll,
    percentage: percentage.toFixed(2),
    grade: grade
});

localStorage.setItem("studentResults", JSON.stringify(savedResults));
    if (percentage >= 50) {
        document.getElementById("result").style.borderColor = "green";
    } else {
        document.getElementById("result").style.borderColor = "red";
    }
}
 function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";

    document.getElementById("subjects-container").innerHTML = "";

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
} document.getElementById("add-subject").addEventListener("click", function () {
    const container = document.getElementById("subjects-container");

    const row = document.createElement("div");
    row.className = "subject-row";

    row.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subject-name">
        <input type="number" placeholder="Marks" class="subject-marks">
    `;

    container.appendChild(row);
});
function downloadResult() {
    const result = document.getElementById("result");

    if (result.innerHTML.trim() === "") {
        alert("Please calculate the result first!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("Student Performance Analyzer", 20, 20);

    pdf.setFontSize(12);

    const lines = result.innerText.split("\n");
    let y = 35;

    lines.forEach(line => {
        pdf.text(line, 20, y);
        y += 10;
    });

    pdf.save("Student-Performance-Result.pdf"); } 
    setTimeout(() => {
    const welcome = document.getElementById("welcome-screen");

    welcome.style.opacity = "0";

    setTimeout(() => {
        welcome.style.display = "none";
    }, 800);
}, 2500); 
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.innerHTML = "☀️ Day Mode";
    } else {
        themeButton.innerHTML = "🌙 Dark Mode";
    }
});
function shareResult() {
    const result = document.getElementById("result");

    if (result.innerText.trim() === "") {
        alert("Please calculate the result first!");
        return;
    }

    const shareText = "Student Performance Analyzer Result\n\n" + result.innerText;

    if (navigator.share) {
        navigator.share({
            title: "Student Result",
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert("Result copied! You can paste it anywhere.");
    }
} 
document.getElementById("view-history").addEventListener("click", () => {
    const history = JSON.parse(localStorage.getItem("studentResults")) || [];
    const historyDiv = document.getElementById("history");

    if (history.length === 0) {
        historyDiv.innerHTML = "<p>No saved results yet.</p>";
        return;
    }

    historyDiv.innerHTML = history.map((item, index) => `
        <div class="history-item">
            <strong>${item.name}</strong><br>
            Roll No: ${item.roll}<br>
            Percentage: ${item.percentage}%<br>
            Grade: ${item.grade}
        </div>
    `).join("");
}); 
function closeResult() {
    document.getElementById("result-popup").style.display = "none";
} 
function showPerformance() {
    const result = document.getElementById("result");

    if (result.innerHTML.trim() === "") {
        alert("Please calculate the result first!");
        return;
    }

    alert("Student Performance\n\n" + result.innerText);
}
 