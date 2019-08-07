class EmployeesViewModel
{
    constructor($http, $window)
    {
        this.Employees = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllEmployees();
        this.SelectedEmployee = null;
        this.IsFormOpen = true;

        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Employees',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Code', field: 'Code' },
                    { name: 'Category', field: 'Category' },
                    { name: 'Married', field: 'Married' },
                    { name: 'Transport', field: 'Transport' },
                    { name: 'Social', field: 'Social' },
                    { name: 'Turno', field: 'Turno' },
                    { name: 'Select', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-primary" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Select" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.SelectEmployee(row.entity)">' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-danger" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Delete" ng-click="grid.appScope.DeleteEmployee(row.entity)"></div>' }
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

    AddNewEmployee()
    {
        let employee = new Employee();
        employee.Code = this.Code;
        employee.Category = this.Category;
        employee.Married = this.Married;
        employee.Transport = this.Transport;
        employee.Social = this.Social;
        employee.Turno = this.Turno;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        }

        this.Http.post(
            '/api/employees',
            employee,
            config)
            .then((response) =>
            {
                this.OnAddedEmployee(response);
            });
    }

    OnAddedEmployee(response)
    {
        let employee = new Employee(response.data);
        this.Employees.push(employee);
        this.IsFormOpen = false;
        this.ClearForm();
    }

    GetAllEmployees()
    {
        this.Http.get("/api/employees")
            .then((response) =>
            {
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Employees.length = 0;

        for (let i in response.data)
        {
            let employee = new Employee(response.data[i]);
            this.Employees.push(employee);
        }
    }

    SelectEmployee(employee)
    {
        this.SelectedEmployee = employee;

        this.Code = employee.Code;
        this.Category = employee.Category;
        this.Married = employee.Married;
        this.Transport = employee.Transport;
        this.Social = employee.Social;
        this.Turno = employee.Turno;

        this.IsFormOpen = true;
    }

    SaveEmployee()
    {
        this.SelectedEmployee.Code = this.Code;
        this.SelectedEmployee.Category = this.Category;
        this.SelectedEmployee.Married = this.Married;
        this.SelectedEmployee.Transport = this.Transport;
        this.SelectedEmployee.Social = this.Social;
        this.SelectedEmployee.Turno = this.Turno;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        };

        this.Http.put(
            'api/employees',
            this.SelectedEmployee,
            config)
            .then((response) =>
            {
                this.OnUpdateEmployee(response);
            });
    }

    OnUpdateEmployee(response)
    {
        this.ClearForm();
    }

    DeleteEmployee(employee)
    {
        var r = this.Window.confirm("¿seguro que lo quieres borrar?");
        if (r == true)
        {
            this.Http.delete("api/employees/" + employee.Id)
                .then((response) =>
                {
                    this.OnDeletedData(response, employee);
                });
        }
    }

    OnDeletedData(response, employee)
    {
        if (response.data)
        {
            var indexToDelete = this.Employees.findIndex(x => x.Id == employee.Id);
            this.Employees.splice(indexToDelete, 1);
        }
    }

    ClearForm()
    {
        this.Code = 0;
        this.Category = "";
        this.Married = "";
        this.Transport = "";
        this.Social = 0;
        this.Turno = 0;
    }
}

app.component('employees',
    {
        templateUrl: './Scripts/Views/Employees/EmployeesView.html',
        controller: EmployeesViewModel,
        controllerAs: "vm"
    });