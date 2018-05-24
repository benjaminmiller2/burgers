$(document).ready(function(){

//required functions

//function to post user input to the database
    function post(){
        //creates an object reflecting the DB's table
        let Burger = {
            burger_name: $("#order").val().trim(),
            devoured: false
        };
        
        //posts the data and fires the Add function
        $.post("/api/Burgers", Burger).then(function(data){
            //console.log(data)
            add(data);
        });
    };

    //function to add new data from the DB to the dom.
    function add(){
        $.get("/api/Burgers", function(data){
            
            if(data){
                
                let burgerId = data[data.length-1].id;
                let burgerName = data[data.length-1].burger_name;

                //creates a new div
                let div = $("<div class='burger' id=" + burgerId +">");
                div.append("<p>Your </p><h3> " + burgerName + "</h3><p> is ready to eat!</p><button class='js-devourButton devourButton' data-id=" + burgerId +">'Devour Me!'</button>");
                
                //and appends it to the dom
                $("#order-box").append(div);
            };

        }).then(function(data){
            
            //This promise contains the functionality of the newly generated div buttons
            //as well as the ajax call to update the relevant table date in the DB.
            //Note, I originally attempted to include this in a seperate function, but was unable 
            //to get the necessary data to pass into it. It would only work when attached to Add as a promise.
            $(".js-devourButton").on("click", function(event){

                event.preventDefault();
                
                let id = $(this).data('id');
                let name = data[id-1].burger_name;
                
                //Call to update table data in the DB
                $.ajax({
                    method: "PUT",
                    url: "/api/Burgers",
                    data: { id: id}
                })
                .then(function(data){

                    $('#'+id).remove();

                    let div = $("<div id=" + id +">");
                    $(div).addClass("burger");
                    div.append("<p>Your </p><h3>" + name + "</h3><p> has been devoured!</p>");
                    
                    $("#devoured-box").append(div);
                })

            })
        })
    };

    //event functionality on the submit button, fires the Post and Add functions, clears the input field
    $("#submitButton").on("click", function(event){
        event.preventDefault();
        post();
        $("form").trigger("reset");
    });

})