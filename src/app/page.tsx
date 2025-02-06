"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (session.status === "authenticated") {
    console.log(session.data);
  }
  const handleGoogleSignIn = async () => {
    const res = await signIn("google");
    console.log(res);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {session.data ? (
          session.data.user ? (
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-2xl font-bold">{session.data.user.name}</h1>
              <p className="text-sm text-gray-500">{session.data.user.email}</p>
            </div>
          ) : (
            <p className="text-red-600">No user found</p>
          )
        ) : (
          <p className="text-red-600">No session found</p>
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {session.data && session.data.user ? (
            <p className="text-sm text-gray-500">
              You are signed in as {session.data.user.email}
            </p>
          ) : (
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGoogleSignIn}
            >
              Google Sign In
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
