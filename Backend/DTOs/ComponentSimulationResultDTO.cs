using System.Text.Json.Serialization;

namespace CircuitBench.DTOs
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "kind")]
    [JsonDerivedType(typeof(ResistorSimulationResultDTO), "resistor")]
    [JsonDerivedType(typeof(LEDSimulationResultDTO), "led")]
    public abstract record ComponentSimulationResultDTO(double? Current, double? VoltageDrop, double? Power);

    public record ResistorSimulationResultDTO(double Resistance, double? Current, double? VoltageDrop, double? Power)
        : ComponentSimulationResultDTO(Current, VoltageDrop, Power);

    public record LEDSimulationResultDTO(double? Current, double? VoltageDrop, double? Power)
        : ComponentSimulationResultDTO(Current, VoltageDrop, Power);
}
