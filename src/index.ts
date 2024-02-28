import { findMontrealAgglomeration, type Coordinate } from './agglomeration-finder'
import { defaultConfig, type Config, type NbKmPerYear, type VehiculeType } from './config'

export class DrivingCostsCalculator {
  private readonly config: Config

  constructor (config: Config = defaultConfig) {
    this.config = config
  }

  calculateTripCosts (
    vehiculeType: VehiculeType,
    nbKmPerYear: NbKmPerYear,
    distance: number, // in km
    endCoordinate?: Coordinate,
    parkingTime?: number // in hours
  ): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    const fuelCost = distance * vehiculeCosts.consommation / 100 * this.config.fuelPrice
    const maintenanceCost = distance * vehiculeCosts.maintenance[nbKmPerYear] / nbKmPerYear
    const insuranceCost = distance * vehiculeCosts.insurance / nbKmPerYear
    const depreciationCost = distance * vehiculeCosts.depreciation / nbKmPerYear
    const parkingCost = this.calculateParkingCosts(endCoordinate, parkingTime)
    return fuelCost + maintenanceCost + insuranceCost + depreciationCost + parkingCost
  }

  calculateParkingCosts (coordinate?: Coordinate, duration?: number): number {
    if (coordinate === undefined || duration === undefined) {
      return 0
    }
    const agglomeration = findMontrealAgglomeration(coordinate)
    if (agglomeration === undefined) {
      return 0
    }
    return this.config.parkingCosts[agglomeration] * duration
  }

  calculateYearlyCosts (vehiculeType: VehiculeType, nbKmPerYear: NbKmPerYear): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    return vehiculeCosts.depreciation + vehiculeCosts.insurance + vehiculeCosts.maintenance[nbKmPerYear] + vehiculeCosts.registration
  }
}
