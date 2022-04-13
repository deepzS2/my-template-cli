using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using <%= projectName %>.Dto;
using <%= projectName %>.Services.Interfaces;

namespace <%= projectName %>.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("ByCompanyId/{id}")]
        public async Task<IActionResult> Index(int id)
        {
            try
            {
                var result = await _employeeService.GetAllEmployeesByCompanyAsync(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "EmployeeGetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _employeeService.GetEmployeeByIdAsync(id);

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
        public async Task<IActionResult> Create([FromBody] CreateEmployeeDto body)
        {
            try
            {
                var result = await _employeeService.CreateEmployeeAsync(body);

                return CreatedAtRoute("EmployeeGetById", new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto body)
        {
            try
            {
                var result = await _employeeService.GetEmployeeByIdAsync(id);

                if (result == null)
                    return NotFound();

                await _employeeService.UpdateEmployeeAsync(id, body);

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
                var result = await _employeeService.GetEmployeeByIdAsync(id);

                if (result == null)
                    return NotFound();

                await _employeeService.DeleteEmployeeAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
