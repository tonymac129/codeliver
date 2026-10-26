import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Section from "@/components/home/Section";
import Faq from "@/components/home/Faq";
import Footer from "@/components/layout/Footer";
import Btn from "@/components/ui/Btn";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return session ? (
    <div className="flex flex-col py-10 gap-y-3 items-center">
      <h1 className="text-blue-500 font-extrabold text-2xl">
        Welcome to Codeliver!
      </h1>
      <Link href="/chat" className="text-blue-500 hover:underline">
        Go to chat
      </Link>
    </div>
  ) : (
    <>
      <div className="flex flex-col items-center gap-y-5 pt-30 pb-10">
        <h1 className="text-6xl text-blue-600 font-extrabold">Codeliver</h1>
        <p className="text-gray-700 dark:text-gray-300 w-[50%] text-center">
          Sharing code, chatting, and collaborating made easy
        </p>
        <div className="flex gap-x-5">
          <Btn text="Try now" link="/login" primary />
          <Btn text="Learn more" link="/#features" />
          <Btn
            text="Source code"
            link="https://github.com/tonymac129/codeliver"
          />
        </div>
      </div>
      <div className="flex flex-col px-30 pb-15">
        <Section title="Features">
          <div className="flex gap-x-20 py-3 items-center w-full">
            <div className="flex-1">
              <Image
                src="/placeholder.png"
                alt="Placeholder image"
                width={500}
                height={500}
                className="rounded w-full"
              />
            </div>
            <ul className="text-gray-700 dark:text-gray-300 list-disc flex-1 flex flex-col gap-y-2">
              <li>Real-time chat and direct messenging</li>
              <li>Create, edit, browse, and join different channels</li>
              <li>
                Upload files, format messages, customize your profile, and
                change chat settings
              </li>
              <li>Syntax highlighting for code snippets and blocks</li>
              <li>Supports both light and dark modes and responsive design</li>
            </ul>
          </div>
        </Section>
        <Section title="About">
          <div className="flex gap-x-20 py-3 items-center w-full">
            <p className="text-gray-700 dark:text-gray-300 flex-1">
              Codeliver is an online real-time chat platform made for developers
              to easily share syntax-highlighted code snippets, link GitHub
              repositories, and communicate and collaborate with each other.
              Discuss different topics and invite your team to different
              channels or directly chat with another person through direct
              messenging.
            </p>
            <div className="flex-1">
              <Image
                src="/placeholder.png"
                alt="Placeholder image"
                width={500}
                height={500}
                className="rounded w-full"
              />
            </div>
          </div>
        </Section>
        <Section title="Examples">
          <div className="flex gap-x-20 py-3 items-center w-full">
            <div className="flex-1 flex flex-col gap-y-3 text-gray-700 dark:text-gray-300 items-center">
              <Image
                src="/placeholder.png"
                alt="Placeholder image"
                width={500}
                height={500}
                className="rounded w-full"
              />
              Example 1
            </div>
            <div className="flex-1 flex flex-col gap-y-3 text-gray-700 dark:text-gray-300 items-center">
              <Image
                src="/placeholder.png"
                alt="Placeholder image"
                width={500}
                height={500}
                className="rounded w-full"
              />
              Example 2
            </div>
          </div>
        </Section>
        <Section title="FAQ">
          <Faq />
        </Section>
      </div>
      <Footer />
    </>
  );
}
