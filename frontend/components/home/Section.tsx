interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div
      className="pt-20 flex flex-col gap-y-5 items-center w-[70%] mx-[15%]"
      id={title.toLowerCase()}
    >
      <h1 className="text-white text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

export default Section;
