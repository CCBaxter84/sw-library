import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("books/index");
});

router.get("/new", (req: Request, res: Response) => {
  res.render("books/new");
});

export default router;