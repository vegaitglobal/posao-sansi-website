from decouple import Csv, config

THIRD_PARTY_APPS = [
    "django_extensions",
    "rest_framework",
    "rest_framework.authtoken",
    "drf_spectacular",
    "modeltranslation",
]

THIRD_PARTY_MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
]

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.users.authentication.TokenAuthentication",
    ]
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Job Opportunity",
    "DESCRIPTION": "Project for finding new job opportunities",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

FE_APP_ORIGIN = config("FE_APP_ORIGIN")
CORS_ALLOWED_ORIGINS = [
    FE_APP_ORIGIN,
]
