import withSession from '@/lib/session'
import Provider from '@/models/provider.model'
import httpStatus from 'http-status'
import dbConnect from '@/lib/dbConnect'

import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
)

async function saveResult(users) {
  if (!users) return
  try {
    await dbConnect()
    for (const user of users) {
      const { nit, result } = user
      Provider.updateOne(
        { nit: nit },
        { $push: { taxes: { status: result } } },
      ).exec()
    }
  } catch (error) {
    console.log(error)
  }
}

export default withSession(async (req, res) => {
  // Run cors
  await cors(req, res);
  const { users } = await req.body
  saveResult(users)
  res.status(httpStatus.OK).end()
})
