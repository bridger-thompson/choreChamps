from dotenv import load_dotenv

load_dotenv()
from src.features.chores import chore_router
from src.features.people import child_router, parent_router
from src.features.chores.parent import chore_parent_router
from src.features.prizes import prize_router
from fastapi import FastAPI, Request, HTTPException, APIRouter, encoders, responses


app = FastAPI(
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exception: HTTPException):
    print("http exception exception here")
    try:
        # user = authenticate_user(request)
        print(f"exception thrown")
    except:
        pass
    print(request.url)
    print(exception.detail)
    return responses.JSONResponse(
        status_code=exception.status_code,
        content={"detail": encoders.jsonable_encoder(exception.detail)},
    )


@app.exception_handler(Exception)
async def generic_exception(request: Request, exception: Exception):
    print("exception here")
    print(request.url)
    print(exception)
    return responses.JSONResponse(
        content={
            "detail": "An error occured, check the logs for details",
            "success": False,
        },
        status_code=500,
    )


router = APIRouter(prefix="/api")


@router.get("/health")
def health_check():
    return True


router.include_router(chore_router.router)
router.include_router(child_router.router)
router.include_router(parent_router.router)
router.include_router(chore_parent_router.router)
router.include_router(prize_router.router)

app.include_router(router)
