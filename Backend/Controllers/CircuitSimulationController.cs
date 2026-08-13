using CircuitBench.DTOs;
using CircuitBench.Services;
using Microsoft.AspNetCore.Mvc;

namespace CircuitBench.Controllers
{
    [ApiController]
    [Route("/api/circuit")]
    public class CircuitSimulationController : ControllerBase
    {
        private readonly ICircuitSimulationService _circuitSimulationService;

        public CircuitSimulationController(ICircuitSimulationService circuitSimulationService)
        {
            _circuitSimulationService = circuitSimulationService;
        }

        [HttpPost("simulate")]
        public CircuitSimulationResultDTO Simulate([FromBody] CircuitConfigurationDTO circuitConfiguration)
        {
            return _circuitSimulationService.Simulate(circuitConfiguration);
        }
    }
}
