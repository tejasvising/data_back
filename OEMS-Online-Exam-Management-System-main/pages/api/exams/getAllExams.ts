import { getSession } from "next-auth/client";
import { query } from "../../../lib/databaseQuery/query";
import { getAllExamsQuery } from "../../../lib/graphqlQuery/graphqlQuery";

export default async function getAllExams(req, res) {
  const session = await getSession({ req });
  if (session) {
    const response = await query(getAllExamsQuery());
    return res.status(200).json(response);
  } else {
    return res.status(403).json({
      message:
        "You must be sign in to view the protected content on this page.",
    });
  }
}
