# Sartor Mobile

Application React Native (Expo SDK 54) pour Sartor Watch.

## Prérequis

- Node.js ≥ 20.19.4 (recommandé)
- [Expo Go 54](https://expo.dev/go) sur le téléphone (même version majeure que le SDK)

## Installation

Ce projet est **isolé** du workspace npm web (évite les conflits React 19.1 vs 19.2).

```bash
cd apps/sartor-mobile
npm install
```

## Lancer l’app

Depuis la racine :

```bash
npm run dev:mobile
```

Ou depuis ce dossier :

```bash
npm run dev
# puis scanner le QR code avec Expo Go
```

Après une modification des deps, relancer avec cache vide :

```bash
npx expo start --clear
```

Cache Metro :

```bash
npx expo start --clear
```

## Backend

`sartor-web` tourne séparément (`npm run dev:web`). Sur appareil physique, utiliser l’IP LAN du PC, pas `localhost`.

## Stack actuelle

- Expo SDK 54
- Expo Router
- TypeScript
- StyleSheet (pas de NativeWind pour l’instant)
