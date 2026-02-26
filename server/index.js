import express from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const MONGO_URI =
  'mongodb+srv://arjunreddypreethi1999_db_user:HS5IOT3QQrCDyINL@portfolio.vyoa1cm.mongodb.net/?appName=Portfolio&tls=true&tlsAllowInvalidCertificates=true'

let db = null

async function connectDB() {
  const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: false,
    },
    tls: true,
    tlsAllowInvalidCertificates: true,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  })
  await client.connect()
  db = client.db('portfolio')
  console.log('✅ Connected to MongoDB Atlas')
}

// POST /api/visitors  — save visitor name
app.post('/api/visitors', async (req, res) => {
  try {
    const { name } = req.body

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required' })
    }

    const trimmed = name.trim()

    if (trimmed.length < 2 || trimmed.length > 30) {
      return res
        .status(400)
        .json({ error: 'Name must be between 2 and 30 characters' })
    }

    if (!/^[A-Za-z][A-Za-z\s'\-]*[A-Za-z]$/.test(trimmed) && trimmed.length > 1) {
      return res
        .status(400)
        .json({ error: 'Please enter a valid name (letters, spaces, hyphens only)' })
    }

    const lowerName = trimmed.toLowerCase().replace(/[\s'\-]/g, '')
    const keyboardPatterns = ['qwerty', 'asdfgh', 'zxcvbn', 'qazwsx', 'abcdef']
    if (keyboardPatterns.some((p) => lowerName.includes(p))) {
      return res.status(400).json({ error: 'Please enter your real name' })
    }

    if (/^(.)\1+$/.test(lowerName)) {
      return res.status(400).json({ error: 'Please enter a valid name' })
    }

    if (!/[aeiou]/i.test(lowerName)) {
      return res.status(400).json({ error: 'Please enter a valid name' })
    }

    // Best-effort DB write — don't fail the request if DB is unavailable
    if (db) {
      await db.collection('visitors').insertOne({
        name: trimmed,
        visitedAt: new Date(),
        userAgent: req.headers['user-agent'] || '',
      })
    } else {
      console.warn('⚠️  DB not connected — visitor name not persisted:', trimmed)
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Error saving visitor:', err)
    // Still return success so the user flow isn't blocked
    res.json({ success: true })
  }
})

// GET /api/drive-photos — fetch photo list from public Google Drive folder
const PORT = process.env.PORT || 3001

// Start HTTP server immediately — independent of DB connection
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})

// Connect to DB in background — server stays up even if this fails
connectDB().catch((err) => {
  console.error('⚠️  MongoDB connection failed:', err.message)
  console.error('   → Fix: Atlas › Network Access → Add 0.0.0.0/0 (Allow from anywhere)')
})
