import json

from fastapi import APIRouter, Depends, UploadFile, HTTPException, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import ValidationError

from jobs.models import Job
from jobs.utils import save_image
from jobs.schemas import JobCreateSchema
from src.users.models import User
from src.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.context import CryptContext
from datetime import timedelta
from users.auth import create_access_token, token_to_cookie
from users.schemas import UserCreate, UserLogin

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"]

@router.post("/create_job")
async def create_job(job: str = Form(...), file: UploadFile = File(...), db: AsyncSession = Depends(get_session)):
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    try:
        job_data = json.loads(job)
        job_obj = JobCreateSchema(**job_data)
    except ValidationError as e:
        return HTTPException(status_code=400, detail=f"{e.error()}")
    except json.JSONDecodeError:
        return HTTPException(status_code=400, detail="Invalid JSON format")


    async with db as session:
        async with session.begin():
            new_job = Job(
                image_filename=await save_image(file),
                title=job_obj.title,
                company=job_obj.company,
                details=job_obj.details,
                duration=job_obj.duration,
                level=job_obj.level.value,
                price=job_obj.price,
            )
            session.add(new_job)
        return {"message": "Job created successfully"}
