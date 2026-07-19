const STORAGE_KEY = "multi-timezone-clocks";
/**
 * Save all selected timezones
 */
export function saveTimezones(timezones) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones));
}
/**
 * Load saved timezones
 */
export function loadTimezones() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [];
    }
    try {
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Failed to parse saved timezones:", error);
        return [];
    }
}
/**
 * Remove a single timezone
 */
export function removeTimezone(timezone) {
    const current = loadTimezones();
    const updated = current.filter((t) => t !== timezone);
    saveTimezones(updated);
}
/**
 * Clear all saved clocks
 */
export function clearAllTimezones() {
    localStorage.removeItem(STORAGE_KEY);
}
