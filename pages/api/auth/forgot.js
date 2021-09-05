import withSession from '@/lib/session';
import User from '@/models/user.model';
import httpStatus from 'http-status';
import dbConnect from '@/lib/dbConnect';
import { sendPasswordResetEmail } from '@/lib/mail';
import crypto from 'crypto';

export default withSession(async (req, res) => {
  const { email } = await req.body;
  try {
    await dbConnect();
    // get user from db
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // not found
      return res.status(httpStatus.OK).json({
        message:
          'Si existe el usuario se enviará el correo para recuperar la contarseña.',
      });
    }
    if (user.resetPasswordExpiration) {
      if (new Date().getTime() <= user.resetPasswordExpiration) {
        return res.status(httpStatus.OK).json({
          message:
            'Tiene que esperar 1 hora para volver a solicitar la recuperación de contraseña',
        });
      }
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpiration = Date.now() + 3600000; // 1 hour from now
    await user.save();
    sendPasswordResetEmail(user.resetPasswordToken, user.email);
    return res.json({
      message:
        'Si existe el usuario se enviará el correo para recuperar la contarseña',
    });
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
