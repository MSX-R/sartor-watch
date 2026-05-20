# Sartor Mobile — installation (Health Connect)

## Pourquoi pas Expo Go ?

Health Connect est un module **natif Android**. Expo Go ne l’inclut pas → il faut un **development build** (APK de dev avec `expo-dev-client`).

## Prérequis

- Node 20+ (idéalement **≥ 20.19.4** pour éviter les avertissements RN 0.81)
- **JDK 17+** pour Gradle Android (AGP 8) — **pas Java 11** ; sous Windows voir **`ANDROID_STUDIO_WINDOWS.md`** (config Gradle JDK dans Android Studio + option Temurin 17)
- Android Studio ou téléphone Android en USB debug
- App **Health Connect** (Play Store) si Android &lt; 14
- API web Sartor accessible sur le même Wi‑Fi (`EXPO_PUBLIC_API_URL`)

## Installation

```bash
cd apps/sartor-mobile
cp .env.example .env
# Éditer EXPO_PUBLIC_API_URL=http://VOTRE_IP:3000/api

npm install
# Le script postinstall applique `patches/` (correctif expo-dev-menu ↔ ReactActivityHandler).

npm run prebuild:android   # une fois
npm run android            # compile + installe sur l’appareil
npm run dev                # Metro pour le dev client
```

## Sur le téléphone

1. Ouvrir **Sartor Watch** (icône de dev, pas Expo Go).
2. Se connecter (`test@sartor.app` / `admin123` ou votre compte).
3. **Sources** → **Autoriser l’accès** Health Connect.
4. Dans Mi Fitness / Garmin / etc. : activer la synchro vers **Health Connect**.
5. **Today** → **Synchroniser (Health Connect)**.

## Dépannage

| Problème | Solution |
|----------|----------|
| `HC : dev build requis` | Relancer via `npm run android`, pas Expo Go |
| `Aucune donnée HC` | Vérifier permissions HC + données du jour dans l’app Mi Fitness |
| Erreur réseau API | IP dans `.env`, firewall, `npm run dev` sur sartor-web |
| `Android Gradle plugin requires Java 17` | Suivre **`ANDROID_STUDIO_WINDOWS.md`** : JDK Temurin 17 + **Gradle JDK** dans Android Studio ; éventuellement `org.gradle.java.home` dans `android/gradle.properties` |
| `onDidCreateReactActivityDelegateNotification overrides nothing` | Relancer `npm install` pour réappliquer les patches (`patches/expo-dev-menu+55.0.30.patch`) |
