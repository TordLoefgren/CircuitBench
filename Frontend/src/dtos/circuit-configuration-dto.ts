import type { ComponentSpecificationDTO } from "./component-specification-dto"

export interface PowerSourceSpecificationDTO {
  voltage: number
}

export interface CircuitConfigurationDTO {
  readonly powerSource: PowerSourceSpecificationDTO
  readonly components: readonly ComponentSpecificationDTO[]
}
