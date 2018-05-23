$(function(){

function add(){
        
    let Burger = {
        burger_name: $("#burger_name").val().trim(),
        devoured: false
    };
    
    $.post("/api/Burgers", Burger).then(function(data){
        show(data);
    });
};

function show(){
    $.get("/api/Burgers", function(Burger){
        if(Burger.length !== 0){
            for (let i = 0; i < Burger.length; i++){
                let div = $('<div>');

                if(Burger[i].devoured === false){

                    div.append("<h3>" + Burger[i].burger_name + "</h3><button class='devourButton' data-id=" + Burger[i].id +">'Devour it!'</button>");

                    $("#order-box").append(div);
                }
                if(Burger[i].devoured === true){
                    div.append("<h3>" + Burger[i].burger_name + " 'has been eaten'</h3>");

                    $("#devoured-box").append(div);
                }

            }
        }
    }).then(function(results){
        
        $(".devourButton").on("click", function(event){
            event.preventDefault();
            console.log($(this).data('id'))
         })
    })
};

function devour(Burger){
    $.put("/api/Burgers/:id", function(Burger){
    }).then(show)
}

$("#submitButton").on("click", function(event){

    event.preventDefault();
    add();


});




})