from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _


class EducationLevels(TextChoices):
    NONE = "none", _("No formal education")
    FIRST_DEGREE = "first_degree", _("First degree, 4 years of primary school")
    SECOND_DEGREE = "second_degree", _("Second degree, primary school")
    THIRD_DEGREE = "third_degree", _("Third degree, high school")
    FOURTH_DEGREE = "fourth_degree", _("Fourth degree, high school")
    FIFTH_DEGREE = "fifth_degree", _("Fifth degree, highly qualified, high school")
    SIXTH_DEGREE = "sixth_degree", _("Sixth degree, higher education, high school")
    SEVENTH_DEGREE = "seventh_degree", _("Seventh degree, higher vocational education, higher education school")


class WorkExperienceLevels(TextChoices):
    NONE = "none", _("No work experience")
    LT_YEAR = "lt_year", _("Less than a year")
    ONE_TO_THREE = "one_to_three", _("More than one less than three years")
    THREE_TO_FIVE = "three_to_five", _("More than three less than five years")
    FIVE_TO_TEN = "five_to_ten", _("More than five less than ten years")
    GT_TEN = "gt_ten", _("More than ten years")
