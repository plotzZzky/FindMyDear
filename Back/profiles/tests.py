from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

from .models import BaseProfile


class ProfileTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.credentials_error = {'username': 'user_error', 'password': '12334555'}

        self.uploaded_file = self.create_new_picture()
        self.profile = self.create_profile()

        self.profile_data = {
            "picture": self.uploaded_file,
            "name": 'Name',
            "men": True,
            "children": True,
            "pet": False,
            "desc": "Description of profile",
            "location": "some location"
        }

    @staticmethod
    def create_new_picture():
        image_temp = Image.new('RGB', (100, 100))
        image_io = io.BytesIO()
        image_temp.save(image_io, format='PNG')
        image_io.seek(0)
        picture = SimpleUploadedFile('test_image.png', image_io.read(), content_type='image/png')

        return picture

    def create_profile(self):
        profile = BaseProfile.objects.create(
            picture=self.uploaded_file,
            name='name',
            men=True,
            children=True,
            pet=False,
            desc="Description of profile",
            location="some location"
        )
        return profile

    def test_get_all_people_profile_status(self):
        response = self.client.get('/profiles/')
        self.assertTrue(response.status_code, 200)

    def test_get_all_people_profile_json(self):
        response = self.client.get('/profiles/')
        self.assertEqual(response['Content-Type'], 'application/json')

    # Get Pets
    def test_get_all_pets_profile_status(self):
        response = self.client.get('/profiles/pets/')
        self.assertTrue(response.status_code, 200)

    def test_get_all_pets_profile_json(self):
        response = self.client.get('/profiles/pets/')
        self.assertEqual(response['Content-Type'], 'application/json')

    # Get Profile
    def test_get_user_profile(self):
        profile_id = self.profile.id
        response = self.client.get(f'/profiles/{profile_id}/')
        self.assertEqual(response.status_code, 200)

    def test_get_user_profile_json(self):
        profile_id = self.profile.id
        response = self.client.get(f'/profiles/{profile_id}/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_user_profile_id_not_exists_error(self):
        profile_id = 9999
        response = self.client.get(f'/profiles/{profile_id}/')
        self.assertEqual(response.status_code, 400)

