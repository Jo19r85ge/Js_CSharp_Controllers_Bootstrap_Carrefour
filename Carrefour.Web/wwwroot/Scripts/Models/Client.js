class Client extends Entity
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
            this.Nameoncard = json.nameoncard;
            this.Creditcardnumber = json.creditcardnumber;
            this.Expmonth = json.expmonth;
            this.Cvv = json.cvv;
            this.Expyear = json.expyear;
        }

        else
        {
            this.Name = "";
            this.Email = "";
            this.Adress = "";
            this.City = "";
            this.State = "";
            this.Zip = 0;
            this.Nameoncard = "";
            this.Creditcardnumber = 0;
            this.Expmonth = "";
            this.Cvv = 0;
            this.Expyear = 0;
        }
    }
}
