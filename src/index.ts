export type VehiculeType = 'small' | 'medium' | 'large' | 'vus' | 'sport'

interface VehiculeCosts {
  consommation: number // L/100km
  depreciation: number // $/year
  maintenance: number // $/year
  insurance: number // $/year
  registration: number // $/year
}

interface Config {
  vehiculesCosts: Record<VehiculeType, VehiculeCosts>
  fuelPrice: number // $/L
}

const defaultConfig: Config = {
  vehiculesCosts: {
    small: {
      consommation: 5.5,
      depreciation: 3000,
      maintenance: 600,
      insurance: 754,
      registration: 233
    },
    medium: {
      consommation: 7,
      depreciation: 4200,
      maintenance: 850,
      insurance: 754,
      registration: 233
    },
    vus: {
      consommation: 10.25,
      depreciation: 5400,
      maintenance: 1000,
      insurance: 858,
      registration: 233
    },
    large: {
      consommation: 12.5,
      depreciation: 6600,
      maintenance: 1250,
      insurance: 858,
      registration: 233
    },
    sport: {
      consommation: 12.9,
      depreciation: 7800,
      maintenance: 1500,
      insurance: 1100,
      registration: 233
    }
  },
  fuelPrice: 1.59
}

export class DrivingCostsCalculator {
  private readonly config: Config

  constructor (config: Config = defaultConfig) {
    this.config = config
  }

  calculateTripCosts (vehiculeType: VehiculeType, nbKmPerYear: number, distance: number /* in km */, parkingPrice: number = 0): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    const fuelCost = distance * vehiculeCosts.consommation / 100 * this.config.fuelPrice
    const maintenanceCost = distance * vehiculeCosts.maintenance / nbKmPerYear
    const insuranceCost = distance * vehiculeCosts.insurance / nbKmPerYear
    const depreciationCost = distance * vehiculeCosts.depreciation / nbKmPerYear
    return fuelCost + maintenanceCost + insuranceCost + depreciationCost + parkingPrice
  }

  calculateYearlyCosts (vehiculeType: VehiculeType): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    return vehiculeCosts.depreciation + vehiculeCosts.insurance + vehiculeCosts.maintenance + vehiculeCosts.registration
  }
}
