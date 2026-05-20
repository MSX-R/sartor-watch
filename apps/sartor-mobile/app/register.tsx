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
import { register } from "../src/services/auth.service";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await register(email.trim(), password, name.trim() || undefined);
      router.replace("/(tabs)");
    } catch {
      setError("Impossible de créer le compte (email déjà utilisé ?)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Prénom (optionnel)"
        placeholderTextColor={theme.muted}
      />
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
        placeholder="Mot de passe (6+ caractères)"
        placeholderTextColor={theme.muted}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.bg} />
        ) : (
          <Text style={styles.buttonText}>S’inscrire</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
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
  title: { color: theme.text, fontSize: 28, fontWeight: "700", marginBottom: theme.spacing.lg },
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
