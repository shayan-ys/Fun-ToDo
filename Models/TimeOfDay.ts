import SortedListEnum from "./SortedListEnum";

enum TimeOfDayValues {
    morning   = "Morning",
    afternoon = "Afternoon",
    evening   = "Evening",
    night     = "Night"
}

class TimeOfDay extends SortedListEnum {
    public static values = TimeOfDayValues;
    public static get list(): Array<string> {
        return [
            TimeOfDay.values.morning.toString(),
            TimeOfDay.values.afternoon.toString(),
            TimeOfDay.values.evening.toString(),
            TimeOfDay.values.night.toString(),
        ];
    }
    public static getIndex(name: TimeOfDayValues): number {
        return TimeOfDay.list.indexOf(name.toString());
    }
}

export default TimeOfDay;
