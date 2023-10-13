import pytest
from django.db.utils import IntegrityError
from django.test import TransactionTestCase

from apps.common.tests import TestCase
from apps.users.models import User


class TestUser(TestCase, TransactionTestCase):
    def test_should_create_user(self):
        kwargs = {
            "email": "example@example.com",
            "password": "pass4user",
            "first_name": "Jon",
            "last_name": "Snow",
        }
        self.assertFalse(User.objects.exists())

        user = User.objects.create_user(**kwargs)

        self.assertCommonUserKwargs(user=user, expected_kwargs=kwargs)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_should_create_superuser(self):
        kwargs = {
            "email": "example@example.com",
            "password": "pass4user",
            "first_name": "Jon",
            "last_name": "Snow",
        }
        self.assertFalse(User.objects.exists())

        user = User.objects.create_superuser(**kwargs)

        self.assertCommonUserKwargs(user=user, expected_kwargs=kwargs)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_email_case_insensitive_search(self):
        first_user = User.objects.create(email="Hacker@example.com")
        second_user = User.objects.get(email="hacker@example.com")
        self.assertEqual(first_user, second_user)

    def test_email_case_insensitive_unique(self):
        User.objects.create(email="Hacker@example.com")
        error_message = "duplicate key value violates unique constraint"
        with pytest.raises(IntegrityError, match=error_message):
            User.objects.create(email="hacker@example.com")

    def assertCommonUserKwargs(self, user: User, expected_kwargs: dict) -> None:
        self.assertEqual(user.email, expected_kwargs["email"])
        self.assertTrue(user.check_password(expected_kwargs["password"]))
        self.assertEqual(user.first_name, expected_kwargs["first_name"])
        self.assertEqual(user.last_name, expected_kwargs["last_name"])
        self.assertIsNone(user.username)
        self.assertTrue(user.is_active)
