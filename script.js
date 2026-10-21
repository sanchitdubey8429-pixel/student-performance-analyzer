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
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 120
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("mouseout", function() {
    mouse.x = null;
    mouse.y = null;
});

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                p.x -= dx / 30;
                p.y -= dy / 30;
            }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = "rgba(255,255,255,0.15)";
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles(); 


document.getElementById("ask-ai").addEventListener("click", function () {
    const question = document.getElementById("ai-question").value.trim().toLowerCase();
    const response = document.getElementById("ai-response");

    const subjectNames = document.querySelectorAll(".subject-name");
    const subjectMarks = document.querySelectorAll(".subject-marks");

    const subjects = [];

    subjectNames.forEach((input, index) => {
        const name = input.value.trim();
        const marks = Number(subjectMarks[index]?.value);

        if (
            name &&
            subjectMarks[index]?.value.trim() !== "" &&
            Number.isFinite(marks) &&
            marks >= 0 &&
            marks <= 100
        ) {
            subjects.push({ name, marks });
        }
    });

    if (!question) {
        response.textContent = "Please type a question first.";
        return;
    }

    if (subjects.length === 0) {
        response.textContent =
            "Please enter subject names and marks (0-100) first, then ask me again.";
        return;
    }

    const total = subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const percentage = total / subjects.length;

    const sorted = [...subjects].sort((a, b) => a.marks - b.marks);
    const weakest = sorted[0];
    const strongest = sorted[sorted.length - 1];

    let answer = "";

    if (
        question.includes("weak") ||
question.includes("improve") ||
question.includes("kam marks") ||
question.includes("weakest") ||
question.includes("weak subject") ||
question.includes("sabse kam") ||
question.includes("sabse weak") ||
question.includes("kamzor") ||
question.includes("कमजोर") ||
question.includes("सबसे कम") ||
question.includes("कम अंक")
    ) {
        answer = `Your subject to focus on first is ${weakest.name} (${weakest.marks}/100). Try revising its key concepts, practising questions, and reviewing mistakes regularly.`;
    } else if (
        question.includes("strong") ||
        question.includes("best subject") ||
        question.includes("highest")
    ) {
        answer = `Your highest-scoring subject is ${strongest.name} (${strongest.marks}/100). Keep practising to maintain this progress.`;
    } else if (
    question.includes("study plan") ||
    question.includes("timetable") ||
    question.includes("schedule") ||
    question.includes("time table") ||
    question.includes("padhai ka plan") ||
    question.includes("padhai kaise karu") ||
    question.includes("पढ़ाई का प्लान") ||
    question.includes("टाइम टेबल")
) {
         
const hours = Number(document.getElementById("ai-hours").value);

if (!Number.isFinite(hours) || hours < 1 || hours > 16) {
    response.textContent = "Please enter study hours between 1 and 16.";
    return;
}

const totalMinutes = Math.round(hours * 60);
const weakMinutes = Math.round(totalMinutes * 0.4);
const practiceMinutes = Math.round(totalMinutes * 0.3);
const otherMinutes = Math.round(totalMinutes * 0.2);
const revisionMinutes = totalMinutes - weakMinutes - practiceMinutes - otherMinutes;

answer = `Your personalized ${hours}-hour study plan:

1. ${weakest.name} concepts: ${weakMinutes} minutes
2. ${weakest.name} practice: ${practiceMinutes} minutes
3. Other subjects: ${otherMinutes} minutes
4. Revision and mistake review: ${revisionMinutes} minutes

Start with your lowest-scoring subject and take short breaks when needed.`;
    } else if (
        question.includes("percentage") ||
        question.includes("overall") ||
        question.includes("performance") ||
        question.includes("analyse") ||
        question.includes("analyze") ||
        question.includes("marks")
    ) {
        answer = `Your average percentage is ${percentage.toFixed(1)}% across ${subjects.length} subject(s).\n\nHighest: ${strongest.name} (${strongest.marks}/100).\nNeeds more attention: ${weakest.name} (${weakest.marks}/100).\n\nRecommendation: practise questions from your lowest-scoring subject and track your progress weekly.`;
    } else {
        answer = `I can help with your marks! Try asking:\n\n• Which subject is weakest?\n• Which is my strongest subject?\n• Analyse my performance.\n• Make a study plan.`;
    }

    response.textContent = "🤖 Performance Assistant\n\n" + answer;
});
 