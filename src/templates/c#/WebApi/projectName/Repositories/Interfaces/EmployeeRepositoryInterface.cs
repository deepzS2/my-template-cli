using System.Collections.Generic;
using System.Threading.Tasks;
using <%= projectName %>.Entities;

namespace <%= projectName %>.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        public Task<IEnumerable<Employee>> GetAllEmployeesByCompanyAsync(int id);
        public Task<Employee> GetEmployeeByIdAsync(int id);
        public Task<Employee> CreateEmployeeAsync(Employee employee);
        public Task UpdateEmployeeAsync(Employee employee);
        public Task DeleteEmployeeAsync(int id);
    }
}
