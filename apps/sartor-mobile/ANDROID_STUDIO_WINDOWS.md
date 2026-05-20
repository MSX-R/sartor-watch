# Android Studio / Gradle sous Windows — erreurs fréquentes

## Erreur : « Android Gradle plugin requires Java 17 » / « You are currently using Java 11 »

Le projet utilise **Android Gradle Plugin 8.x** : la JVM qui exécute **Gradle** doit être **JDK 17 ou 21**, pas Java 11.

Sur votre machine, `java -version` pointe souvent vers :

`C:\Program Files\Microsoft\jdk-11.0.xx-hotspot`

Tant que **Android Studio** et la **console** utilisent ce JDK, la sync Gradle et `assembleDebug` échouent.

### Étape A — Installer un JDK 17 (recommandé : Eclipse Temurin)

1. Télécharger **Temurin 17 LTS** (MSI, **JDK**) :  
   https://adoptium.net/temurin/releases/?version=17&os=windows&arch=x64&package=jdk  
2. Installer avec l’option qui ajoute au PATH si proposée (facultatif).

Après installation, un chemin typique est :

`C:\Program Files\Eclipse Adoptium\jdk-17.*.*.*-hotspot`

(Vérifiez le dossier exact dans l’explorateur.)

### Étape B — Android Studio : Gradle doit utiliser ce JDK

1. Ouvrir le dossier : **`apps/sartor-mobile/android`** (pas seulement la racine du monorepo).
2. **File → Settings** (ou **Android Studio → Settings** sur macOS).
3. **Build, Execution, Deployment → Build Tools → Gradle**.
4. **Gradle JDK** : choisir **JDK 17** (Temurin ou **Embedded JDK** si votre Studio propose déjà **jbr 17+**).
5. **Apply → OK**.
6. **File → Invalidate Caches → Invalidate and Restart** si la sync reste bloquée.

Sans cette étape, Studio peut continuer à lancer Gradle avec Java 11 même si Temurin est installé.

### Étape C — Terminal Git Bash / `npm run android`

Les variables globales peuvent encore forcer Java 11. Avant `npm run android` :

```bash
export JAVA_HOME="/c/Program Files/Eclipse Adoptium/jdk-17.0.13.11-hotspot"
export PATH="$JAVA_HOME/bin:$PATH"
java -version   # doit afficher 17 ou 21
```

Adaptez le chemin au dossier réel sous `Eclipse Adoptium`.

### Étape D — Forcer Gradle via `gradle.properties` (optionnel)

Si besoin, dans **`android/gradle.properties`**, vous pouvez décommenter et adapter :

```properties
org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.13.11-hotspot
```

(Sous Windows, utilisez des **`\\`** ou **`/`** dans le chemin.)

Ou définissez la même propriété dans **`%USERPROFILE%\.gradle\gradle.properties`** pour tous vos projets.

---

## Sync OK mais pas d’APK : `app-debug.apk` introuvable

Tant que le build Gradle échoue (Java 11), aucun APK n’est produit dans :

`android/app/build/outputs/apk/debug/app-debug.apk`

Corriger le JDK puis relancer **Build → Make Project** ou `npm run android`.

---

## `compileSdk` / SDK Platform

Le projet vise **API 36**. Dans Android Studio :

**Tools → SDK Manager → SDK Platforms** : installez **Android API 36** (et **Android SDK Build-Tools 36** si demandé).

Après changement dans `app.config.js` (`expo-build-properties`), un :

```bash
npx expo prebuild --platform android --clean
```

regénère `android/` avec les bonnes versions (attention : écrase des fichiers natifs personnalisés ; sauvegarde si vous aviez modifié à la main).

---

## Patch `expo-dev-menu`

Après **`npm install`**, `patch-package` réapplique `patches/expo-dev-menu+55.0.30.patch`.  
Si vous voyez encore **`onDidCreateReactActivityDelegateNotification overrides nothing`**, relancez :

```bash
cd apps/sartor-mobile
npm install
```

---

## Appareil `offline` (ADB)

Déverrouiller le téléphone, réautoriser le débogage USB, puis :

```bash
adb kill-server
adb start-server
adb devices
```
