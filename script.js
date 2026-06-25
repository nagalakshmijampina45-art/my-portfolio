let students = [];

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");

const totalStudents = document.getElementById("totalStudents");
const averagePercentage = document.getElementById("averagePercentage");
const highestStudent = document.getElementById("highestStudent");
const lowestStudent = document.getElementById("lowestStudent");
const gradeCounts = document.getElementById("gradeCounts");

function clearErrors() {
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });
}

function validateMarks(mark, errorId) {
    if (mark === "" || mark < 0 || mark > 100) {
        document.getElementById(errorId).textContent =
            "Enter marks between 0 and 100";
        return false;
    }
    return true;
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    clearErrors();

    const name = document.getElementById("studentName").value.trim();
    const className = document.getElementById("className").value;

    const maths = document.getElementById("maths").value;
    const science = document.getElementById("science").value;
    const english = document.getElementById("english").value;
    const history = document.getElementById("history").value;
    const computer = document.getElementById("computer").value;

    let valid = true;

    if (name.length < 2) {
        document.getElementById("nameError").textContent =
            "Name must contain at least 2 characters";
        valid = false;
    }

    valid = validateMarks(maths, "mathError") && valid;
    valid = validateMarks(science, "scienceError") && valid;
    valid = validateMarks(english, "englishError") && valid;
    valid = validateMarks(history, "historyError") && valid;
    valid = validateMarks(computer, "computerError") && valid;

    if (!valid) {
        return;
    }

    const marks = [
        Number(maths),
        Number(science),
        Number(english),
        Number(history),
        Number(computer)
    ];

    const total = marks.reduce((sum, mark) => sum + mark, 0);

    const percentage = ((total / 500) * 100).toFixed(2);

    let grade;

    if (percentage >= 90) {
        grade = "A";
    } 
    else if (percentage >= 75) {
        grade = "B";
    } 
    else if (percentage >= 60) {
        grade = "C";
    } 
    else if (percentage >= 50) {
        grade = "D";
    } 
    else {
        grade = "F";
    }

    const status = percentage >= 50 ? "Pass" : "Fail";

    const student = {
        name,
        className,
        marks,
        total,
        percentage,
        grade,
        status
    };

    students.push(student);

    renderTable();
    updateSummary();

    form.reset();
});

function renderTable() {

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.classList.add(
            student.status === "Pass"
                ? "pass-row"
                : "fail-row"
        );

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.className}</td>
            <td>${student.marks[0]}</td>
            <td>${student.marks[1]}</td>
            <td>${student.marks[2]}</td>
            <td>${student.marks[3]}</td>
            <td>${student.marks[4]}</td>
            <td>${student.total}</td>
            <td>${student.percentage}%</td>
            <td>${student.grade}</td>
            <td>${student.status}</td>
        `;

        tableBody.appendChild(row);
    });
}

function updateSummary() {

    totalStudents.textContent =
        "Total Students : " + students.length;

    if (students.length === 0) {

        averagePercentage.textContent = "";
        highestStudent.textContent = "";
        lowestStudent.textContent = "";
        gradeCounts.textContent = "";

        return;
    }

    const avg =
        students.reduce((sum, student) =>
            sum + Number(student.percentage), 0) /
        students.length;

    averagePercentage.textContent =
        "Class Average Percentage : " +
        avg.toFixed(2) + "%";

    const highest =
        students.reduce((a, b) =>
            Number(a.percentage) > Number(b.percentage) ? a : b
        );

    const lowest =
        students.reduce((a, b) =>
            Number(a.percentage) < Number(b.percentage) ? a : b
        );

    highestStudent.textContent =
        `Highest Scorer : ${highest.name} (${highest.percentage}%)`;

    lowestStudent.textContent =
        `Lowest Scorer : ${lowest.name} (${lowest.percentage}%)`;

    let grades = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0
    };

    students.forEach(student => {
        grades[student.grade]++;
    });

    gradeCounts.textContent =
        `Grade Count → A:${grades.A}, B:${grades.B}, C:${grades.C}, D:${grades.D}, F:${grades.F}`;
}

document.getElementById("clearBtn")
.addEventListener("click", function() {

    form.reset();
    clearErrors();

});

document.getElementById("removeBtn")
.addEventListener("click", function() {

    if (students.length > 0) {

        students.pop();

        renderTable();
        updateSummary();
    }

});