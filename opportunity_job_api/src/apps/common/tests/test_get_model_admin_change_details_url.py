from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from apps.common.tests import TestCase
from apps.common.utils import get_model_admin_change_details_url


class TestGetModelAdminChangeDetailsURL(TestCase):

    def test_should_return_empty_string_when_model_is_not_registered_on_admin_site(self):
        group = Group.objects.create(name="New group")
        url = get_model_admin_change_details_url(group)
        self.assertEqual(url, "")

    def test_should_return_url_when_model_is_registered_on_admin_site(self):
        user_class = get_user_model()
        user = user_class.objects.create()
        url = get_model_admin_change_details_url(user)
        self.assertEqual(url, f"/{settings.LANGUAGE_CODE}/admin/users/user/{user.pk}/change/")
