namespace Carrefour.lib.Models
{

    public class Product : Entity
    {
        public string Nameproduct { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public string From { get; set; }
        public bool Gluten { get; set; }
        public bool Lactosa { get; set; }
    }
    
}
