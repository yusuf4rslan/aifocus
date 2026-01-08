import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX, HiOutlineLogin, HiOutlinePlus, HiOutlineUser, HiOutlineLogout, HiOutlineStatusOnline } from 'react-icons/hi';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl px-6 py-4 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black text-secondary tracking-tighter flex items-center shrink-0">
            AIFOCUS <span className="text-primary italic ml-1">AI</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-secondary font-bold text-[11px] uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <Link to="/posts" className="hover:text-primary transition-colors flex items-center gap-2">
              Keşfet <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-8">
              <Link to="/create" className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all border border-primary/20">
                <HiOutlinePlus className="text-lg" /> Yazı Paylaş
              </Link>

              <div className="w-[1px] h-6 bg-gray-200 hidden lg:block"></div>

              <Link to="/profile" className="text-secondary font-black hover:text-primary transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2">
                <HiOutlineUser className="text-lg" /> Profilim
              </Link>

              <button
                onClick={logout}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
              >
                <HiOutlineLogout className="text-lg" /> Çıkış
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              <Link to="/login" className="text-secondary font-black hover:text-primary transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2">
                <HiOutlineLogin className="text-lg" /> Giriş
              </Link>
              <Link to="/register" className="px-8 py-3 bg-secondary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-secondary/10">
                Aramıza Katıl
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {user && (
            <Link to="/create" className="p-2 bg-primary/10 text-primary rounded-lg">
              <HiOutlinePlus className="text-xl" />
            </Link>
          )}
          <button className="text-3xl text-secondary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 pb-6 px-4 animate-fade-in border-t border-gray-100 pt-6 bg-white shrink-0">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-secondary font-black uppercase tracking-widest text-[10px] py-3 border-b border-slate-50">Ana Sayfa</Link>
          <Link to="/posts" onClick={() => setIsOpen(false)} className="block text-secondary font-black uppercase tracking-widest text-[10px] py-3 border-b border-slate-50 flex items-center justify-between">
            Keşfet <span className="w-2 h-2 bg-primary rounded-full"></span>
          </Link>

          {user ? (
            <div className="pt-4 space-y-4">
              <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-secondary font-black uppercase tracking-widest text-[10px] py-2">
                <HiOutlineUser className="text-xl text-primary" /> Profilim
              </Link>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full py-4 bg-red-50 text-red-500 rounded-xl font-black uppercase tracking-widest text-[10px] border border-red-100"
              >
                Oturumu Kapat
              </button>
            </div>
          ) : (
            <div className="pt-4 space-y-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 text-secondary font-black uppercase tracking-widest text-[10px] border border-gray-200 rounded-xl">Giriş Yap</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20">Kayıt Ol</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;