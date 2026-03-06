import { useEffect, useState, useRef } from "react";
import { useGuestName } from "../../../hooks/useGuestName";
import data from "../../../data/config.json";
import { cdn } from '../../../utils/cdn';

export default function UserWatch({ onClick }) {
  const guestName = useGuestName();
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Set loaded state after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={bannerRef}
      className={`py-10 text-center space-y-28 relative overflow-hidden transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* Background parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Logo with subtle parallax */}
      <img
        className="mx-auto scale-110 relative z-10 transition-opacity duration-300"
        src={cdn(data.images.logo)}
        width={"125px"}
        height={"48px"}
        alt={data.meta.site_name}
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />

      <div className="relative z-10">
        {/* Title with subtle parallax */}
        <p
          className="mb-10 text-2xl"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        >
          Who's Watching?
        </p>

        {/* Guest icon - no parallax for stability */}
        <div onClick={onClick} className="group cursor-pointer">
          <img
            className="mx-auto group-hover:scale-125 transition-transform duration-300"
            src={cdn(data.images.guest_icon)}
            width={100}
            height={100}
            alt={data.meta.site_name}
          />
          <p className="text-xl mt-2 group-hover:scale-125 group-hover:pt-5 transition-all duration-300">
            <span className="transition-opacity duration-200">{guestName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
