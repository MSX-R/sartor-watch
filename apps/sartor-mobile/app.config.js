/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  expo: {
    name: "Sartor Watch",
    slug: "sartor-mobile",
    version: "1.0.0",
    scheme: "sartor",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#0f172a",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sartor.watch",
    },
    android: {
      package: "com.sartor.watch",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0f172a",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-dev-client",
      "expo-health-connect",
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 36,
            targetSdkVersion: 36,
            minSdkVersion: 26,
          },
        },
      ],
    ],
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.44:3000/api",
    },
  },
};
