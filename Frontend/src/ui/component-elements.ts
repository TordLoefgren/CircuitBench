import type {
  CircuitResultView,
  ComponentResultView,
  LedView,
  ResistorView
} from "./component-views"

export function createCircuitResultElement(
  view: CircuitResultView
): HTMLElement {
  const element = document.createElement("dl")
  element.className = "inspector__values"

  const values = [
    ["Total resistance", view.totalResistorResistanceLabel],
    ["Voltage", view.voltageLabel],
    ["Current", view.currentLabel],
    ["Power", view.powerLabel]
  ]

  for (const [label, value] of values) {
    const term = document.createElement("dt")
    term.textContent = label
    const description = document.createElement("dd")
    description.textContent = value
    element.append(term, description)
  }

  return element
}

export function createResistorElement(view: ResistorView): HTMLElement {
  const element = document.createElement("div")
  element.className = "circuit-component"

  const strongElement = document.createElement("strong")
  strongElement.textContent = "Resistor"

  const spanElement = document.createElement("span")
  spanElement.textContent = view.resistanceLabel

  element.append(strongElement)
  element.append(spanElement)

  return element
}

export function createLedElement(view: LedView): HTMLElement {
  const element = document.createElement("div")
  element.className = "circuit-component"

  const strongElement = document.createElement("strong")
  strongElement.textContent = "LED"

  const spanElement = document.createElement("span")
  spanElement.textContent = view.forwardVoltageLabel

  const smallElement = document.createElement("small")
  smallElement.textContent = view.maxCurrentLabel

  element.append(strongElement)
  element.append(spanElement)
  element.append(smallElement)

  return element
}

export function createComponentResultElement(
  view: ComponentResultView
): HTMLElement {
  const element = document.createElement("details")
  element.className = "inspector__component"

  const summaryElement = document.createElement("summary")
  summaryElement.textContent = view.componentTitleLabel

  const dlElement = document.createElement("dl")
  dlElement.className = "inspector__values"

  const dt1Element = document.createElement("dt")
  dt1Element.textContent = "Voltage drop"
  const dd1Element = document.createElement("dd")
  dd1Element.textContent = view.voltageDropLabel

  const dt2Element = document.createElement("dt")
  dt2Element.textContent = "Current"
  const dd2Element = document.createElement("dd")
  dd2Element.textContent = view.currentLabel

  const dt3Element = document.createElement("dt")
  dt3Element.textContent = "Power"
  const dd3Element = document.createElement("dd")
  dd3Element.textContent = view.powerLabel

  dlElement.append(dt1Element)
  dlElement.append(dd1Element)

  dlElement.append(dt2Element)
  dlElement.append(dd2Element)

  dlElement.append(dt3Element)
  dlElement.append(dd3Element)

  element.append(summaryElement)
  element.append(dlElement)

  return element
}
