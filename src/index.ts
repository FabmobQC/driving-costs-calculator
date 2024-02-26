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
    parkingPrice: number = 0
  ): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    const fuelCost = distance * vehiculeCosts.consommation / 100 * this.config.fuelPrice
    const maintenanceCost = distance * vehiculeCosts.maintenance[nbKmPerYear] / nbKmPerYear
    const insuranceCost = distance * vehiculeCosts.insurance / nbKmPerYear
    const depreciationCost = distance * vehiculeCosts.depreciation / nbKmPerYear
    return fuelCost + maintenanceCost + insuranceCost + depreciationCost + parkingPrice
  }

  calculateYearlyCosts (vehiculeType: VehiculeType, nbKmPerYear: NbKmPerYear): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    return vehiculeCosts.depreciation + vehiculeCosts.insurance + vehiculeCosts.maintenance[nbKmPerYear] + vehiculeCosts.registration
  }
}
