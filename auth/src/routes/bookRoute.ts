import express from "express";

const router = express.Router();

//Endpoint to get all the books
router.get("/", (req, res) => { 
  res.send(`Hello user welcome to books home route!`);
});

//Endpoint to create a new book
router.post("/create", (req, res) => { 
  res.send(`Hello user welcome to book creation route!`);
});

//Endpont to get books for a certain user
router.get("/userbooks", (req, res) => {
  res.send(`Hello user welcome to get seller books route!`)
});

//Endpoint to update each book with a provided id
router.put("/:id/update", (req, res) => { 
  res.send(`Hello user welcome to book update route!`);
});

//Endpoint to delete each book with a provided id
router.delete("/:id/delete", (req, res) => { 
  res.send(`Hello user welcome to book deletion route!`);
});


export default router;