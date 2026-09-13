namespace CircuitBench.DTOs
{
    public record PowerSourceSpecificationDTO(double Voltage);

    public record CircuitConfigurationDTO(
        PowerSourceSpecificationDTO PowerSource,
          IReadOnlyCollection<ComponentSpecificationDTO> Components
    );
}
