namespace <%= projectName %>.Dto
{
    public class CreateEmployeeDto
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Position { get; set; }
        public int CompanyId { get; set; }
    }
}
