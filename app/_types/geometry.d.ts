import { FeatureCollection } from "geojson"

export type StateFeatureCollection = FeatureCollection & {
  features: {
    properties: {
      id: string
      name: string
      description: string
    }
  }[]
}

export type FortalezaFeatureCollection = FeatureCollection & {
  features: {
    properties: {
      id: number
      Nome: string
      "Código do  IBGE": number
      "Código do  Bairro": number
      "Área (ha)": number
      "Regional Antiga": string
      "Regional Atual": string
      "Código da  Região": string
      Território: number
      Fonte: string
      ano_ref: number
      data: string
      epsg_codif: string
    }
  }[]
}
