// Import dependencies
import { Request, Response, Router } from "express";
import Author, { IAuthor } from "../models/author";
import Book from "../models/book";

// Define interfaces
interface ISearch {
  name?: RegExp;
}

// Initialize router and routes
const router = Router();
let searchParams = {
  name: ""
};

// @route GET /authors
// @desc  Get authors list from DB and render to view
router.get("/", async (req: Request, res: Response) => {
  // Set search options
  let searchOptions: ISearch = {};
  if (req.query.name === null || req.query.name === "" || req.query.name === undefined) {
    searchParams.name = "";
  } else {
    const name: string = "" + req.query.name;
    searchParams.name = name;
  }
  searchOptions.name = new RegExp(searchParams.name, "i");

  try {
    const authors = await Author.find(searchOptions);
    const withUrl = authors.map(author => {
      const formatted = author.toJSON();
      return {
        ...formatted,
        url: `/authors/${author._id}`
      }
    });
    res.render("authors/index", {
      authors: withUrl,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
});

// @route GET /authors/new
// @desc  Render form for adding a new author to view
router.get("/new", (req: Request, res: Response) => {
  const author = new Author().toJSON();
  res.render("authors/new", { author: author });
});

// @route POST /authors
// @desc  Add a new author to the DB
router.post("/", async (req: Request, res: Response) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    author.name = "";
    res.render("authors/new", {
      author: author.toJSON(),
      error: "Author added"
    });
  } catch(err) {
    console.log(err);
    res.render("authors/new", {
      author: author.toJSON(),
      error: "Error creating new author"
    });
  }
});

// Fix this once you add the books fn-ality
const dummyData = [
  { title: "Heir to the Empire", description: "blah" },
  { title: "Scoundrels", description: "blah blah" },
  { title: "Choices of One", description: "blahsss" }
]

// @route GET /authors/:id
// @desc  Get info on a specific author and render it to view
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author?._id });
    const fmtBooks = books.map(book => book.toJSON());
    res.render("authors/show", {
      author: author?.toJSON(),
      books: dummyData
    });
  } catch {
    res.status(404).send("Hold on to your butts");
  }
});

// @route GET /authors/:id/edit
// @desc  Render form for editing author data to the view
router.get("/:id/edit", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    const fmtAuthor = {
      ...author,
      url: `/authors/${req.params.id}`
    }
    if (author)
    res.render("authors/edit", {
      author: fmtAuthor,
    });
  } catch {
    res.send("Hold on to your butts");
  }
});

// @route PUT /authors/:id
// @desc  Update info on an existing author
router.put("/:id", async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    if (author === null) throw "Could not find author to update";
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author._id}`);
  } catch(err) {
    res.render("authors/edit", {
      author: author,
      error: "Error updating author"
    })
  }
});

// @route DELETE /authors/:id
// @desc  Remove an existing author from the DB
router.delete("/:id", async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    if (author === null) throw "Could not delete author";
    await author.remove();
    if (searchParams.name !== "") {
      res.redirect(`/authors?name=${searchParams.name}`);
    } else {
      res.redirect("/authors");
    }

  } catch {
    if (author === null || author === undefined) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

export default router;