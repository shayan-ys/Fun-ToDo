import SortedListEnum from "./SortedListEnum";

enum SeasonValues {
    spring = "Spring",
    summer = "Summer",
    fall   = "Fall",
    winter = "Winter",
}

class Season extends SortedListEnum {
    public static values = SeasonValues;
    public static get list(): Array<string> {
        return [
            Season.values.winter.toString(),
            Season.values.spring.toString(),
            Season.values.summer.toString(),
            Season.values.fall.toString(),
        ]
    }
}

export default Season;
