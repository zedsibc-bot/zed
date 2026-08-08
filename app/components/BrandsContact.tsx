"use client";

import { FormEvent, useEffect, useState } from "react";
import { brands, company } from "@/app/data";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

const units = [
  "pc",
  "set",
  "box",
  "pack",
  "roll",
  "meter",
  "kg",
  "liter",
  "pair",
  "dozen",
];

type Item = {
  itemNumber: string;
  brandModel: string;
  description: string;
  quantity: string;
  unit: string;
};

function initialItem(): Item {
  return {
    itemNumber: "",
    brandModel: "",
    description: "",
    quantity: "1",
    unit: "",
  };
}

const inputClass =
  "mt-2 w-full border border-hairline bg-bg min-h-12 px-4 py-3 text-sm text-ink placeholder:text-muted-faint focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30";

export default function BrandsContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>(() => [initialItem()]);

  function updateItem(index: number, field: keyof Item, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, initialItem()]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    items.forEach((item) => {
      formData.append("Item Number", item.itemNumber.trim());
      formData.append("Brand / Model", item.brandModel.trim());
      formData.append("Description", item.description.trim());
      formData.append("Quantity", item.quantity.trim());
      formData.append("Unit", item.unit.trim());
    });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
      form.reset();
      setItems([initialItem()]);
    } catch (err) {
      console.error("Quote request failed:", err);
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  useEffect(() => {
    if (status !== "success") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStatus("idle");
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [status]);

  return (
    <>
      <section id="contact" className="bg-bg-darker py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">07 / Brands &amp; Contact</span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
          Brands We Supply
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-2">
          Import and authorized supplier of process instrumentation and
          industrial equipment.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          {brands.map((b) => (
            <span
              key={b}
              className="border border-hairline bg-bg px-5 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-muted-2 transition-colors hover:border-gold-deep/50 hover:text-gold-deep"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          <div>
            <span className="label-kicker">Contact Us</span>
            <h3 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Get In Touch
            </h3>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-gold text-ink">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Address</p>
                  <p className="mt-1 text-sm leading-6 text-muted-2">
                    {company.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-gold text-ink">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-1 inline-block text-sm leading-6 text-muted-2 underline-offset-4 hover:text-gold-deep hover:underline"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-gold text-ink">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Phone</p>
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="mt-1 inline-block text-sm leading-6 text-muted-2 underline-offset-4 hover:text-gold-deep hover:underline"
                  >
                    {company.phoneIntl}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 border border-hairline bg-bg p-6">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                Visit Our Store
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                111-A Tandang Sora Ave. corner Roque Drive Extension, Quezon
                City, Philippines.
              </p>
            </div>
          </div>

          <div className="border border-hairline bg-bg p-6 sm:p-8">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              GET A QUOTE
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-2">
              Fill out the form below and we will get back to you with a quote.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullname"
                  className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                >
                  Fullname
                </label>
                <input
                  id="fullname"
                  name="Fullname"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="mt-2 w-full border border-hairline bg-bg min-h-12 px-4 py-3 text-sm text-ink placeholder:text-muted-faint focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"
                    suppressHydrationWarning
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                >
                  Company Name
                </label>
                <input
                  id="company"
                  name="Company Name"
                  type="text"
                  placeholder="Your company"
                  className="mt-2 w-full border border-hairline bg-bg min-h-12 px-4 py-3 text-sm text-ink placeholder:text-muted-faint focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"
                    suppressHydrationWarning
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="Address"
                  type="text"
                  placeholder="Complete address"
                  className="mt-2 w-full border border-hairline bg-bg min-h-12 px-4 py-3 text-sm text-ink placeholder:text-muted-faint focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"
                    suppressHydrationWarning
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                >
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="Contact Number"
                  type="tel"
                  required
                  placeholder="0917 000 0000"
                  className="mt-2 w-full border border-hairline bg-bg min-h-12 px-4 py-3 text-sm text-ink placeholder:text-muted-faint focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"
                    suppressHydrationWarning
                />
              </div>
              <div>
                <label
                  htmlFor="tin"
                  className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                >
                  TIN Number
                </label>
                <input
                  id="tin"
                  name="TIN Number"
                  type="text"
                  placeholder="TIN (optional)"
                  className="mt-2 w-full border border-hairline bg-bg min-h-12 px-4 py-3 text-sm text-ink placeholder:text-muted-faint focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold-deep/30"
                    suppressHydrationWarning
                />
              </div>
              <div className="sm:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="border border-hairline bg-bg-darker p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                        Item {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1 || status === "sending"}
                        className="text-sm font-semibold text-muted-2 transition-colors hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor={`itemNumber-${index}`}
                          className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                        >
                          Item Number
                        </label>
                        <input
                          id={`itemNumber-${index}`}
                          type="text"
                          value={item.itemNumber}
                          onChange={(e) =>
                            updateItem(index, "itemNumber", e.target.value)
                          }
                          placeholder="Item / part number"
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`brandModel-${index}`}
                          className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                        >
                          Brand / Model
                        </label>
                        <input
                          id={`brandModel-${index}`}
                          type="text"
                          value={item.brandModel}
                          onChange={(e) =>
                            updateItem(index, "brandModel", e.target.value)
                          }
                          placeholder="Brand and model"
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor={`description-${index}`}
                          className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                        >
                          Description
                        </label>
                        <textarea
                          id={`description-${index}`}
                          rows={3}
                          required
                          value={item.description}
                          onChange={(e) =>
                            updateItem(index, "description", e.target.value)
                          }
                          placeholder="Describe the item you need"
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`quantity-${index}`}
                          className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                        >
                          Quantity
                        </label>
                        <input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          required
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`unit-${index}`}
                          className="font-heading text-xs font-bold uppercase tracking-wide text-ink"
                        >
                          Unit
                        </label>
                        <input
                          id={`unit-${index}`}
                          type="text"
                          list="unit-options"
                          value={item.unit}
                          onChange={(e) =>
                            updateItem(index, "unit", e.target.value)
                          }
                          placeholder="Select or type a unit"
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={addItem}
                  disabled={status === "sending"}
                  className="min-h-12 w-full border border-hairline bg-bg px-8 py-3 text-sm font-bold uppercase tracking-wide text-muted-2 transition-colors hover:border-gold-deep/50 hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  + Add Item
                </button>
                <datalist id="unit-options">
                  {units.map((u) => (
                    <option key={u} value={u} />
                  ))}
                </datalist>
              </div>

              <div className="sm:col-span-2">
                {error && (
                  <p
                    role="alert"
                    className="mb-4 text-sm font-semibold leading-6 text-red"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="min-h-12 bg-gold px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
                    suppressHydrationWarning
                >
                  {status === "sending" ? "Sending..." : "GET A QUOTE"}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </section>

      {status === "success" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-success-title"
          onClick={() => setStatus("idle")}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-darkest/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-hairline bg-bg p-8 text-center sm:p-10"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold">
              <CheckIcon className="h-8 w-8 text-ink" />
            </span>
            <h3
              id="quote-success-title"
              className="mt-6 font-heading text-2xl font-bold text-ink"
            >
              Quote Request Submitted!
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-2">
              Thank you for your inquiry. We will get back to you with a quote
              as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 min-h-12 bg-gold px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}