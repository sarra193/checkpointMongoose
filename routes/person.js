//require Person schema
const Person = require("../models/person");
//require Express
const express = require("express");
//init express Router
const router = express.Router();





//@URL http://localhost/persons
//Use model.find() to Search Your Database


/* router.get("/", (req, res) => {
      //use the find method to find the persons by there name
      Person.find()
      .then((persons) => res.send(persons))
      .catch((err) => res.send(err))
})

 */




//@URL http://localhost:5000/persons
//@Create and Save a Record of a Model

router.post("/", (req, res) => {
      const newPerson = new Person({ name: "jack", age: 20, favoriteFoods: ["burrito"] });
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
            { name: "hager", age: 28, favoriteFoods: ["cake"] },
            { name: "Marry", age: 20, favoriteFoods: ["cake"] },
            { name: "MarryJ", age: 20, favoriteFoods: ["burrito"] }
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




//@//@URL http://localhost/persons/id
//Perform Classic Updates by Running Find, Edit, then Save
router.put("/update/:name", (req, res) => {
      let { name } = req.params;
      Person.findOneAndUpdate({ name },{$set:{"age":20}},{ new: true })
      .then((person) => res.send(person))
      .catch((err) => res.send(err));
});


//@URL http://localhost:5000/persons/id
//Perform Classic Updates by Running Find, Edit, then Save
router.put("/:_id", (req, res) => {
      let { _id } = req.params;
      Person.findByIdAndUpdate({ _id },{$set:{...req.body}})
      .then(() => res.send("Person Has been Updated"))
      .catch((err) => res.send(err));
});


//@URL http://localhost:5000/persons/id
//Delete One Document Using model.findByIdAndRemove
router.delete("/:_id", (req, res) => {
  let { _id } = req.params;
  Person.findByIdAndRemove({ _id })
    .then(() => res.send(`Person with id = ${ _id} has been deleted`))
    .catch((err) => res.send(err));
});




//@URL http://localhost:5000/persons/id
//Delete One Document Using model.deleteMany
router.delete("/", (req, res) => {
  let nameToRemove = "Marry";
  Person.deleteMany({name:nameToRemove })
    .then(() => res.send(`Person with name = ${ nameToRemove} has been deleted`))
    .catch((err) => res.send(err));
});


//@URL http://localhost:5000/persons/
//Chain Search Query Helpers to Narrow Search Results
router.get("/", (req, res) => {

 let foodToSearch = { favoriteFoods: { $all: ["burrito"] } };

  Person.find(foodToSearch).sort({name:'asc'}).limit(2).select({age:0}).exec()
    .then((person) => res.send(person))
    .catch((err) => res.send(err));
});



//export router
module.exports=router