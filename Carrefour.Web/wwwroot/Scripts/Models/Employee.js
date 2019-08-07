class Employee extends User
{
    constructor(json)
    {
        super(json);

        if (json)
        {
            this.Code = json.code;
            this.Category = json.category;
            this.Married = json.married;
            this.Transport = json.transport;
            this.Social = json.social;
            this.Turno = json.turno;
        }

        else
        {
            this.Code = 0;
            this.Category = "";
            this.Married = "";
            this.Transport = "";
            this.Social = 0;
            this.Turno = 0;
        }
    }
}