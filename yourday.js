

const quotes = [
    "Believe you can, and you're halfway there.",
    "The secret of getting ahead is getting started.",
    "Do what you can, with what you have, where you are.",
    "Success is not final, failure is not fatal; it is the courage to continue that counts.",
    "Make each day your masterpiece.",
    "The only way to do great work is to love what you do.",
    "Small steps in the right direction can turn out to be the biggest step of your life.",
    "You don’t have to be great to start, but you have to start to be great.",
    "A year from now, you may wish you had started today.",
    "Every day is a fresh start. Take a deep breath and start again."
];

function getRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    document.getElementById("myquote").textContent = getRandomQuote();
}

setInterval(displayQuote, 5000);


function displayDate() {
    let today = new Date();
    let options = { weekday: "long", month: "long", year: "numeric", day: "numeric" };
    document.getElementById("date").textContent = today.toLocaleDateString("en-US", options);
}

function updateAtMidnight() {
    let now = new Date();
    let midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    let timeUntilMidnight = midnight - now;

    setTimeout(() => {
        displayDate();
        setInterval(displayDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
}

const input = document.getElementById("goalInput");
const save = document.getElementById("goalSave");
const goalCheckbox = document.getElementById("goalCheckbox");
const goal = document.getElementById("myGoal");
const celebrationMessage = document.getElementById("celebrationMessage");

save.addEventListener("click", function () {
    const goalText = input.value.trim();
    if (!goalText) return;

    goal.textContent = goalText;
    localStorage.setItem("dailygoal", goalText);
    input.value = "";
    goalCheckbox.checked = false;
});

document.addEventListener("DOMContentLoaded", function () {
    const savedGoal = localStorage.getItem("dailygoal");
    if (savedGoal) {
        goal.textContent = savedGoal;
    }
});

goalCheckbox.addEventListener("change", function () {
    if (goalCheckbox.checked) {
        celebrate();
    }
});

function celebrate() {
    celebrationMessage.style.display = "block";
    startConfetti();
    setTimeout(() => {
        celebrationMessage.style.display = "none";
        stopConfetti();
    }, 5000);
}

function startConfetti() {
    let duration = 5000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            spread: 120,
            origin: { y: 0.6 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

function stopConfetti() {
    confetti.reset();
}


function saveReflectionManually() {
    let reflectInput = document.getElementById("reflectionInput");
    let reflectionText = reflectInput.value.trim();
    if (!reflectionText) {
        alert("Reflection cannot be empty!");
        return;
    }

    let today = new Date().toISOString().split("T")[0];
    let reflections = JSON.parse(localStorage.getItem("reflections")) || {};

    if (!reflections[today]) reflections[today] = [];
    reflections[today].push(reflectionText);

    localStorage.setItem("reflections", JSON.stringify(reflections));
    reflectInput.value = "";
    displayPastReflections();
    alert("Reflection saved successfully! 🎉");
}

function displayPastReflections() {
    let reflectionsContainer = document.getElementById("pastReflections");
    reflectionsContainer.innerHTML = "";
    let reflections = JSON.parse(localStorage.getItem("reflections")) || {};

    Object.keys(reflections).forEach(date => {
        reflections[date].forEach((reflection, index) => {
            let div = document.createElement("div");
            div.classList.add("reflection-entry");
            div.innerHTML = `
                <strong>${date}:</strong> ${reflection}
                <button class="delete-btn" onclick="deleteReflection('${date}', ${index})">❌</button>
            `;
            reflectionsContainer.appendChild(div);
        });
    });
}

function deleteReflection(date, index) {
    let reflections = JSON.parse(localStorage.getItem("reflections")) || {};
    if (!reflections[date]) return;

    reflections[date].splice(index, 1);
    if (reflections[date].length === 0) delete reflections[date];

    localStorage.setItem("reflections", JSON.stringify(reflections));
    displayPastReflections();
}

function clearText() {
    document.getElementById("reflectionInput").value = "";
}


let addHabitBtn = document.getElementById("addHabit");

addHabitBtn.addEventListener("click", function () {
    let habitInput = document.getElementById("habitInput");
    let habitName = habitInput.value.trim();
    if (!habitName) return;

    let habit = { name: habitName, done: false };
    addHabitToDOM(habit);
    saveHabit(habit);
    habitInput.value = "";
});

function addHabitToDOM(habit) {
    let list = document.getElementById("habitList");
    let element = document.createElement("li");

    let container = document.createElement("div");
    container.classList.add("habit-item");

    let span = document.createElement("span");
    span.textContent = habit.name;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;
    checkbox.classList.add("habit-check");
    checkbox.addEventListener("change", function () {
        habit.done = checkbox.checked;
        updateHabitInLocalStorage(habit);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        element.remove();
        removeHabitFromLocalStorage(habit);
    });

    container.appendChild(span);
    container.appendChild(checkbox);
    container.appendChild(deleteBtn);
    element.appendChild(container);
    list.appendChild(element);
}

function saveHabit(habit) {
    let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits.push(habit);
    localStorage.setItem("habits", JSON.stringify(storedHabits));
}

function updateHabitInLocalStorage(updatedHabit) {
    let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits = storedHabits.map(h => h.name === updatedHabit.name ? updatedHabit : h);
    localStorage.setItem("habits", JSON.stringify(storedHabits));
}

function removeHabitFromLocalStorage(habitToRemove) {
    let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits = storedHabits.filter(h => h.name !== habitToRemove.name);
    localStorage.setItem("habits", JSON.stringify(storedHabits));
}


document.addEventListener("DOMContentLoaded", function () {
    displayQuote();
    displayDate();
    updateAtMidnight();
    displayPastReflections();
    let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits.forEach(habit => addHabitToDOM(habit));
});

