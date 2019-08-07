namespace Carrefour.lib.Models
{
    public class Client : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
        public string Nameoncard { get; set; }
        public int Creditcardnumber { get; set; }
        public string Expmonth { get; set; }
        public int Cvv { get; set; }
        public int Expyear { get; set; }
    }
}
