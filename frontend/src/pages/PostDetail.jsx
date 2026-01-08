import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineUser, HiOutlineTag } from 'react-icons/hi';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error("Post could not be loaded:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-500 italic">Yazı bulunamadı...</h2>
        <Link to="/" className="text-primary font-bold mt-4 inline-block hover:underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-12 mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors group">
          <HiOutlineArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" /> Geri Dön
        </Link>
      </div>

      <header className="max-w-4xl mx-auto px-6 text-center mb-16">
        <div className="pill-badge mb-8 mx-auto">
          <HiOutlineTag className="text-primary" />
          <span className="uppercase tracking-[0.2em] font-bold text-gray-400">{post.category || 'TEKNOLOJİ'}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-[900] text-secondary leading-tight uppercase tracking-tighter mb-10 italic">
          {post.title}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-y border-gray-50 py-6">
          <span className="flex items-center gap-2"><HiOutlineUser className="text-primary text-base" /> {post.author?.name || 'YUSUF ARSLAN'}</span>
          <span className="flex items-center gap-2"><HiOutlineClock className="text-primary text-base" /> {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="h-[400px] md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white/5 font-black text-9xl italic tracking-tighter">AI AGEND</div>
          )}
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6">
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="text-gray-600 leading-[2] font-medium text-lg first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-8">{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <footer className="max-w-3xl mx-auto px-6 mt-20 pt-12 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <p className="text-xs font-black text-gray-300 uppercase tracking-widest italic">Yorumlar Çok Yakında...</p>
          <div className="flex gap-4">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PostDetail;