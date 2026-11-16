import { describe, expect, it } from "vitest"
import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import {
  addComponent,
  clearComponents,
  removeComponent,
  setSourceVoltage,
  updateComponent
} from "./circuit"

const led = { kind: "led", forwardVoltage: 1.8, maxCurrent: 0.02 } as const
const resistor100 = { kind: "resistor", resistance: 100 } as const
const resistor220 = { kind: "resistor", resistance: 220 } as const
const resistor330 = { kind: "resistor", resistance: 330 } as const

function configuration(): CircuitConfigurationDTO {
  return {
    powerSource: { voltage: 9 },
    components: [led, resistor100, resistor330]
  }
}

describe("addComponent", () => {
  it("appends a component without changing the previous configuration", () => {
    const previous = configuration()

    const next = addComponent(previous, resistor220)

    expect(next.components).toEqual([
      led,
      resistor100,
      resistor330,
      resistor220
    ])
    expect(next.components).not.toBe(previous.components)
    expect(previous.components).toEqual([led, resistor100, resistor330])
    expect(next.powerSource).toBe(previous.powerSource)
  })
})

describe("clearComponents", () => {
  it("clears components without changing the source or previous configuration", () => {
    const previous = configuration()

    const next = clearComponents(previous)

    expect(next.components).toEqual([])
    expect(next.powerSource).toBe(previous.powerSource)
    expect(previous.components).toEqual([led, resistor100, resistor330])
  })
})

describe("setSourceVoltage", () => {
  it("updates the source without changing the previous configuration", () => {
    const previous = configuration()

    const next = setSourceVoltage(previous, 12)

    expect(next.powerSource.voltage).toBe(12)
    expect(next.components).toBe(previous.components)
    expect(previous.powerSource.voltage).toBe(9)
  })

  it.each([0, -1, NaN, Infinity])("rejects invalid voltage %s", (voltage) => {
    expect(() => setSourceVoltage(configuration(), voltage)).toThrow(RangeError)
  })
})

describe("updateComponent", () => {
  it("replaces the selected component without mutating the previous array", () => {
    const previous = configuration()

    const next = updateComponent(previous, resistor220, 1)

    expect(next.components).toEqual([led, resistor220, resistor330])
    expect(next.components).not.toBe(previous.components)
    expect(previous.components).toEqual([led, resistor100, resistor330])
    expect(next.powerSource).toBe(previous.powerSource)
  })
})

describe("removeComponent", () => {
  it.each([
    [0, [resistor100, resistor330]],
    [1, [led, resistor330]],
    [2, [led, resistor100]]
  ])(
    "removes component at index %i and preserves the others",
    (index, expected) => {
      const previous = configuration()

      const next = removeComponent(previous, index)

      expect(next.components).toEqual(expected)
      expect(next.components).not.toBe(previous.components)
      expect(previous.components).toEqual([led, resistor100, resistor330])
    }
  )

  it("removes the only component", () => {
    const previous: CircuitConfigurationDTO = {
      powerSource: { voltage: 9 },
      components: [resistor100]
    }

    const next = removeComponent(previous, 0)

    expect(next.components).toEqual([])
    expect(previous.components).toEqual([resistor100])
  })
})

describe("component indices", () => {
  it.each([-1, 3, 1.5])(
    "rejects invalid index %s for updates and removals",
    (index) => {
      const previous = configuration()

      expect(() => updateComponent(previous, resistor220, index)).toThrow(
        RangeError
      )
      expect(() => removeComponent(previous, index)).toThrow(RangeError)
      expect(previous.components).toEqual([led, resistor100, resistor330])
    }
  )
})
