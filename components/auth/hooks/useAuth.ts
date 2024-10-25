import HTTP from "@/library/API/HTTP";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  async function onRegister(payload: object) {
    console.log({ payload });
    const { result, error } = await HTTP.post("/users/register", payload);
    if (result) {
      console.log({ result });
      router.push("/auth/login");
    } else if (error) {
      console.log({ error });
    }
  }

  async function onLogin(payload: object) {
    console.log({ payload });
    const { result, error } = await HTTP.post("/auth/login", payload);
    if (result) {
      console.log({ result });
      document.cookie = `token=${result.token}; path=/; SameSite=Strict`;

      const tokenPayload = JSON.parse(atob(result.token.split(".")[1]));
      console.log(tokenPayload);
      const userRole = tokenPayload.role;

      if (userRole !== "admin") {
        router.push("/");
      }

      router.push("/admin");
    } else if (error) {
      console.log({ error });
    }
  }

  return {
    onRegister,
    onLogin,
  };
}
