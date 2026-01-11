export type TUser = {
  name?: string;
  phoneNumber: string;
  email: string;
  role: "user" | "admin";
  password: string;
  confirmPassword: string;
  invitationCode: string;
  userId: number;
  freezeUser?: boolean;
  superiorUserId?: string;
  superiorUserName?: string;
  quantityOfOrders?: number;
  withdrawalAddressAndMethod?: {
    BankName: string;
    withdrawalAddress: string;
  };
  withdrowalValidOddNumber?: number;
  actualCompletedNumberToday?: number;
  userBalance: number;
  memberTotalRecharge?: number;
  memberTotalWithdrawal?: number;
  userOrderFreezingAmount?: number;
  amountFrozedInWithdrawal?: number;
  whetherOnline?: boolean;
  mobilePhoneAreaCode?: string;
  lastLoginIp: string;
  lastLoginTime: Date;
  userType: string;
  userOrderAmountSlot: number[];
  userSelectedPackage?: number;
  completedOrdersCount?: number;
  adminAssaignProducts?: {
    productId: number;
    orderNumber: number;
    mysterybox?: {
      method: "cash" | "12x";
      amount: string;
    };
  }[];

  completedOrderProducts?: string[];
};
