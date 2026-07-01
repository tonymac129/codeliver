import Section from "@/components/home/Section";
import Faq from "@/components/home/Faq";
import Footer from "@/components/layout/Footer";
import Btn from "@/components/ui/Btn";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-5 pt-30 pb-10">
        <h1 className="text-6xl text-blue-600 font-extrabold">Codeliver</h1>
        <p className="text-gray-300 w-[50%] text-center">
          Sharing code, chatting, and collaborating made easy
        </p>
        <div className="flex gap-x-5">
          <Btn text="Try now" link="/login" primary />
          <Btn text="Learn more" link="/#features" />
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
            <ul className="text-gray-300 list-disc flex-1">
              <li>Cool feature 1</li>
              <li>Cool feature 2</li>
              <li>Cool feature 3</li>
              <li>Cool feature 4</li>
              <li>Cool feature 5</li>
            </ul>
          </div>
        </Section>
        <Section title="About">
          <div className="flex gap-x-20 py-3 items-center w-full">
            <p className="text-gray-300 flex-1">
              More about Codeliver. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eveniet voluptates nam ullam ducimus et, dolorum
              odit, aut blanditiis perferendis quisquam porro. Quod officiis,
              earum voluptatum natus delectus rerum magnam enim.
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
            <div className="flex-1 flex flex-col gap-y-3 text-gray-300 items-center">
              <Image
                src="/placeholder.png"
                alt="Placeholder image"
                width={500}
                height={500}
                className="rounded w-full"
              />
              Example 1
            </div>
            <div className="flex-1 flex flex-col gap-y-3 text-gray-300 items-center">
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
