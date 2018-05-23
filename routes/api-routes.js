// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

let db = require("../models")
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/Burgers", function(req, res) {
    
    db.Burger.findAll({}).then(function(dbBurger) {
      // results are available to us inside the .then
      res.json(dbBurger)
    });

  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/Burgers", function(req, res) {

    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurger) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbBurger);
    });

  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/Burgers/:id", function(req, res) {
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
  app.put("/api/Burgers/", function(req, res) {
    db.Burger.update({
      devoured: true
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
