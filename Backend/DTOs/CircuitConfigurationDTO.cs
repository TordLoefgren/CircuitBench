namespace CircuitBench.DTOs
{
    public record PowerSourceSpecificationDTO(double Voltage);

    public record CircuitConfigurationDTO(
        PowerSourceSpecificationDTO PowerSource,
        IReadOnlyList<ComponentSpecificationDTO> Components
    );
}
