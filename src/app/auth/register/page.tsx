"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { register } from "@/data/actions/register";
import { useActionState, useEffect } from "react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, null);

  useEffect(() => {
    if (state?.success) {
      toast.add({
        title: "Registration successful",
        type: "success",
      });
      window.location.href = "/";
    } else {
      toast.add({
        title: "Error registering",
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
        {isPending ? "Registering…" : "Register"}
      </Button>
    </form>
  );
}
