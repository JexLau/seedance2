"use client";

import { ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section as SectionType, SectionItem } from "@/types/blocks/section";

interface VideoCardProps {
  item: SectionItem;
}

function VideoCard({ item }: VideoCardProps) {
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
      className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl relative">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              {item.video_url ? (
                <>
                  <video
                    ref={videoRef}
                    src={item.video_url}
                    poster={item.image?.src}
                    className="h-full w-full object-cover object-center"
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                  />
                  {/* Video controls overlay */}
                  <div
                    className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/90 hover:bg-white"
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
                        className="rounded-full bg-white/90 hover:bg-white"
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
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      <Play className="size-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                </>
              ) : (
                <img
                  src={item.image?.src}
                  alt={item.image?.alt || item.title}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {item.label && (
        <div className="mt-6">
          <Badge>{item.label}</Badge>
        </div>
      )}
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
        {item.title}
      </div>
      <div className="mb-2 line-clamp-2 text-sm text-muted-foreground md:mb-2 md:text-base lg:mb-2">
        {item.description}
      </div>
    </div>
  );
}

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
    <section id={section.name} className="py-16">
      <div className="container">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div>
            <h2 className="mb-2 text-pretty text-3xl font-bold lg:text-4xl">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-muted-foreground text-lg">
                {section.description}
              </p>
            )}
          </div>
          <div className="shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
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
