import React, { forwardRef, useEffect, useRef, useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import badwords from 'indonesian-badwords';
import { useGuestName } from '../../../hooks/useGuestName';
import config from '../../../data/config.json';

const cdn = (path) => `${config.cdn_base_url}${path}`;
// Dynamic import for confetti to reduce initial bundle size

const WishItem = forwardRef(({ name, message, color, attendance }, ref) => (
  <div ref={ref} className="flex gap-4 pt-4 bg-gray-900/30 rounded-lg">
    <div>
      <img
        width={40}
        height={40}
        src={cdn(config.images.face)}
        style={{
          backgroundColor: color,
          minWidth: 40,
          minHeight: 40,
        }}
        className="rounded-lg"
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        <p className="text-white text-lg font-medium">{name}</p>
        <span className={`text-sm px-3 py-1 rounded-full ${attendance === 'hadir'
          ? 'bg-green-600 text-white'
          : attendance === 'tidak-hadir'
            ? 'bg-red-600 text-white'
            : 'bg-gray-600 text-white'
          }`}>
          {attendance === 'hadir' ? 'Hadir' : attendance === 'tidak-hadir' ? 'Tidak Hadir' : 'Belum Konfirmasi'}
        </span>
      </div>
      <p className="text-gray-300 text-base leading-relaxed">{message}</p>
    </div>
  </div>
));

const colorList = ['red', '#ffdb58', '#6bc76b', '#48cae4'];

const BankAccountCard = () => (
  <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 text-white shadow-2xl border-2 border-red-400">
    <div className="text-center">
      <div className="text-2xl mb-2">🎉</div>
      <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
      <p className="text-red-100 text-sm">Ucapan kamu sudah terkirim</p>
    </div>
  </div>
);


export default function WishSection() {
  const guestName = useGuestName();

  const [data, setData] = useState([]);
  const [name, setName] = useState(guestName === 'Temanku <3' ? '' : guestName);
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleClick = async () => {
    try {
      // Dynamic import confetti only when needed
      const confetti = (await import("canvas-confetti")).default;

      const end = Date.now() + 0.3 * 1000 // 3 seconds
      const colors = ["#dc2626", "#f59e0b", "#ef4444", "#fbbf24", "#dc2626", "#f59e0b"]
      const frame = () => {
        if (Date.now() > end) return
        confetti({
          particleCount: 1,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        })
        requestAnimationFrame(frame)
      }
      frame()
    } catch (error) {
      console.log('Confetti not available:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError('Nama minimal 3 karakter!');
      return;
    }

    if (message.length < 10) {
      setError('Pesan minimal 8 karakter!');
      return;
    }


    if (badwords.flag(name)) {
      setError('Gaboleh kata kasar!');
      return;
    }

    setLoading(true);
    setError(null);

    // random color based data length
    const randomColor = colorList[data.length % colorList.length];
    const newmessage = badwords.censor(message);
    const newWish = {
      name,
      message: newmessage,
      color: randomColor,
      attendance: attendance
    };

    try {
      // Try Supabase first
      if (import.meta.env.VITE_APP_TABLE_NAME) {
        const { error } = await supabase
          .from(import.meta.env.VITE_APP_TABLE_NAME)
          .insert([newWish]);

        if (error) {
          console.error('Supabase error: ', error);
          // Fallback to localStorage
          const updatedWishes = [...data, newWish];
          setData(updatedWishes);
          saveToLocalStorage(updatedWishes);
        } else {
          fetchData();
        }
      } else {
        // No table name configured, use localStorage
        const updatedWishes = [...data, newWish];
        setData(updatedWishes);
        saveToLocalStorage(updatedWishes);
      }
      handleClick()

      // Show easter egg after delay
      setShowEasterEgg(true);
      setName('');
      setMessage('');
      setAttendance('');
    } catch (err) {
      console.error('Unexpected error: ', err);
      // Fallback to localStorage
      const updatedWishes = [...data, newWish];
      setData(updatedWishes);
      saveToLocalStorage(updatedWishes);
      // Show easter egg after delay
      setShowEasterEgg(true);
      setName('');
      setMessage('');
      setAttendance('');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      // Try Supabase first
      if (import.meta.env.VITE_APP_TABLE_NAME) {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_APP_TABLE_NAME)
          .select('name, message, color, attendance');

        if (error) {
          console.error('Supabase error: ', error);
          // Fallback to localStorage
          loadFromLocalStorage();
        } else {
          setData(data || []);
        }
      } else {
        // No table name configured, use localStorage
        loadFromLocalStorage();
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const savedWishes = localStorage.getItem('nikah-wishes');
    if (savedWishes) {
      setData(JSON.parse(savedWishes));
    }
  };

  const saveToLocalStorage = (wishes) => {
    localStorage.setItem('nikah-wishes', JSON.stringify(wishes));
  };


  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 750);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (guestName !== 'Temanku <3') {
      setName(guestName);
    }
  }, [guestName]);


  return (
    <div>
      {!showEasterEgg ? (
        <>
          <h2 className="text-lg sm:text-xl leading-6 text-white font-semibold mb-6">
            Wish for the couple
          </h2>

          <div className="text-[#A3A1A1] text-base italic leading-relaxed mb-6">
            <div className="space-y-3">
              <p>Kami sangat berbahagia jika {guestName === 'Temanku <3' ? 'Bapak/Ibu/Saudara/Saudari' : 'kamu'} bisa hadir di hari bahagia kami.</p>
              <p>Jika tidak bisa hadir, tidak apa-apa. Yang penting doa dan restunya tetap kami harapkan.</p>
              <p>Terima kasih & jaga kesehatan ya :)</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mb-6">
            {error && <div className="text-red-500 text-sm bg-red-900/20 p-3 rounded">{error}</div>}

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Name</label>
              <input
                required
                minLength={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Message</label>
              <textarea
                required
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
                rows={4}
                placeholder="Tuliskan pesan dan doa untuk pasangan"
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Konfirmasi Kehadiran</label>
              <select
                required
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="belum-konfirmasi">Pilih kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak-hadir">Tidak Hadir</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </form>
        </>
      ) : (
        <div className="mb-6">
          <BankAccountCard
            bankAccount={config.bank_account}
            onCopy={copyToClipboard}
            copySuccess={copySuccess}
          />
        </div>
      )}

      <div
        className="max-h-[40rem] overflow-auto space-y-2 wish-container relative"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent'
        }}
      >
        <style jsx>{`
          .wish-container::-webkit-scrollbar {
            width: 6px;
          }
          .wish-container::-webkit-scrollbar-track {
            background: transparent;
          }
          .wish-container::-webkit-scrollbar-thumb {
            background: #4B5563;
            border-radius: 3px;
          }
          .wish-container::-webkit-scrollbar-thumb:hover {
            background: #6B7280;
          }
        `}</style>
        {/* Scroll indicator - top */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-black via-black/50 to-transparent w-6 h-8 pointer-events-none z-10"></div>
        {/* Scroll indicator - bottom */}
        <div className="absolute bottom-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent w-6 h-8 pointer-events-none z-10"></div>
        {data.slice().reverse().map((item, index) => (
          <WishItem
            name={item.name}
            message={item.message}
            color={item.color}
            attendance={item.attendance}
            key={data.length - 1 - index}
          />
        ))}
      </div>
    </div>
  );
}
