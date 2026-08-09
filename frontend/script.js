// ========================================
// HTML Elements
// ========================================

const imageInput =
    document.getElementById("food-image");

const selectedFile =
    document.getElementById("selected-file");

const previewContainer =
    document.getElementById("preview-container");

const imagePreview =
    document.getElementById("image-preview");

const analyzeButton =
    document.getElementById("analyze-btn");

const resultMessage =
    document.getElementById("result-message");


// ========================================
// Image Selection
// ========================================

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];


    // No file selected

    if (!file) {

        selectedFile.textContent = "";

        previewContainer.style.display = "none";

        imagePreview.src = "";

        return;
    }


    // Check image type

    if (!file.type.startsWith("image/")) {

        selectedFile.textContent =
            "Please select a valid image.";

        imageInput.value = "";

        previewContainer.style.display = "none";

        imagePreview.src = "";

        return;
    }


    // Maximum 5 MB

    const maxSize =
        5 * 1024 * 1024;


    if (file.size > maxSize) {

        selectedFile.textContent =
            "Image must be smaller than 5 MB.";

        imageInput.value = "";

        previewContainer.style.display = "none";

        imagePreview.src = "";

        return;
    }


    // Show filename

    selectedFile.textContent =
        `Selected: ${file.name}`;


    // Create preview URL

    const imageURL =
        URL.createObjectURL(file);


    // Show image

    imagePreview.src = imageURL;

    previewContainer.style.display = "block";


    // Update result

    resultMessage.textContent =
        "Image is ready to analyze.";

});


// ========================================
// Analyze Food
// ========================================

analyzeButton.addEventListener(
    "click",
    async function () {


        // Get selected file

        const file =
            imageInput.files[0];


        // No image

        if (!file) {

            resultMessage.textContent =
                "Please select a food image first.";

            return;
        }


        // Disable button

        analyzeButton.disabled = true;

        analyzeButton.textContent =
            "Analyzing...";


        resultMessage.textContent =
            `Uploading ${file.name}...`;


        // ========================================
        // Create FormData
        // ========================================

        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        // ========================================
        // Send to FastAPI
        // ========================================

        try {

            const response =
                await fetch(
                    "http://127.0.0.1:8000/predict",
                    {
                        method: "POST",

                        body: formData
                    }
                );


            // Check response

            if (!response.ok) {

                throw new Error(
                    `Server error: ${response.status}`
                );
            }


            // Convert response to JSON

            const data =
                await response.json();


            // Show backend response

            resultMessage.textContent =
                data.message;

        }


        catch (error) {

            console.error(
                "Backend Error:",
                error
            );


            resultMessage.textContent =
                "Unable to connect to the backend.";
        }


        finally {

            // Enable button

            analyzeButton.disabled =
                false;

            analyzeButton.textContent =
                "Analyze Food";

        }

    }
);