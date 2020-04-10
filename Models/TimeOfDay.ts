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
}

export default TimeOfDay;
