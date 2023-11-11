from enum import Enum


class Roles(str, Enum):
    """
    - `SUPERUSER`: Super Admin
    """

    SUPERUSER = "SUPERUSER"
    PUBADMIN = "PUBADMIN"
