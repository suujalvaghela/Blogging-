import { Router } from "express";
import { deleteUser, getAllUser, getUser, login, signUp } from "./user.controller.js";

const router = Router();

router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/:id").get(getUser)
router.route("/:id").delete(deleteUser)
router.route("/").get(getAllUser)

export default router