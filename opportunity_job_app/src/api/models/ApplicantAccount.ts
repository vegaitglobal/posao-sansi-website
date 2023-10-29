import { User } from "@/api/models/User";

export interface ApplicantAccount {
  user: User;
  first_name: string;
  last_name: string;
  work_experience: string;
  education: string;
  about: string;
}
