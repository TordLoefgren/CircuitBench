import "./style.css"
import { API_URL } from "./config"
import type { CircuitConfigurationDTO } from "./dtos/circuit-configuration-dto"
import type { CircuitSimulationResultDTO } from "./dtos/circuit-simulation-result-dto"

const circuitSimulationButtonElement = document.querySelector<HTMLInputElement>(
  "#circuit-simulation__button"
)

const circuitSimulationOutputElement =
  document.querySelector<HTMLOutputElement>("#circuit-simulation__output")

function main() {
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
      }
    ]
  }

  if (circuitSimulationButtonElement) {
    circuitSimulationButtonElement.addEventListener("click", async () => {
      const response = await fetch(`${API_URL}/api/circuit/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(circuitConfiguration)
      })

      const circuitSimulationResult: CircuitSimulationResultDTO =
        await response.json()

      if (circuitSimulationOutputElement) {
        circuitSimulationOutputElement.value = JSON.stringify(
          circuitSimulationResult
        )
      }
    })
  }
}

main()
