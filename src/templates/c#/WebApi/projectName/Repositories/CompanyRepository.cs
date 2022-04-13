using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using <%= projectName %>.Context;
using <%= projectName %>.Entities;
using <%= projectName %>.Repositories.Interfaces;

namespace <%= projectName %>.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DatabaseContext _context;

        public CompanyRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
            var query = @"SELECT Id, Name AS CompanyName, Address, Country FROM Companies";

            using (var connection = _context.CreateConnection())
            {
                var companies = await connection.QueryAsync<Company>(query);

                return companies.AsList();
            }
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
        {
            var query = @"SELECT 
                        c.Id, c.Name AS CompanyName, c.Address, c.Country,
                        e.*
                        FROM Companies c 
                        JOIN Employees e 
                        ON c.Id = e.CompanyId 
                        WHERE c.Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                Company result = null;

                await connection.QueryAsync<Company, Employee, Company>(query, (company, employee) =>
                {
                    if (result == null)
                        result = company;

                    result.Employees.Add(employee);

                    return result;
                }, 
                param: new { id });

                return result;
            }
        }

        public async Task<Company> CreateCompanyAsync(Company company)
        {
            var query = @"INSERT INTO Companies (Name, Address, Country) VALUES (@CompanyName, @Address, @Country);
                          SELECT LAST_INSERT_ID()";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var id = await connection.QuerySingleAsync<int>(query, company, transaction);

                    company.Id = id;

                    transaction.Commit();

                    return company;
                }
            }
        }

        public async Task UpdateCompanyAsync(Company company)
        {
            var query = @"UPDATE Companies 
                        SET Name = @CompanyName, Address = @Address, Country = @Country 
                        WHERE Id = @Id";
            
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, company);
            }
        }

        public async Task DeleteCompanyAsync(int id)
        {
            var query = @"DELETE FROM Companies WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public async Task<Company> GetCompanyByEmployeeId(int id)
        {
            var procedureName = "ShowCompanyForProvidedEmployeeId";

            var parameters = new DynamicParameters();
            parameters.Add("@Id", id, DbType.Int32, ParameterDirection.Input);

            using (var connection = _context.CreateConnection())
            {
                var company = await connection.QueryFirstOrDefaultAsync<Company>
                    (procedureName, parameters, commandType: CommandType.StoredProcedure);
                return company;
            }
        }
    }
}
