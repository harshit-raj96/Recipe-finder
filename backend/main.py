from fastapi import FastAPI, UploadFile, File
import shutil

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Food Recipe AI is running!"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    file_path = f"../uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "message": "Image uploaded successfully"
    }