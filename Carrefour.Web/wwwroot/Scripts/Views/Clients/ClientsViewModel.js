class ClientsViewModel
{
    constructor($http, $window)
    {
        this.Clients = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllClients();
        this.SelectedClient = null;
        this.IsFormOpen = true;

        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Clients',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name' },
                    { name: 'Email', field: 'Email' },
                    { name: 'Adress', field: 'Adress' },
                    { name: 'City', field: 'City' },
                    { name: 'N Card', field: 'Nameoncard' },
                    { name: 'Card Nº', field: 'Creditcardnumber' },
                    { name: 'Exp', field: 'Expmonth' },
                    { name: 'Cvv', field: 'Cvv' },
                    { name: 'Exp Year', field: 'Expyear' },
                    { name: 'Select', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-primary" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Select" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.SelectClient(row.entity)">' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-danger" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Delete" ng-click="grid.appScope.DeleteClient(row.entity)"></div>' }
                ]
            };
    }

    get IsListOpen()
    {
        return !this.IsFormOpen;
    }
    set IsListOpen(value)
    {
        this.IsFormOpen = !value;
    }

    AddNewClient()
    {
        let client = new Client();
        client.Name = this.Name;
        client.Email = this.Email;
        client.Adress = this.Adress;
        client.City = this.City;
        client.State = this.State;
        client.Zip = this.Zip;
        client.Nameoncard = this.Nameoncard;
        client.Creditcardnumber = this.Creditcardnumber;
        client.Expmonth = this.Expmonth;
        client.Cvv = this.Cvv;
        client.Expyear = this.Expyear;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        }

        this.Http.post(
            '/api/clients',
            client,
            config)
            .then((response) =>
            {
                this.OnAddedClient(response);
            });
    }

    OnAddedClient(response)
    {
        let client = new Client(response.data);
        this.Clients.push(client);
        this.IsFormOpen = false;
        this.ClearForm();
    }

    GetAllClients()
    {
        this.Http.get("/api/clients")
            .then((response) =>
            {
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Clients.length = 0;

        for (let i in response.data)
        {
            let client = new Client(response.data[i]);
            this.Clients.push(client);
        }
    }

    SelectClient(client)
    {
        this.SelectedClient = client;

        this.Name = client.Name;
        this.Email = client.Email;
        this.Adress = client.Adress;
        this.City = client.City;
        this.State = client.State;
        this.Zip = client.Zip;
        this.Nameoncard = client.Nameoncard;
        this.Creditcardnumber = client.Creditcardnumber;
        this.Expmonth = client.Expmonth;
        this.Cvv = client.Cvv;
        this.Expyear = client.Expyear;

        this.IsFormOpen = true;
    }

    SaveClient()
    {
        this.SelectedClient.Name = this.Name;
        this.SelectedClient.Email = this.Email;
        this.SelectedClient.Adress = this.Adress;
        this.SelectedClient.City = this.City;
        this.SelectedClient.State = this.State;
        this.SelectedClient.Zip = this.Zip;
        this.SelectedClient.Nameoncard = this.Nameoncard;
        this.SelectedClient.Creditcardnumber = this.Creditcardnumber;
        this.SelectedClient.Expmonth = this.Expmonth;
        this.SelectedClient.Cvv = this.Cvv;
        this.SelectedClient.Expyear = this.Expyear;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        };

        this.Http.put(
            'api/clients',
            this.SelectedClient,
            config)
            .then((response) =>
            {
                this.OnUpdateClient(response);
            });
    }

    OnUpdateClient(response)
    {
        this.ClearForm();
    }

    DeleteClient(client)
    {
        var r = this.Window.confirm("¿seguro que lo quieres borrar?");
        if (r == true)
        {
            this.Http.delete("api/clients/" + client.Id)
                .then((response) =>
                {
                    this.OnDeletedData(response, client);
                });
        }
    }

    OnDeletedData(response, client)
    {
        if (response.data)
        {
            var indexToDelete = this.Clients.findIndex(x => x.Id == client.Id);
            this.Clients.splice(indexToDelete, 1);
        }
    }

    ClearForm()
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

app.component('clients',
    {
        templateUrl: './Scripts/Views/Clients/ClientsView.html',
        controller: ClientsViewModel,
        controllerAs: "vm"
    });