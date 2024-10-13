import { auth } from "./auth";

export const requireUser = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session;
};

export const generateRandomCode = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};
