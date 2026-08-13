export interface BaseComponentSimulationResultDTO {
  readonly current: number | null
  readonly voltageDrop: number | null
  readonly power: number | null
}

export interface LEDSimulationResultDTO extends BaseComponentSimulationResultDTO {
  readonly kind: "led"
}

export interface ResistorSimulationResultDTO extends BaseComponentSimulationResultDTO {
  readonly kind: "resistor"
  readonly resistance: number
}

export type ComponentSimulationResultDTO =
  LEDSimulationResultDTO | ResistorSimulationResultDTO
