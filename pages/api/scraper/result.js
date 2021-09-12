import withSession from '@/lib/session'
import Provider from '@/models/provider.model'
import httpStatus from 'http-status'
import dbConnect from '@/lib/dbConnect'

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
  const { users } = await req.body
  saveResult(users)
  res.status(httpStatus.OK).end()
})
