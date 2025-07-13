export class DateHelper {
  static gte(date1: Date, date2: Date): boolean {
    const normalizedDate1 = this._dateTimeToDate(date1)
    const normalizedDate2 = this._dateTimeToDate(date2)
    return normalizedDate1 >= normalizedDate2
  }

  static gt(date1: Date, date2: Date): boolean {
    const normalizedDate1 = this._dateTimeToDate(date1)
    const normalizedDate2 = this._dateTimeToDate(date2)
    return normalizedDate1 > normalizedDate2
  }

  static lte(date1: Date, date2: Date): boolean {
    const normalizedDate1 = this._dateTimeToDate(date1)
    const normalizedDate2 = this._dateTimeToDate(date2)
    return normalizedDate1 <= normalizedDate2
  }

  static lt(date1: Date, date2: Date): boolean {
    const normalizedDate1 = this._dateTimeToDate(date1)
    const normalizedDate2 = this._dateTimeToDate(date2)
    return normalizedDate1 < normalizedDate2
  }

  private static _dateTimeToDate(date: Date): Date {
    const [thenyear, thenMonth, thenDay] = [date.getFullYear(), date.getMonth(), date.getDate()]
    return new Date(thenyear, thenMonth, thenDay)
  }


}




