import React from 'react';
import data from '../../../data/config.json';
import { useGuestName } from '../../../hooks/useGuestName';

const cdn = (path) => `${data.cdn_base_url}${path}`;

export default function TitleInfo() {
  const guestName = useGuestName();
  return (
    <div className="space-y-1">
      <div className="flex gap-2 items-center">
        <img src="/favicon.ico" alt="logo" width={18} height={18} />
        <span className="text-[#A3A1A1] text-base mt-0.5 tracking-widest">
          DOCUMENTER
        </span>
      </div>
      <h2 className="text-lg sm:text-xl leading-6 text-white font-semibold">
        {data.pegantin.pria.panggilan} &amp; {data.pegantin.wanita.panggilan}:
        Sebelum Hari H
      </h2>
      <div className="text-[#A3A1A1] text-sm">
        Kepada: <span className="text-white font-medium">{guestName}</span>
      </div>
      <div className="flex flex-wrap gap-2 items-center text-sm">
        <span className="text-green-500">100% Match</span>
        <span className="bg-[#4D4D4D] text-white px-2 py-0.5 rounded text-xs">
          SU
        </span>
        <span className="text-white">
          {data.tanggal_pernikahan.split('-')[0]}
        </span>
        <span className="text-white">1h 12m</span>
        <span className="text-white">•</span>
        <span className="text-white">3 min read</span>
        <div className="flex items-center gap-1">
          <img src={cdn(data.images.icon_4k)} width={14} height={14} alt="4k" />
          <img src={cdn(data.images.icon_hd)} width={14} height={14} alt="hd" />
        </div>
      </div>
      <div className="bg-[#E50913] py-2 px-2 rounded text-base text-white font-bold w-fit">
        Coming soon, {data.tanggal_pernikahan}
      </div>
      <div className="pt-7">
        <p className="text-white text-base leading-relaxed mb-3">
          {data.intro}
        </p>
        <p className="text-[#A3A1A1] text-base leading-relaxed">
          {data.ayat}
        </p>
      </div>
    </div>
  );
}
