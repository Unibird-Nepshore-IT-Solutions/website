// src/scripts/contactUs.ts
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
    const response = await fetch("/api/save-to-sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: phone,
        type: "contact",
        countryCode: countryCode,
      }),
    });

    if (response.ok) {
      toast.success(successMessage);
      form.reset();
    } else {
      const data = await response.json();
      toast.error(data.error || failedToSavePhone);
    }
  } catch (error) {
    toast.error(failedToSavePhone);
  }
});
