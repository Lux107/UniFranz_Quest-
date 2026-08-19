// ==========================================
// PUZZLE DATA
// ==========================================

let foundPieces = [];

const puzzlePieces = document.querySelectorAll(".piece");

const scannerContainer = document.getElementById("scanner");
const scanButton = document.getElementById("scanButton");
const result = document.getElementById("result");
const counter = document.getElementById("counter");

let scanner = null;
let scanning = false;


// ==========================================
// SCAN BUTTON
// ==========================================

scanButton.addEventListener("click", function () {

    // Don't open another camera if one is already open
    if (scanning) {
        return;
    }

    scannerContainer.style.display = "block";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },

        {
            fps: 10,
            qrbox: 250
        },

        onScanSuccess,

        onScanFailure
    );

    scanning = true;

});


// ==========================================
// WHEN QR IS SCANNED
// ==========================================

function onScanSuccess(decodedText) {

    console.log("QR scanned:", decodedText);

    // Stop the camera

    scanner.stop().then(function () {

        scanner.clear();

        scannerContainer.style.display = "none";

        scanning = false;

    });


    // Check which QR code was scanned

    if (decodedText === "CAMPUS_PIECE_01") {

        unlockPiece(0);

    }

    else if (decodedText === "CAMPUS_PIECE_02") {

        unlockPiece(1);

    }

    else if (decodedText === "CAMPUS_PIECE_03") {

        unlockPiece(2);

    }

    else if (decodedText === "CAMPUS_PIECE_04") {

        unlockPiece(3);

    }

    else if (decodedText === "CAMPUS_PIECE_05") {

        unlockPiece(4);

    }

    else if (decodedText === "CAMPUS_PIECE_06") {

        unlockPiece(5);

    }

    else {

        result.textContent = "❌ That's not one of our QR codes!";

    }

}


// ==========================================
// UNLOCK A PIECE
// ==========================================

function unlockPiece(pieceNumber) {

    // Check if this piece was already found

    if (foundPieces.includes(pieceNumber)) {

        result.textContent = "You already found this piece!";

        return;
    }


    // Remember that we found it

    foundPieces.push(pieceNumber);


    // Reveal the image

    puzzlePieces[pieceNumber].textContent = "";

    puzzlePieces[pieceNumber].classList.add("revealed");


    // Update counter

    counter.textContent =
        foundPieces.length + " / 6 pieces found";


    result.textContent =
        "🎉 You found puzzle piece " + (pieceNumber + 1) + "!";


    // Check if the entire puzzle is complete

    if (foundPieces.length === 6) {

        result.textContent =
            "🎉 YOU FOUND ALL 6 PIECES!";

    }

}


// ==========================================
// SCAN FAILURE
// ==========================================

function onScanFailure(error) {

    // Nothing needed here.
    // The scanner keeps looking for a QR code.

}