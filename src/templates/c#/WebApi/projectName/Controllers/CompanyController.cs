using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using <%= projectName %>.Dto;
using <%= projectName %>.Services.Interfaces;

namespace <%= projectName %>.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : Controller
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var result = await _companyService.GetAllCompaniesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "CompanyGetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _companyService.GetCompanyByIdAsync(id);

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCompanyDto body)
        {
            try
            {
                var result = await _companyService.CreateCompanyAsync(body);

                return CreatedAtRoute("CompanyGetById", new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCompanyDto body)
        {
            try
            {
                var result = await _companyService.GetCompanyByIdAsync(id);

                if (result == null)
                    return NotFound();

                await _companyService.UpdateCompanyAsync(id, body);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _companyService.GetCompanyByIdAsync(id);

                if (result == null)
                    return NotFound();

                await _companyService.DeleteCompanyAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("ByEmployeeId/{id}")]
        public async Task<IActionResult> GetByEmployeeId(int id)
        {
            try
            {
                var result = await _companyService.GetCompanyByEmployeeId(id);

                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
