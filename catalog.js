var serverURL= "http://restclass.azurewebsites.net/API/";
var items=[];

/** Global variables 
var items= [
    {   //first Item
        code:'1tvs',
        title:'TV',
        price: 1000,
        description: "This is a TV",
        category:'Electronics',
        image:"images/TV.jpg"
    },
    {
        code:'1phone',
        title:'Iphone',
        price: 500,
        description: "This is a Phone",
        category:'Phone',
        image:"images/phone.png"
    },
    {
    code:'1comp',
        title:'Computer',
        price: 800,
        description: "This is a Computer",
        category:'Computer',
        image:"images/computer.png"
    },
    {
        code:'1speaker',
            title:'Speaker',
            price: 1000,
            description: "This is a Speaker",
            category:'Speaker',
            image: "images/speakers.jpg"
    }

];
*/

function fetchCatalog(){
       $.ajax({
            url:serverURL+"points",
            type:"GET",
            success:function(response){
                console.log("Server responded OK",response);
                for(var j=0;j<response.length;j++){

                    if(response[j].user=="Dru" && response[j].title!=""){
                        items.push(response[j]);
                    }
                    //display only my items
                }
                displayCatalog();
            },
            error:function(error){
                console.log("Error",error);
            }
       }); 
}

function displayCatalog(){
    for(var i=0;i<items.length;i++){
        displayItem(items[i]);
    }


}

//functions
function displayItem(product){
    /**travel inside the array*/
   // for(var i=0;i<items.length;i++){
        //var product = items[i];
        //get the element from the array
        var layout = `<div class="item" id="${product.code}">
            <img src="${product.image}">
            <h4 class="item-title">${product.title}</h4>
            <h6 class="item-price">${product.price}</h6>
            <p> ${product.description}</p>
            <div class="button-div">
                <button class="btn btn-primary mb-2"> Add to Cart</button>
            </div>
        </div>`;
    //display the element in the DOM HTML*/
    $("#catalog").append(layout);
    //}
}



function init(){
    displayCatalog();
    fetchCatalog();
    $("#search-btn").click(Search);
    $("#search-txt").keypress(function(e){
        if(e.keyCode==13){
            Search();
        }
    });
    
}

function Search(){
    // Body Search
    var searchString=$('#search-txt').val();
    //travel the array
        for(var i=0;i<items.length;i++){

            if(items[i].title.toUpperCase().includes(searchString.toUpperCase()) || items[i].code.toUpperCase().includes(searchString.toUpperCase()) || items[i].description.toUpperCase().includes(searchString.toUpperCase())){
                $('#' + items[i].code).show();
            }
            else{
                $('#' + items[i].code).hide();
        }

        if(searchString==""){
            $('#' + items[i].code).show();
        }
    }
    //condition
    //execute the change
};


//initilization
window.onload=init;


