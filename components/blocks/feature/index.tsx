import Icon from "@/components/icon";
import { Section as SectionType } from "@/types/blocks/section";

export default function Feature({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-20 md:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-3 text-center">
          <h2 className="mb-3 text-pretty text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
            {section.title}
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground lg:text-lg">
            {section.description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items?.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card"
            >
              {item.icon && (
                <div className="mb-5 flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon name={item.icon} className="size-7 text-primary" />
                </div>
              )}
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
