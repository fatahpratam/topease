export function generateOtp(length = 6) {
  const str = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * str.length);
    otp += str.charAt(index);
  }

  return otp;
}