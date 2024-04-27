const miliSecInYear = 31557600000;
const miliSecondInMonth = 2629800000;
const miliSecondInDay = 86400000;

let intervalId1 = undefined;
let intervalId2 = undefined;

function tellAge() {
    if (intervalId1 !== undefined) clearInterval(intervalId1);
    getTimeLeft();
    intervalId1 = setInterval(getTimeLeft, 1000);

    if (intervalId2 !== undefined) clearInterval(intervalId2);
    yearOld();
    intervalId2 = setInterval(yearOld, 1000);
}

function getTimeLeft() {
    const today = new Date();
    const dateEntered = new Date(document.querySelector("#age").value + "T00:00:00");

    let birthdayDateThisYear = new Date(dateEntered);
    birthdayDateThisYear.setFullYear(today.getFullYear());

    if (today.getMonth() > dateEntered.getMonth()) {
        birthdayDateThisYear.setFullYear(birthdayDateThisYear.getFullYear() + 1);
    }

    const nextBirthdayDiffInMili = birthdayDateThisYear - today;
    const nextBirthdayInDays = Math.floor(nextBirthdayDiffInMili / miliSecondInDay);
    const nextBirthdayInDaysReminder = nextBirthdayDiffInMili % miliSecondInDay;
    const nextBirthdayInHours = Math.floor(nextBirthdayInDaysReminder / (1000 * 60 * 60));
    const nextBirthdayInHoursReminder = nextBirthdayInDaysReminder % (1000 * 60 * 60);
    const nextBirthdayInMinutes = Math.floor(nextBirthdayInHoursReminder / (1000 * 60));
    const nextBirthdayInMinutesReminder = nextBirthdayInHoursReminder % (1000 * 60);
    const nextBirthdayInSeconds = Math.floor(nextBirthdayInMinutesReminder / 1000);

    document.querySelector("#visible").classList.remove("hidden");
    document.querySelector("#day").textContent = formatTimeUnit(nextBirthdayInDays);
    document.querySelector("#hour").textContent = formatTimeUnit(nextBirthdayInHours);
    document.querySelector("#minute").textContent = formatTimeUnit(nextBirthdayInMinutes);
    document.querySelector("#second").textContent = formatTimeUnit(nextBirthdayInSeconds);
}

function yearOld() {
    const today = new Date();
    const dateEntered = new Date(document.querySelector("#age").value + "T00:00:00");

    const diffInMili = today - dateEntered;
    const ageInYear = Math.floor(diffInMili / miliSecInYear);
    const remainingMiliSeconds = diffInMili - ageInYear * miliSecInYear;
    const ageInMonth = Math.floor(remainingMiliSeconds / miliSecondInMonth);
    const ageInDay = Math.floor((remainingMiliSeconds % miliSecondInMonth) / miliSecondInDay);
    const ageInHour = Math.floor((remainingMiliSeconds % miliSecondInDay) / (1000 * 60 * 60));
    const ageInMinute = Math.floor((remainingMiliSeconds % (1000 * 60 * 60)) / (1000 * 60));
    const ageInSecond = Math.floor((remainingMiliSeconds % (1000 * 60)) / 1000);

    document.querySelector("#yearOld").textContent = `You are ${ageInYear} years, ${ageInMonth} months, ${ageInDay} days, ${ageInHour} hours, ${ageInMinute} minutes, and ${ageInSecond} seconds old`;
}

function formatTimeUnit(value) {
    return value < 10 ? "0" + value : value;
}
