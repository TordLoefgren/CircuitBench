import type { CircuitConfigurationDTO } from "../dtos/circuit-configuration-dto"
import type { ComponentSpecificationDTO } from "../dtos/component-specification-dto"

function assertComponentIndex(
  circuitConfiguration: CircuitConfigurationDTO,
  componentIndex: number
): void {
  if (
    !Number.isInteger(componentIndex) ||
    componentIndex < 0 ||
    componentIndex >= circuitConfiguration.components.length
  ) {
    throw new RangeError("Component index is out of range")
  }
}

export function addComponent(
  circuitConfiguration: CircuitConfigurationDTO,
  componentSpecification: ComponentSpecificationDTO
): CircuitConfigurationDTO {
  return {
    ...circuitConfiguration,
    components: [...circuitConfiguration.components, componentSpecification]
  }
}

export function updateComponent(
  circuitConfiguration: CircuitConfigurationDTO,
  componentSpecification: ComponentSpecificationDTO,
  componentIndex: number
): CircuitConfigurationDTO {
  assertComponentIndex(circuitConfiguration, componentIndex)

  return {
    powerSource: circuitConfiguration.powerSource,
    components: circuitConfiguration.components.with(
      componentIndex,
      componentSpecification
    )
  }
}

export function removeComponent(
  circuitConfiguration: CircuitConfigurationDTO,
  componentIndex: number
): CircuitConfigurationDTO {
  assertComponentIndex(circuitConfiguration, componentIndex)

  return {
    ...circuitConfiguration,
    components: circuitConfiguration.components.filter(
      (_, index) => index !== componentIndex
    )
  }
}
