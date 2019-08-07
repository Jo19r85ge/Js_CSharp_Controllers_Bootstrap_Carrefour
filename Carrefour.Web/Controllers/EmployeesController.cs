using System;
using System.Collections.Generic;
using System.Linq;
using Carrefour.lib.Models;
using Microsoft.AspNetCore.Mvc;

namespace Carrefour.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        public static List<Employee> Employees = new List<Employee>()
        {
            new Employee()
            {
                Id = Guid.NewGuid(),
                Code = 123,
                Category = "Paleta",
                Married = true,
                Transport = true,
                Social = 999,
                Turno = 8
            },
            new Employee()
            {
                Id = Guid.NewGuid(),
                Code = 654,
                Category = "Cocinero",
                Married = false,
                Transport = true,
                Social = 779,
                Turno = 12
            }
        };

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> Get()
        {
            return Employees;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Employee> Get(string id)
        {
            return Employees.FirstOrDefault(x => x.Id.ToString() == id);
        }

        // GET api/values/5
        [HttpPost]
        public ActionResult<Employee> Post([FromBody] Employee employee)
        {
            employee.Id = Guid.NewGuid();
            Employees.Add(employee);
            return employee;
        }
        [HttpPut]
        public ActionResult<Employee> Put([FromBody] Employee employee)
        {
            var existingEmployee = Employees.FirstOrDefault(x => x.Id == employee.Id);

            if (existingEmployee != null)
            {
                Employees.Remove(existingEmployee);
                Employees.Add(employee);
            }

            return null;
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(string id)
        {
            var existingEmployee = Employees.FirstOrDefault(x => x.Id.ToString() == id);

            if (existingEmployee != null)
            {
                Employees.Remove(existingEmployee);
                return true;
            }

            return true;
        }
    }
}