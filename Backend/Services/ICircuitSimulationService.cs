using CircuitBench.DTOs;

namespace CircuitBench.Services
{
    public interface ICircuitSimulationService
    {
        public CircuitSimulationResultDTO Simulate(CircuitConfigurationDTO circuitConfiguration);
    }
}
