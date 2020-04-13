import TimeOfDay from "./Models/TimeOfDay";
import Season from "./Models/Season";

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

export function getSeason(month: number): string {
    if (3 <= month && month < 6) {
        return Season.values.spring;
    }
    if (6 <= month && month < 9) {
        return Season.values.summer;
    }
    if (9 <= month && month < 12) {
        return Season.values.fall;
    }

    return Season.values.winter;
}
