CUSTOM_APPS = [
    "apps.common",
    "apps.users",
    "apps.emails",
    "apps.jobs",
]

CUSTOM_MIDDLEWARE = [
    "apps.common.middleware.LanguageMiddleware",
]

FIXTURES = (
    "emails",
    "users",
    "applicant_accounts",
    "employer_accounts",
    "job_offers",
    "job_enrollments",
    "faqs",
)
