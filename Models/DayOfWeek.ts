import SortedListEnum from "./SortedListEnum";

enum DayOfWeekValues {
    monday    = "Monday",
    tuesday   = "Tuesday",
    wednesday = "Wednesday",
    thursday  = "Thursday",
    friday    = "Friday",
    saturday  = "Saturday",
    sunday    = "Sunday"
}

class DayOfWeek extends SortedListEnum {
    public static values = DayOfWeekValues;
    public static get list(): Array<string> {
        return [
            DayOfWeek.values.monday,
            DayOfWeek.values.tuesday,
            DayOfWeek.values.wednesday,
            DayOfWeek.values.thursday,
            DayOfWeek.values.friday,
            DayOfWeek.values.saturday,
            DayOfWeek.values.sunday,
        ]
    }
}

export default DayOfWeek;
