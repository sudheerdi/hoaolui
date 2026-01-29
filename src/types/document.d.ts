type HoaDocument = {
  id: string;
  title: string;
  description: string;
  docType: string;
  filePath: string;
  visibility: "SHARED" | "PRIVATE";
  sharedMembershipIds: Array<string>;
  uploadedAt: string;
  lastModifiedAt: string;
  community: {
    id: string;
    name: string;
  };
  uploadedBy: {
    id: string;
    name: string;
    email: string;
  };
  lastModifiedBy: {
    id: string;
    name: string;
    email: string;
  };
};
