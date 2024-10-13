import { requireUser } from "@/app/lib/hooks";
import AuthForm from "@/components/auth-form";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await requireUser();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="grid items-center justify-center flex-1">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
