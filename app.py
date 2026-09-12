from flask import Flask, render_template, request
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp"
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():

    if "food_image" not in request.files:
        return "No image uploaded"

    image = request.files["food_image"]

    if image.filename == "":
        return "No file selected"

    filename = secure_filename(image.filename)

    extension = filename.rsplit(".", 1)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        return "Invalid image format"

    os.makedirs(
        app.config["UPLOAD_FOLDER"],
        exist_ok=True
    )

    image_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        filename
    )

    image.save(image_path)

    return "Image uploaded successfully!"


if __name__ == "__main__":
    app.run(debug=True)