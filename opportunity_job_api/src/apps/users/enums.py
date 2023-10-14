from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _


class AccountType(TextChoices):
    APPLICANT = "applicant", _("Applicant")
    EMPLOYER = "employer", _("Employer")


class Education(TextChoices):
    NONE = "none", _("No formal education")
    FIRST_DEGREE = "first_degree", _("First degree, 4 years of primary school")
    SECOND_DEGREE = "second_degree", _("Primary school")
    THIRD_DEGREE = "third_degree", _("High school")
    FOURTH_DEGREE = "fourth_degree", _("High school")
    FIFTH_DEGREE = "fifth_degree", _("High school")
    SIXTH_DEGREE = "sixth_degree", _("VSS")
    SEVENTH_DEGREE = "seventh_degree", _("VSS")


class WorkExperience(TextChoices):
    NONE = "none", _("No work experience")
    LT_YEAR = "lt_year", _("Less than a year")
    ONE_TO_THREE = "one_to_three", _("More than one less than three")
    THREE_TO_FIVE = "three_to_five", _("More than three less than five")
    FIVE_TO_TEN = "five_to_ten", _("More than five less than ten")
    GT_TEN = "gt_ten", _("More than ten")
