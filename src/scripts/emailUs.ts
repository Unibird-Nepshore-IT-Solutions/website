import { toast } from "sonner";
import { validateEmail } from "@/lib/utils";

const form = document.querySelector("#email-us-form") as HTMLFormElement;

if (form) {
  const successMessage = form.getAttribute("data-success") || "";
  const emailErrorMessage = form.getAttribute("data-error-email") || "";
  const failedToSaveEmail = form.getAttribute("data-error-save") || "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email") as string;

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
        form.reset();
      } else {
        toast.error(failedToSaveEmail);
      }
    } catch (error) {
      toast.error(failedToSaveEmail);
    }
  });
}
