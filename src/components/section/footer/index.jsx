import React from 'react';
import data from '../../../data/config.json';

const cdn = (path) => `${data.cdn_base_url}${path}`;

export default function Footer() {
  const { message_line1, message_line2, link_url } = data.footer;

  const content = (
    <div className="mt-8 flex flex-col items-center">
      <p className="text-white text-sm">{message_line1}</p>
      <p className="text-white text-sm">{message_line2}</p>
    </div>
  );

  if (link_url) {
    return (
      <div onClick={() => window.open(link_url, '_blank')} className="cursor-pointer">
        {content}
      </div>
    );
  }

  return <div>{content}</div>;
}
