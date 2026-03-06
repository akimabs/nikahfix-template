import React, { useEffect } from 'react';
import DetailInfo from '../detail-info';
import data from '../../../data/config.json';
import { cdn } from '../../../utils/cdn';

const TagItem = ({ title }) => {
  return (
    <li className="bg-[#4D4D4D] py-1 px-2 rounded-xl text-xs text-white">
      {title}
    </li>
  );
};

export default function Thumbnail() {
  const [isOpenDetail, setIsOpenDetail] = React.useState(false);

  useEffect(() => {
    const scrollThreshold = 1; // minimum scroll distance in pixels

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsOpenDetail(true);
      }
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch && touch.clientY < -scrollThreshold) {
        setIsOpenDetail(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (isOpenDetail) {
    return <DetailInfo />;
  }
  return (
    <div
      style={{
        backgroundImage: `url(${cdn(data.images.thumbnail)})`,
      }}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-end mb-10"
    >
      <div className="pb-10 pt-2 bg-gradient-to-b from-transparent via-black/50 to-black/90">
        <div className="px-5 mb-10 space-y-2">
          <img
            src={cdn(data.images.logo)}
            alt={data.meta.site_name}
            width={56}
            height={15}
            className="transition-opacity duration-300"
            loading="eager"
          />
          <div>
            <h1 className="font-bold text-3xl leading-none">
              {data.pegantin.pria.panggilan} & {data.pegantin.wanita.panggilan}:{' '}
              <br />
              Sebelum Hari H
            </h1>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 items-center text-sm">
              <span className="bg-[#E50913] text-xs text-white rounded px-2 py-1">
                Coming Soon
              </span>
              <span className="text-white">{data.tanggal_pernikahan}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">3 min read</span>
            </div>
          </div>
          <div>
            <ul className="flex gap-2 items-center">
              <TagItem title="#romantic" />
              <TagItem title="#getmarried" />
              <TagItem title="#family" />
              <TagItem title="#documenter" />
            </ul>
          </div>
        </div>
        <div className="w-full text-center mb-10">
          <button
            onClick={() => setIsOpenDetail(true)}
            className="uppercase w-full text-xl font-semibold"
          >
            See The Detail
          </button>
          <button className="rotate-180" onClick={() => setIsOpenDetail(true)}>
            <svg
              className="w-6 h-6 mx-auto mb-2 animate-bounce "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
