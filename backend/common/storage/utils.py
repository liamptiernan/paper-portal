from hashlib import md5


def get_hash(bytes: bytes) -> str:
    return md5(bytes).hexdigest()


def get_obj_key(file_name: str, publisher_id: int) -> str:
    # get checksum and
    return f"uploads/{file_name}"
