using CircuitBench.Services;

namespace CircuitBench
{
    public class Program
    {
        private const string FrontendCorsPolicyName = "Frontend";
        private const string FrontendOriginConfigurationKey = "Cors:FrontendOrigin";

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddScoped<ICircuitSimulationService, CircuitSimulationService>();

            var frontendOrigin =
                builder.Configuration[FrontendOriginConfigurationKey]
                ?? throw new InvalidOperationException($"{FrontendOriginConfigurationKey} is not configured.");

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    FrontendCorsPolicyName,
                    policy =>
                    {
                        policy.WithOrigins(frontendOrigin).AllowAnyHeader().AllowAnyMethod();
                    }
                );
            });

            var app = builder.Build();

            app.UseHttpsRedirection();
            app.UseCors(FrontendCorsPolicyName);
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
