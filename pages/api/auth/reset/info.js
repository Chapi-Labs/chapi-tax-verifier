import withSession from '@/lib/session';
import User from '@/models/user.model';
import httpStatus from 'http-status';
import dbConnect from '@/lib/dbConnect';

export default withSession(async (req, res) => {
  const { token } = await req.body;
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
    return res.json({
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
