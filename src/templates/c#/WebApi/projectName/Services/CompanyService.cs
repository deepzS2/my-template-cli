using System.Collections.Generic;
using System.Threading.Tasks;
using <%= projectName %>.Dto;
using <%= projectName %>.Entities;
using <%= projectName %>.Repositories.Interfaces;
using <%= projectName %>.Services.Interfaces;
using AutoMapper;

namespace <%= projectName %>.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository companyRepository)
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CreateCompanyDto, Company>();
                cfg.CreateMap<UpdateCompanyDto, Company>();
            });

            _mapper = configuration.CreateMapper();
            _companyRepository = companyRepository;
        }

        public async Task<Company> CreateCompanyAsync(CreateCompanyDto dto)
        {
            var company = _mapper.Map<Company>(dto);

            return await _companyRepository.CreateCompanyAsync(company);
        }

        public async Task DeleteCompanyAsync(int id)
        {
            await _companyRepository.DeleteCompanyAsync(id);
        }

        public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
            return await _companyRepository.GetAllCompaniesAsync();
        }

        public async Task<Company> GetCompanyByEmployeeId(int id)
        {
            return await _companyRepository.GetCompanyByEmployeeId(id);
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
        {
            return await _companyRepository.GetCompanyByIdAsync(id);
        }

        public async Task UpdateCompanyAsync(int id, UpdateCompanyDto dto)
        {
            var company = _mapper.Map<Company>(dto);

            company.Id = id;    

            await _companyRepository.UpdateCompanyAsync(company);
        }
    }
}
