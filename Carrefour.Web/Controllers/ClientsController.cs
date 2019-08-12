using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carrefour.lib.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carrefour.web.Controllers
{
    [Route("api/[controller]")]
    
    [ApiController]
    public class ClientsController : ControllerBase
    {
        public static List<Client> Clients = new List<Client>()
        {
            new Client()
            {
                Id = Guid.NewGuid(),
                Name = "Cl Pepe",
                Email = "a@a"
            },
            new Client()
            {
                Id = Guid.NewGuid(),
                Name = "Cl Lolo",
                Email = "l@l"
            }
        };

        // GET api/values
        
        [HttpGet]
        public ActionResult<IEnumerable<Client>> Get()
        {
            return Clients;
        }

        // GET api/values/5
        
        [HttpGet("{id}")]
        public ActionResult<Client> Get(string id)
        {
            return Clients.FirstOrDefault(x => x.Id.ToString() == id);
        }

        // GET api/values/5
        
        [HttpPost]
        public ActionResult<Client> Post([FromBody] Client client)
        {
            client.Id = Guid.NewGuid();
            Clients.Add(client);
            return client;
        }
        [HttpPut]
        public ActionResult<Client> Put([FromBody] Client client)
        {
            var existingClient = Clients.FirstOrDefault(x => x.Id == client.Id);

            if (existingClient != null)
            {
                Clients.Remove(existingClient);
                Clients.Add(client);
            }

            return null;
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(string id)
        {
            var existingClient = Clients.FirstOrDefault(x => x.Id.ToString() == id);

            if (existingClient != null)
            {
                Clients.Remove(existingClient);
                return true;
            }

            return true;
        }
    }
}
