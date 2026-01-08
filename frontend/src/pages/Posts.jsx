import { useState, useEffect } from 'react';
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineClock, HiOutlineUser } from 'react-icons/hi';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/posts?keyword=${keyword}`);
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Posts could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  return (
    <div className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">Arama & Arşiv</p>
          <h1 className="text-5xl md:text-7xl font-black text-secondary tracking-tighter uppercase italic">İÇERİK <span className="text-primary underline decoration-primary/10 decoration-8 underline-offset-8">KEŞFET</span></h1>
        </div>

        <div className="relative w-full max-w-3xl mx-auto mb-24 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <HiOutlineSearch className="text-2xl text-gray-300 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Anahtar kelime, kategori veya konu ara..."
            className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[2.5rem] text-lg font-bold text-secondary outline-none transition-all shadow-xl shadow-slate-200/20"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">
              Sonuçlar Listeleniyor
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
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
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white/5 font-black text-5xl italic">AI</div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl text-[900] text-[9px] font-black uppercase tracking-widest text-secondary shadow-sm">
                      {post.category || 'ANALİZ'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-3 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                    <span className="flex items-center gap-1.5"><HiOutlineClock className="text-primary text-sm" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className="flex items-center gap-1.5"><HiOutlineUser className="text-primary text-sm" /> {post.author?.name || 'YUSUF ARSLAN'}</span>
                  </div>

                  <h3 className="text-2xl font-black text-secondary leading-[1.2] group-hover:text-primary transition-colors mb-4 line-clamp-2 uppercase tracking-tight">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-[13px] font-medium line-clamp-2 leading-relaxed">
                    {post.excerpt || post.content.substring(0, 120) + '...'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-20 bg-soft rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Aradığınız kriterlere uygun yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
