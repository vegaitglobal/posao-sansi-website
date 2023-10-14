from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _


class JobEngagement(TextChoices):
    COURSE = "course", _("Course or internship")
    UNPAID_INTERNSHIP = "unpaid_internship", _("Unpaid internship")
    PAIN_INTERNSHIP = "paid_internship", _("Paid internship")
    PART_TIME = "part_time", _("Part time job offer")
    FULL_TIME = "full_time", _("Full time job offer")


class JobCategory(TextChoices):
    SALES_AND_TRADE = "sales_and_trade", _("Sales and Trade")
    TOURISM_AND_CATERING = "tourism_and_catering", _("Tourism and Catering")
    TRANSPORT_AND_LOGISTICS = "transport_and_logistics", _("Transport and Logistics")
    CLEANING_AND_MAINTENANCE = "cleaning_and_maintenance", _("Cleaning nad Maintenance")
    PRODUCTION_JOBS = "production_jobs", _("Jobs in production industry")
    FOOD_TECHNOLOGY = "food_technology", _("Food technology")
    BEAUTY_CARE = "beauty_care", _("Beauty Care")
    OTHER = "other", _("Other")


class JobCategory(TextChoices):
    SALES_AND_TRADE = "sales_and_trade", _("Sales and Trade")
    TOURISM_AND_CATERING = "tourism_and_catering", _("Tourism and Catering")
    TRANSPORT_AND_LOGISTICS = "transport_and_logistics", _("Transport and Logistics")
    CLEANING_AND_MAINTENANCE = "cleaning_and_maintenance", _("Cleaning nad Maintenance")
    PRODUCTION_JOBS = "production_jobs", _("Jobs in production industry")
    FOOD_TECHNOLOGY = "food_technology", _("Food technology")
    BEAUTY_CARE = "beauty_care", _("Beauty Care")
    OTHER = "other", _("Other")
