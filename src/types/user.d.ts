type userRequestType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  communityName: string;
  communityAddress: string;
};

type userResponseType = {
  role: string;
  communityName: string;
  membershipId: string;
  communityId: string;
  message: string;
  userId: string;
  email: string;
  token: string;
  status: string;
};

type userLoginRequestType = {
  email: string;
  password: string;
};

type userMembership = {
  role: string;
  communityName: string;
  membershipId: string;
  communityId: string;
};

type user = {
  firstName: string;
  lastName: string;
  emailId: string;
  id: string;
  memberships: Array<userMembership>;
  status: string;
};

type userLoginResponseType = {
  token: string;
  user: user;
};

type UserType = {
  userId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
  unitId: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  membershipId: string;
  role: string;
};

type UserResetPasswordRequest = {
  token: string;
  password: string;
  confirmPassword: string;
};

type UserResetPasswordResponse = {
  userStatus: string;
  trialExpiresAt: string;
  communityName: string;
  membershipId: string;
  message: string;
  membershipStatus: string;
  email: string;
  communityStatus: string;
};
