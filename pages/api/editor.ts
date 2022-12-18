import path from 'path'
import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { markdown } = req.body

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'config')
  //Write the json data file data.json
  const content = { markdown }

  try {
    const _json = JSON.stringify(content, null, 4)
    await fs.writeFile(jsonDirectory + '/data.json', _json)
    //Return the content of the data file in json format
    res.status(200).json({ message: 'Successfuly updated !' })
  } catch (err: any) {
    res.status(500).json({ message: 'Error while updating content.' })
  }
}
