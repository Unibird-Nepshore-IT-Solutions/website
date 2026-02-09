// src/scripts/emailUs.ts
import { toast } from "sonner";
import { validateEmail } from "@/lib/utils";

const forms = document.querySelectorAll(
  "form[data-email-form]",
) as NodeListOf<HTMLFormElement>;

forms.forEach((form) => {
  const successMessage = form.getAttribute("data-success") || "";
  const failedToSaveEmail = form.getAttribute("data-error-save") || "";
  const formType = form.getAttribute("data-form-type") || "newsletter";
  const emailErrorMessage = form.getAttribute("data-error-email") || "";

  const loadingText = form.getAttribute("data-loading") || "Submitting...";

  const submitButton = form.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email") as string;

    if (!validateEmail(email)) {
      toast.error(emailErrorMessage);
      return;
    }

    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = loadingText;

    try {
      const response = await fetch("/api/save-to-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: email,
          type: formType,
        }),
      });

      if (response.ok) {
        toast.success(successMessage);
        form.reset();
      } else {
        const data = await response.json();
        toast.error(data.error || failedToSaveEmail);
      }
    } catch (error) {
      // Reset button state on error
      toast.error(failedToSaveEmail);
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
});
