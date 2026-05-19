import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SignUpPage() {
  return (
    <div className="flec-col mt-20 flex flex-1 items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-3xl">Sign Up</CardTitle>
        </CardHeader>
        <AuthForm type="signUp"></AuthForm>
      </Card>
    </div>
  );
}

export default SignUpPage;
