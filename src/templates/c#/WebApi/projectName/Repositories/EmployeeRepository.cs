using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using <%= projectName %>.Context;
using <%= projectName %>.Entities;
using <%= projectName %>.Repositories.Interfaces;

namespace <%= projectName %>.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DatabaseContext _context;

        public EmployeeRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            var query = @"INSERT INTO Employees (Name, Age, Position, CompanyId) 
                        VALUES (@Name, @Age, @Position, @CompanyId);
                        SELECT LAST_INSERT_ID()";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var id = await connection.QuerySingleAsync<int>(query, employee, transaction);

                    employee.Id = id;

                    transaction.Commit();

                    return employee;
                }
            }
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var query = @"DELETE FROM Employees WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesByCompanyAsync(int id)
        {
            var query = @"SELECT * FROM Employees WHERE CompanyId = @Id";

            using (var connection = _context.CreateConnection())
            {
                var companies = await connection.QueryAsync<Employee>(query, new { id });

                return companies.AsList();
            }
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            var query = @"SELECT 
                        e.*,
                        c.Id, c.Name AS CompanyName, c.Address, c.Country
                        FROM Employees e 
                        JOIN Companies c 
                        ON e.CompanyId = c.Id
                        WHERE e.Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                Employee result = null;

                await connection.QueryAsync<Employee, Company, Employee>(query, (employee, company) =>
                {
                    result = employee;
                    result.Company = company;

                    return result;
                },
                param: new { id });

                return result;
            }
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            var query = @"UPDATE Employees 
                        SET Name = @Name, Age = @Age, Position = @Position
                        WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, employee);
            }
        }
    }
}
