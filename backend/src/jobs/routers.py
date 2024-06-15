import json
from typing import List

from fastapi import APIRouter, Depends, UploadFile, HTTPException, File, Form
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from jobs.models import Job, Partner
from jobs.schemas import JobCreateSchema, JobGetSchema
from jobs.utils import save_image
from src.database import get_session

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"]


@router.post("/create_job")
async def create_job(job: str = Form(..., description='''{
    "title": "Senior Python Developer",
    "company": "1",
    "details": "We are looking for a Senior Python Developer...",
    "duration": "P2W",
    "level": "Продвинутый",
    "price": 75000.00,
    "specialization": "ИТ"}'''),
                     file: UploadFile = File(...),
                     db: AsyncSession = Depends(get_session)):
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    try:
        job_data = json.loads(job)
        job_obj = JobCreateSchema(**job_data)
    except ValidationError as e:
        return HTTPException(status_code=400, detail=f"{e.errors()}")
    except json.JSONDecodeError:
        return HTTPException(status_code=400, detail="Invalid JSON format")

    async with db as session:
        async with session.begin():
            new_job = Job(
                image_filename=await save_image(file),
                title=job_obj.title,
                company_id=job_obj.company,
                details=job_obj.details,
                duration=job_obj.duration,
                level=job_obj.level.value,
                price=job_obj.price,
                specialization=job_obj.specialization,
            )
            session.add(new_job)
        return {"message": "Job created successfully"}


@router.get("/get_free_jobs", response_model=List[JobGetSchema])
async def get_free_jobs(db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            query = (
                select(Job, Partner.name)
                .join(Partner, Job.company_id == Partner.partner_id).where(0.00 == Job.price)
            )
            results = await session.execute(query)
            jobs_with_company = results.all()

            jobs = [
                JobGetSchema(
                    job_id=job.job_id,
                    image_filename=job.image_filename,
                    title=job.title,
                    company_name=company_name,
                    details=job.details,
                    duration=job.duration,
                    level=job.level,
                    price=job.price,
                    specialization=job.specialization,
                )
                for job, company_name in jobs_with_company
            ]

        return jobs


@router.get("/job_by_specialization", response_model=List[JobGetSchema])
async def get_jobs_by_specializations(specialization: str, db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            query = (
                select(Job, Partner.name)
                .join(Partner, Job.company_id == Partner.partner_id)
            ).where(specialization == Job.specialization)
            results = await session.execute(query)
            specialization_jobs = results.all()

            jobs = [
                JobGetSchema(
                    job_id=job.job_id,
                    image_filename=job.image_filename,
                    title=job.title,
                    company_name=company_name,
                    details=job.details,
                    duration=job.duration,
                    level=job.level,
                    price=job.price,
                    specialization=job.specialization,
                )
                for job, company_name in specialization_jobs
            ]

        return jobs


@router.get("/get_specializations")
async def get_specializations(db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            query = (
                select(Job.specialization).distinct()
            )
            results = await session.execute(query)
            specialization = results.scalars().all()
        return specialization


@router.post("/create_partner")
async def create_partners(name: str = Form(...), file: UploadFile = File(...),
                          db: AsyncSession = Depends(get_session)):
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    async with db as session:
        async with session.begin():
            new_partner = Partner(
                image_filename=await save_image(file),
                name=name
            )
            session.add(new_partner)
        return {"message": "Partner created successfully"}


@router.get("/get_partners")
async def get_partners(db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            query = select(Partner)
            results = await session.execute(query)
            partners = results.scalars().all()
        return partners
