export interface LEDComponentSpecificationDTO {
  readonly kind: "led"
  readonly forwardVoltage: number
  readonly maxCurrent: number
}

export interface ResistorComponentSpecificationDTO {
  readonly kind: "resistor"
  readonly resistance: number
}

export type ComponentSpecificationDTO =
  LEDComponentSpecificationDTO | ResistorComponentSpecificationDTO
