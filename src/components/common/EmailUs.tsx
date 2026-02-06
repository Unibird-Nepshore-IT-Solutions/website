import { toast } from "sonner";
import { useState } from "react";

import { Button } from "../ui/button";
import { validateEmail } from "@/lib/utils";

interface Props {
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
  emailErrorMessage: string;
  failedToSaveEmail: string;
}
export const EmailUs = ({
  placeholder,
  buttonLabel,
  successMessage,
  emailErrorMessage,
  failedToSaveEmail,
}: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error(emailErrorMessage);
      return;
    }

    try {
      const response = await fetch("/api/save-email-to-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: email }),
      });

      if (response.ok) {
        toast.success(successMessage);
        setEmail("");
      } else {
        toast.error(failedToSaveEmail);
      }
    } catch (error) {
      toast.error(failedToSaveEmail);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 animate-fade-in delay-200"
    >
      <div className="h-14 w-full group">
        <input
          required
          type="email"
          value={email}
          placeholder={placeholder}
          onChange={(e) => setEmail(e.target.value)}
          className="px-5 border border-border w-full h-full bg-background transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-base group-hover:shadow-sm"
        />
      </div>
      <Button
        type="submit"
        className="rounded-none px-8 py-4 h-14 w-full sm:w-auto bg-primary hover:bg-primary-dark text-primary-foreground font-semibold text-base shadow-lg hover:shadow-primary/30 transition-all duration-300"
      >
        {buttonLabel}
      </Button>
    </form>
  );
};
