import { Router } from "express";
import { user_controllers } from "./user.controller";

const router = Router();

router.post("/create", user_controllers.createUser);
router.get("/getAll", user_controllers.getAllUsers);
router.get("/getSingle/:userId", user_controllers.getUserByUserId);
router.patch("/update/:userId", user_controllers.updateUser);
router.delete("/delete/:userId", user_controllers.deleteUser);
router.put("/freeze/:userId", user_controllers.freezeUser);

export const userRoute = router;
