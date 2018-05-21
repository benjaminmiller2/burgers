$("#submitButton").on("click", function(event){
   console.log('this is bs')
    event.preventDefault();

    let Burger = {
        burger_name: $("#burger_name").val().trim(),
        devoured: false
    };
console.log("help")
   // $.post("/api/Burgers", Burger).then(function(data){
     //   console.log(data)
    
$.ajax("/api/Burgers", {
    type: "POST",
    data: Burger
}).then(function(){
    console.log("Im working")
})
    

})