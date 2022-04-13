using Microsoft.Extensions.DependencyInjection;
using <%= projectName %>.Repositories;
using <%= projectName %>.Repositories.Interfaces;
using <%= projectName %>.Services;
using <%= projectName %>.Services.Interfaces;

namespace <%= projectName %>.Infrastructure.Configuration
{
    public static class ServiceConfiguration
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<ICompanyService, CompanyService>();
            serviceCollection.AddScoped<IEmployeeService, EmployeeService>();
        }
        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<ICompanyRepository, CompanyRepository>();
            serviceCollection.AddTransient<IEmployeeRepository, EmployeeRepository>();
        }
    }
}
