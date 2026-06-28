import { auth } from "./config/auth";

// helper function to get user id
export const getUserId = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
};
