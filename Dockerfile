FROM python:3.11-slim

WORKDIR /app

# Copy requirements first (cache layer)
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY backend ./backend
COPY model ./model

WORKDIR /app/backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
