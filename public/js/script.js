$(document).ready(function(){

    function post(){
        
        let Burger = {
            burger_name: $("#burger_name").val().trim(),
            devoured: false
        };
        
        $.post("/api/Burgers", Burger).then(function(data){
            //console.log(data)
            add(data);
        });
    };

    function add(){
        $.get("/api/Burgers", function(data){
            if(data){
                let div = $("<div>");

                div.append("<h3>" + data[data.length-1].burger_name + "</h3><button class='js-devourButton' data-id=" + data[data.length-1].id +">'Devour Me!'</button>");
                
                //console.log(data.length);
                //console.log(data[data.length-1].burger_name)
                $("#order-box").append(div);
            }
        })
    };

    $("#submitButton").on("click", function(event){
        event.preventDefault();
        post();
    });

})