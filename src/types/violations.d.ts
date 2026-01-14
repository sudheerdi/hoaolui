type Violation = {
  id: string;
  type: string;
  description: string;
  membershipId: string;
  responseDueDate: string;
  complianceDueDate: string;
  user: {
    mobileNumber: string;
    firstName: string;
    userId: string;
    lastName: string;
    emailId: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    address2: string;
    address1: string;
    postalCode: string;
  };

  createdAt: string;
  generatedNotice: string;
  reportedById: string;
  amountToBePaid: number;
  status: string;
};

type ViolationsType = {
  violationDefaults: Array<ViolationType>;
  communityId: string;
  violations: Array<Violation>;
  totalViolations: number;
};

type ViolationType = {
  id: string;
  violationType: string;
  compliancePeriod: number;
  responsePeriod: number;
  templateDescription: string;
  typeSpecificConfig: string;
};

type ViolationDefaultsType = {
  violationDefaults: Array<ViolationType>;
};

type ViolationRequestType = {
  unitId: string;
  membershipId: string;
  type: string;
  dynamicValues: {
    date: string;
    description: string;
    violationPicture: string;
    vehicleDescription: string;
    licensePlate: string;
  };
};

type ViolationResponseType = {
  type: string;
  violationId: string;
  responseDueDate: string;
  status: string;
  amountToBePaid: number;
  message: string;
  complianceDueDate: string;
  generatedNotice: string;
};
