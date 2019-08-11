namespace Carrefour.lib.Models
{

    public class User : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
    }
    
}
