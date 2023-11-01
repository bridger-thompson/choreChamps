from dotenv import load_dotenv
load_dotenv()
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


router = APIRouter(prefix="/api")


@router.get("/health")
def health_check():
    return True

# router.include_router(your_router.router)

app.include_router(router)
