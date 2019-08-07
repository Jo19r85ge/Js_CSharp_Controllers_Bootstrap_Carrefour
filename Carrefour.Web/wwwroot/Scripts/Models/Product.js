class Product extends Entity
{
    constructor(json)
    {
        super(json);

        if (json)
        {
            this.Nameproduct = json.nameproduct;
            this.Category = json.category;
            this.Price = json.price;
            this.From = json.from;
            this.Gluten = json.gluten;
            this.Lactosa = json.lactosa;
        }

        else
        {
            this.Nameproduct = "";
            this.Category = "";
            this.Price = 0;
            this.From = "";
            this.Gluten = "";
            this.Lactosa = "";
        }
    }
}