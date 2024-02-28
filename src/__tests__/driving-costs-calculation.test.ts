import { defaultConfig, MontrealAgglomeration, type NbKmPerYear, type VehiculeType } from '../config'
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

describe('Calculate parking cost', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  const config = defaultConfig
  test.each([
    ['Ahuntsic-Cartierville', { lat: 45.55544, lon: -73.65904 }, 1],
    ['Côte-des-Neiges-Notre-Dame-de-Grâce', { lat: 45.49712, lon: -73.62342 }, 1],
    ['Lachine', { lat: 45.44231, lon: -73.68949 }, 2]
  ])('%s', async (agglomeration, coordinate, duration, ) => {
    const result = drivingCostsCalculator.calculateParkingCosts(coordinate, duration)
    const expectedResult = config.parkingCosts[agglomeration as MontrealAgglomeration] * duration
    expect(result).toEqual(expectedResult)
  })
})

describe('Calculate driving costs with paid parking', () => {
  const drivingCostsCalculator = new DrivingCostsCalculator()
  test('calculate driving costs', () => {
    const result = drivingCostsCalculator.calculateTripCosts(
      'sport',
      10000,
      0,
      { lat: 45.45835, lon: -73.57178 }, // Verdun
      0.5
    )
    expect(result).toBe(1.25)
  })
})