import TimeOfDay from "./Models/TimeOfDay";

export function getPartOfDay(hour: number): string {
    if (5 <= hour && hour < 12) {
        return TimeOfDay.values.morning;
    }
    if (12 <= hour && hour < 17) {
        return TimeOfDay.values.afternoon;
    }
    if (17 <= hour && hour < 21) {
        return TimeOfDay.values.evening;
    }

    return TimeOfDay.values.night;
}
