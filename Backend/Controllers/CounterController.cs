using Microsoft.AspNetCore.Mvc;

namespace CircuitBench.Controllers
{
    [ApiController]
    [Route("/api/counter")]
    public class CounterController : ControllerBase
    {
        private static int Counter = 0;

        [HttpPost("increment")]
        public int Increment()
        {
            return ++Counter;
        }

        [HttpPost("reset")]
        public int Reset()
        {
            Counter = 0;
            return Counter;
        }
    }
}
