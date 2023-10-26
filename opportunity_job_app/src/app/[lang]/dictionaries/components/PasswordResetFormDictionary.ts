import { PopupDictionary } from "@/app/[lang]/dictionaries/components/PopupDictionary";

interface PasswordResetFormErrorsDictionary {
  passwordMinLength: string;
  passwordsNotMatch: string;
}

export interface PasswordResetFormDictionary {
  topTextFirstLine: string;
  topTextSecondLine: string;
  passwordFieldLabel: string;
  passwordFieldPlaceholder: string;
  passwordConfirmFieldLabel: string;
  passwordConfirmFieldPlaceholder: string;
  errors: PasswordResetFormErrorsDictionary;
  submitButtonLabel: string;
  popup: PopupDictionary;
}
