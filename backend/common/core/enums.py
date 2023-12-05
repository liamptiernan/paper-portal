from enum import Enum


class UserRole(str, Enum):
    """
    - `SUPERUSER`: Super Admin
    """

    SUPERUSER = "SUPERUSER"
    PUBADMIN = "PUBADMIN"
