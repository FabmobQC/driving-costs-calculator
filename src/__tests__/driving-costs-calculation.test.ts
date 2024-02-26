import { type NbKmPerYear, type VehiculeType } from '../config'
import { DrivingCostsCalculator } from '../index'

describe('Calculate driving costs', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  test('calculate driving costs', () => {
    const result = drivingCostsCalculator.calculateTripCosts('vus', 10000, 10000)
    expect(result).toBe(8396.26)
  })
})

describe('Calculate yearly costs', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  test.each([
    [ 'small car', 'small', 10000, 4669.34 ],
    [ 'medium car', 'medium', 10000, 5807.88 ],
    [ 'vus', 'vus', 10000,  6999.51 ],
    [ 'large car', 'large', 10000, 8405.9 ],
    [ 'sport car', 'sport', 10000, 9717.9 ]
  ])('%s', async (_description, carType, nbKmPerYear, expectedResult) => {
    const result = drivingCostsCalculator.calculateYearlyCosts(carType as VehiculeType, nbKmPerYear as NbKmPerYear)
    expect(result).toEqual(expectedResult)
  })
})
