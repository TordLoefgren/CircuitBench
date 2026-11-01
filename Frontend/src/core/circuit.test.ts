import { describe, expect, it } from "vitest"
import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import { addComponent, removeComponent, updateComponent } from "./circuit"

const led = { kind: "led", forwardVoltage: 1.8, maxCurrent: 0.02 } as const
const resistor180 = { kind: "resistor", resistance: 180 } as const
const resistor220 = { kind: "resistor", resistance: 220 } as const
const resistor330 = { kind: "resistor", resistance: 330 } as const

function configuration(): CircuitConfigurationDTO {
  return {
    powerSource: { voltage: 9 },
    components: [led, resistor180, resistor330]
  }
}

describe("addComponent", () => {
  it("appends a component without changing the previous configuration", () => {
    const previous = configuration()

    const next = addComponent(previous, resistor220)

    expect(next.components).toEqual([
      led,
      resistor180,
      resistor330,
      resistor220
    ])
    expect(next.components).not.toBe(previous.components)
    expect(previous.components).toEqual([led, resistor180, resistor330])
    expect(next.powerSource).toBe(previous.powerSource)
  })
})

describe("updateComponent", () => {
  it("replaces the selected component without mutating the previous array", () => {
    const previous = configuration()

    const next = updateComponent(previous, resistor220, 1)

    expect(next.components).toEqual([led, resistor220, resistor330])
    expect(next.components).not.toBe(previous.components)
    expect(previous.components).toEqual([led, resistor180, resistor330])
    expect(next.powerSource).toBe(previous.powerSource)
  })
})

describe("removeComponent", () => {
  it.each([
    [0, [resistor180, resistor330]],
    [1, [led, resistor330]],
    [2, [led, resistor180]]
  ])(
    "removes component at index %i and preserves the others",
    (index, expected) => {
      const previous = configuration()

      const next = removeComponent(previous, index)

      expect(next.components).toEqual(expected)
      expect(next.components).not.toBe(previous.components)
      expect(previous.components).toEqual([led, resistor180, resistor330])
    }
  )

  it("removes the only component", () => {
    const previous: CircuitConfigurationDTO = {
      powerSource: { voltage: 9 },
      components: [resistor180]
    }

    const next = removeComponent(previous, 0)

    expect(next.components).toEqual([])
    expect(previous.components).toEqual([resistor180])
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
      expect(previous.components).toEqual([led, resistor180, resistor330])
    }
  )
})
