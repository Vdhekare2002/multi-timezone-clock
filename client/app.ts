import { timezones } from "./timezone";

const timezoneSelect = document.getElementById(
  "timezone-select"
) as HTMLSelectElement;

timezones.forEach((timezone) => {
  const option = document.createElement("option");

  option.value = timezone;
  option.textContent = timezone;

  timezoneSelect.appendChild(option);
});

console.log("✅ Timezones Loaded");