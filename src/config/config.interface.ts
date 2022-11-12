type AppPlatform = 'ios' | 'android' | 'web';
interface AppConfig {
    version: string,
    environment: "staging" | "production" | "develop" | "test",
    apiHost: string,
    mode: AppPlatform,
    supportedLanguages: Partial<{
        EN: 'English',
        FR: "French"
    }>,
    defaultLanguage: "EN" | "FR",
    supabase: {
        anonKey: string;
    },
    sentry: {
        dsn: string
    }
}

export { AppConfig, AppPlatform };