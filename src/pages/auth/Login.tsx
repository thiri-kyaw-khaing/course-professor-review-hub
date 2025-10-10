import { LoginForm } from "@/components/page-components/auth/Login-form";

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <main className="w-full max-w-sm">
        <LoginForm />
      </main>
    </div>
  );
}
