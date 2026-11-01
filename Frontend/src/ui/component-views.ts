import {
  formatCurrent,
  formatPower,
  formatResistance,
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

export function getComponentSpecificationLabel(
  component: ComponentSpecificationDTO
): string {
  switch (component.kind) {
    case "led":
      return `LED (${formatVoltage(component.forwardVoltage)}, max. ${formatCurrent(component.maxCurrent)})`
    case "resistor":
      return `Resistor (${formatResistance(component.resistance)})`
  }
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
  componentResult: ComponentSimulationResultDTO
): ComponentResultView {
  return {
    componentTitleLabel: componentResult.kind === "led" ? "LED" : "Resistor",
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
