import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { theme } from "../src/constants/theme";
import { login } from "../src/services/auth.service";

export default function LoginScreen() {
  const [email, setEmail] = useState("test@sartor.app");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(email.trim(), password);
      router.replace("/(tabs)");
    } catch {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sartor Watch</Text>
      <Text style={styles.subtitle}>Connexion</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor={theme.muted}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Mot de passe"
        placeholderTextColor={theme.muted}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.bg} />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/register")}>
        <Text style={styles.link}>Créer un compte</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
  title: { color: theme.text, fontSize: 32, fontWeight: "700" },
  subtitle: { color: theme.muted, marginBottom: theme.spacing.lg, marginTop: 8 },
  input: {
    backgroundColor: theme.card,
    color: theme.text,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: theme.bg, fontWeight: "700", fontSize: 16 },
  error: { color: theme.error, marginBottom: 8 },
  link: { color: theme.accent, textAlign: "center", marginTop: 20 },
});
