export function formatCurrent(amperes: number): string {
  const magnitude = Math.abs(amperes)

  let value: number
  let unit: string

  if (magnitude >= 1) {
    value = amperes
    unit = "A"
  } else if (magnitude >= 0.001) {
    value = amperes * 1_000
    unit = "mA"
  } else {
    value = amperes * 1_000_000
    unit = "µA"
  }

  return `${Number(value.toFixed(2))} ${unit}`
}

export function formatResistance(ohms: number): string {
  const magnitude = Math.abs(ohms)

  let value: number
  let unit: string

  if (magnitude >= 1_000_000) {
    value = ohms / 1_000_000
    unit = "MΩ"
  } else if (magnitude >= 1_000) {
    value = ohms / 1_000
    unit = "kΩ"
  } else {
    value = ohms
    unit = "Ω"
  }

  return `${Number(value.toFixed(2))} ${unit}`
}

export function formatVoltage(voltage: number): string {
  const magnitude = Math.abs(voltage)

  let value: number
  let unit: string

  if (magnitude >= 1) {
    value = voltage
    unit = "V"
  } else {
    value = voltage * 1_000
    unit = "mV"
  }

  return `${Number(value.toFixed(2))} ${unit}`
}

export function formatPower(watts: number): string {
  const magnitude = Math.abs(watts)

  let value: number
  let unit: string

  if (magnitude >= 1) {
    value = watts
    unit = "W"
  } else {
    value = watts * 1_000
    unit = "mW"
  }

  return `${Number(value.toFixed(2))} ${unit}`
}
