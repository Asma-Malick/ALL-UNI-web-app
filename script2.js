let habits = [];

function addHabit() {
    const habitInput = document.getElementById("habitInput");
    const habitName = habitInput.value.trim();
    const habitType = document.getElementById("habitType").value;

    if (habitName !== "") {
        const habitList = document.getElementById("habits");
        const newHabit = document.createElement("li");
        newHabit.innerHTML = `
            <label class="${habitType}-habit">
                <input type="checkbox" class="checkbox" data-habit="${habitName}" onchange="updateStreak(event)">
                ${habitName}
            </label>
        `;
        habitList.appendChild(newHabit);
        habitInput.value = "";

        const habitData = JSON.parse(localStorage.getItem('habits')) || [];
        habitData.push({ name: habitName, type: habitType, streak: 0, lastChecked: null });
        localStorage.setItem('habits', JSON.stringify(habitData));

        habits = habitData;
        updateProgress();
        updateGoals();
    }
}

function setReminder() {
    alert("Reminder set!");
    // Implement reminder functionality here
    setInterval(function() {
        const checkboxes = document.querySelectorAll('.checkbox');
        let allChecked = true;
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });
        if (!allChecked) {
            alert("Don't forget to complete your habits!");
        }
    }, 10 * 60 * 60 * 1000); // Set reminder every 10 hours
}

function updateStreak(event) {
    const habitName = event.target.dataset.habit;
    const habitIndex = habits.findIndex(habit => habit.name === habitName);

    if (habitIndex !== -1) {
        if (event.target.checked) {
            habits[habitIndex].streak++;
            habits[habitIndex].lastChecked = new Date();
            // Set timeout to uncheck checkbox after 24 hours
            setTimeout(function() {
                const currentTime = new Date();
                const lastCheckedTime = new Date(habits[habitIndex].lastChecked);
                const timeDiff = currentTime - lastCheckedTime;
                if (timeDiff >= 24 * 60 * 60 * 1000) {
                    event.target.checked = false;
                    habits[habitIndex].streak = 0;
                }
            }, 24 * 60 * 60 * 1000);
        } else {
            habits[habitIndex].streak = 0;
        }
        localStorage.setItem('habits', JSON.stringify(habits));
        updateGoals();
    }
}

function updateProgress() {
    const progress = document.getElementById("progress");
    const positiveHabits = habits.filter(habit => habit.type === "positive").length;
    const negativeHabits = habits.filter(habit => habit.type === "negative").length;
    progress.innerHTML = `Positive Habits: ${positiveHabits}, Negative Habits: ${negativeHabits}`;
}

function updateGoals() {
    const goals = document.getElementById("goals");
    goals.innerHTML = "<h2>Goals</h2>";
    habits.forEach(habit => {
        const newHabit = document.createElement("li");
        newHabit.innerHTML = `
            <label class="${habit.type}-habit">
                <input type="checkbox" class="checkbox" data-habit="${habit.name}" onchange="updateStreak(event)" ${habit.streak > 0 ? 'checked' : ''}>
                ${habit.name} (Streak ${habit.streak})
                <span class="delete-btn" onclick="deleteHabit('${habit.name}')">&#10060;</span>
            </label>
        `;
        goals.appendChild(newHabit);
    });
}

function deleteHabit(habitName) {
    const habitIndex = habits.findIndex(habit => habit.name === habitName);
    if (habitIndex !== -1) {
        habits.splice(habitIndex, 1);
        localStorage.setItem('habits', JSON.stringify(habits));
        updateGoals();
    }
}

// Retrieve habits from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const habitData = JSON.parse(localStorage.getItem('habits')) || [];
    habits = habitData;
    updateProgress();
    updateGoals();
});

