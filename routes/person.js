//require Person schema
const Person = require("../models/person");
//require Express
const express = require("express");
//init express Router
const router = express.Router();


//@URL http://localhost:5000/persons
//@Create and Save a Record of a Model

router.post("/", (req, res) => {
      const newPerson = new Person({ name: "hager", age: 28, favoriteFoods: ["cake"] });
      newPerson
            .save()
            .then(() => res.send("user has been added with success"))
            .catch((err) => res.send(err))
});




//@URL http://localhost:5000/persons
//@Create and Save a Record of a Model

router.post("/Manypersons", (req, res) => {

      //create Many persons array
      let arrayOfPersons=[
            { name: "sarra", age: 27, favoriteFoods: ["cake", "mango"] },
            { name: "hager", age: 28, favoriteFoods: ["cake"] }
      ];

      //Create Many People function
      Person
            .insertMany(arrayOfPersons)
            .then(() => res.send("users has been added with success"))
            .catch((err) => res.send(err))
});


//@URL http://localhost/persons/name
//Use model.find() to Search Your Database


router.get("/name/:name", (req, res) => {
      //get the name from the req object
            console.log({...req.params})
      let name =  { ...req.params };
      //use the find method to find the persons by there name
      Person.find(name)
      .then((persons) => res.send(persons))
      .catch((err) => res.send(err))
})

  

//@//@URL http://localhost/persons/fav
//Use model.findOne() to Return a Single Matching Document from Your Database

router.get("/favoriteFoods/:fav", (req, res) => {
      
      //get the fav food from the req object
      let food= {...req.params}
      let fav = { favoriteFoods: { $all: [food] } }

      //use the find method to find the persons by there favorite food
      Person.findOne(food)
      .then((persons) => res.send(persons))
      .catch((err) => res.send(err))
})






//@//@URL http://localhost/persons/id
//Use model.findById() to Search Your Database By _id
router.get("/:_id", (req, res) => {
      let { _id } = req.params;
      Person.find({ _id })
      .then((person) => res.send(person))
      .catch((err) => res.send(err));
});


//export router
module.exports=router