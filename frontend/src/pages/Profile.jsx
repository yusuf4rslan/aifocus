import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle, HiOutlineMail, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data } = await API.get(`/users/${user?._id}/posts`);
        setUserPosts(data);
      } catch (error) {
        console.error("User posts could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchUserPosts();
  }, [user?._id]);

  const handleDelete = async (postId) => {
    if (window.confirm('Bu yazıyı silmek istediğine emin misin?')) {
      try {
        await API.delete(`/posts/${postId}`);
        toast.success('Yazı başarıyla silindi.');
        setUserPosts(userPosts.filter(p => p._id !== postId));
      } catch (error) {
        toast.error('Silme işlemi başarısız.');
      }
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse font-black text-primary">YÜKLENİYOR...</div>;

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <section className="bg-slate-950 rounded-[3rem] p-12 text-white mb-20 relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <HiOutlineUserCircle className="text-7xl text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
              {user?.name} <span className="text-primary italic">AI</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-400 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><HiOutlineMail className="text-primary text-lg" /> {user?.email}</span>
              <span className="hidden md:block">|</span>
              <span className="text-primary">Toplam {userPosts.length} İçerik</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-secondary tracking-tighter uppercase italic">YAZILARIM</h2>
          <Link to="/create" className="px-6 py-3 bg-primary text-white text-xs font-black rounded-full hover:scale-105 transition-all shadow-lg shadow-primary/20">
            YENİ EKLE +
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post._id} className="group bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 flex-grow">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    {post.coverImage ? (
                      <img src={post.coverImage} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center font-black text-primary">AI</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-secondary uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Eklenme: {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Link to={`/post/${post._id}`} className="p-4 bg-soft text-gray-400 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm" title="Görüntüle">
                    <HiOutlineEye className="text-xl" />
                  </Link>
                  <Link to={`/edit/${post._id}`} className="p-4 bg-soft text-gray-400 rounded-2xl hover:bg-teal-600 hover:text-white transition-all shadow-sm" title="Düzenle">
                    <HiOutlinePencilAlt className="text-xl" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-4 bg-soft text-gray-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Sil"
                  >
                    <HiOutlineTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-soft rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Henüz bir yazı paylaşmadın.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;