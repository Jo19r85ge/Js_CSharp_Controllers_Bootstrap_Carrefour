using System;
using System.Collections.Generic;
using System.Linq;
using Carrefour.lib.Models;
using Microsoft.AspNetCore.Mvc;

namespace Carrefour.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public static List<Product> Products = new List<Product>()
        {
            new Product()
            {
                Id = Guid.NewGuid(),
                Price = 321,
                From = "Alaska"
            },
            new Product()
            {
                Id = Guid.NewGuid(),
                Price = 321,
                From = "China"
            }
        };

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get()
        {
            return Products;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Product> Get(string id)
        {
            return Products.FirstOrDefault(x => x.Id.ToString() == id);
        }

        // GET api/values/5
        [HttpPost]
        public ActionResult<Product> Post([FromBody] Product product)
        {
            product.Id = Guid.NewGuid();
            Products.Add(product);
            return product;
        }
        [HttpPut]
        public ActionResult<Product> Put([FromBody] Product product)
        {
            var existingProduct = Products.FirstOrDefault(x => x.Id == product.Id);

            if (existingProduct != null)
            {
                Products.Remove(existingProduct);
                Products.Add(product);
            }

            return null;
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(string id)
        {
            var existingProduct = Products.FirstOrDefault(x => x.Id.ToString() == id);

            if (existingProduct != null)
            {
                Products.Remove(existingProduct);
                return true;
            }

            return true;
        }
    }
}