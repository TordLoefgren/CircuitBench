namespace CircuitBench.DTOs
{
    public record CircuitSimulationResultDTO(
        double TotalResistorResistance,
        double? Current,
        double Voltage,
        double? Power,
        IReadOnlyCollection<ComponentSimulationResultDTO> Components
    );
}
