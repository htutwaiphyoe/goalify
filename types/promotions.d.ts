type AdminPromotionsState = {
  promotions: Promotion[];
  error: any;
  loading: boolean;
};

type AdminPromotionsAction = {
  type:
    | "ADMIN_PROMOTIONS_REQUEST"
    | "ADMIN_PROMOTIONS_SUCCESS"
    | "ADMIN_PROMOTIONS_FAIL"
    | "ADMIN_PROMOTIONS_RESET"
    | "ADMIN_PROMOTIONS_CLEAR";
  payload: any;
};

type AdminPromotionState = {
  promotion: Promotion | null;
  error: any;
  loading: boolean;
};

type AdminPromotionAction = {
  type:
    | "ADMIN_PROMOTION_REQUEST"
    | "ADMIN_PROMOTION_SUCCESS"
    | "ADMIN_PROMOTION_FAIL"
    | "ADMIN_PROMOTION_RESET"
    | "ADMIN_PROMOTION_CLEAR";
  payload: any;
};

type Promotion = {
  _id: string;
  name: string;
  percentRate: number;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
