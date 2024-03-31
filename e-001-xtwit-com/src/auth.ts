import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "cookie";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  /**
   * [auth][error] UntrustedHost: Host must be trusted.
   * URL was: http://localhost:3000/api/auth/session .Read more at https://errors.authjs.dev#untrustedhost
   *
   * 1. https://github.com/nextauthjs/next-auth/discussions/6071
   *
   * .env 파일
   * AUTH_TRUST_HOST=http://localhost:3000
   * 또는
   *
   * 2. https://github.com/nextauthjs/next-auth/issues/6113
   *
   * auth.ts
   * trustHost: true,
   *  */
  trustHost: true,
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );

        let setCookie = authResponse.headers.get("Set-Cookie");
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
