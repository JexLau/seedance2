"use client";

import { ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState, useRef, memo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section as SectionType, SectionItem } from "@/types/blocks/section";

interface VideoCardProps {
  item: SectionItem;
}

const VideoCard = memo(function VideoCard({ item }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.video_url) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !isPlaying) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-card/50 p-5 cursor-pointer backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl relative">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition-transform duration-300 group-hover:scale-[1.02]">
              {item.video_url ? (
                <>
                  <video
                    ref={videoRef}
                    src={item.video_url}
                    poster={item.image?.src}
                    className="h-full w-full object-cover object-center rounded-xl"
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                  />
                  {/* Video controls overlay */}
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 rounded-xl ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/90 hover:bg-white size-11"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <Pause className="size-5 text-black" />
                        ) : (
                          <Play className="size-5 text-black ml-0.5" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/90 hover:bg-white size-11"
                        onClick={handleMuteToggle}
                      >
                        {isMuted ? (
                          <VolumeX className="size-5 text-black" />
                        ) : (
                          <Volume2 className="size-5 text-black" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {/* Video indicator badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-sm rounded-lg">
                      <Play className="size-3 mr-1.5" />
                      Video
                    </Badge>
                  </div>
                </>
              ) : (
                <img
                  src={item.image?.src}
                  alt={item.image?.alt || item.title}
                  className="h-full w-full object-cover object-center rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {item.label && (
        <div className="mt-5">
          <Badge className="bg-primary/20 text-primary border-0 rounded-lg">{item.label}</Badge>
        </div>
      )}
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-semibold md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-xl">
        {item.title}
      </div>
      <div className="mb-2 line-clamp-2 text-sm text-muted-foreground md:mb-2 md:text-base lg:mb-2 leading-relaxed">
        {item.description}
      </div>
    </div>
  );
});

export default function Showcase({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id={section.name} className="py-20 md:py-24">
      <div className="container">
        <div className="mb-10 flex items-end justify-between md:mb-14 lg:mb-16">
          <div>
            <h2 className="mb-3 text-pretty text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-muted-foreground text-lg max-w-2xl">
                {section.description}
              </p>
            )}
          </div>
          <div className="shrink-0 gap-2 hidden md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto rounded-xl border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto rounded-xl border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="container ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
            {section.items?.map((item, i) => (
              <CarouselItem
                key={i}
                className="max-w-[320px] pl-[20px] lg:max-w-[400px]"
              >
                <VideoCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
