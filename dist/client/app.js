"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timezone_1 = require("./timezone");
const timezoneSelect = document.getElementById("timezone-select");
timezone_1.timezones.forEach((timezone) => {
    const option = document.createElement("option");
    option.value = timezone;
    option.textContent = timezone;
    timezoneSelect.appendChild(option);
});
console.log("✅ Timezones Loaded");
