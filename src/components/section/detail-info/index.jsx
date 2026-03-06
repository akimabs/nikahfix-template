import React, { useState, Suspense, lazy } from 'react';
import TitleInfo from '../title-info';
import BreakingNews from '../breaking-news';
import Bridegroom from '../bride-groom';
import Gift from '../gift';
import data from '../../../data/config.json';
import { cdn } from '../../../utils/cdn';

// Lazy load heavy components
const LoveStory = lazy(() => import('../love-story'));
const WishSection = lazy(() => import('../wish'));
const Footer = lazy(() => import('../footer'));
const SongButton = lazy(() => import('../../ui/song-button'));

export default function DetailInfo() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="space-y-5 pb-10">
      <div className="w-full overflow-hidden relative pt-8" style={{ aspectRatio: '16/9' }}>
        <img
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            objectPosition: 'center 20%',
            transform: 'scale(1.3)',
          }}
          src={cdn(data.images.cover)}
          alt="Wedding Preview"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
      </div>
      <div className="px-4 space-y-8">
        <TitleInfo />
        {data.show_menu.breaking_news && <BreakingNews />}
        {data.show_menu.bride_and_groom && <Bridegroom />}
        {data.show_menu.love_story && (
          <Suspense fallback={<div className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>}>
            <LoveStory />
          </Suspense>
        )}
        <Gift />
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl leading-6 text-white font-semibold mb-4">Event Location</h2>
          <div className="relative rounded-lg overflow-hidden">
            <iframe
              src={data.location.map_embed_url}
              className="w-full h-64 sm:h-80 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-row gap-3 items-center justify-between">
            <div className="text-left">
              <h3 className="text-white font-medium text-base">{data.location.place_name}</h3>
              <p className="text-gray-400 text-sm">{data.location.address}</p>
            </div>
            <a
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
              href={data.location.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </a>
          </div>
        </div>
        {data.show_menu.wish && import.meta.env.VITE_APP_TABLE_NAME ? (
          <Suspense fallback={<div className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>}>
            <WishSection />
          </Suspense>
        ) : null}
      </div>
      <Suspense fallback={<div className="h-16 bg-gray-800 animate-pulse"></div>}>
        <Footer />
      </Suspense>
      <Suspense fallback={<div className="h-12 bg-gray-800 animate-pulse rounded-lg"></div>}>
        <SongButton />
      </Suspense>
    </div>
  );
}
