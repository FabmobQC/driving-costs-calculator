import path from 'path'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import * as turf from '@turf/helpers'
import { type MultiPolygon, type FeatureCollection } from '@turf/helpers'

import { type MontrealAgglomeration, isMontrealAgglomeration } from './config.js'
import { loadJsonFile } from './files-tools.js'

export interface MontrealAgglomerationLimitProperties {
  CODEID: number
  NOM: string
  NOM_OFFICIEL: string
  CODEMAMH: string
  CODE_3C: string
  NUM: number
  ABREV: string
  TYPE: string
  COMMENT: string | null
  DATEMODIF: string

}

export type MontrealAgglomerationLimitFeatureCollection = FeatureCollection<MultiPolygon, MontrealAgglomerationLimitProperties>

export interface Coordinate {
  lat: number
  lon: number
}

const montrealAgglomerationsLimits = loadJsonFile(
  path.join(__dirname, '../data/limites-administratives-agglomeration.geojson')
) as unknown as MontrealAgglomerationLimitFeatureCollection

export const findMontrealAgglomeration = (coordinate: Coordinate): MontrealAgglomeration | undefined => {
  const point = turf.point([coordinate.lon, coordinate.lat])
  const agglomeration = montrealAgglomerationsLimits.features.find(
    ({ geometry }) => booleanPointInPolygon(point, geometry)
  )
  const agglomerationName = agglomeration?.properties.NOM
  if (isMontrealAgglomeration(agglomerationName)) {
    return agglomerationName
  }
  return undefined
}
