import { Router } from "express";
import { WithdrawController } from "./withdrow.controller";

const router = Router();

router.post("/create-withdraw", WithdrawController.createWithdrawController);
router.patch("/accept/:withdrawId", WithdrawController.acceptWithdraw);
router.patch("/reject/:withdrawId", WithdrawController.rejectWithdraw);
export const withdrawRoute = router;
