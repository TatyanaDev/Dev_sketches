import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import path from 'path'
import { Technologies } from './collections/Technologies'
import { Screenshots } from './collections/Screenshots'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [Projects, Technologies, Screenshots, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  cors: ['http://localhost:3000', 'https://tatyanadev-dev-sketches.netlify.app'],
  csrf: ['http://localhost:3000', 'https://tatyanadev-dev-sketches.netlify.app'],
})
