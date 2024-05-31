from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import datetime
from PIL import Image
import io


from profiles.models import PeopleModel
from .models import CommentProfile


def create_new_picture():
    image_temp = Image.new('RGB', (100, 100))
    image_io = io.BytesIO()
    image_temp.save(image_io, format='PNG')
    image_io.seek(0)
    picture = SimpleUploadedFile('test_image.png', image_io.read(), content_type='image/png')

    return picture


class CommentsTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.credentials_error = {'username': 'user_error', 'password': '12334555'}

        self.today = datetime.today()
        self.uploaded_file = create_new_picture()
        self.profile = self.create_profile()
        self.comment = self.create_comment()

        self.comment_data = {
            "profileId": self.profile.id,
            "comment": "Teste de comentario",
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

    def create_comment(self):
        comment = CommentProfile.objects.create(
            user=self.user,
            profile=self.profile,
            desc="Comment",
            date=self.today,
        )
        return comment

    def test_get_all_comments_405_error(self):
        """ Não implementado """
        profile_id = self.profile.id
        response = self.client.get(f"/comments/{profile_id}/")
        self.assertEqual(response.status_code, 405)

    def test_get_comment_405_error(self):
        """ Não implementado """
        response = self.client.get("/comments/1/")
        self.assertEqual(response.status_code, 405)

    # Create new comment
    def test_create_new_comment(self):
        response = self.client.post("/comments/", self.comment_data)
        self.assertEqual(response.status_code, 200)

    def test_create_new_comment_json(self):
        response = self.client.post("/comments/", self.comment_data)
        self.assertEqual(response['content-type'], 'application/json')

    def test_create_new_comment_no_login_error(self):
        self.client.credentials()
        response = self.client.post("/comments/", self.comment_data)
        self.assertEqual(response.status_code, 401)

    def test_create_new_comment_no_data_error(self):
        response = self.client.post("/comments/", {})
        self.assertEqual(response.status_code, 400)

    # Delete comment
    def test_delete_comment_status(self):
        comment_id = self.comment.id
        response = self.client.delete(f"/comments/{comment_id}/")
        self.assertEqual(response.status_code, 200)

    def test_delete_comment_no_login_error(self):
        self.client.credentials()
        comment_id = self.comment.id
        response = self.client.delete(f"/comments/{comment_id}/")
        self.assertEqual(response.status_code, 401)

    def test_delete_comment_json_error(self):
        comment_id = self.comment.id
        response = self.client.delete(f"/comments/{comment_id}/")
        self.assertEqual(response['content-type'], 'application/json')

    def test_delete_comment_no_data_error(self):
        ids = [0, 9999, -1, 'x']
        for item in ids:
            response = self.client.delete(f"/comments/{item}/")
            self.assertEqual(response.status_code, 400)
