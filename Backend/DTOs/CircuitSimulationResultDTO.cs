namespace CircuitBench.DTOs
{
    public record CircuitSimulationResultDTO(
        double TotalResistorResistance,
        double? Current,
        double Voltage,
        double? Power,
        IReadOnlyList<ComponentSimulationResultDTO> Components
    );
}
