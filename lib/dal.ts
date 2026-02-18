import { prisma } from "./prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting user by email", error);

    return null;
  }
};
