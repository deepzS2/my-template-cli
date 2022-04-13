using Microsoft.Extensions.Configuration;
using System.Data;
using MySqlConnector;

namespace <%= projectName %>.Context
{
    public class DatabaseContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DatabaseContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DatabaseConnection");
        }

        public MySqlConnection CreateConnection() => new MySqlConnection(_connectionString);
    }
}
