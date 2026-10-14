import Link from "next/link";
import { getMessages } from "@/messages/sr";

const NotFound = () => {
  const { notFound } = getMessages();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 px-gutter py-16">
      <h1 className="font-display text-section-title text-ivory">
        {notFound.title}
      </h1>
      <p className="text-muted">{notFound.body}</p>
      <Link
        href="/"
        className="rounded-sm text-ivory underline underline-offset-4 hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
      >
        {notFound.home}
      </Link>
    </div>
  );
};

export default NotFound;
