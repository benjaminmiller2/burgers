$(document).ready(function(){
let id;
let name;
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
                let div = $("<div id=" + data[data.length-1].id +">");

                div.append("<h3>" + data[data.length-1].burger_name + "</h3><button class='js-devourButton' data-id=" + data[data.length-1].id +">'Devour Me!'</button>");
                
                //console.log(data.length);
                //console.log(data[data.length-1].burger_name)
                $("#order-box").append(div);
            }
        }).then(function(data){
            $(".js-devourButton").on("click", function(event){

                event.preventDefault();
                //console.log(data);
                id = $(this).data('id');
                name = data[data.length-1].burger_name;
                //console.log(id, name);
               devour(id, name);
            })
        })
    };

    function devour(){

        $.ajax({
            method: "PUT",
            url: "/api/Burgers",
            data: { id: id}
        })
        .then(function(data){
            console.log(name)
            //console.log(id);
        $('#'+id).remove();
        let div = $("<div>");

        div.append("<h3>" + name + " 'has been eaten'</h3>");

        $("#devoured-box").append(div);
        })
        
    };

    $("#submitButton").on("click", function(event){
        event.preventDefault();
        post();
    });



})