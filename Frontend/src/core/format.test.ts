import { describe, expect, it } from "vitest"
import {
  formatCurrent,
  formatPower,
  formatResistance,
  formatVoltage
} from "./format"

describe("formatCurrent", () => {
  it.each([
    [1, "1 A"],
    [-1.234, "-1.23 A"],
    [0.02, "20 mA"],
    [-0.001, "-1 mA"],
    [0.00002, "20 µA"],
    [-0.000001, "-1 µA"],
    [0, "0 µA"]
  ])("formats %s amperes as %s", (amperes, expected) => {
    expect(formatCurrent(amperes)).toBe(expected)
  })

  it("rounds the converted value to two decimal places", () => {
    expect(formatCurrent(0.001234)).toBe("1.23 mA")
  })
})

describe("formatResistance", () => {
  it.each([
    [180, "180 Ω"],
    [-330, "-330 Ω"],
    [1_000, "1 kΩ"],
    [-1_500, "-1.5 kΩ"],
    [1_000_000, "1 MΩ"],
    [-2_500_000, "-2.5 MΩ"],
    [0, "0 Ω"]
  ])("formats %s ohms as %s", (ohms, expected) => {
    expect(formatResistance(ohms)).toBe(expected)
  })

  it("rounds without retaining trailing zeroes", () => {
    expect(formatResistance(1_234_500)).toBe("1.23 MΩ")
  })
})

describe("formatVoltage", () => {
  it.each([
    [9, "9 V"],
    [-1.8, "-1.8 V"],
    [1, "1 V"],
    [0.5, "500 mV"],
    [-0.005, "-5 mV"],
    [0, "0 mV"]
  ])("formats %s volts as %s", (volts, expected) => {
    expect(formatVoltage(volts)).toBe(expected)
  })

  it("rounds millivolts to two decimal places", () => {
    expect(formatVoltage(0.001234)).toBe("1.23 mV")
  })
})

describe("formatPower", () => {
  it.each([
    [1, "1 W"],
    [-2.5, "-2.5 W"],
    [0.072, "72 mW"],
    [-0.001, "-1 mW"],
    [0, "0 mW"]
  ])("formats %s watts as %s", (watts, expected) => {
    expect(formatPower(watts)).toBe(expected)
  })

  it("rounds milliwatts to two decimal places", () => {
    expect(formatPower(0.001234)).toBe("1.23 mW")
  })
})
