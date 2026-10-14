"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button/Button";

type ContactCopy = {
  name: string;
  email: string;
  message: string;
  submit: string;
  pendingNotice: string;
  nameError: string;
  emailError: string;
  messageError: string;
  locationLabel: string;
  phoneLabel: string;
  hoursLabel: string;
};

type ContactPlace = {
  street: string;
  city: string;
  phone: string;
  hours: string;
};

type ContactFormProps = {
  contact: ContactCopy;
  place: ContactPlace;
};

const isValidEmail = (value: string) => {
  const atIndex = value.indexOf("@");
  if (atIndex === -1) {
    return false;
  }
  return value.indexOf(".", atIndex) !== -1;
};

const fieldClassName =
  "w-full rounded-sm border border-hairline bg-canvas px-3 py-2 text-ivory placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]";

const errorClassName = "text-sm text-ivory";

const ContactForm = ({ contact, place }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [pendingNotice, setPendingNotice] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPendingNotice(null);

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const nextNameError = trimmedName.length === 0 ? contact.nameError : null;
    const nextEmailError = isValidEmail(email) ? null : contact.emailError;
    const nextMessageError =
      trimmedMessage.length === 0 ? contact.messageError : null;

    setNameError(nextNameError);
    setEmailError(nextEmailError);
    setMessageError(nextMessageError);

    if (nextNameError || nextEmailError || nextMessageError) {
      return;
    }

    setPendingNotice(contact.pendingNotice);
  };

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name">{contact.name}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClassName}
            aria-invalid={nameError !== null}
            aria-describedby={nameError ? "contact-name-error" : undefined}
          />
          {nameError ? (
            <p id="contact-name-error" className={errorClassName}>
              {nameError}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email">{contact.email}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
            aria-invalid={emailError !== null}
            aria-describedby={emailError ? "contact-email-error" : undefined}
          />
          {emailError ? (
            <p id="contact-email-error" className={errorClassName}>
              {emailError}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message">{contact.message}</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={fieldClassName}
            aria-invalid={messageError !== null}
            aria-describedby={
              messageError ? "contact-message-error" : undefined
            }
          />
          {messageError ? (
            <p id="contact-message-error" className={errorClassName}>
              {messageError}
            </p>
          ) : null}
        </div>
        <div>
          <Button type="submit">{contact.submit}</Button>
        </div>
        {pendingNotice ? (
          <p className="text-muted" role="status">{pendingNotice}</p>
        ) : null}
      </form>
      <address className="flex flex-col gap-6 not-italic text-muted">
        <div>
          <span className="block text-sm text-ivory">
            {contact.locationLabel}
          </span>
          <span className="block">{place.street}</span>
          <span className="block">{place.city}</span>
        </div>
        <div>
          <span className="block text-sm text-ivory">{contact.phoneLabel}</span>
          <a
            href={`tel:${place.phone.replace(/\s/g, "")}`}
            className="hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
          >
            {place.phone}
          </a>
        </div>
        <div>
          <span className="block text-sm text-ivory">{contact.hoursLabel}</span>
          <span className="block">{place.hours}</span>
        </div>
      </address>
    </div>
  );
};

export default ContactForm;
