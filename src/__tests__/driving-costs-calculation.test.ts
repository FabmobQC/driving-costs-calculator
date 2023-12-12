import { DrivingCostsCalculator, VehiculeType } from '../index'

describe('Calculate driving costs', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  test('calculate driving costs', () => {
    const result = drivingCostsCalculator.calculateTripCosts('vus', 10000, 10000)
    expect(result).toBe(8887.75)
  })
})

describe('Calculate yearly costs', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  test.each([
    [ 'small car', 'small', 4587 ],
    [ 'medium car', 'medium', 6037 ],
    [ 'vus', 'vus',  7491 ],
    [ 'large car', 'large', 8941 ],
    [ 'sport car', 'sport', 10633 ]
  ])('%s', async (_description, input, expectedResult) => {
    const result = drivingCostsCalculator.calculateYearlyCosts(input as VehiculeType)
    expect(result).toEqual(expectedResult)
  })
})
