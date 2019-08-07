class IndexViewModel
{
    constructor($http)
    {

    }
}

app.component('index',
    {
        templateUrl: 'Scripts/Views/IndexView.html',
        controller: IndexViewModel,
        controllerAs: "vm"
    });