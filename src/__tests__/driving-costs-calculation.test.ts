import { DrivingCostsCalculator } from '../index'

test('calculate driving costs', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  const result = drivingCostsCalculator.calculateCosts('vus', 10000, 10000)
  expect(result).toBe(9419.5)
})
