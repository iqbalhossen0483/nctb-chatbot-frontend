export interface User {
  _id: string;
  name: string;
  email: string;
  role: USER_ROLE;
  status: USER_STATUS;
  invitedAt: string;
  createdAt: string;
  updatedAt: string;
}

export enum USER_ROLE {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum PROJECT_STATUS {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: PROJECT_STATUS;
  createdBy: string;
  isDeleted: boolean;
  user: User;
}
