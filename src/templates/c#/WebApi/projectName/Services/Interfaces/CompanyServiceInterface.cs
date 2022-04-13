using System.Collections.Generic;
using System.Threading.Tasks;
using <%= projectName %>.Dto;
using <%= projectName %>.Entities;

namespace <%= projectName %>.Services.Interfaces
{
    public interface ICompanyService
    {
        public Task<IEnumerable<Company>> GetAllCompaniesAsync();
        public Task<Company> GetCompanyByIdAsync(int id);
        public Task<Company> CreateCompanyAsync(CreateCompanyDto dto);
        public Task UpdateCompanyAsync(int id, UpdateCompanyDto dto);
        public Task DeleteCompanyAsync(int id);
        public Task<Company> GetCompanyByEmployeeId(int id);
    }
}
