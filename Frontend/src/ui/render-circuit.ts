import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import { formatVoltage } from "../core/format"
import {
  getComponentSpecificationLabel,
  getLedView,
  getResistorView
} from "./component-views"
import { createLedElement, createResistorElement } from "./component-elements"

export function renderCircuit(
  configuration: CircuitConfigurationDTO,
  container: HTMLElement
): void {
  const elements = configuration.components.map((component) => {
    switch (component.kind) {
      case "led":
        return createLedElement(getLedView(component))

      case "resistor":
        return createResistorElement(getResistorView(component))
    }
  })

  container.replaceChildren(...elements)
}

export function renderCircuitInformation(
  configuration: CircuitConfigurationDTO,
  sourceVoltage: HTMLElement,
  componentCount: HTMLElement,
  componentList: HTMLOListElement
): void {
  sourceVoltage.textContent = formatVoltage(configuration.powerSource.voltage)
  componentCount.textContent = String(configuration.components.length)

  const items = configuration.components.map((component) => {
    const item = document.createElement("li")
    item.textContent = getComponentSpecificationLabel(component)
    return item
  })

  componentList.replaceChildren(...items)
}
