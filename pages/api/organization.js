import withSession from "@/lib/session";
import organizationModel from "@/models/organization.model";
import httpStatus from "http-status";
import dbConnect from "@/lib/dbConnect";

export default withSession(async (req, res) => {
  try {
    await dbConnect();
    const organizations = await organizationModel.list();
    return res.json({ organizations });
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res
      .status(fetchResponse?.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json(error.data);
  }
});
