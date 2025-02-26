export const generate2FA = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
};
