import { toast } from "sonner";
import { validatePhone } from "@/lib/utils";

const form = document.querySelector("#contact-form") as HTMLFormElement;

const successMessage = form.getAttribute("data-success") || "";
const phoneErrorMessage = form.getAttribute("data-error-phone") || "";
const failedToSavePhone = form.getAttribute("data-error-save") || "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const phone = formData.get("phone") as string;
  const countryCode = formData.get("country_code") as string;

  if (!validatePhone(phone)) {
    toast.error(phoneErrorMessage);
    return;
  }

  try {
    const response = await fetch("/api/save-email-to-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `${countryCode}${phone}` }),
    });

    if (response.ok) {
      toast.success(successMessage);
      form.reset();
    } else {
      toast.error(failedToSavePhone);
    }
  } catch (error) {
    toast.error(failedToSavePhone);
  }
});
