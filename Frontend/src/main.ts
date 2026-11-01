import "./style.css"
import { API_URL } from "./config"
import type { CircuitConfigurationDTO } from "./dtos/circuit-configuration-dto"
import type { CircuitSimulationResultDTO } from "./dtos/circuit-simulation-result-dto"

import { addComponent } from "./core/circuit"
import { renderCircuit, renderCircuitInformation } from "./ui/render-circuit"
import { renderSimulationResults } from "./ui/render-simulation-result"

const simulateButton =
  document.querySelector<HTMLButtonElement>("#simulate-button")

const simulationStatus =
  document.querySelector<HTMLElement>("#simulation-status")

const simulationResult =
  document.querySelector<HTMLElement>("#simulation-result")

const circuitComponents = document.querySelector<HTMLElement>(
  "#circuit-components"
)

const inspectorComponents = document.querySelector<HTMLOListElement>(
  "#inspector-components"
)

const sourceVoltage = document.querySelector<HTMLElement>("#source-voltage")
const componentCount = document.querySelector<HTMLElement>("#component-count")

function main() {
  if (
    !simulateButton ||
    !simulationStatus ||
    !simulationResult ||
    !circuitComponents ||
    !inspectorComponents ||
    !sourceVoltage ||
    !componentCount
  ) {
    return
  }

  let circuitConfiguration: CircuitConfigurationDTO = {
    powerSource: { voltage: 9.0 },
    components: []
  }

  circuitConfiguration = addComponent(circuitConfiguration, {
    kind: "led",
    forwardVoltage: 1.8,
    maxCurrent: 0.02
  })
  circuitConfiguration = addComponent(circuitConfiguration, {
    kind: "resistor",
    resistance: 180.0
  })
  circuitConfiguration = addComponent(circuitConfiguration, {
    kind: "led",
    forwardVoltage: 2.2,
    maxCurrent: 0.02
  })
  circuitConfiguration = addComponent(circuitConfiguration, {
    kind: "resistor",
    resistance: 330.0
  })
  circuitConfiguration = addComponent(circuitConfiguration, {
    kind: "resistor",
    resistance: 220.0
  })

  renderCircuit(circuitConfiguration, circuitComponents)
  renderCircuitInformation(
    circuitConfiguration,
    sourceVoltage,
    componentCount,
    inspectorComponents
  )

  simulateButton.addEventListener("click", async () => {
    simulationStatus.textContent = "Simulating…"
    simulationResult.hidden = true
    simulateButton.disabled = true

    try {
      const response = await fetch(`${API_URL}/api/circuit/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(circuitConfiguration)
      })

      if (!response.ok) {
        throw new Error(`Simulation failed (${response.status})`)
      }

      const circuitSimulationResult: CircuitSimulationResultDTO =
        await response.json()

      renderSimulationResults(circuitSimulationResult, simulationResult)

      simulationResult.hidden = false
      simulationStatus.textContent = "Simulation complete."
    } catch {
      simulationStatus.textContent =
        "Simulation failed. Check the server and try again."
    } finally {
      simulateButton.disabled = false
    }
  })
}

main()
