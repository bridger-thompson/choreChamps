from fastapi import APIRouter, Depends
from src.features.people import people_repository
from src.models.user import User
from src.services.oauth_service import authenticate_user


router = APIRouter(
    prefix="/parent", responses={404: {"description": "Parent Endpoint Not Found"}}
)


@router.get("/{pin}")
def user_is_authorized(pin: str, user: User = Depends(authenticate_user)):
    return people_repository.user_is_authorized(pin, user.username)
