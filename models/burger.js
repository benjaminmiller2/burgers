
module.exports = function(sequelize, DataTypes){
    let Burger = sequelize.define("Burger", {
        burger_name: DataTypes.STRING,
        devoured: DataTypes.BOOLEAN,
    });
    
    return Burger;
};

