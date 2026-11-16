import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import { formatVoltage } from "../core/format"
import {
  getComponentLabels,
  getLedView,
  getResistorView
} from "./component-views"
import {
  createLedElement,
  createLedInspectorElement,
  createResistorInspectorElement,
  createResistorElement,
  createSourceVoltageInspectorElement
} from "./component-elements"
import type { InspectorElements, WorkbenchElements } from "./elements"

export function renderWorkbenchCircuit(
  configuration: CircuitConfigurationDTO,
  elements: WorkbenchElements
): void {
  const labels = getComponentLabels(configuration.components)
  const componentElements = configuration.components.map((component, index) => {
    switch (component.kind) {
      case "led":
        return createLedElement(labels[index], getLedView(component))

      case "resistor":
        return createResistorElement(labels[index], getResistorView(component))
    }
  })

  elements.componentList.replaceChildren(...componentElements)
  elements.sourceTerminal.textContent = formatVoltage(
    configuration.powerSource.voltage
  )
}

export function renderInspectorCircuit(
  configuration: CircuitConfigurationDTO,
  elements: InspectorElements
): void {
  elements.sourceVoltage.replaceChildren(
    createSourceVoltageInspectorElement(configuration.powerSource.voltage)
  )
  elements.componentCount.textContent = String(configuration.components.length)
  elements.clearComponentsButton.disabled =
    configuration.components.length === 0

  const labels = getComponentLabels(configuration.components)
  const items = configuration.components.map((component, index) => {
    const item = document.createElement("li")

    if (component.kind === "resistor") {
      item.append(
        createResistorInspectorElement(
          labels[index],
          component.resistance,
          index
        )
      )
    } else {
      item.append(createLedInspectorElement(labels[index], component, index))
    }

    return item
  })

  elements.componentList.replaceChildren(...items)
}
