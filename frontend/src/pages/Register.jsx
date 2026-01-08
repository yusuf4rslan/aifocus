import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post('/auth/register', formData);
      login(data);
      toast.success('Aramıza hoş geldin! Yolculuğun başlıyor.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Kayıt sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-teal-500/5">

        <div className="text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full">
            Yeni Hesap Oluştur
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">
            Aramıza <span className="text-teal-600 underline decoration-teal-200 decoration-4 underline-offset-4">Katıl</span>
          </h2>
          <p className="text-slate-500 font-medium">Yapay zeka evrenine ilk adımını at.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Lider Adı / Nickname</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white transition-all duration-300 outline-none placeholder:text-slate-400 font-medium text-slate-900"
                placeholder="Örn: Yusuf Arslan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">E-Posta</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white transition-all duration-300 outline-none placeholder:text-slate-400 font-medium text-slate-900"
                placeholder="yusuf@aiagenda.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Güçlü Bir Şifre</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white transition-all duration-300 outline-none placeholder:text-slate-400 font-medium text-slate-900"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-slate-900 hover:bg-teal-600 focus:outline-none transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70"
          >
            {loading ? 'HESAP OLUŞTURULUYOR...' : 'MACERAYI BAŞLAT'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-500 font-medium text-sm">
            Zaten hesabın var mı?{' '}
            <Link to="/login" className="text-teal-600 font-bold hover:underline underline-offset-4">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;