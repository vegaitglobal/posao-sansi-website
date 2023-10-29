import { ApplicantFormData } from "@/components/RegistrationForm/types";

export const initialApplicantFormData: ApplicantFormData = {
  first_name: { value: "", errors: [] },
  last_name: { value: "", errors: [] },
  email: { value: "", errors: [] },
  password: { value: "", errors: [] },
  password_confirmation: { value: "", errors: [] },
  work_experience: { value: "", options: [], errors: [] },
  education: { value: "", options: [], errors: [] },
  about: { value: "", errors: [] },
};


// TODO: REMOVE
// export const initialApplicantFormData: ApplicantFormData = {
//   first_name: { value: "Milos", errors: [] },
//   last_name: { value: "Roknic", errors: [] },
//   email: { value: "roknic.milos.994@gmail.com", errors: [] },
//   password: { value: "pass4user", errors: [] },
//   password_confirmation: { value: "pass4user", errors: [] },
//   work_experience: { value: "", options: [], errors: [] },
//   education: { value: "", options: [], errors: [] },
//   about: { value: "Evo malo teksta o meni", errors: [] },
// };
