from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import os
from schema import Student

app = FastAPI(title="Student Dropout Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "student_dropout_model.pkl")

model = joblib.load(MODEL_PATH)


@app.get("/")
def home():
    return {"message": "Student Risk Prediction API Running"}


@app.post("/predict")
def predict(student: Student):

    data = np.array([[student.attendance, student.marks, student.assignments]])

    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    return {
        "prediction": "At Risk" if prediction == 1 else "No Risk",
        "risk_probability": round(probability * 100, 2)
    }
