// HTML elements ko JavaScript me pakadna

const uploadPhotoBtn =
    document.getElementById("uploadPhotoBtn");

const foodInput =
    document.getElementById("foodInput");

const foodImage =
    document.getElementById("foodImage");


// Upload button par click

uploadPhotoBtn.addEventListener("click", function () {

    // Hidden file input ko click karna
    foodInput.click();

});


// User photo select karta hai

foodInput.addEventListener("change", function () {

    // Selected file lena
    const file = foodInput.files[0];

    // Agar file nahi hai to yahin stop
    if (!file) {
        return;
    }

    // Temporary image URL banana
    const imageURL =
        URL.createObjectURL(file);

    // Website par selected image dikhana
    foodImage.src = imageURL;

});