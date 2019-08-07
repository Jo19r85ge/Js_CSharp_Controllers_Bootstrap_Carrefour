class User extends Entity
{
    constructor(json)
    {
        super(json);

        if (json)
        {
            this.Name = json.name;
            this.Email = json.email;
            this.Adress = json.adress;
            this.City = json.city;
            this.State = json.state;
            this.Zip = json.zip;
        }

        else
        {
            this.Name = "";
            this.Email = "";
            this.Adress = "";
            this.City = "";
            this.State = "";
            this.Zip = "";
        }
    }
}