using System.Text.Json.Serialization;

namespace CircuitBench.DTOs
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "kind")]
    [JsonDerivedType(typeof(ResistorComponentSpecificationDTO), "resistor")]
    [JsonDerivedType(typeof(LEDComponentSpecificationDTO), "led")]
    public abstract record ComponentSpecificationDTO;

    public record ResistorComponentSpecificationDTO(double Resistance) : ComponentSpecificationDTO;

    public record LEDComponentSpecificationDTO(double ForwardVoltage, double MaxCurrent) : ComponentSpecificationDTO;
}
