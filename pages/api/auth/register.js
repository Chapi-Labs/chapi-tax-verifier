import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import Organization from "@/models/organization.model";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import withSession from "@/lib/session";

export default withSession(async (req, res) => {
  const { organization, name, email, password } = await req.body;
  try {
    if (req.method === "POST" && organization && name && email && password) {
      await dbConnect();
      const userCheck = await User.findOne({ email: email.toLowerCase() });
      if (userCheck) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "El usuario ya existe" });
      }
      // create user
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        name,
        email,
        password: hashPassword,
        role: "admin",
      });
      const org = new Organization({ name: organization });
      const organizationSaved = await org.save();
      user.organization = organizationSaved;
      user.role = "admin";
      await user.save();
      req.session.set("user", {
        id: user._id,
        email: user.email,
        role: user.role,
        organization: user.organization,
      });
      await req.session.save();
      return res.status(httpStatus.OK).json({ success: true });
    }
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid parameters" });
  } catch (error) {
    console.log(error, error.message);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.message);
  }
});
