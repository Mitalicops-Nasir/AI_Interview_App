"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";

import { toast } from "sonner";
import TheFormFields from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { SignIn, SignUp } from "@/lib/actions/auth.actions";
import { auth } from "@/firebase/client";


const authFormScheme = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormScheme(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      if (type === "sign-up") {
        // Sign up logic here

        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await SignUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else if (type === "sign-in") {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Invalid credentials, please try again.");
          return;
        }

        await SignIn({
          email,
          idToken,
        });

        toast.success("Sign in is successful.");
        router.push("/");
        // Sign in logic here
      }
    
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong, please try again later.");
    }
    
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" width={38} height={32} alt="logo" />
          <h2 className="text-primary-100">PrepInterview</h2>
        </div>

        <h3 className="text-xl font-bold text-center">
          Practice job interviews with AI
        </h3>

        <div className="px-9">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-4 form"
            >
              {!isSignIn && (
                <>
                  <TheFormFields
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="John Doe"
                  />
                  <TheFormFields
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="JohnDoe@gmail.com"
                  />

                  <TheFormFields
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="********"
                  />
                </>
              )}

              {isSignIn && (
                <>
                  <TheFormFields
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="JohnDoe@gmail.com"
                  />
                  <TheFormFields
                    control={form.control}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="********"
                  />
                </>
              )}

              <Button type="submit" className="btn">
                {type === "sign-in" ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-5">
            {isSignIn ? "No Account Yet?" : "Have an account already?"}{" "}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="font-bold text-use-primary ml-1"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
