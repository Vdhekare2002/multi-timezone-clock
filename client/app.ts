import { timezones } from "./timezone.js";
import { createClockCard, setHourFormat } from "./clock.js";
import {
  saveTimezones,
  loadTimezones
} from "./storage.js";

const select = document.getElementById("timezone-select") as HTMLSelectElement;
const addBtn = document.getElementById("add-clock") as HTMLButtonElement;
const toggle = document.getElementById("format-toggle") as HTMLInputElement;

// Dropdown fill karo
timezones.forEach((zone) => {
  const option = document.createElement("option");
  option.value = zone;
  option.textContent = zone;
  select.appendChild(option);
});

// Saved clocks load karo
let saved = loadTimezones();

saved.forEach((zone) => {
  createClockCard(zone);
});

// Add Clock
addBtn.addEventListener("click", () => {
  const timezone = select.value;

  if (!timezone) {
    alert("Please select a timezone");
    return;
  }

  // Duplicate check
  if (saved.includes(timezone)) {
    alert("Clock already exists");
    return;
  }

  saved.push(timezone);

  saveTimezones(saved);

  createClockCard(timezone);
});
toggle.addEventListener("change", () => {

    setHourFormat(!toggle.checked);

    document.getElementById("clock-container")!.innerHTML = "";

    saved.forEach(zone => createClockCard(zone));

});


