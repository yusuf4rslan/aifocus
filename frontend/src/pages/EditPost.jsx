import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import { HiOutlinePencilAlt, HiOutlineCollection, HiOutlinePhotograph, HiOutlineArrowLeft } from 'react-icons/hi';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    coverImage: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setFormData({
          title: data.title,
          content: data.content,
          category: data.category || 'Gündem',
          coverImage: data.coverImage || ''
        });
      } catch (error) {
        toast.error('Yazı bilgileri yüklenemedi.');
        navigate('/profile');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await API.put(`/posts/${id}`, formData);
      toast.success('Yazı başarıyla güncellendi! ✨');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Güncelleme yapılamadı.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-black text-primary italic">BİLGİLER GETİRİLİYOR...</div>;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all"
      >
        <HiOutlineArrowLeft /> Geri Dön
      </button>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-secondary tracking-tighter uppercase italic">
          İÇERİĞİ <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">GÜNCELLE</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-teal-500/5 space-y-8">
          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">
              <HiOutlinePencilAlt className="text-primary text-lg" /> Yeni Başlık
            </label>
            <input
              type="text"
              required
              className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-xl text-secondary"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">
                <HiOutlineCollection className="text-primary text-lg" /> Kategori
              </label>
              <select
                className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-secondary appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Gündem">YAPAY ZEKA GÜNDEM</option>
                <option value="Analiz">TEKNİK ANALİZ</option>
                <option value="Etik">ETİK & TOPLUM</option>
                <option value="Modeller">LLM & MODELLER</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">
                <HiOutlinePhotograph className="text-primary text-lg" /> Görsel URL
              </label>
              <input
                type="text"
                className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-secondary"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-2 block">
              İçerik Metni
            </label>
            <textarea
              required
              rows="12"
              className="w-full px-8 py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-lg text-gray-600 leading-relaxed resize-none"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={updating}
            className="px-12 py-5 bg-secondary text-white font-black uppercase tracking-widest rounded-full hover:bg-primary transition-all shadow-xl shadow-secondary/20 hover:-translate-y-1 active:scale-95 disabled:opacity-50"
          >
            {updating ? 'Kaydediliyor...' : 'DEĞİŞİKLİKLERİ KAYDET'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;