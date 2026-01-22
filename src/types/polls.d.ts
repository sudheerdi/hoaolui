type PollOption = { id: string; text: string };

type PollsRequestType = {
  question: string;
  options: Array<PollOption>;
  type: string;
  endDate: string;
  description: string;
};

type Poll = {
  id: string;
  question: string;
  description: string;
  status: string;
  type: string;
  createdById: string;
  createdByName: string;
  createdOn: string;
  endDate: string;
  communityId: string;
  communityName: string;
  options: [
    {
      id: string;
      description: string;
      noOfVotes: 0;
      poll: null;
    },
  ];
};
