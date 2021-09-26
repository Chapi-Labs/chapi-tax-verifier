import withSession from "@/lib/session";
import Provider from "@/models/provider.model";
import httpStatus from "http-status";
import dbConnect from "@/lib/dbConnect";

export default withSession(async (req, res) => {
  try {
    await dbConnect();
    const user = req.session.get("user");
    console.log(user.organization);
    const providers = await Provider.list(user.organization);
    console.log(providers);
    return res.json({ providers });
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
