import type { LEDComponentSpecificationDTO } from "../dtos/component-specification-dto"

export function parsePositiveNumberInput(value: string): number | null {
  if (value.trim() === "") {
    return null
  }

  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : null
}

export function parseLedInput(
  forwardVoltageInput: string,
  maxCurrentMilliampInput: string
): LEDComponentSpecificationDTO | null {
  const forwardVoltage = parsePositiveNumberInput(forwardVoltageInput)
  const maxCurrentMilliamp = parsePositiveNumberInput(maxCurrentMilliampInput)
  if (forwardVoltage === null || maxCurrentMilliamp === null) {
    return null
  }

  const maxCurrent = maxCurrentMilliamp / 1_000
  if (maxCurrent === 0) {
    return null
  }

  return { kind: "led", forwardVoltage, maxCurrent }
}
