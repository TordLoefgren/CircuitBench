import "./style.css"
import { API_URL } from "./config"
import type { CircuitConfigurationDTO } from "./dtos/circuit-configuration-dto"
import type { CircuitSimulationResultDTO } from "./dtos/circuit-simulation-result-dto"

const simulateButton =
  document.querySelector<HTMLButtonElement>("#simulate-button")

const simulationStatus =
  document.querySelector<HTMLElement>("#simulation-status")

const simulationResult =
  document.querySelector<HTMLElement>("#simulation-result")

function main() {
  if (!simulateButton || !simulationStatus || !simulationResult) {
    return
  }

  const circuitConfiguration: CircuitConfigurationDTO = {
    powerSource: { voltage: 9.0 },
    components: [
      {
        kind: "led",
        forwardVoltage: 1.8,
        maxCurrent: 0.02
      },
      {
        kind: "resistor",
        resistance: 180.0
      },
      {
        kind: "led",
        forwardVoltage: 2.2,
        maxCurrent: 0.02
      },
      {
        kind: "resistor",
        resistance: 330.0
      },
      {
        kind: "resistor",
        resistance: 220.0
      }
    ]
  }

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

      document.querySelector("#result-resistance")!.textContent =
        circuitSimulationResult.totalResistorResistance.toFixed(2)

      document.querySelector("#result-voltage")!.textContent =
        circuitSimulationResult.voltage.toFixed(2)

      document.querySelector("#result-current")!.textContent =
        circuitSimulationResult.current === null
          ? "—"
          : (circuitSimulationResult.current * 1000).toFixed(2)

      document.querySelector("#result-power")!.textContent =
        circuitSimulationResult.power === null
          ? "—"
          : (circuitSimulationResult.power * 1000).toFixed(2)

      // Result sections are currently hardcoded in index.html.
      circuitSimulationResult.components.forEach((component, index) => {
        document.querySelector(`#result-${index + 1}-voltage`)!.textContent =
          component.voltageDrop === null
            ? "—"
            : component.voltageDrop.toFixed(2)

        document.querySelector(`#result-${index + 1}-current`)!.textContent =
          component.current === null
            ? "—"
            : (component.current * 1000).toFixed(2)

        document.querySelector(`#result-${index + 1}-power`)!.textContent =
          component.power === null ? "—" : (component.power * 1000).toFixed(2)
      })

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
