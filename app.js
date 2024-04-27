const milliSecInYear = 31557600000;
const milliSecInMonth = 2629800000;
const milliSecInDay = 86400000;
let intervalId1 = undefined;
let intervalId2 = undefined;
function tellAge() {
    if (intervalId1 !== undefined)
        clearInterval(intervalId1);
    getTimeLeft();
    intervalId1 = setInterval(getTimeLeft, 1000);
    if (intervalId2 !== undefined)
        clearInterval(intervalId2);
    yearOld();
    intervalId2 = setInterval(yearOld, 1000);
}
function getTimeLeft() {
    const today = new Date();
    const dateEntered = new Date(document.querySelector("#age").value + "T00:00:00");
    let birthdayDateThisYear = new Date(dateEntered);
    birthdayDateThisYear.setFullYear(today.getFullYear());
    if (today.getMonth() > dateEntered.getMonth() ||
        (today.getMonth() === dateEntered.getMonth() && today.getDate() > dateEntered.getDate())) {
        birthdayDateThisYear.setFullYear(birthdayDateThisYear.getFullYear() + 1);
    }
    const nextBirthdayDiffInMilli = birthdayDateThisYear.getTime() - today.getTime();
    const nextBirthdayInDays = Math.floor(nextBirthdayDiffInMilli / milliSecInDay);
    const nextBirthdayInDaysReminder = nextBirthdayDiffInMilli % milliSecInDay;
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
    const diffInMili = today.getTime() - dateEntered.getTime();
    const ageInYear = Math.floor(diffInMili / milliSecInYear);
    const remainingMiliSeconds = diffInMili - ageInYear * milliSecInYear;
    const ageInMonth = Math.floor(remainingMiliSeconds / milliSecInMonth);
    const ageInDay = Math.floor((remainingMiliSeconds % milliSecInMonth) / milliSecInDay);
    const ageInHour = Math.floor((remainingMiliSeconds % milliSecInDay) / (1000 * 60 * 60));
    const ageInMinute = Math.floor((remainingMiliSeconds % (1000 * 60 * 60)) / (1000 * 60));
    const ageInSecond = Math.floor((remainingMiliSeconds % (1000 * 60)) / 1000);
    document.querySelector("#yearOld").textContent = `You are ${ageInYear} years, ${ageInMonth} months, ${ageInDay} days, ${ageInHour} hours, ${ageInMinute} minutes, and ${ageInSecond} seconds old`;
}
function formatTimeUnit(value) {
    return value < 10 ? "0" + value : value.toString();
}
export {};
