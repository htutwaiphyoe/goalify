type AdminUsersState = {
  users: User[];
  error: any;
  loading: boolean;
};

type AdminUsersAction = {
  type:
    | "ADMIN_USERS_REQUEST"
    | "ADMIN_USERS_SUCCESS"
    | "ADMIN_USERS_FAIL"
    | "ADMIN_USERS_RESET"
    | "ADMIN_USERS_CLEAR";
  payload: any;
};

type AdminUserState = {
  user: User | null;
  error: any;
  loading: boolean;
};

type AdminUserAction = {
  type:
    | "ADMIN_USER_REQUEST"
    | "ADMIN_USER_SUCCESS"
    | "ADMIN_USER_FAIL"
    | "ADMIN_USER_RESET"
    | "ADMIN_USER_CLEAR";
  payload: any;
};

type APIState = {
  error: any;
  loading: boolean;
  message: string;
};

type APIAction = {
  type: "SUCCESS" | "FAIL" | "RESET" | "REQUEST";
  payload: any;
};

type SignUpValues = {
  avatar: any;
  name: string;
  email: string;
  phone: string;
  password: string;
  preferences?: any;
};

type TPreferences = {
  isVegan: boolean;
  isSmoker: boolean;
  usedWheelChair: boolean;
  isMinimalist: boolean;
  isFoodie: boolean;
  isFitnessEnthusiast: boolean;
  isWorkaholic: boolean;
};

type SessionUser = {
  avatar: {
    publicId: string;
    url: string;
  };
  name: string;
  email: string;
  phone: string;
  password: string;
  preferences: TPreferences;
};

type User = {
  avatar: {
    publicId: string;
    url: string;
  };
  preferences: TPreferences;
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "agency" | "admin";
  createdAt: Date;
  updatedAt: Date;
  isSuspended: boolean;
};

type NewUser = {
  avatar: any;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "agency" | "admin";
  preferences: TPreferences;
};
