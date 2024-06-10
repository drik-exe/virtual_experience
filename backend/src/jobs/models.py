from sqlalchemy import (Boolean, Column, DateTime, ForeignKey, Integer, String,
                        Text, Interval, Enum, DECIMAL)
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy import Enum

from src.database import Base



class Job(Base):
    __tablename__ = 'jobs'

    job_id = Column(Integer, primary_key=True, autoincrement=True)
    image_filename = Column(String, nullable=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    details = Column(Text, nullable=False)
    duration = Column(Interval, nullable=False) # duration=timedelta(hours=2)
    level = Column(String, nullable=False)
    price = Column(DECIMAL(precision=10, scale=2))


class Partner(Base):
    __tablename__ = 'partners'

    partner_id = Column(Integer, primary_key=True, autoincrement=True)
    image_filename = Column(String, nullable=True)
    name = Column(String, nullable=False, unique=True)