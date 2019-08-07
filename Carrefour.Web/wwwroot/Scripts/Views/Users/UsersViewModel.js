class UsersViewModel
{
    constructor($http, $window)
    {
        this.Users = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllUsers();
        this.SelectedUser = null;
        this.IsFormOpen = true;

        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Users',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name' },
                    { name: 'Email', field: 'Email' },
                    { name: 'Adress', field: 'Adress' },
                    { name: 'City', field: 'City' },
                    { name: 'State', field: 'State' },
                    { name: 'Zip', field: 'Zip' },
                    { name: 'Select', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-primary" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Select" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.SelectUser(row.entity)">' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-danger" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Delete" ng-click="grid.appScope.DeleteUser(row.entity)"></div>' }
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

    AddNewUser()
    {
        let user = new User();
        user.Name = this.Name;
        user.Email = this.Email;
        user.Adress = this.Adress;
        user.City = this.City;
        user.State = this.State;
        user.Zip = this.Zip;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        }

        this.Http.post(
            '/api/users',
            user,
            config)
            .then((response) =>
            {
                this.OnAddedUser(response);
            });
    }

    OnAddedUser(response)
    {
        let user = new User(response.data);
        this.Users.push(user);
        this.IsFormOpen = false;
        this.ClearForm();
    }

    GetAllUsers()
    {
        this.Http.get("/api/users")
            .then((response) =>
            {
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Users.length = 0;

        for (let i in response.data)
        {
            let user = new User(response.data[i]);
            this.Users.push(user);
        }
    }

    SelectUser(user)
    {
        this.SelectedUser = user;

        this.Name = user.Name;
        this.Email = user.Email;
        this.Adress = user.Adress;
        this.City = user.City;
        this.State = user.State;
        this.Zip = user.Zip;

        this.IsFormOpen = true;
    }

    SaveUser()
    {
        this.SelectedUser.Name = this.Name;
        this.SelectedUser.Email = this.Email;
        this.SelectedUser.Adress = this.Adress;
        this.SelectedUser.City = this.City;
        this.SelectedUser.State = this.State;
        this.SelectedUser.Zip = this.Zip;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        };

        this.Http.put(
            'api/users',
            this.SelectedUser,
            config)
            .then((response) =>
            {
                this.OnUpdateUser(response);
            });
    }

    OnUpdateUser(response)
    {
        this.ClearForm();
    }

    DeleteUser(user)
    {
        var r = this.Window.confirm("¿seguro que lo quieres borrar?");
        if (r == true)
        {
            this.Http.delete("api/users/" + user.Id)
                .then((response) =>
                {
                    this.OnDeletedData(response, user);
                });
        }
    }

    OnDeletedData(response, user)
    {
        if (response.data)
        {
            var indexToDelete = this.Users.findIndex(x => x.Id == user.Id);
            this.Users.splice(indexToDelete, 1);
        }
    }

    ClearForm()
    {
        this.Name = "";
        this.Email = "";
        this.Adress = "";
        this.City = "";
        this.State = "";
        this.Zip = "";
    }
}

app.component('users',
    {
        templateUrl: './Scripts/Views/Users/UsersView.html',
        controller: UsersViewModel,
        controllerAs: "vm"
    });