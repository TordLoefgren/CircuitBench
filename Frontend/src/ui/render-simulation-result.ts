import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import type { CircuitSimulationResultDTO } from "../dtos/circuit-simulation-result-dto"
import {
  getCircuitResultView,
  getComponentLabels,
  getComponentResultView
} from "./component-views"
import {
  createCircuitResultElement,
  createComponentResultElement
} from "./component-elements"
import type { SimulationElements } from "./elements"

export function renderSimulationResults(
  results: CircuitSimulationResultDTO,
  container: HTMLElement
): void {
  const labels = getComponentLabels(results.components)
  const elements = results.components.map((component, index) => {
    return createComponentResultElement(
      getComponentResultView(component, labels[index])
    )
  })

  container.replaceChildren(
    createCircuitResultElement(getCircuitResultView(results)),
    ...elements
  )
}

export function renderSimulationPending(elements: SimulationElements): void {
  elements.status.textContent = "Simulating…"
  elements.result.hidden = true
  elements.button.disabled = true
}

export function renderSimulationComplete(
  results: CircuitSimulationResultDTO,
  elements: SimulationElements
): void {
  renderSimulationResults(results, elements.result)

  elements.result.hidden = false
  elements.status.textContent = "Simulation complete."
}

export function renderSimulationFailure(elements: SimulationElements): void {
  elements.status.textContent =
    "Simulation failed. Check the server and try again."
}

export function updateSimulateButton(
  elements: SimulationElements,
  configuration: CircuitConfigurationDTO
): void {
  elements.button.disabled = configuration.components.length === 0
}

export function invalidateSimulation(
  elements: SimulationElements,
  configuration: CircuitConfigurationDTO
): void {
  elements.result.replaceChildren()
  elements.result.hidden = true

  updateSimulateButton(elements, configuration)

  elements.status.textContent =
    configuration.components.length === 0
      ? "Add a component to simulate."
      : "Circuit changed. Click Simulate to refresh results."
}
