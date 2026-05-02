import { Redirect } from "expo-router";

export default function LegacyOnboardingLoginRoute() {
  return <Redirect href={{ pathname: "/(auth)/login", params: { mode: "login" } }} />;
}
