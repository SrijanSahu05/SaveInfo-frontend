import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try{
      await api.post("/notes/create", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/SaveInfo.com");
    }
    catch (error) {
      if(error.response.status === 429){
        toast.error("Slow down! You're creating notes too fast.",{
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center py-10 px-6">
        <div
          className="w-full max-w-[1200px] bg-gray-900/95 border border-gray-700 rounded-2xl 
          shadow-[0_0_30px_#00FF9D20] p-8 md:p-10 transition-all duration-300"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Create <span className="text-[#00FF9D]">New Note</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-gray-300 mb-2 text-lg font-medium">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white 
                focus:outline-none focus:border-[#00FF9D] focus:shadow-[0_0_10px_#00FF9D60]
                transition-all duration-300"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-300 mb-2 text-lg font-medium">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                placeholder="Write your note here..."
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white 
                resize-none focus:outline-none focus:border-[#00FF9D]
                focus:shadow-[0_0_10px_#00FF9D60] transition-all duration-300"
              ></textarea>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-[#00FF9D] text-gray-900 text-lg font-semibold
                hover:bg-[#00cc7a] hover:shadow-[0_0_15px_#00FF9D80]
                transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default CreatePage;