THIRD_PARTY_APPS = [
    "django_extensions",
    "rest_framework",
    "drf_spectacular",
]

THIRD_PARTY_MIDDLEWARE = []

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Job Opportunity",
    "DESCRIPTION": "Project for finding new job opportunities",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}
