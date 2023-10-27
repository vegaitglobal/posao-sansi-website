from modeltranslation.translator import TranslationOptions, register

from apps.jobs.models import FAQ, JobOffer


@register(FAQ)
class FAQTranslationOptions(TranslationOptions):
    fields = (
        "question",
        "answer"
    )


@register(JobOffer)
class JobOfferTranslationOptions(TranslationOptions):
    fields = (
        "job_name",
        "job_description",
        "additional_skills"
    )
