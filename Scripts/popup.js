// ==========================================
// POPUP SYSTEM
// ==========================================

const popupOverlay = document.getElementById("popupOverlay");
const popupText = document.getElementById("popupText");
const popupImage = document.getElementById("popupImage");
const popupClose = document.getElementById("popupClose");


const qrPopupContent = document.getElementById("qrPopupContent");


// ==========================================
// OPEN TEXT POPUP// ==========================================

function showTextPopup(text) {

    popupText.textContent = text;

    popupImage.style.display = "none";

    popupOverlay.classList.remove("popupHidden");
}

// ==========================================
// OPEN IMAGE POPUP
// ==========================================

function showImagePopup(image) {

 
    popupImage.src = image;
    popupImage.style.display = "block";



    popupOverlay.classList.remove("popupHidden");
;

}

// ==========================================
// OPEN QR POP UP
// ==========================================


function showQRPopup() {

    console.log("QR popup opened");

    popupText.textContent = "";

    popupImage.style.display = "none";

    qrPopupContent.style.display = "block";

    popupOverlay.classList.remove("popupHidden");
}

// ==========================================
// CLOSE POPUP
// ==========================================

function closePopup() {

    popupOverlay.classList.add("popupHidden");

    popupText.textContent = "";
    popupImage.src = "";
    popupImage.style.display = "none";
    qrPopupContent.style.display = "none";
}


// ==========================================
// CLOSE BUTTON
// ==========================================

popupClose.addEventListener("click", function () {

    if (typeof stopQRScanner === "function") {

        stopQRScanner();

    }

    closePopup();

});