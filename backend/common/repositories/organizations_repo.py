from backend.common.db.models import Organization
from backend.common.models.organization import Organization as AdOrganization
from backend.common.repositories.base_repo import BaseRepo


class OrganizationsRepo(BaseRepo[Organization, AdOrganization]):
    ...


organizations_repo = OrganizationsRepo(Organization, AdOrganization)
