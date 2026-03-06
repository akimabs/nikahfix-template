import React from 'react';
import data from '../../../data/config.json';
import { cdn } from '../../../utils/cdn';

const LoveItem = ({ imageUrl, title, duration, description }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            className="w-[715px] rounded-lg object-cover aspect-video"
            style={{
              objectPosition: 'center 20%',
            }}
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-white text-xl font-medium mb-2 leading-tight">{title}</h3>
          <p className="text-sm text-gray-400">{duration}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default function LoveStory() {
  return (
    <div>
      <h2 className="text-lg sm:text-xl leading-6 text-white font-semibold mb-8">
        Our Love Story
      </h2>
      <div className="space-y-8">
        {data.love_story.map((item, index) => (
          <LoveItem
            key={index}
            imageUrl={cdn(item.image)}
            title={item.title}
            duration={item.duration}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
