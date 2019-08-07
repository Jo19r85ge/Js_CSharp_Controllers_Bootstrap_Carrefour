using System;
using System.Collections.Generic;
using System.Linq;
using Carrefour.lib.Models;
using Microsoft.AspNetCore.Mvc;

namespace Carrefour.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public static List<User> Users = new List<User>()
        {
            new User()
            {
                Id = Guid.NewGuid(),
                Name = "Pepe",
                Email = "a@a"
            },
            new User()
            {
                Id = Guid.NewGuid(),
                Name = "Lolo",
                Email = "l@l"
            }
        };

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            return Users;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            return Users.FirstOrDefault(x => x.Id.ToString() == id);
        }

        // GET api/values/5
        [HttpPost]
        public ActionResult<User> Post([FromBody] User user)
        {
            user.Id = Guid.NewGuid();
            Users.Add(user);
            return user;
        }
        [HttpPut]
        public ActionResult<User> Put([FromBody] User user)
        {
            var existingUser = Users.FirstOrDefault(x => x.Id == user.Id);

            if (existingUser != null)
            {
                Users.Remove(existingUser);
                Users.Add(user);
            }

            return null;
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(string id)
        {
            var existingUser = Users.FirstOrDefault(x => x.Id.ToString() == id);

            if (existingUser != null)
            {
                Users.Remove(existingUser);
                return true;
            }

            return true;
        }
    }
}