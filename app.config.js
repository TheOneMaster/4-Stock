
const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "4 Stock (Dev)" : "4 Stock",
  slug: "4-stock",
  version: "0.6.7",
  orientation: "portrait",
  icon: "./assets/final/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/final/icon.png",
    resizeMode: "contain",
    backgroundColor: "#2C8F60"
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/6d316582-6f1f-4542-8040-5be355f164db"
  },
  assetBundlePatterns: [
    "**/*",
    "assets/fonts/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? "com.theonemaster.4stock.dev" : "com.theonemaster.4stock"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/final/adaptive-icon.png",
      backgroundColor: "#2C8F60"
    },
    package: IS_DEV ? "com.theonemaster.four_stock.dev" : "com.theonemaster.four_stock",
    versionCode: 1,
    softwareKeyboardLayoutMode: "pan"
  },
  web: {
    "favicon": "./assets/favicon.png"
  },
  jsEngine: "hermes",
  extra: {
    eas: {
      projectId: "6d316582-6f1f-4542-8040-5be355f164db"
    }
  },
  runtimeVersion: {
    policy: "sdkVersion"
  },
  sdkVersion: "47.0.0",
  platforms: [
    "ios",
    "android"
  ],
  currentFullName: "@theonemaster/4-stock",
  originalFullName: "@theonemaster/4-stock"
}
