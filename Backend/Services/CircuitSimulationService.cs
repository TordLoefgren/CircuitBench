using CircuitBench.DTOs;

namespace CircuitBench.Services
{
    public class CircuitSimulationService : ICircuitSimulationService
    {
        public CircuitSimulationResultDTO Simulate(CircuitConfigurationDTO circuitConfiguration)
        {
            var supplyVoltage = circuitConfiguration.PowerSource.Voltage;
            var componentSpecifications = circuitConfiguration.Components;

            var voltageAcrossResistors = supplyVoltage;
            var totalResistorResistance = 0.0;

            foreach (var specification in componentSpecifications)
            {
                switch (specification)
                {
                    case ResistorComponentSpecificationDTO resistorSpecification:
                        totalResistorResistance += resistorSpecification.Resistance;
                        break;
                    case LEDComponentSpecificationDTO ledSpecification:
                        voltageAcrossResistors -= ledSpecification.ForwardVoltage;
                        break;

                    default:
                        throw new NotSupportedException(
                            $"Unsupported component specification type: {specification.GetType().Name}"
                        );
                }
            }

            double? circuitCurrent =
                totalResistorResistance > 0.0 ? voltageAcrossResistors / totalResistorResistance : null;
            double? totalPower = circuitCurrent is null ? null : 0.0;

            var componentResults = new List<ComponentSimulationResultDTO>(componentSpecifications.Count);

            foreach (var specification in componentSpecifications)
            {
                switch (specification)
                {
                    case ResistorComponentSpecificationDTO resistorSpecification:
                        // Resistor:
                        // - Resistance: 	Starting value as R_r
                        // - Current:	    Already derived
                        // - Voltage:	    V_r = R_r * I
                        // - Power: 	    P   = V_r * I

                        var resistorVoltage = resistorSpecification.Resistance * circuitCurrent;
                        var resistorPower = resistorVoltage * circuitCurrent;

                        totalPower += resistorPower;

                        componentResults.Add(
                            new ResistorSimulationResultDTO(
                                resistorSpecification.Resistance,
                                circuitCurrent,
                                resistorVoltage,
                                resistorPower
                            )
                        );
                        break;
                    case LEDComponentSpecificationDTO ledSpecification:
                        // LED:
                        // - Current:	    Already derived
                        // - Voltage:	    Starting value as V_f
                        // - Power: 	    P   = V_f * I

                        var ledPower = ledSpecification.ForwardVoltage * circuitCurrent;

                        totalPower += ledPower;

                        componentResults.Add(
                            new LEDSimulationResultDTO(circuitCurrent, ledSpecification.ForwardVoltage, ledPower)
                        );
                        break;

                    default:
                        throw new NotSupportedException(
                            $"Unsupported component specification type: {specification.GetType().Name}"
                        );
                }
            }

            return new(totalResistorResistance, circuitCurrent, supplyVoltage, totalPower, componentResults);
        }
    }
}
