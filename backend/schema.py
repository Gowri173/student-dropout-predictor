from pydantic import BaseModel


class Student(BaseModel):
    attendance: float
    marks: float
    assignments: int
