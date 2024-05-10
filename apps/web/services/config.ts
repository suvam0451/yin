const botClientId = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID || ""
const botClientSecret = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_SECRET || ""
const botClientToken = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_TOKEN || ""
const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ""
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || ""

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
    backendUrl
  }
}

export function configLazy() {
  const botClientId = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID || ""
  const botClientSecret = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_SECRET || ""
  const botClientToken = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_TOKEN || ""
  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ""
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || ""

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
      backendUrl: backendUrl
    }
  }
}