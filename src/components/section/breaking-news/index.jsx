import React from 'react';
import data from '../../../data/config.json';
import { useGuestName } from '../../../hooks/useGuestName';

const cdn = (path) => `${data.cdn_base_url}${path}`;

export default function BreakingNews() {
  const guestName = useGuestName();
  const defaultName = data.default_guest_name || 'Temanku <3';
  return (
    <div>
      <h2 className="text-lg sm:text-xl leading-6 text-white font-semibold mb-6">Letter From Us</h2>
      <img
        className="w-full rounded-md object-cover"
        style={{
          aspectRatio: '16/9',
          objectPosition: 'center top',
          height: '400px',
        }}
        src={cdn(data.breaking_news_img)}
      />
      <div className="text-[#A3A1A1] text-sm sm:text-base italic leading-relaxed mt-4">
        <div className="space-y-3">
          <p>Halo <span className="text-white font-medium">{guestName}</span>!</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.breaking_news_content.replace(
                /Bapak\/Ibu\/Saudara\/Saudari/g,
                guestName === defaultName ? 'Bapak/Ibu/Saudara/Saudari' : 'kamu'
              ),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
