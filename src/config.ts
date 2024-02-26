export type VehiculeType = 'small' | 'medium' | 'large' | 'vus' | 'sport'

export type NbKmPerYear = 10000 | 20000 | 30000 // km/year

export interface VehiculeCosts {
  consommation: number // L/100km
  depreciation: number // $/year
  maintenance: {
    [key in NbKmPerYear]: number // $/year
  }
  insurance: number // $/year
  registration: number // $/year
}

export interface Config {
  vehiculesCosts: Record<VehiculeType, VehiculeCosts>
  fuelPrice: number // $/L
}

export const defaultConfig: Config = {
  vehiculesCosts: {
    small: {
      consommation: 5.5,
      depreciation: 3000,
      maintenance: {
        10000: 682.34,
        20000: 1311.61,
        30000: 2777.74
      },
      insurance: 754,
      registration: 233
    },
    medium: {
      consommation: 7,
      depreciation: 4200,
      maintenance: {
        10000: 620.88,
        20000: 1475.11,
        30000: 3183.83
      },
      insurance: 754,
      registration: 233
    },
    vus: {
      consommation: 10.25,
      depreciation: 5400,
      maintenance: {
        10000: 508.51,
        20000: 1159.01,
        30000: 2642.15
      },
      insurance: 858,
      registration: 233
    },
    large: {
      consommation: 12.5,
      depreciation: 6600,
      maintenance: {
        10000: 714.90,
        20000: 1691.82,
        30000: 2944.08
      },
      insurance: 858,
      registration: 233
    },
    sport: {
      consommation: 12.9,
      depreciation: 7800,
      maintenance: {
        10000: 584.90,
        20000: 1248.29,
        30000: 2585.57
      },
      insurance: 1100,
      registration: 233
    }
  },
  fuelPrice: 1.59
}
