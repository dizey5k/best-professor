export const emailVerificationCodes: Record<string, string> = {
  "test@edu.spbstu.ru": "123456",
  "user@edu.spbstu.ru": "654321",
  "admin@edu.spbstu.ru": "111222",
};

export const sendVerificationCode = (email: string): boolean => {
  return email in emailVerificationCodes;
};

export const verifyCode = (email: string, code: string): boolean => {
  return emailVerificationCodes[email] === code;
};
