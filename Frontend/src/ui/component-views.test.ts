import { describe, expect, it } from "vitest"
import type { CircuitSimulationResultDTO } from "../dtos/circuit-simulation-result-dto"
import type { ComponentSimulationResultDTO } from "../dtos/component-simulation-result-dto"
import type {
  LEDComponentSpecificationDTO,
  ResistorComponentSpecificationDTO
} from "../dtos/component-specification-dto"
import {
  getCircuitResultView,
  getComponentResultView,
  getComponentSpecificationLabel,
  getLedView,
  getResistorView
} from "./component-views"

describe("getResistorView", () => {
  it("labels a resistor specification", () => {
    const resistor: ResistorComponentSpecificationDTO = {
      kind: "resistor",
      resistance: 180
    }

    expect(getResistorView(resistor)).toEqual({
      resistanceLabel: "180 Ω"
    })
  })
})

describe("getLedView", () => {
  it("labels the forward voltage and maximum current", () => {
    const led: LEDComponentSpecificationDTO = {
      kind: "led",
      forwardVoltage: 1.8,
      maxCurrent: 0.02
    }

    expect(getLedView(led)).toEqual({
      forwardVoltageLabel: "1.8 V",
      maxCurrentLabel: "Max. 20 mA"
    })
  })
})

describe("getComponentSpecificationLabel", () => {
  it("labels an LED for the Inspector", () => {
    expect(
      getComponentSpecificationLabel({
        kind: "led",
        forwardVoltage: 1.8,
        maxCurrent: 0.02
      })
    ).toBe("LED (1.8 V, max. 20 mA)")
  })

  it("labels a resistor for the Inspector", () => {
    expect(
      getComponentSpecificationLabel({ kind: "resistor", resistance: 220 })
    ).toBe("Resistor (220 Ω)")
  })
})

describe("getCircuitResultView", () => {
  it("labels the quantities in a simulated circuit", () => {
    const result: CircuitSimulationResultDTO = {
      totalResistorResistance: 730,
      voltage: 9,
      current: 0.00685,
      power: 0.06165,
      components: []
    }

    expect(getCircuitResultView(result)).toEqual({
      totalResistorResistanceLabel: "730 Ω",
      voltageLabel: "9 V",
      currentLabel: "6.85 mA",
      powerLabel: "61.65 mW"
    })
  })

  it("shows a placeholder for unavailable current and power", () => {
    const result: CircuitSimulationResultDTO = {
      totalResistorResistance: 0,
      voltage: 9,
      current: null,
      power: null,
      components: []
    }

    expect(getCircuitResultView(result)).toEqual({
      totalResistorResistanceLabel: "0 Ω",
      voltageLabel: "9 V",
      currentLabel: "-",
      powerLabel: "-"
    })
  })

  it("formats zero current and power instead of treating them as unavailable", () => {
    const result: CircuitSimulationResultDTO = {
      totalResistorResistance: 180,
      voltage: 0,
      current: 0,
      power: 0,
      components: []
    }

    expect(getCircuitResultView(result)).toEqual({
      totalResistorResistanceLabel: "180 Ω",
      voltageLabel: "0 mV",
      currentLabel: "0 µA",
      powerLabel: "0 mW"
    })
  })
})

describe("getComponentResultView", () => {
  it("labels an LED simulation result", () => {
    const result: ComponentSimulationResultDTO = {
      kind: "led",
      voltageDrop: 1.8,
      current: 0.00685,
      power: 0.01233
    }

    expect(getComponentResultView(result)).toEqual({
      componentTitleLabel: "LED",
      voltageDropLabel: "1.8 V",
      currentLabel: "6.85 mA",
      powerLabel: "12.33 mW"
    })
  })

  it("labels a resistor simulation result", () => {
    const result: ComponentSimulationResultDTO = {
      kind: "resistor",
      resistance: 180,
      voltageDrop: 1.2,
      current: 0.00685,
      power: 0.00822
    }

    expect(getComponentResultView(result)).toEqual({
      componentTitleLabel: "Resistor",
      voltageDropLabel: "1.2 V",
      currentLabel: "6.85 mA",
      powerLabel: "8.22 mW"
    })
  })

  it("shows placeholders for unavailable component quantities", () => {
    const result: ComponentSimulationResultDTO = {
      kind: "led",
      voltageDrop: null,
      current: null,
      power: null
    }

    expect(getComponentResultView(result)).toEqual({
      componentTitleLabel: "LED",
      voltageDropLabel: "-",
      currentLabel: "-",
      powerLabel: "-"
    })
  })

  it("formats zero quantities instead of treating them as unavailable", () => {
    const result: ComponentSimulationResultDTO = {
      kind: "resistor",
      resistance: 330,
      voltageDrop: 0,
      current: 0,
      power: 0
    }

    expect(getComponentResultView(result)).toEqual({
      componentTitleLabel: "Resistor",
      voltageDropLabel: "0 mV",
      currentLabel: "0 µA",
      powerLabel: "0 mW"
    })
  })
})
