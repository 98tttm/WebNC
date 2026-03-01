const crypto = require('crypto');

const partnerCode = "MOMOBKUN20180529";
const accessKey = "klm05TvNCyPjzKEM";
const secretKey = "at67qH6mk8g5i1peWA11nZnAXkZk8pE8";

const orderInfo = "PayWithMoMo";
const amount = "50000";
const orderId = partnerCode + new Date().getTime();
const requestId = orderId;
const redirectUrl = "http://localhost:53864/payment-result";
const ipnUrl = "https://callback.url/notify";
const requestType = "captureWallet";
const extraData = "";

const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

const requestBody = {
    partnerCode: partnerCode,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: 'vi',
    requestType: requestType,
    extraData: extraData,
    signature: signature
};

console.log("Raw Signature:\n", rawSignature);
console.log("JSON Payload:\n", JSON.stringify(requestBody, null, 2));

const axios = require('axios');
axios.post("https://test-payment.momo.vn/v2/gateway/api/create", requestBody)
    .then(res => console.log("Success:", res.data))
    .catch(err => {
        if (err.response) {
            console.log("Error:", JSON.stringify(err.response.data, null, 2));
        } else {
            console.log("Error:", err.message);
        }
    });
