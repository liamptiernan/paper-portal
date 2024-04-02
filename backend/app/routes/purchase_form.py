# from fastapi import APIRouter, Depends, HTTPException, status
# from pydantic import BaseModel
# from sqlalchemy.ext.asyncio import AsyncSession

# from backend.app.utils.user import UserWithRole
# from backend.common.core.enums import UserRole
# from backend.common.db.init import get_session
# from backend.common.models.ad_offering import AdOffering, NewAdOffering
# from backend.common.models.user import User
# from backend.common.repositories.ad_offerings_repo import ad_offerings_repo

# router = APIRouter(
#     prefix="/purchase-form",
#     tags=["Purchase"],
# )

# superuser = UserWithRole(UserRole.SUPERUSER)


# @router.get("/config/{id}", response_model=)
# async def get_form_config(
#     session: AsyncSession = Depends(get_session), user: User = Depends(pub_admin)
# ):

#     publications = await publications_repo.get_all(session, user)
#     return PublicationsTableResponse(data=publications, count=len(publications))
