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
    "jobs",
)
