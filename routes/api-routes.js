// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)

let db = require("../models")
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/burgers", function(req, res) {
    
    db.Burger.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results)
    });

  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/burgers", function(req, res) {

    db.Burger.create({
      burger_name: req.body.text,
      devoured: req.body.complete
    }).then(function(dbBurger) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbBurger);
    });

  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbBurger) {
        res.json(dbBurger);
      });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/burgers", function(req, res) {
    db.Burger.update({
      burger_name: req.body.text,
      devoured: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbBurger) {
        res.json(dbBurger);
      });

  });
};
