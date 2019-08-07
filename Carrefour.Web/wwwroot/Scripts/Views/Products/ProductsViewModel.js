class ProductsViewModel
{
    constructor($http, $window)
    {
        this.Products = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllProducts();
        this.SelectedProduct = null;
        this.IsFormOpen = true;

        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Products',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Product', field: 'Nameproduct' },
                    { name: 'Category', field: 'Category' },
                    { name: 'Price', field: 'Price' },
                    { name: 'From', field: 'From' },
                    { name: 'Gluten', field: 'Gluten' },
                    { name: 'Lactosa', field: 'Lactosa' },
                    { name: 'Select', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-primary" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Select" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.SelectProduct(row.entity)">' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" class="btn btn-danger" style="padding-left: 0px; padding- top: 0px; padding - bottom: 0px; padding - right: 0px; margin-top: 0px; margin- bottom: 0px;" value="Delete" ng-click="grid.appScope.DeleteProduct(row.entity)"></div>' }
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

    AddNewProduct()
    {
        let product = new Product();
        product.Nameproduct = this.Nameproduct;
        product.Category = this.Category;
        product.Price = this.Price;
        product.From = this.From;
        product.Gluten = this.Gluten;
        product.Lactosa = this.Lactosa;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        }

        this.Http.post(
            '/api/products',
            product,
            config)
            .then((response) =>
            {
                this.OnAddedProduct(response);
            });
    }

    OnAddedProduct(response)
    {
        let product = new Product(response.data);
        this.Products.push(product);
        this.IsFormOpen = false;
        this.ClearForm();
    }

    GetAllProducts()
    {
        this.Http.get("/api/products")
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Products.length = 0;

        for (let i in response.data)
        {
            let product = new Product(response.data[i]);
            this.Products.push(product);
        }
    }

    SelectProduct(product)
    {
        this.SelectedProduct = product;

        this.Nameproduct = product.Nameproduct;
        this.Category = product.Category;
        this.Price = product.Price;
        this.From = product.From;
        this.Gluten = product.Gluten;
        this.Lactosa = product.Lactosa;

        this.IsFormOpen = true;
    }

    SaveProduct()
    {
        this.SelectedProduct.Nameproduct = this.Nameproduct;
        this.SelectedProduct.Category = this.Category;
        this.SelectedProduct.Price = this.Price;
        this.SelectedProduct.From = this.From;
        this.SelectedProduct.Gluten = this.Gluten;
        this.SelectedProduct.Lactosa = this.Lactosa;

        var config =
        {
            headers:
            {
                'Content-Type': 'application/json'
            }
        };

        this.Http.put(
            'api/products',
            this.SelectedProduct,
            config)
            .then((response) =>
            {
                this.OnUpdateProduct(response);
            });
    }

    OnUpdateProduct(response)
    {
        this.ClearForm();
    }

    DeleteProduct(product)
    {
        var r = this.Window.confirm("¿seguro que lo quieres borrar?");
        if (r == true)
        {
            this.Http.delete("api/products/" + product.Id)
                .then((response) =>
                {
                    this.OnDeletedData(response, product);
                });
        }
    }

    OnDeletedData(response, product)
    {
        if (response.data)
        {
            var indexToDelete = this.Products.findIndex(x => x.Id == product.Id);
            this.Products.splice(indexToDelete, 1);
        }
    }

    ClearForm()
    {
        this.Nameproduct = "";
        this.Category = "";
        this.Price = 0;
        this.From = "";
        this.Gluten = "";
        this.Lactosa = "";
    }
}

app.component('products',
    {
        templateUrl: './Scripts/Views/Products/ProductsView.html',
        controller: ProductsViewModel,
        controllerAs: "vm"
    });