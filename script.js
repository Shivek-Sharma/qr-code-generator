const formEl = document.getElementById('generate-form');
const qrCodeEl = document.getElementById('qrcode');
const spinner = document.getElementById('spinner');

function onSubmitGenerate(e) {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert("Please enter a URL :)")
    }
    else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qrCodeEl.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
}

function showSpinner() {
    spinner.style.display = 'block';
}

function hideSpinner() {
    spinner.style.display = 'none';
}

function generateQRCode(url, size) {
    //reference -> https://github.com/davidshimjs/qrcodejs

    const newQR = new QRCode(qrCodeEl, {
        text: url,
        width: size,
        height: size
    });
}

function createSaveBtn(saveUrl) {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'QR Code';   //download by the file name
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
}

function clearUI() {
    qrCodeEl.innerHTML = '';

    const saveBtn = document.getElementById('save-link');

    if (saveBtn) {
        saveBtn.remove();
    }
}

//Event Listeners
formEl.addEventListener('submit', onSubmitGenerate);