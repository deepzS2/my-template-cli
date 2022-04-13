using System.Collections.Generic;
using System.Threading.Tasks;
using <%= projectName %>.Entities;

namespace <%= projectName %>.Repositories.Interfaces
{
    public interface ICompanyRepository
    {
        public Task<IEnumerable<Company>> GetAllCompaniesAsync();
        public Task<Company> GetCompanyByIdAsync(int id);
        public Task<Company> CreateCompanyAsync(Company company);
        public Task UpdateCompanyAsync(Company company);
        public Task DeleteCompanyAsync(int id);
        public Task<Company> GetCompanyByEmployeeId(int id);
    }
}
