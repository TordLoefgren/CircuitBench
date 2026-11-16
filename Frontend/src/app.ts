import type { CircuitConfigurationDTO } from "./dtos/circuit-configuration-dto"
import type { AppElements } from "./ui/elements"
import {
  registerInspectorEventListeners,
  registerSimulationEventListener
} from "./ui/events"
import {
  renderWorkbenchCircuit,
  renderInspectorCircuit
} from "./ui/render-circuit"
import { invalidateSimulation } from "./ui/render-simulation-result"

export function startApp(elements: AppElements): void {
  let circuitConfiguration: CircuitConfigurationDTO = {
    powerSource: { voltage: 9 },
    components: [
      { kind: "led", forwardVoltage: 1.8, maxCurrent: 0.02 },
      { kind: "resistor", resistance: 100 },
      { kind: "led", forwardVoltage: 2.2, maxCurrent: 0.02 },
      { kind: "resistor", resistance: 330 },
      { kind: "resistor", resistance: 220 }
    ]
  }

  const getConfiguration = () => circuitConfiguration
  const renderCurrentCircuit = () => {
    renderWorkbenchCircuit(circuitConfiguration, elements.workbench)
    renderInspectorCircuit(circuitConfiguration, elements.inspector)
  }

  const setConfiguration = (next: CircuitConfigurationDTO) => {
    circuitConfiguration = next
    renderCurrentCircuit()
    invalidateSimulation(elements.simulation, circuitConfiguration)
  }

  renderCurrentCircuit()

  registerInspectorEventListeners(
    elements.inspector,
    getConfiguration,
    setConfiguration
  )
  registerSimulationEventListener(elements.simulation, getConfiguration)
}
