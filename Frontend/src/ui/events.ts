import { API_URL } from "../config"
import type { CircuitSimulationResultDTO } from "../dtos/circuit-simulation-result-dto"
import type { InspectorElements, SimulationElements } from "./elements"
import { renderInspectorCircuit } from "./render-circuit"
import {
  renderSimulationComplete,
  renderSimulationFailure,
  renderSimulationPending,
  updateSimulateButton
} from "./render-simulation-result"
import {
  addComponent,
  clearComponents,
  removeComponent,
  setSourceVoltage,
  updateComponent
} from "../core/circuit"
import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import { parseLedInput, parsePositiveNumberInput } from "./component-input"

export const EVENT_TYPE_CLICK = "click"
export const EVENT_TYPE_INPUT = "input"
export const EVENT_TYPE_SUBMIT = "submit"

type GetConfigurationFn = () => CircuitConfigurationDTO
type SetConfigurationFn = (next: CircuitConfigurationDTO) => void

function showFormError(form: HTMLFormElement, message: string): void {
  const error = form.querySelector<HTMLElement>(".inspector__form-error")
  if (error) {
    error.textContent = message
    error.hidden = false
  }
}

export function registerInspectorEventListeners(
  elements: InspectorElements,
  getConfiguration: GetConfigurationFn,
  setConfiguration: SetConfigurationFn
): void {
  const { root, addResistorButton, addLedButton, clearComponentsButton } =
    elements
  const renderInspector = () =>
    renderInspectorCircuit(getConfiguration(), elements)

  addResistorButton.addEventListener(EVENT_TYPE_CLICK, () => {
    setConfiguration(
      addComponent(getConfiguration(), { kind: "resistor", resistance: 220 })
    )
  })

  addLedButton.addEventListener(EVENT_TYPE_CLICK, () => {
    setConfiguration(
      addComponent(getConfiguration(), {
        kind: "led",
        forwardVoltage: 1.8,
        maxCurrent: 0.02
      })
    )
  })

  clearComponentsButton.addEventListener(EVENT_TYPE_CLICK, () => {
    setConfiguration(clearComponents(getConfiguration()))
  })

  root.addEventListener(EVENT_TYPE_SUBMIT, (event) => {
    const form = event.target
    if (
      !(form instanceof HTMLFormElement) ||
      !form.matches(".inspector__form")
    ) {
      return
    }
    event.preventDefault()

    const configuration = getConfiguration()
    if (form.matches(".inspector__source-form")) {
      const input = form.elements.namedItem("sourceVoltage")
      if (!(input instanceof HTMLInputElement)) {
        return
      }

      const voltage = parsePositiveNumberInput(input.value)
      if (voltage === null) {
        showFormError(form, "Enter a source voltage greater than 0 V.")
      } else if (voltage === configuration.powerSource.voltage) {
        renderInspector()
      } else {
        setConfiguration(setSourceVoltage(configuration, voltage))
      }
      return
    }

    const componentIndex = Number(form.dataset.componentIndex)
    const component = configuration.components[componentIndex]
    if (!component) {
      return
    }

    if (component.kind === "resistor") {
      const input = form.elements.namedItem("resistance")
      if (!(input instanceof HTMLInputElement)) {
        return
      }

      const resistance = parsePositiveNumberInput(input.value)
      if (resistance === null) {
        showFormError(form, "Enter a resistance greater than 0 Ω.")
      } else if (resistance === component.resistance) {
        renderInspector()
      } else {
        setConfiguration(
          updateComponent(
            configuration,
            { kind: "resistor", resistance },
            componentIndex
          )
        )
      }
      return
    }

    const voltageInput = form.elements.namedItem("forwardVoltage")
    const currentInput = form.elements.namedItem("maxCurrentMilliamp")
    if (
      !(voltageInput instanceof HTMLInputElement) ||
      !(currentInput instanceof HTMLInputElement)
    ) {
      return
    }

    const led = parseLedInput(voltageInput.value, currentInput.value)
    if (led === null) {
      showFormError(
        form,
        "Enter a forward voltage above 0 V and maximum current above 0 mA."
      )
    } else if (
      led.forwardVoltage === component.forwardVoltage &&
      led.maxCurrent === component.maxCurrent
    ) {
      renderInspector()
    } else {
      setConfiguration(updateComponent(configuration, led, componentIndex))
    }
  })

  root.addEventListener(EVENT_TYPE_CLICK, (event) => {
    const target = event.target
    if (!(target instanceof Element)) {
      return
    }

    const button = target.closest<HTMLButtonElement>("button[data-action]")
    if (!button || !root.contains(button)) {
      return
    }

    if (button.dataset.action === "cancel-changes") {
      renderInspector()
    } else if (button.dataset.action === "remove-component") {
      const componentIndex = Number(button.dataset.componentIndex)
      if (Number.isInteger(componentIndex)) {
        setConfiguration(removeComponent(getConfiguration(), componentIndex))
      }
    }
  })

  root.addEventListener(EVENT_TYPE_INPUT, (event) => {
    const input = event.target
    if (!(input instanceof HTMLInputElement)) {
      return
    }

    const error = input.form?.querySelector<HTMLElement>(
      ".inspector__form-error"
    )
    if (error) {
      error.hidden = true
    }
  })
}
export function registerSimulationEventListener(
  elements: SimulationElements,
  getConfiguration: GetConfigurationFn
): void {
  elements.button.addEventListener(EVENT_TYPE_CLICK, async () => {
    const requestedConfiguration = getConfiguration()
    renderSimulationPending(elements)

    try {
      const response = await fetch(`${API_URL}/api/circuit/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestedConfiguration)
      })

      if (!response.ok) {
        throw new Error(`Simulation failed (${response.status})`)
      }

      const result: CircuitSimulationResultDTO = await response.json()
      if (requestedConfiguration !== getConfiguration()) {
        return
      }

      renderSimulationComplete(result, elements)
    } catch {
      if (requestedConfiguration === getConfiguration()) {
        renderSimulationFailure(elements)
      }
    } finally {
      if (requestedConfiguration === getConfiguration()) {
        updateSimulateButton(elements, requestedConfiguration)
      }
    }
  })
}
