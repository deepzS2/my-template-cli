using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using <%= projectName %>.Dto;
using <%= projectName %>.Entities;
using <%= projectName %>.Repositories.Interfaces;
using <%= projectName %>.Services.Interfaces;

namespace <%= projectName %>.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CreateEmployeeDto, Employee>();
                cfg.CreateMap<UpdateEmployeeDto, Employee>();
            });

            _mapper = configuration.CreateMapper();
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> CreateEmployeeAsync(CreateEmployeeDto dto)
        {
            var employee = _mapper.Map<Employee>(dto);

            return await _employeeRepository.CreateEmployeeAsync(employee);
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            await _employeeRepository.DeleteEmployeeAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesByCompanyAsync(int id)
        {
            return await _employeeRepository.GetAllEmployeesByCompanyAsync(id);
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(id);
        }

        public async Task UpdateEmployeeAsync(int id, UpdateEmployeeDto dto)
        {
            var employee = _mapper.Map<Employee>(dto);

            employee.Id = id;

            await _employeeRepository.UpdateEmployeeAsync(employee);
        }
    }
}
