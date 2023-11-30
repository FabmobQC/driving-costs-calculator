type VehiculeType = 'small' | 'medium' | 'large' | 'vus'

interface VehiculeCosts {
  consommation: number // L/100km
  depreciation: number // $/year
  maintenance: number // $/year
  insurance: number // $/year
}

interface Config {
  vehiculesCosts: Record<VehiculeType, VehiculeCosts>
  fuelPrice: number // $/L
}

const defaultConfig: Config = {
  vehiculesCosts: {
    small: {
      consommation: 5.5,
      depreciation: 5950,
      maintenance: 600,
      insurance: 800
    },
    medium: {
      consommation: 7,
      depreciation: 5950,
      maintenance: 850,
      insurance: 800
    },
    vus: {
      consommation: 10.5,
      depreciation: 5950,
      maintenance: 1000,
      insurance: 800
    },
    large: {
      consommation: 12.5,
      depreciation: 5950,
      maintenance: 1250,
      insurance: 800
    }
  },
  fuelPrice: 1.59
}

export class DrivingCostsCalculator {
  private readonly config: Config

  constructor (config: Config = defaultConfig) {
    this.config = config
  }

  calculateCosts (vehiculeType: VehiculeType, nbKmPerYear: number, distance: number /* in km */, parkingPrice: number = 0): number {
    const vehiculeCosts = this.config.vehiculesCosts[vehiculeType]
    const fuelCost = distance * vehiculeCosts.consommation / 100 * this.config.fuelPrice
    const maintenanceCost = distance * vehiculeCosts.maintenance / nbKmPerYear
    const insuranceCost = distance * vehiculeCosts.insurance / nbKmPerYear
    const depreciationCost = distance * vehiculeCosts.depreciation / nbKmPerYear
    return fuelCost + maintenanceCost + insuranceCost + depreciationCost + parkingPrice
  }
}
