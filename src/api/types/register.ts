
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
}
export type VerifyOtpPayload = {
  email: string;
  otp: string;
};
export interface ResendOtpPayload {
  email: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
  token?: string;
};
export type LoginPayload = {
  email: string;
  password: string;
};
export type VerifyLoginPayload = {
  success: boolean;
  message: string;
  token?: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      name: string;
      email: string;
    };
    token: string;
  };
};
export type UserResponse = {
  user: {
    userId: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
export type UsergetPayload = {
  success: boolean;
  message: string;
  data: UserResponse;
};
