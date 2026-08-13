import type { ComponentSimulationResultDTO } from "./component-simulation-result-dto"

export interface CircuitSimulationResultDTO {
  readonly totalResistorResistance: number
  readonly current: number | null
  readonly voltage: number
  readonly power: number | null
  readonly components: readonly ComponentSimulationResultDTO[]
}
