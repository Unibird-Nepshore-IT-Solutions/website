import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useRef } from "react";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";

interface CarouselCompProps {
  id: number;
  clientName: string;
  testimonial: string;
  clientCompany: string;
  clientProfile: string;
  clientPosition: string;
}

export const CarouselComp = ({ slides }: { slides: CarouselCompProps[] }) => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, playOnInit: true })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const totalSlides = slides.length;

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
        align: "center",
      }}
      className="w-full"
      plugins={[plugin.current]}
    >
      <CarouselContent className="flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === current;

          return (
            <CarouselItem
              key={slide.id}
              className="basis-2/3 md:basis-1/2 pl-4"
            >
              <div
                className={`relative transition-all duration-500 ${
                  isActive
                    ? "scale-100 opacity-100 z-10"
                    : "scale-90 opacity-80 blur-xs"
                }`}
              >
                <div className="p-8">
                  <div className="flex justify-center mb-4">
                    <img
                      width={48}
                      height={48}
                      alt="Quote"
                      className="text-sm"
                      src="/assets/svgs/quote.svg"
                    />
                  </div>
                  <p className="text-secondary-text text-center leading-relaxed">
                    {slide.testimonial}
                  </p>
                  <div className="mt-6 text-center">
                    <img
                      width={48}
                      height={48}
                      alt={slide.clientName}
                      src={slide.clientProfile}
                      className="text-sm mx-auto rounded-full size-12"
                    />
                    <p className="font-bold text-[20px]">{slide.clientName}</p>
                    <p className="text-sm text-secondary-text">
                      {slide.clientPosition}, {slide.clientCompany}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = index === current;
          return (
            <div
              key={index}
              className={`h-0.5 w-8 bg-muted ${
                isActive && "bg-secondary w-14"
              } transition-all duration-500`}
            ></div>
          );
        })}
      </div>
    </Carousel>
  );
};
