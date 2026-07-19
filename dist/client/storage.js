const STORAGE_KEY = "multi-timezone-clocks";
export function saveTimezones(timezones) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones));
}
export function loadTimezones() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data)
        return [];
    return JSON.parse(data);
}
export function removeTimezone(timezone) {
    const list = loadTimezones();
    const updated = list.filter((t) => t !== timezone);
    saveTimezones(updated);
}
