import { useState, useEffect } from 'react';
import { HiOutlineArrowRight, HiOutlineNewspaper, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineClock, HiOutlineUser } from 'react-icons/hi';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        setPosts(data.posts?.slice(0, 3) || []);
      } catch (error) {
        console.error("Posts could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-24 pb-32">
        <div className="pill-badge mb-10">
          <span className="text-primary font-bold">✨</span>
          <span className="text-gray-600">Yapay Zeka Dünyasından En Yeni Güncellemeler</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-[900] text-secondary leading-[1.1] mb-10 tracking-tight uppercase">
          GELECEĞİN <span className="text-primary border-4 border-primary px-4 py-1 rounded inline-block transform -rotate-1 mx-2">ZEKASINI</span> <br />
          BUGÜNDEN KEŞFET
        </h1>

        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
          Yapay zeka teknolojilerindeki son dakika gelişmelerini ve analizlerini
          içeren modern AI blog platformuna hoş geldiniz.
        </p>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center mb-24">
          <Link to="/posts" className="btn-primary px-10 py-4 text-base shadow-xl shadow-primary/20">
            Tüm Yazıları Keşfet <HiOutlineArrowRight />
          </Link>
          <button className="btn-outline px-10 py-4 text-base">
            Hakkımda Bilgi Al
          </button>
        </div>

        <div className="w-full pt-16 border-t border-gray-100">
          <p className="text-gray-400 font-bold mb-12 text-xs uppercase tracking-[0.2em]">Analiz Edilen Teknolojiler ⟶</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-2xl font-black text-black tracking-tighter">OPENAI</span>
            <span className="text-2xl font-black text-black tracking-tighter">ANTHROPIC</span>
            <span className="text-2xl font-black text-black tracking-tighter">DEEPMIND</span>
            <span className="text-2xl font-black text-black tracking-tighter">META AI</span>
          </div>
        </div>
      </section>

      <section className="bg-soft py-32 border-t border-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-[900] text-secondary uppercase tracking-tight mb-4">Blog Kategorileri</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-12 rounded-[2.5rem] bg-white border border-gray-100/50 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <HiOutlineLightningBolt className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4 uppercase tracking-tight">Hızlı Gündem</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">En son teknoloji haberleri ve günlük AI güncellemeleri.</p>
              <button className="font-bold text-primary flex items-center gap-2 group/btn">
                Göz At <HiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="p-12 rounded-[2.5rem] bg-white border border-gray-100/50 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <HiOutlineNewspaper className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4 uppercase tracking-tight">Derin Analiz</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">Modellerin teknik detayları ve uzun soluklu inceleme yazıları.</p>
              <button className="font-bold text-primary flex items-center gap-2 group/btn">
                Göz At <HiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="p-12 rounded-[2.5rem] bg-white border border-gray-100/50 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <HiOutlineShieldCheck className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4 uppercase tracking-tight">AI Etik</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">Yapay zekanın topluma etkisi ve etik kurallar üzerine tartışmalar.</p>
              <button className="font-bold text-primary flex items-center gap-2 group/btn">
                Göz At <HiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="latest-posts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 pb-10 border-b border-gray-50">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Editörün Seçimi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tighter leading-none">
                HAFTALIK <span className="text-primary italic">GÜNDEM</span>
              </h2>
            </div>
            <Link to="/posts" className="text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:underline">Tüm Arşivi Gör ⟶</Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {posts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`} className="group relative flex flex-col">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-700">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white/5 font-black text-5xl">AI</div>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                      <span className="flex items-center gap-1.5"><HiOutlineClock className="text-primary text-sm" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-xl font-black text-secondary leading-[1.2] group-hover:text-primary transition-colors mb-4 line-clamp-2 uppercase tracking-tight italic">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-[13px] font-medium line-clamp-2 leading-relaxed">
                      {post.excerpt || post.content.substring(0, 100) + '...'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 && !loading && (
            <div className="text-center py-20 bg-soft rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Henüz içerik eklenmedi.</p>
            </div>
          )}
        </div>
      </section>
      <footer className="py-20 text-center border-t border-gray-50 bg-white">
        <p className="text-secondary font-black tracking-tighter text-2xl mb-2">AIFOCUS <span className="text-primary italic">AI</span></p>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">© 2026 Yapay Zeka Gündem Platformu. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
};

export default Home;