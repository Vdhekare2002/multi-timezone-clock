import { timezones } from "./timezone.js";
import { createClockCard, setHourFormat } from "./clock.js";
import { saveTimezones, loadTimezones } from "./storage.js";

const select = document.getElementById("timezone-select") as HTMLSelectElement;
const addBtn = document.getElementById("add-clock") as HTMLButtonElement;
const toggle = document.getElementById("format-toggle") as HTMLInputElement;

const totalClocks = document.getElementById("total-clocks") as HTMLElement;
const currentFormat = document.getElementById("current-format") as HTMLElement;
const comparisonBody = document.getElementById("comparison-body") as HTMLElement;

// -------------------------
// Fill Timezone Dropdown
// -------------------------
timezones.forEach((zone) => {
  const option = document.createElement("option");
  option.value = zone;
  option.textContent = zone;
  select.appendChild(option);
});

// -------------------------
// Load Saved Timezones
// -------------------------
let saved: string[] = loadTimezones();

saved.forEach((zone) => {
  createClockCard(zone, handleDelete);
});

// -------------------------
// Dashboard Update
// -------------------------
function updateDashboard() {
  totalClocks.textContent = saved.length.toString();

  currentFormat.textContent = toggle.checked
    ? "24 Hour"
    : "12 Hour";

  comparisonBody.innerHTML = "";

  if (saved.length === 0) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td colspan="2" style="text-align:center;">
        No clocks added.
      </td>
    `;

    comparisonBody.appendChild(row);

    return;
  }

  const indiaNow = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const indiaTime = new Date(indiaNow);

  const comparisonData = saved.map((zone) => {
    const zoneNow = new Date().toLocaleString("en-US", {
      timeZone: zone,
    });

    const zoneTime = new Date(zoneNow);

    const diff =
      (zoneTime.getTime() - indiaTime.getTime()) /
      (1000 * 60 * 60);

    return {
      zone,
      diff,
    };
  });

  comparisonData.sort((a, b) => b.diff - a.diff);

  comparisonData.forEach(({ zone, diff }) => {
    const row = document.createElement("tr");

    let status = "";

    if (Math.abs(diff) < 0.1) {
      status = `<span class="same">Same as India</span>`;
    } else if (diff > 0) {
      status = `<span class="ahead">⬆ ${diff.toFixed(1)} hrs Ahead</span>`;
    } else {
      status = `<span class="behind">⬇ ${Math.abs(diff).toFixed(1)} hrs Behind</span>`;
    }

    row.innerHTML = `
      <td>${zone}</td>
      <td>${status}</td>
    `;

    comparisonBody.appendChild(row);
  });
}

updateDashboard();

// -------------------------
// Add Clock
// -------------------------
addBtn.addEventListener("click", () => {
  const timezone = select.value;

  if (!timezone) {
    alert("Please select a timezone.");
    return;
  }

  if (saved.includes(timezone)) {
    alert("Clock already exists.");
    return;
  }

  saved.push(timezone);

  saveTimezones(saved);

  createClockCard(timezone, handleDelete);

  updateDashboard();
});

// -------------------------
// Toggle 12H / 24H
// -------------------------
toggle.addEventListener("change", () => {
  setHourFormat(!toggle.checked);

  const container = document.getElementById("clock-container")!;
  container.innerHTML = "";

  saved.forEach((zone) => {
    createClockCard(zone, handleDelete);
  });

  updateDashboard();
});

// -------------------------
// Delete Callback
// -------------------------
function handleDelete() {
  saved = loadTimezones();
  updateDashboard();
}