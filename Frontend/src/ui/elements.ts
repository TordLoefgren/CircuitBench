export interface InspectorElements {
  root: HTMLElement
  sourceVoltage: HTMLElement
  componentCount: HTMLElement
  componentList: HTMLUListElement
  addResistorButton: HTMLButtonElement
  addLedButton: HTMLButtonElement
  clearComponentsButton: HTMLButtonElement
}

export interface WorkbenchElements {
  sourceTerminal: HTMLElement
  componentList: HTMLElement
}

export interface SimulationElements {
  button: HTMLButtonElement
  status: HTMLElement
  result: HTMLElement
}

export interface AppElements {
  inspector: InspectorElements
  workbench: WorkbenchElements
  simulation: SimulationElements
}

function requireElement<TElement extends Element>(selector: string): TElement {
  const element = document.querySelector<TElement>(selector)
  if (!element) {
    throw new Error(`Required element was not found: ${selector}`)
  }
  return element
}

export function queryAppElements(): AppElements {
  return {
    inspector: {
      root: requireElement<HTMLElement>("#circuit-information"),
      sourceVoltage: requireElement<HTMLElement>("#source-voltage"),
      componentCount: requireElement<HTMLElement>("#component-count"),
      componentList: requireElement<HTMLUListElement>("#inspector-components"),
      addResistorButton: requireElement<HTMLButtonElement>(
        "#add-resistor-button"
      ),
      addLedButton: requireElement<HTMLButtonElement>("#add-led-button"),
      clearComponentsButton: requireElement<HTMLButtonElement>(
        "#clear-components-button"
      )
    },
    workbench: {
      sourceTerminal: requireElement<HTMLElement>("#source-terminal"),
      componentList: requireElement<HTMLElement>("#circuit-components")
    },
    simulation: {
      button: requireElement<HTMLButtonElement>("#simulate-button"),
      status: requireElement<HTMLElement>("#simulation-status"),
      result: requireElement<HTMLElement>("#simulation-result")
    }
  }
}
