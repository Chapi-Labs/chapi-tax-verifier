import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import withSession from '@/lib/session';

export default withSession(async (req, res) => {
  const { name, email, password } = await req.body;
  console.log('no pasa 1');
  try {
    if (req.method === 'POST') {
      console.log('no pasa 2');
      await dbConnect();
      console.log('no pasa');
      // create user
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        name,
        email,
        password: hashPassword,
      });
      console.log('pasa');
      await user.save();
      req.session.set('user', user);
      await req.session.save();
      return res.status(httpStatus.OK).end();
    } else {
      return res.status(httpStatus.BAD_REQUEST).end();
    }
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
