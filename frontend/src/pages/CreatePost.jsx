import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import { HiOutlineDocumentAdd, HiOutlineCollection, HiOutlinePhotograph } from 'react-icons/hi';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Gündem',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/posts', formData);
      toast.success('Harika! Yeni başarın yayınlandı.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Yazı oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full italic">
          Editör Paneli
        </div>
        <h1 className="text-5xl font-black text-secondary tracking-tighter uppercase italic">
          YENİ BİR <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">FİKİR</span> PAYLAŞ
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-teal-500/5 space-y-8">
          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">
              <HiOutlineDocumentAdd className="text-primary text-lg" /> Yazı Başlığı
            </label>
            <input
              type="text"
              required
              placeholder="Geleceği değiştirecek başlık..."
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
                <HiOutlinePhotograph className="text-primary text-lg" /> Kapak Görseli URL
              </label>
              <input
                type="text"
                placeholder="https://gorsel-adresi.com/resim.jpg"
                className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-secondary"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">
              İçerik Editörü
            </label>
            <textarea
              required
              rows="12"
              placeholder="Dünyaya ne söylemek istersin Yusuf?"
              className="w-full px-8 py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-lg text-gray-600 leading-relaxed resize-none"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-5 bg-secondary text-white font-black uppercase tracking-widest rounded-full hover:bg-primary transition-all shadow-xl shadow-secondary/20 hover:-translate-y-1 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Yayınlanıyor...' : 'MAKALE OLARAK YAYINLA 🚀'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;