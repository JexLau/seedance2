import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HappyUsers from "./happy-users";
import HeroBg from "./bg";
import { Hero as HeroType } from "@/types/blocks/hero";
import Icon from "@/components/icon";
import Link from "next/link";

export default function Hero({ hero }: { hero: HeroType }) {
  if (hero.disabled) {
    return null;
  }

  const highlightText = hero.highlight_text;
  let texts = null;
  if (highlightText) {
    texts = hero.title?.split(highlightText, 2);
  }

  return (
    <>
      <HeroBg />
      <section className="py-20 md:py-32">
        <div className="container">
          {hero.show_badge && (
            <div className="flex items-center justify-center mb-8">
              <img
                src="/imgs/badges/phdaily.svg"
                alt="phdaily"
                className="h-10 object-cover"
              />
            </div>
          )}
          <div className="text-center">
            {hero.announcement && (
              <a
                href={hero.announcement.url}
                className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/20"
              >
                {hero.announcement.label && (
                  <Badge className="bg-primary/20 text-primary border-0 rounded-full px-3">
                    {hero.announcement.label}
                  </Badge>
                )}
                <span className="text-muted-foreground">{hero.announcement.title}</span>
              </a>
            )}

            {texts && texts.length > 1 ? (
              <h1 className="mx-auto mb-6 mt-6 max-w-4xl text-balance text-4xl font-bold tracking-tight lg:mb-8 lg:text-6xl xl:text-7xl">
                {texts[0]}
                <span className="bg-gradient-to-r from-primary via-primary-50 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {highlightText}
                </span>
                {texts[1]}
              </h1>
            ) : (
              <h1 className="mx-auto mb-6 mt-6 max-w-4xl text-balance text-4xl font-bold tracking-tight lg:mb-8 lg:text-6xl xl:text-7xl">
                {hero.title}
              </h1>
            )}

            <p
              className="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hero.description || "" }}
            />
            {hero.buttons && (
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                {hero.buttons.map((item, i) => {
                  return (
                    <Link
                      key={i}
                      href={item.url || ""}
                      target={item.target || ""}
                      className="flex items-center"
                    >
                      <Button
                        className="w-full min-w-[180px]"
                        size="lg"
                        variant={item.variant || "default"}
                      >
                        {item.title}
                        {item.icon && (
                          <Icon name={item.icon} className="ml-2" />
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
            {hero.tip && (
              <p className="mt-6 text-sm text-muted-foreground/70">{hero.tip}</p>
            )}
            {hero.show_happy_users && <HappyUsers />}
          </div>
        </div>
      </section>
    </>
  );
}
