from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import date
from PIL import Image
import io
import os

from .models import PeopleModel, PetModel


# Esta função apaga todas as imagens geradas pelo test na pasta profiles/
# NÂO RENOMEAR essa função, o nome é o padrão definido pelo unittest
def tearDownModule():
    path = 'media/profiles/'
    if os.path.isdir(path):
        files = os.listdir(path)

        for file in files:
            path_file = os.path.join(path, file)
            if os.path.isfile(path_file):
                os.unlink(path_file)


def create_new_picture():
    image_temp = Image.new('RGB', (100, 100))
    image_io = io.BytesIO()
    image_temp.save(image_io, format='PNG')
    image_io.seek(0)
    picture = SimpleUploadedFile('test_image.png', image_io.read(), content_type='image/png')

    return picture


class PeoplesTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.credentials_error = {'username': 'user_error', 'password': '12334555'}

        self.today = date.today()
        self.uploaded_file = create_new_picture()
        self.profile = self.create_profile()

        self.profile_data = {
            "picture": self.uploaded_file,
            "name": 'Name',
            "sex": True,
            "age": self.today,
            "ageGroup": "Adulto",
            "telephone": "(00)0000-0000",
            "desc": "Description of profile",
            "location": "some location"
        }

    def create_profile(self):
        profile = PeopleModel.objects.create(
            picture=self.uploaded_file,
            name='name',
            man=True,
            age=self.today,
            age_group="Adulto",
            telephone="(00)0000-0000",
            desc="Description of profile",
            location="some location"
        )
        return profile

    def test_get_all_people_profile_status(self):
        response = self.client.get('/peoples/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_people_profile_json(self):
        response = self.client.get('/peoples/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_all_people_profile_no_login(self):
        self.client.credentials()
        response = self.client.get('/peoples/')
        self.assertEqual(response.status_code, 200)

    # Get Profile
    def test_get_people_profile(self):
        profile_id = self.profile.id
        response = self.client.get(f'/peoples/{profile_id}/')
        self.assertEqual(response.status_code, 200)

    def test_get_people_profile_json(self):
        profile_id = self.profile.id
        response = self.client.get(f'/peoples/{profile_id}/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_people_profile_id_not_exists_error(self):
        ids = [0, 9999, -1, 'x']
        for item in ids:
            response = self.client.get(f'/peoples/{item}/')
            self.assertEqual(response.status_code, 400)

    # create
    def test_create_new_people_profile(self):
        response = self.client.post('/peoples/', self.profile_data)
        self.assertEqual(response.status_code, 200)

    def test_create_new_people_profile_json(self):
        response = self.client.post('/peoples/', self.profile_data)
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_create_new_people_profile_no_login_error(self):
        self.client.credentials()
        response = self.client.post('/peoples/', self.profile_data)
        self.assertEqual(response.status_code, 401)

    def test_create_new_people_profile_no_data_error(self):
        response = self.client.post('/peoples/', {})
        self.assertEqual(response.status_code, 400)


class PetsTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.credentials_error = {'username': 'user_error', 'password': '12334555'}

        self.today = date.today()
        self.uploaded_file = create_new_picture()
        self.profile = self.create_profile()

        self.profile_data = {
            "picture": self.uploaded_file,
            "name": 'Name',
            "breed": "Srd",
            "specie": "Dog",
            "telephone": "(00)0000-0000",
            "desc": "Description of profile",
            "location": "some location"
        }

    def create_profile(self):
        profile = PetModel.objects.create(
            picture=self.uploaded_file,
            name='name',
            breed="SRD",
            specie="Dog",
            telephone="(00)0000-0000",
            desc="Description of profile",
            location="some location"
        )
        return profile

    def test_get_all_pet_profile_status(self):
        response = self.client.get('/pets/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_pet_profile_json(self):
        response = self.client.get('/pets/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_all_pet_profile_no_login(self):
        self.client.credentials()
        response = self.client.get('/pets/')
        self.assertEqual(response.status_code, 200)

    # Get Profile
    def test_get_pet_profile(self):
        profile_id = self.profile.id
        response = self.client.get(f'/pets/{profile_id}/')
        self.assertEqual(response.status_code, 200)

    def test_get_pet_profile_json(self):
        profile_id = self.profile.id
        response = self.client.get(f'/pets/{profile_id}/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_pet_profile_id_not_exists_error(self):
        ids = [0, 9999, -1, 'x']
        for item in ids:
            response = self.client.get(f'/pets/{item}/')
            self.assertEqual(response.status_code, 400)

    # create
    def test_create_new_pet_profile(self):
        response = self.client.post('/pets/', self.profile_data)
        self.assertEqual(response.status_code, 200)

    def test_create_new_pet_profile_json(self):
        response = self.client.post('/pets/', self.profile_data)
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_create_new_pet_profile_no_login_error(self):
        self.client.credentials()
        response = self.client.post('/pets/', self.profile_data)
        self.assertEqual(response.status_code, 401)

    def test_create_new_pet_profile_no_data_error(self):
        response = self.client.post('/pets/', {})
        self.assertEqual(response.status_code, 400)
