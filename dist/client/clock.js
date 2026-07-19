import { removeTimezone } from "./storage.js";
let hourFormat = true;
export function setHourFormat(format) {
    hourFormat = format;
}
// -----------------------------
// UTC Offset
// -----------------------------
function getUTCOffset(timezone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    return (parts.find((part) => part.type === "timeZoneName")?.value ?? "");
}
// -----------------------------
// Day / Night
// -----------------------------
function getDayNight(timezone) {
    const hour = Number(new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        hour12: false,
    }).format(new Date()));
    return hour >= 6 && hour < 18 ? "🌞 Day" : "🌙 Night";
}
// -----------------------------
// Compare with India
// -----------------------------
function getDifferenceFromIndia(timezone) {
    const india = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });
    const current = new Date().toLocaleString("en-US", {
        timeZone: timezone,
    });
    const diff = (new Date(current).getTime() -
        new Date(india).getTime()) /
        (1000 * 60 * 60);
    if (Math.abs(diff) < 0.1) {
        return "🇮🇳 Same as India";
    }
    if (diff > 0) {
        return `⬆ ${diff.toFixed(1)} hrs Ahead of India`;
    }
    return `⬇ ${Math.abs(diff).toFixed(1)} hrs Behind India`;
}
// -----------------------------
// Create Clock Card
// -----------------------------
export function createClockCard(timezone, onDelete) {
    const container = document.getElementById("clock-container");
    const city = (timezone.split("/")[1] || timezone).replace(/_/g, " ");
    const card = document.createElement("div");
    card.className = "clock-card";
    card.dataset.timezone = timezone;
    card.innerHTML = `
      <button class="delete-btn" title="Delete Clock">
        ❌
      </button>

      <h3>${city}</h3>

      <p class="timezone-name">${timezone}</p>

      <div class="utc-offset"></div>

      <div class="comparison"></div>

      <div class="day-night"></div>

      <div class="clock-time"></div>

      <div class="clock-date"></div>
  `;
    container.appendChild(card);
    const utc = card.querySelector(".utc-offset");
    const compare = card.querySelector(".comparison");
    const dayNight = card.querySelector(".day-night");
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
        utc.textContent =
            `🛰 UTC ${getUTCOffset(timezone)}`;
        compare.textContent =
            getDifferenceFromIndia(timezone);
        dayNight.textContent =
            getDayNight(timezone);
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        clearInterval(timer);
        removeTimezone(timezone);
        card.remove();
        if (onDelete) {
            onDelete();
        }
    });
}
