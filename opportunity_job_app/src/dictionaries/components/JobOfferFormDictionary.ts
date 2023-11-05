import { PopupDictionary } from "@/dictionaries/components/PopupDictionary";

export interface JobOfferFormDictionary {
  topText: string;
  jobNameFieldLabel: string;
  jobNameFieldPlaceholder: string;
  locationFieldLabel: string;
  locationFieldPlaceholder: string;
  applicationDeadlineFieldLabel: string;
  applicationDeadlineFieldPlaceholder: string;
  jobDescriptionFieldLabel: string;
  jobDescriptionFieldPlaceholder: string;
  categoryFieldLabel: string;
  categoryFieldPlaceholder: string;
  requiredWorkExperienceFieldLabel: string;
  requiredWorkExperienceFieldPlaceholder: string;
  engagementFieldLabel: string;
  engagementFieldPlaceholder: string;
  requiredEducationFieldLabel: string;
  requiredEducationFieldPlaceholder: string;
  additionalSkillsFieldLabel: string;
  additionalSkillsFieldPlaceholder: string;
  submitButtonLabel: string;
  successPopup: PopupDictionary;
  errorPopup: PopupDictionary;
}
