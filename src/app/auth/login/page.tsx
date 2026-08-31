"use client";

import { useActionState, useEffect } from "react";

import { login } from "@/data/actions/login";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);

  useEffect(() => {
    console.log(state);
    if (state?.success) {
      toast.add({
        title: "Login successful",
        type: "success",
      });
      window.location.href = "/";
    } else {
      toast.add({
        title: "Error logging in",
        description: state?.message,
        type: "error",
      });
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="email" name="email" placeholder="Email" className="w-64" />
      <input type="password" name="password" placeholder="Password" className="w-64" />

      <Button type="submit" variant="default" disabled={isPending}>
        {isPending ? "Logging in…" : "Login"}
      </Button>
    </form>
  );
}
