import { formatVoltage } from "../core/format"
import type { LEDComponentSpecificationDTO } from "../dtos/component-specification-dto"
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

export function createResistorElement(
  label: string,
  view: ResistorView
): HTMLElement {
  const element = document.createElement("div")
  element.className = "circuit-component"

  const strongElement = document.createElement("strong")
  strongElement.textContent = label

  const spanElement = document.createElement("span")
  spanElement.textContent = view.resistanceLabel

  element.append(strongElement)
  element.append(spanElement)

  return element
}

export function createResistorInspectorElement(
  componentLabel: string,
  resistance: number,
  componentIndex: number
): HTMLDetailsElement {
  const details = document.createElement("details")
  details.className = "inspector__item"

  const summary = document.createElement("summary")
  summary.textContent = `Resistor ${componentLabel}`

  const form = document.createElement("form")
  form.className = "inspector__form"
  form.dataset.componentIndex = String(componentIndex)
  form.noValidate = true

  const label = document.createElement("label")
  label.htmlFor = `resistor-resistance-${componentIndex}`
  label.textContent = "Resistance (Ω)"

  const input = document.createElement("input")
  input.id = label.htmlFor
  input.name = "resistance"
  input.type = "number"
  input.min = "0"
  input.step = "any"
  input.value = String(resistance)

  form.append(
    label,
    input,
    createComponentActions(componentIndex),
    createFormError()
  )
  details.append(summary, form)

  return details
}

function createFormActions(): HTMLElement {
  const actions = document.createElement("div")
  actions.className = "inspector__form-actions"

  const saveButton = document.createElement("button")
  saveButton.type = "submit"
  saveButton.className = "button"
  saveButton.textContent = "Save"

  const cancelButton = document.createElement("button")
  cancelButton.type = "button"
  cancelButton.className = "button button--secondary"
  cancelButton.dataset.action = "cancel-changes"
  cancelButton.textContent = "Cancel"

  actions.append(saveButton, cancelButton)

  return actions
}

function createComponentActions(componentIndex: number): HTMLElement {
  const actions = createFormActions()
  const removeButton = document.createElement("button")
  removeButton.type = "button"
  removeButton.className = "button button--secondary"
  removeButton.dataset.action = "remove-component"
  removeButton.dataset.componentIndex = String(componentIndex)
  removeButton.textContent = "Remove"

  actions.append(removeButton)

  return actions
}

function createFormError(): HTMLElement {
  const error = document.createElement("p")
  error.className = "inspector__form-error"
  error.hidden = true

  return error
}

export function createSourceVoltageInspectorElement(
  voltage: number
): HTMLDetailsElement {
  const details = document.createElement("details")
  details.className = "inspector__item"

  const summary = document.createElement("summary")
  summary.textContent = `Source voltage (${formatVoltage(voltage)})`

  const form = document.createElement("form")
  form.className = "inspector__form inspector__source-form"
  form.noValidate = true

  const label = document.createElement("label")
  label.htmlFor = "source-voltage-input"
  label.textContent = "Voltage (V)"

  const input = document.createElement("input")
  input.id = label.htmlFor
  input.name = "sourceVoltage"
  input.type = "number"
  input.min = "0"
  input.step = "any"
  input.value = String(voltage)

  form.append(label, input, createFormActions(), createFormError())
  details.append(summary, form)

  return details
}

export function createLedInspectorElement(
  label: string,
  led: LEDComponentSpecificationDTO,
  componentIndex: number
): HTMLDetailsElement {
  const details = document.createElement("details")
  details.className = "inspector__item"

  const summary = document.createElement("summary")
  summary.textContent = `LED ${label}`

  const form = document.createElement("form")
  form.className = "inspector__form"
  form.dataset.componentIndex = String(componentIndex)
  form.noValidate = true

  const voltageLabel = document.createElement("label")
  voltageLabel.htmlFor = `led-forward-voltage-${componentIndex}`
  voltageLabel.textContent = "Forward voltage (V)"

  const voltageInput = document.createElement("input")
  voltageInput.id = voltageLabel.htmlFor
  voltageInput.name = "forwardVoltage"
  voltageInput.type = "number"
  voltageInput.min = "0"
  voltageInput.step = "any"
  voltageInput.value = String(led.forwardVoltage)

  const currentLabel = document.createElement("label")
  currentLabel.htmlFor = `led-max-current-${componentIndex}`
  currentLabel.textContent = "Maximum current (mA)"

  const currentInput = document.createElement("input")
  currentInput.id = currentLabel.htmlFor
  currentInput.name = "maxCurrentMilliamp"
  currentInput.type = "number"
  currentInput.min = "0"
  currentInput.step = "any"
  currentInput.value = String(led.maxCurrent * 1_000)

  form.append(
    voltageLabel,
    voltageInput,
    currentLabel,
    currentInput,
    createComponentActions(componentIndex),
    createFormError()
  )

  details.append(summary, form)

  return details
}

export function createLedElement(label: string, view: LedView): HTMLElement {
  const element = document.createElement("div")
  element.className = "circuit-component"

  const strongElement = document.createElement("strong")
  strongElement.textContent = label

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
