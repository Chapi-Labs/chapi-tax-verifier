import withSession from "@/lib/session";
import Provider from "@/models/provider.model";
import httpStatus from "http-status";
import dbConnect from "@/lib/dbConnect";

export default withSession(async (req, res) => {
  const { name, nit } = req.body;
  try {
    await dbConnect();
    const user = req.session.get("user");
    const providerCheck = await Provider.findOne({
      nit: nit.toLowerCase(),
      organization: user.organization,
    });
    if (providerCheck) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "El proveedor ya existe en la organización" });
    }

    const provider = new Provider({
      name,
      nit,
      organization: user.organization,
    });
    await provider.save();
    return res.json({ provider });
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
