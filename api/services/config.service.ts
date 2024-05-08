const botClientId = process.env.DISCORD_BOT_CLIENT_ID || ""
const botClientSecret = process.env.DISCORD_BOT_CLIENT_SECRET || ""
const botClientToken = process.env.DISCORD_BOT_CLIENT_TOKEN || ""
const openaiApiKey = process.env.OPENAI_API_KEY || ""
const vercelBackendUrl = process.env.VERCEL_API_ENDPOINT || ""
const jwtSecret = process.env.JWT_SECRET || ""

export const config = {
  discord: {
    clientId: botClientId,
    clientSecret: botClientSecret,
    clientToken: botClientToken
  },
  openai: {
    apiKey: openaiApiKey
  },
  vercel: {
    backendUrl: vercelBackendUrl
  }
}

export function configLazy() {
  const botClientId = process.env.DISCORD_BOT_CLIENT_ID || ""
  const botClientSecret = process.env.DISCORD_BOT_CLIENT_SECRET || ""
  const botClientToken = process.env.DISCORD_BOT_CLIENT_TOKEN || ""
  const openaiApiKey = process.env.OPENAI_API_KEY || ""
  const vercelBackendUrl = process.env.VERCEL_API_ENDPOINT || ""
  const jwtSecret = process.env.JWT_SECRET || ""

  return {
    discord: {
      clientId: botClientId,
      clientSecret: botClientSecret,
      clientToken: botClientToken
    },
    openai: {
      apiKey: openaiApiKey
    },
    vercel: {
      backendUrl: vercelBackendUrl
    },
    app: {
      jwtSecret
    }
  }
}