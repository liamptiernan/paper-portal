from contextlib import contextmanager
from pathlib import Path
import tempfile

import boto3

from backend.common.core.settings import settings


class S3Client:
    def __init__(self):
        self.client = boto3.resource("s3")
        self.bucket = self.client.Bucket(settings.ad_bucket_name)
        self.prefix: str

    def get_full_path(self, relative_key: str):
        return str(Path(self.prefix).joinpath(relative_key))

    def upload_file(self, file_name: str, relative_key: str):
        key = self.get_full_path(relative_key)
        self.bucket.upload_file(file_name, key)

    def download_file(self, relative_key: str, file_name: str):
        key = self.get_full_path(relative_key)
        self.bucket.download_file(key, file_name)

    def write_obj_mem(self, relative_key: str, obj: bytes):
        key = self.get_full_path(relative_key)
        self.bucket.put_object(Key=key, Body=obj)

    def read_object_stream(self, relative_key: str):
        key = self.get_full_path(relative_key)
        return self.bucket.Object(key).get()["Body"]

    def read_object(self, relative_key: str) -> bytes:
        key = self.get_full_path(relative_key)
        return self.read_object_stream(key).read()

    @contextmanager
    def read_object_to_tempfile(self, relative_key, suffix=None):
        with tempfile.NamedTemporaryFile(suffix=suffix) as temp:
            doc = self.read_object(relative_key)
            temp.write(doc)
            temp.seek(0)
            yield temp.name


class LogoClient(S3Client):
    def __init__(self):
        super().__init__()
        self.prefix = "logos"
