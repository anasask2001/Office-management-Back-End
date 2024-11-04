import otp from "otp-generator";

const generateOtp = () => otp.generate(6, {
    digits: true,
    alphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
});

export default generateOtp;
