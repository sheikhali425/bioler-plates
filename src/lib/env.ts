const required = ['VITE_APP_NAME', 'VITE_API_URL'] as const

type RequiredEnv = (typeof required)[number]

function readEnv(): Record<RequiredEnv, string> {
  const values = {} as Record<RequiredEnv, string>

  for (const key of required) {
    const value = import.meta.env[key]
    if (!value) {
      throw new Error(`Missing required env var: ${key}`)
    }
    values[key] = value
  }

  return values
}

const raw = readEnv()

export const env = {
  appName: raw.VITE_APP_NAME,
  apiUrl: raw.VITE_API_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
