import {
  formatCurrent,
  formatPower,
  formatResistance,
  formatSubscriptNumber,
  formatVoltage
} from "../core/format"
import type { CircuitSimulationResultDTO } from "../dtos/circuit-simulation-result-dto"
import type { ComponentSimulationResultDTO } from "../dtos/component-simulation-result-dto"
import type {
  ComponentSpecificationDTO,
  ResistorComponentSpecificationDTO,
  LEDComponentSpecificationDTO
} from "../dtos/component-specification-dto"

export interface ResistorView {
  resistanceLabel: string
}

export interface LedView {
  forwardVoltageLabel: string
  maxCurrentLabel: string
}

export interface CircuitResultView {
  totalResistorResistanceLabel: string
  voltageLabel: string
  currentLabel: string
  powerLabel: string
}

export interface ComponentResultView {
  componentTitleLabel: string
  voltageDropLabel: string
  currentLabel: string
  powerLabel: string
}

export function getResistorView(
  resistor: ResistorComponentSpecificationDTO
): ResistorView {
  return {
    resistanceLabel: formatResistance(resistor.resistance)
  }
}

export function getLedView(led: LEDComponentSpecificationDTO): LedView {
  return {
    forwardVoltageLabel: formatVoltage(led.forwardVoltage),
    maxCurrentLabel: `Max. ${formatCurrent(led.maxCurrent)}`
  }
}

export function getComponentLabels(
  components: readonly { kind: ComponentSpecificationDTO["kind"] }[]
): string[] {
  let resistorCount = 0
  let ledCount = 0

  return components.map((component) =>
    component.kind === "resistor"
      ? `R${formatSubscriptNumber(++resistorCount)}`
      : `L${formatSubscriptNumber(++ledCount)}`
  )
}

export function getCircuitResultView(
  circuitResult: CircuitSimulationResultDTO
): CircuitResultView {
  return {
    totalResistorResistanceLabel: formatResistance(
      circuitResult.totalResistorResistance
    ),
    voltageLabel: formatVoltage(circuitResult.voltage),
    currentLabel:
      circuitResult.current === null
        ? "-"
        : formatCurrent(circuitResult.current),
    powerLabel:
      circuitResult.power === null ? "-" : formatPower(circuitResult.power)
  }
}

export function getComponentResultView(
  componentResult: ComponentSimulationResultDTO,
  componentLabel: string
): ComponentResultView {
  return {
    componentTitleLabel:
      componentResult.kind === "led"
        ? `LED ${componentLabel}`
        : `Resistor ${componentLabel}`,
    voltageDropLabel:
      componentResult.voltageDrop === null
        ? "-"
        : formatVoltage(componentResult.voltageDrop),
    currentLabel:
      componentResult.current === null
        ? "-"
        : formatCurrent(componentResult.current),
    powerLabel:
      componentResult.power === null ? "-" : formatPower(componentResult.power)
  }
}
