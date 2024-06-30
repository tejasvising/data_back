import { mutation } from "../../../lib/databaseQuery/query";
import { getUpsertQueryWithEmail } from "../../../lib/graphqlQuery/graphqlQuery";
import { UpsertUserType } from "../../../lib/types/types";

export async function upsertUser({ name, email, imageUrl }: UpsertUserType) {
  const response = await mutation(getUpsertQueryWithEmail(name, email, imageUrl));
  return response?.insert_users_one;
}