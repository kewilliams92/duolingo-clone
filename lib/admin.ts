import { auth } from "@clerk/nextjs";

const allowedIds = ["user_2eH5IyZwywHu50IEdBPJVYJ8nTb"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};
