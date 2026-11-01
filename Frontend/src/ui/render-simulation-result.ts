import type { CircuitSimulationResultDTO } from "../dtos/circuit-simulation-result-dto"
import { getCircuitResultView, getComponentResultView } from "./component-views"
import {
  createCircuitResultElement,
  createComponentResultElement
} from "./component-elements"

export function renderSimulationResults(
  results: CircuitSimulationResultDTO,
  container: HTMLElement
): void {
  const elements = results.components.map((component) => {
    return createComponentResultElement(getComponentResultView(component))
  })

  container.replaceChildren(
    createCircuitResultElement(getCircuitResultView(results)),
    ...elements
  )
}
