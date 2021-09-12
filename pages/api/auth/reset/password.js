import withSession from '@/lib/session';
import User from '@/models/user.model';
import httpStatus from 'http-status';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';

export default withSession(async (req, res) => {
  const { token, password } = await req.body;
  try {
    await dbConnect();
    // get user from db
    const user = await User.findOne({
      resetPasswordToken: token,
    });
    if (!user) {
      // not found
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Token Inválido',
      });
    }
    // create user
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiration = null;
    await user.save();
    req.session.set('user', { id: user._id, email: user.email });
    await req.session.save();
    return res.status(httpStatus.OK).end();
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
