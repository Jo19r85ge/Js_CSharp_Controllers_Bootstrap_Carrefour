namespace Carrefour.lib.Models
{
    public class Employee : User
    {
        public int Code { get; set; }
        public string Category { get; set; }
        public bool Married { get; set; }
        public bool Transport { get; set; }
        public int Social { get; set; }
        public int Turno { get; set; }
    }
}
