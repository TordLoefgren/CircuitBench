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
  getComponentLabels,
  getLedView,
  getResistorView
} from "./component-views"

describe("getResistorView", () => {
  it("labels a resistor specification", () => {
    const resistor: ResistorComponentSpecificationDTO = {
      kind: "resistor",
      resistance: 100
    }

    expect(getResistorView(resistor)).toEqual({
      resistanceLabel: "100 Ω"
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

describe("getComponentLabels", () => {
  it("numbers LEDs and resistors separately in circuit order", () => {
    const components = [
      { kind: "led", forwardVoltage: 1.8, maxCurrent: 0.02 },
      { kind: "resistor", resistance: 100 },
      { kind: "led", forwardVoltage: 2.2, maxCurrent: 0.02 },
      { kind: "resistor", resistance: 330 }
    ] as const

    expect(getComponentLabels(components)).toEqual(["L₁", "R₁", "L₂", "R₂"])
    expect(getComponentLabels(components.slice(1))).toEqual(["R₁", "L₁", "R₂"])
  })

  it("uses subscripts for multi-digit component numbers", () => {
    const resistors = Array.from({ length: 10 }, () => ({
      kind: "resistor" as const,
      resistance: 100
    }))

    expect(getComponentLabels(resistors).at(-1)).toBe("R₁₀")
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
      totalResistorResistance: 100,
      voltage: 0,
      current: 0,
      power: 0,
      components: []
    }

    expect(getCircuitResultView(result)).toEqual({
      totalResistorResistanceLabel: "100 Ω",
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

    expect(getComponentResultView(result, "L₁")).toEqual({
      componentTitleLabel: "LED L₁",
      voltageDropLabel: "1.8 V",
      currentLabel: "6.85 mA",
      powerLabel: "12.33 mW"
    })
  })

  it("labels a resistor simulation result", () => {
    const result: ComponentSimulationResultDTO = {
      kind: "resistor",
      resistance: 100,
      voltageDrop: 1.2,
      current: 0.00685,
      power: 0.00822
    }

    expect(getComponentResultView(result, "R₂")).toEqual({
      componentTitleLabel: "Resistor R₂",
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

    expect(getComponentResultView(result, "L₂")).toEqual({
      componentTitleLabel: "LED L₂",
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

    expect(getComponentResultView(result, "R₁")).toEqual({
      componentTitleLabel: "Resistor R₁",
      voltageDropLabel: "0 mV",
      currentLabel: "0 µA",
      powerLabel: "0 mW"
    })
  })
})
