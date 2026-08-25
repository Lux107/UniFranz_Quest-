// ==========================================
// QR SYSTEM
// ==========================================

const qrButton = document.getElementById("qrButton");

let qrScanner = null;
let qrScanning = false;


// ==========================================
// PUZZLE CODES
// ==========================================

const puzzleCodes = [
    "A7K9M2QX",
    "X7R2K8QM",
    "W2P9L6XC"
];

// ==========================================
// FOUND CODES
// ==========================================

let foundCodes = [];


// ==========================================
// OPEN QR CAMERA
// ==========================================

qrButton.addEventListener("click", function () {

    console.log("QR button pressed");

    if (qrScanning) {
        return;
    }

    showQRPopup();

    qrScanner = new Html5Qrcode("qrReader");

    qrScanner.start(
        { facingMode: "environment" },

        {
            fps: 10,
            qrbox: 200
        },

        onQRScan,

        onQRScanFailure

    ).then(function () {

        qrScanning = true;

        console.log("Camera started");

    }).catch(function (error) {

        console.error("Camera error:", error);

        // Reset scanner
        qrScanner = null;
        qrScanning = false;

        // Close QR popup
        closePopup();

        // Small delay so the first popup fully closes
        setTimeout(function () {

            showTextPopup(
                "No se pudo abrir la cámara.\n\n" +
                "Por favor, revisa los permisos de la cámara."
            );

        }, 100);

    });

});


// ==========================================
// QR FOUND
// ==========================================

function onQRScan(decodedText) {

    console.log("QR FOUND:", decodedText);

    stopQRScanner();

    checkCode(decodedText);

}


// ==========================================
// CHECK CODE
// ==========================================

function checkCode(code) {


    // Find which puzzle code was scanned
    const codeIndex = puzzleCodes.indexOf(code);

    // ======================================
    // WRONG CODE
    // ======================================

    if (codeIndex === -1) {

        showTextPopup(
            "❌ ¡Inténtalo de nuevo!\n\n" +
            "Este código QR no es correcto."
        );

        return;
    }


    // ======================================
    // ALREADY FOUND
    // ======================================

    if (foundCodes.includes(codeIndex)) {

        showTextPopup(
            "⚠️ ¡Ya encontraste este código!\n\n" +
            "Busca otro código QR."
        );

        return;
    }


    // ======================================
    // CORRECT CODE
    // ======================================

    foundCodes.push(codeIndex);

    revealCode(codeIndex);

    showTextPopup(
        "🎉 ¡Muy bien!\n\n" +
        "Has desbloqueado " +
        foundCodes.length +
        "/3 códigos.\n\n" +
        "¡Sigue buscando!"
    );

    // ======================================
    // ALL CODES FOUND
    // ======================================

    if (foundCodes.length === 3) {

        showTextPopup(
            "🎉 ¡FELICIDADES!\n\n" +
            "¡Encontraste los 3 códigos!\n\n" +
            "¡Completaste el desafío!"
        );

    }

}



// ==========================================
// REVEAL CODE
// ==========================================

function revealCode(codeIndex) {

    const codeSlot = document.getElementById(
        "code" + (codeIndex + 1)
    );

    codeSlot.textContent = puzzleCodes[codeIndex];

    console.log(
        "Code revealed:",
        puzzleCodes[codeIndex]
    );

}

// ==========================================
// STOP CAMERA
// ==========================================

function stopQRScanner() {

    if (!qrScanner) {
        return;
    }

    qrScanner.stop().then(function () {

        qrScanner.clear();
        closePopup();

        qrScanner = null;

        qrScanning = false;

        console.log("Camera stopped");

    }).catch(function (error) {

        console.error("Error stopping camera:", error);

        qrScanner = null;

        qrScanning = false;

    });

}


// ==========================================
// SCAN FAILURE
// ==========================================

function onQRScanFailure(error) {

    // Scanner is simply still looking.
}No se pudo abrir la cámara.