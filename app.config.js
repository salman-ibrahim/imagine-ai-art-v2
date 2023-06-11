export default () => ({
  expo: {
    name: "Imagine - AI Art",
    slug: "imagine-ai-art",
    version: "3.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#222B45"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.gamearina.imagine",
      buildNumber: "1.0.0",
      supportsTablet: true,
    },
    android: {
      package: "com.gamearina.imagine",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.gamearina.imagine",
      versionCode: 10,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#222B45"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "608f609f-2f34-48bd-b9b7-2d93027bb216"
      },
      API_BASE_URL: process.env.API_BASE_URL,
      PREDICTION_MODEL_STABLE_DIFFUSION_URL: process.env.PREDICTION_MODEL_STABLE_DIFFUSION_URL,
      STABILITY_AI_API_KEY: process.env.STABILITY_AI_API_KEY,
      PREDICTION_MODEL_STABILITY_AI_BASE_URL: process.env.PREDICTION_MODEL_STABILITY_AI_BASE_URL,
      PUBLIC_GOOGLE_SDK_KEY: process.env.PUBLIC_GOOGLE_SDK_KEY,
    }
  }
})
