import { useState } from "react";
import data from "../../../data/config.json";

const cdn = (path) => `${data.cdn_base_url}${path}`;

export default function Gift() {
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const banks = data.bank_accounts;

  // Add easter egg card at the end
  const banksWithEasterEgg = [
    ...banks,
    {
      bank_name: "💝 Terima Kasih!",
      account_number: "Sudah mau berbagi kebahagiaan bersama kami",
      account_holder: "",
    },
  ];

  const visibleCards = banksWithEasterEgg.slice(currentIndex, currentIndex + 3);

  // Bank-specific colors
  const bankColors = {
    "Bank BSI": { from: "#00AA13", to: "#006B0D" }, // BSI Green
    "Bank BCA": { from: "#003D7A", to: "#002952" }, // BCA Blue
    "Bank Hijra": { from: "#0693e3", to: "#8ed1fc" }, // Hijra Blue Soft
  };

  // Background images for cards — from config
  const backgroundImages = data.images.card_backgrounds.map(cdn);

  const getBankColor = (bankName) => {
    return bankColors[bankName] || { from: "#DC2626", to: "#991B1B" };
  };

  const getBackgroundImage = (index) => {
    // First card uses letter image, others use story/card images
    if (index === 0) {
      return cdn(data.images.letter);
    }
    return backgroundImages[(index - 1) % backgroundImages.length];
  };

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const diffX = clientX - startPos.x;
    const diffY = clientY - startPos.y;

    // Only allow horizontal swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Prevent default to stop vertical scroll
      if (e.cancelable) {
        e.preventDefault();
      }
      setDragOffset({
        x: diffX,
        y: 0, // Don't allow vertical movement
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Reduced threshold from 100 to 50 for easier swipe
    // Both left and right swipe go to next card
    if (Math.abs(dragOffset.x) > 50) {
      if (currentIndex < banksWithEasterEgg.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="text-white py-8 overflow-x-hidden">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Pilih hadiah yang pas buat kami</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Doa dan restu tanpa batas
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Dukungan untuk perjalanan baru kami
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Kebahagiaan yang terjamin selamanya
            </li>
          </ul>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative h-[400px] mb-6 px-2">
          {visibleCards.map((bank, index) => {
            const isTop = index === 0;
            const scale = 1 - index * 0.05;
            const yOffset = index * 10;
            // Alternate offset with larger values for better visibility
            const xOffset = index === 0 ? 0 : index % 2 === 0 ? 30 : -30;
            const rotation = isTop && isDragging ? dragOffset.x * 0.1 : 0;
            const opacity = 1 - index * 0.15; // Less opacity reduction for better visibility

            return (
              <div
                key={`${bank.bank_name}-${currentIndex + index}`}
                className={`absolute inset-0 transition-all duration-300 ${isTop ? "cursor-grab active:cursor-grabbing z-30" : "pointer-events-none"
                  }`}
                style={{
                  transform: `
                    translateX(${isTop ? dragOffset.x : xOffset}px)
                    translateY(${isTop ? dragOffset.y + yOffset : yOffset}px)
                    rotate(${rotation}deg)
                    scale(${scale})
                  `,
                  opacity: opacity,
                  transition: isDragging && isTop ? "none" : "all 0.3s ease-out",
                  zIndex: 30 - index,
                }}
                onMouseDown={isTop ? handleDragStart : undefined}
                onMouseMove={isTop ? handleDragMove : undefined}
                onMouseUp={isTop ? handleDragEnd : undefined}
                onMouseLeave={isTop ? handleDragEnd : undefined}
                onTouchStart={isTop ? handleDragStart : undefined}
                onTouchMove={isTop ? handleDragMove : undefined}
                onTouchEnd={isTop ? handleDragEnd : undefined}
              >
                <div className="relative group h-full">
                  {/* Border effect with bank-specific colors */}
                  <div
                    className="absolute -inset-0.5 rounded-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-tilt"
                    style={{
                      background: `linear-gradient(to right, ${getBankColor(bank.bank_name).from}, ${getBankColor(bank.bank_name).to
                        })`,
                    }}
                  ></div>

                  <div className="relative bg-[#141414] rounded-xl p-6 border border-gray-800 h-full flex flex-col overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${getBackgroundImage(currentIndex + index)})`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/85"></div>

                    {/* Badge - stays at top right */}
                    {currentIndex !== 5 && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl z-20">
                        PALING POPULER
                      </div>
                    )}

                    {/* Content - pushed down */}
                    <div className="relative z-10 mt-16">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-white">{bank.bank_name}</h3>
                        <p className="text-gray-400 text-sm">{bank.account_holder}</p>
                      </div>

                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-2xl font-bold text-white tracking-wider">{bank.account_number}</span>
                      </div>
                      {currentIndex !== 5 && (
                        <div className="mt-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(bank.account_number);
                            }}
                            className={`w-full py-3 px-4 rounded font-medium transition-all duration-200 ${copied ? "bg-green-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                              }`}
                          >
                            {copied ? "Tersalin!" : "Salin Nomor"}
                          </button>

                          <p className="text-xs text-center text-gray-500 mt-3">Swipe untuk lihat bank lain</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Sebelumnya
          </button>

          <button
            onClick={() => currentIndex < banksWithEasterEgg.length - 1 && setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex >= banksWithEasterEgg.length - 1}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Selanjutnya
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
