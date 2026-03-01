const crypto = require('crypto');
const axios = require('axios');

async function testMoMo() {
    const partnerCode = "MOMOBKUN20180529";
    const accessKey = "klm05TvNCyPjzKEM";
    const secretKey = "at67qH6mk8g5i1peWA11nZnAXkZk8pE8";

    // parameters
    const amount = "50000";
    const orderInfo = "pay with MoMo";
    const redirectUrl = "http://localhost:53864/payment-result";
    const ipnUrl = "https://callback.url/notify";
    const requestType = "captureWallet";
    const extraData = "";

    // Generate an order ID
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;

    // Create raw signature
    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

    // Create signature using HMAC SHA256
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = {
        partnerCode: partnerCode,
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

    console.log("Raw:", rawSignature);
    try {
        const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
        console.log("Success:", response.data);
    } catch (error) {
        console.log("Error:", JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

testMoMo();
