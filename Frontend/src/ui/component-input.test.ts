import { describe, expect, it } from "vitest"
import { parseLedInput, parsePositiveNumberInput } from "./component-input"

describe("parsePositiveNumberInput", () => {
  it.each([
    ["330", 330],
    ["0.5", 0.5],
    [" 220 ", 220]
  ])("accepts a positive resistance input %s", (value, expected) => {
    expect(parsePositiveNumberInput(value)).toBe(expected)
  })

  it.each(["", " ", "0", "-1", "NaN", "Infinity", "abc"])(
    "rejects an invalid resistance input %s",
    (value) => {
      expect(parsePositiveNumberInput(value)).toBeNull()
    }
  )
})

describe("parseLedInput", () => {
  it("converts maximum current from milliamperes to amperes", () => {
    expect(parseLedInput("1.8", "20")).toEqual({
      kind: "led",
      forwardVoltage: 1.8,
      maxCurrent: 0.02
    })
    expect(parseLedInput("2.2", "12.5")).toEqual({
      kind: "led",
      forwardVoltage: 2.2,
      maxCurrent: 0.0125
    })
  })

  it.each([
    ["", "20"],
    ["0", "20"],
    ["-1", "20"],
    ["NaN", "20"],
    ["1.8", ""],
    ["1.8", "0"],
    ["1.8", "-20"],
    ["1.8", "Infinity"],
    ["1.8", "1e-323"]
  ])("rejects invalid LED inputs %s and %s", (voltage, current) => {
    expect(parseLedInput(voltage, current)).toBeNull()
  })
})
