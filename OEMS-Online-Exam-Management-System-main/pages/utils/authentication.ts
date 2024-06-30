import { signIn, signOut } from "next-auth/client";

export const logOut = () => {
  signOut({ callbackUrl: "http://localhost:3000/" });
};

export const logIn = () => {
  signIn("google", { callbackUrl: "http://localhost:3000/home" });
};
