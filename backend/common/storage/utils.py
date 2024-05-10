from hashlib import md5
import magic
import mimetypes
from typing import BinaryIO


supported_types = set(
    ["image/png", "image/jpg", "image/jpeg", "application/pdf", "image/svg+xml"]
)


def get_hash(file: BinaryIO) -> str:
    hasher = md5()
    file_bytes = file.read(1024)
    while file_bytes:
        hasher.update(file_bytes)
        file_bytes = file.read(1024)
    file.seek(0)
    return hasher.hexdigest()


def get_key(file: BinaryIO) -> str:
    mimetype = magic.from_buffer(file.read(1024), mime=True)
    if mimetype not in supported_types:
        raise ValueError(f"File type {mimetype} is not supported.")
    file.seek(0)
    extension = mimetypes.guess_extension(mimetype)
    if not extension:
        raise ValueError("File type is not supported. No extension identified.")
    checksum = get_hash(file)
    return f"{checksum}{extension}"
