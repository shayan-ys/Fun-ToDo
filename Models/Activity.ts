import Season from './Season';
import TimeOfDay from "./TimeOfDay";
import DayOfWeek from "./DayOfWeek";
import {DEFAULT_PRICE} from "../env";


class Activity {
    public id   : number = null;
    public title: string = '';
    public price: number = DEFAULT_PRICE;
    public note : string = '';
    public seasons   : {[key: string]: boolean} = {};
    public timesOfDay: {[key: string]: boolean} = {};
    public daysOfWeek: {[key: string]: boolean} = {};
    public mapCoordinates = null;

    constructor() {
        this.setSeasons();
        this.setTimesOfDay();
        this.setDaysOfWeek();
    }

    setSeasons() {
        this.seasons[Season.values.spring] = true;
        this.seasons[Season.values.summer] = true;
        this.seasons[Season.values.fall] = false;
        this.seasons[Season.values.winter] = false;
    }

    setTimesOfDay() {
        this.timesOfDay[TimeOfDay.values.morning] = true;
        this.timesOfDay[TimeOfDay.values.afternoon] = true;
        this.timesOfDay[TimeOfDay.values.evening] = true;
        this.timesOfDay[TimeOfDay.values.night] = true;
    }

    setDaysOfWeek() {
        this.daysOfWeek[DayOfWeek.values.monday] = false;
        this.daysOfWeek[DayOfWeek.values.tuesday] = false;
        this.daysOfWeek[DayOfWeek.values.wednesday] = false;
        this.daysOfWeek[DayOfWeek.values.thursday] = false;
        this.daysOfWeek[DayOfWeek.values.friday] = false;
        this.daysOfWeek[DayOfWeek.values.saturday] = true;
        this.daysOfWeek[DayOfWeek.values.sunday] = true;
    }
}

export default Activity;
