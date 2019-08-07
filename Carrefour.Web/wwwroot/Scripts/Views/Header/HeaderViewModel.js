class HeaderViewModel
{
    constructor()
    {

    }

}

app.component('header',
    {
        templateUrl: './Scripts/Views/Header/HeaderView.html',
        controller: HeaderViewModel,
        controllerAs: "vm"

    });