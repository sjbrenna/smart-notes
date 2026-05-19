import AuthForm from "@/components/AuthForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginPage() {
  return (
    <div className="flec-col mt-20 flex flex-1 items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-3xl">Login</CardTitle>
          <CardDescription>Enter your login information</CardDescription>
        </CardHeader>
        <AuthForm type="login"></AuthForm>
      </Card>
    </div>
  );
}

export default LoginPage;
