const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3002;
const morgan = require("morgan")
app.use(morgan("combined"))
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
// Add this line to serve our index.html page
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
const cors = require("cors")
app.use(cors())
app.get("/image/:id", cors(), (req, res) => {
    id = req.params["id"]
    console.log('upload/' + id)
    res.sendFile(__dirname + '/upload/' + id);
})
app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);
    // All good
    res.sendStatus(200);
});
const crypto = require('crypto');
const axios = require('axios');

// MoMo Payment config (Test environment)
// Note: These should be valid test credentials from MoMo. We use common public sandbox ones.
const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"; // Exact key from official SDK
const moMoPaymentUrl = "https://test-payment.momo.vn/v2/gateway/api/create";

app.post('/payment/momo', async (req, res) => {
    // Generate an order ID
    const orderInfo = "PayWithMoMo";
    const amount = "50000";
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const redirectUrl = "http://localhost:53864/payment-result";
    const ipnUrl = "https://callback.url/notify"; // Typically this needs to be a public IP/domain
    const requestType = "payWithATM";
    const extraData = "";

    // Create raw signature exactly as Momo expects
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Create signature using HMAC SHA256
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    console.log("-------------------");
    console.log("Raw Signature Sent:", rawSignature);
    console.log("Signature Hash:", signature);
    console.log("-------------------");

    const requestBody = {
        partnerCode: partnerCode,
        accessKey: accessKey, // Added because official example needs it
        requestId: requestId,
        amount: Number(amount),
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: 'vi',
        requestType: requestType,
        extraData: extraData,
        signature: signature
    };

    try {
        const response = await axios.post(moMoPaymentUrl, requestBody);
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            console.error("MoMo payment error response data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("MoMo payment error message:", error.message);
        }
        res.status(500).json({ error: "Failed to create MoMo payment", details: error.response?.data || error.message });
    }
});

app.post('/payment/momo/ipn', (req, res) => {
    console.log("MoMo IPN Callback received:", req.body);
    // Usually, you should verify the signature here to ensure the request is from MoMo
    res.status(200).json({ status: "success" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
