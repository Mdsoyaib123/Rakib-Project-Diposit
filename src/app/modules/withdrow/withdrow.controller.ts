import { Request, Response } from "express";
import { WithdrawService } from "./withdrow.service";

const createWithdrawController = async (req: Request, res: Response) => {
  try {
    const result = await WithdrawService.createWithdrawService(req.body);

    res.status(201).json({
      success: true,
      message: "Withdrawal request submitted",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const acceptWithdraw = async (req: Request, res: Response) => {
  try {
    const { withdrawId } = req.params;

    const result = await WithdrawService.acceptWithdrawService(withdrawId);

    res.status(200).json({
      success: true,
      message: "Withdrawal approved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectWithdraw = async (req: Request, res: Response) => {
  try {
    const { withdrawId  } = req.params;
    const { reviewRemark } = req.body;

    const result = await WithdrawService.rejectWithdrawService(
      withdrawId,
      reviewRemark
    );

    res.status(200).json({
      success: true,
      message: "Withdrawal rejected successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const WithdrawController = {
  createWithdrawController,
  acceptWithdraw,
  rejectWithdraw,
};
