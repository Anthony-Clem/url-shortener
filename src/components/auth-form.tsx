import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/app/lib/auth";

const AuthForm = () => {
  return (
    <Card className="max-w-[300px] w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async () => {
            "use server";

            await signIn("google");
          }}
        >
          <Button
            className="space-x-4 w-full"
            variant="secondary"
            size="lg"
            type="submit"
          >
            <FcGoogle size={20} />
            <p>Sign in with Google</p>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
