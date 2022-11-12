import { AppConfig } from "./config.interface";
const APP_CONFIG: AppConfig = {
    version: "prod-0.1",
    environment: "production",
    apiHost: "https://www.staging-5em2ouy-aw5vt2llgxeou.eu-5.platformsh.site",
    supportedLanguages: {
        "EN": "English",
        "FR": "French"
    },
    mode: 'android',
    defaultLanguage: "EN",
    supabase: {
        anonKey: ''
    },
    sentry: {
        "dsn": "https://7015c3c6c40e475785437ffe6bd1d938@o471806.ingest.sentry.io/5504311"
    }
}
export default APP_CONFIG;