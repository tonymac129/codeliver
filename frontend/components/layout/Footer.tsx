import Link from "next/link";

const linkStyles = "text-blue-500 hover:underline";

function Footer() {
  return (
    <div className="flex flex-col gap-y-10 text-gray-300 text-sm py-15 border-t-2 border-t-gray-700 items-center">
      <div className="flex gap-x-10">
        <span>&copy; {new Date().getFullYear()} Codeliver</span>
        <span>
          Made with ♥️ by{" "}
          <a
            href="https://github.com/tonymac129"
            className={linkStyles}
            target="_blank"
          >
            TonyMac129
          </a>
        </span>
      </div>
      <div className="flex gap-x-5">
        <Link href="/" className={linkStyles}>
          Home
        </Link>
        <Link href="/#features" className={linkStyles}>
          Features
        </Link>
        <Link href="/#about" className={linkStyles}>
          About
        </Link>
        <Link href="/#examples" className={linkStyles}>
          Examples
        </Link>
        <Link href="/#faq" className={linkStyles}>
          FAQ
        </Link>
        <a
          href="https://github.com/tonymac129/codeliver"
          className={linkStyles}
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Footer;
