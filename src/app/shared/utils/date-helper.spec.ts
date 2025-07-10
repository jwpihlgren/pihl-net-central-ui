import { DateHelper } from './date-helper';

const smallDate = new Date(1900, 0, 0)
const largeDate = new Date(2000, 0, 0)


describe('DateHelper.lt', () => {
  it('Should return true when date 1 is less than date 2', () => {
    expect(DateHelper.lt(smallDate, largeDate)).toBeTrue();
  });
  it('Should return false when date 1 is greater than date 2', () => {
    expect(DateHelper.lt(largeDate, smallDate)).toBeFalse()
  })
  it('Should return false when date 1 is equal to date 2', () => {
    expect(DateHelper.lt(largeDate, largeDate)).toBeFalse()
  })
});

describe('DateHelper.lte', () => {
  it('Should return true when date 1 is less than date 2', () => {
    expect(DateHelper.lte(smallDate, largeDate)).toBeTrue()
  })
  it('Should return false when date 1 is greater than date 2', () => {
    expect(DateHelper.lte(largeDate, smallDate)).toBeFalse()
  })
  it('Should return true when date 1 is equal todate 2', () => {
    expect(DateHelper.lte(largeDate, largeDate)).toBeTrue()
  })
})

describe('DateHelper.gt', () => {
  it('Should return true when date 1 is greater than date 2', () => {
    expect(DateHelper.gt(largeDate, smallDate)).toBeTrue()
  })
  it('Should return false when date 1 is less than date 2', () => {
    expect(DateHelper.gt(smallDate, largeDate)).toBeFalse()
  })
  it('Should return true when date 1 is equal todate 2', () => {
    expect(DateHelper.gt(largeDate, largeDate)).toBeFalse()
  })
})

describe('DateHelper.gte', () => {
  it('Should return true when date 1 is greater than date 2', () => {
    expect(DateHelper.gte(largeDate, smallDate)).toBeTrue()
  })
  it('Should return false when date 1 is smaller than date 2', () => {
    expect(DateHelper.gte(smallDate, largeDate)).toBeFalse()
  })
  it('Should return true when date 1 is equal todate 2', () => {
    expect(DateHelper.gte(largeDate, largeDate)).toBeTrue()
  })
})
