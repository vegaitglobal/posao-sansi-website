import { User } from "@/api/models/User";

export interface EmployerAccount {
  user: User;
  company_name: string;
  pib: string;
  address: string;
  phone_number: string;
  url: string;
  about: string;
}
