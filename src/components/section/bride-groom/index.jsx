import React from 'react';
import data from '../../../data/config.json';
import { cdn } from '../../../utils/cdn';

export default function Bridegroom() {
  return (
    <div>
      <h2 className="text-lg sm:text-xl leading-6 text-white font-semibold mb-6">
        Bride and Groom
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            src={cdn(data.pegantin.wanita.foto)}
            className="w-full rounded-md object-cover"
            style={{ height: '120px', aspectRatio: '3/4' }}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">
              {data.pegantin.wanita.nama}
            </h4>
            <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
              Putri {data.pegantin.wanita.anak_ke} dari {data.pegantin.wanita.bapak} &amp; Ibu{' '}
              {data.pegantin.wanita.ibu}
            </p>
          </div>
        </div>
        <div>
          <img
            src={cdn(data.pegantin.pria.foto)}
            className="w-full rounded-md object-cover"
            style={{ height: '120px', aspectRatio: '3/4' }}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">
              {data.pegantin.pria.nama}
            </h4>
            <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
              Putra {data.pegantin.pria.anak_ke} dari {data.pegantin.pria.bapak} &amp; Ibu{' '}
              {data.pegantin.pria.ibu}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
