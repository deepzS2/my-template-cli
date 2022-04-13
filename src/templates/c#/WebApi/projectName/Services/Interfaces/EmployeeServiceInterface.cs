using System.Collections.Generic;
using System.Threading.Tasks;
using <%= projectName %>.Dto;
using <%= projectName %>.Entities;

namespace <%= projectName %>.Services.Interfaces
{
    public interface IEmployeeService
    {
        public Task<IEnumerable<Employee>> GetAllEmployeesByCompanyAsync(int id);
        public Task<Employee> GetEmployeeByIdAsync(int id);
        public Task<Employee> CreateEmployeeAsync(CreateEmployeeDto dto);
        public Task UpdateEmployeeAsync(int id, UpdateEmployeeDto dto);
        public Task DeleteEmployeeAsync(int id);
    }
}
