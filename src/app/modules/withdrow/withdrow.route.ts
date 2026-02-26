import { Router } from "express";
import { WithdrawController } from "./withdrow.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/create-withdraw", WithdrawController.createWithdrawController);
router.patch("/accept/:withdrawId", WithdrawController.acceptWithdraw);
router.patch("/reject/:withdrawId", WithdrawController.rejectWithdraw);
router.get("/getAll", auth("admin"), WithdrawController.getAllWithdraws);
router.get("/getSingleUserWithdraws/:userId", WithdrawController.getSingleUserWithdraws);
router.get("/getSingleWithdraw/:withdrawId", WithdrawController.getSingleWithdraw);
export const withdrawRoute = router;
