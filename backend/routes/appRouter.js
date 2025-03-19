import express from "express";
const router = express.Router();
import {
  getItems,
  setItem,
  deleteItem,
  updateItem,
  getOneItems,
} from "../contollers/appControllers.js";

router.get("/", getItems);
router.get("/getOne/:id", getOneItems);
router.post("/", setItem);
router.post("/update/:id", updateItem);
router.get("/delete/:id", deleteItem);

export default router;
