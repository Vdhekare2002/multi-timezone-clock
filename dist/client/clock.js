import { removeTimezone } from "./storage.js";
let hourFormat = true;
export function setHourFormat(format) {
    hourFormat = format;
}
export function createClockCard(timezone) {
    const container = document.getElementById("clock-container");
    const card = document.createElement("div");
    card.className = "clock-card";
    card.dataset.timezone = timezone;
    card.innerHTML = `
    <button class="delete-btn">❌</button>

    <h3>${timezone.split("/")[1] || timezone}</h3>

    <div class="clock-time"></div>

    <div class="clock-date"></div>
  `;
    container.appendChild(card);
    const time = card.querySelector(".clock-time");
    const date = card.querySelector(".clock-date");
    function updateClock() {
        const now = new Date();
        time.textContent = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: hourFormat,
        }).format(now);
        date.textContent = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(now);
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.onclick = () => {
        clearInterval(timer);
        removeTimezone(timezone);
        card.remove();
    };
}
