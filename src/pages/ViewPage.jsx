import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';

const ViewPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try{
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error){
        //console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note.");
      } finally{
        setLoading(false);
      }
    };
    
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/SaveInfo.com");
    } catch (error) {
      //console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

   // Copy note content
  const handleCopy = () => {
    if (!note?.content) return;
    navigator.clipboard.writeText(note.content);
    toast.success("Note copied to clipboard!");
  };

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try{
      await api.put(`/notes/update/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/SaveInfo.com");
    } catch(error){
      //console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally{
      setSaving(false);
    }
  };

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-800 flex items-center justify-center py-10 px-6">
  <div
    className="w-full max-w-[1200px] bg-gray-900/95 border border-gray-700 rounded-2xl 
               shadow-[0_0_30px_#00FF9D20] p-8 md:p-10 transition-all duration-300"
  >
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <Link
        to="/SaveInfo.com"
        className="flex items-center gap-2 text-[#00FF9D] hover:text-[#00cc7a] transition-all duration-200"
      >
        <ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
        <span className="text-lg font-medium">Back to Notes</span>
      </Link>

      <button
        className="flex items-center justify-center gap-2 px-5 py-2.5 border border-red-500 text-red-400 
                   rounded-lg hover:bg-red-500/10 hover:shadow-[0_0_10px_#ff000050] 
                   transition-all duration-300 text-sm md:text-base"
        onClick={handleDelete}
      >
        <Trash2Icon className="h-5 w-5 md:h-6 md:w-6" />
        Delete
      </button>
    </div>

    {/* Note Editing Section */}
    <div className="space-y-8">
      {/* Title Input */}
      <div>
        <label className="block text-gray-300 mb-2 text-lg font-medium">Title</label>
        <input
          type="text"
          placeholder='Note title'
          value={note.title}
          onChange={(e) => setNote({...note, title: e.target.value})}
          className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white 
                     focus:outline-none focus:border-[#00FF9D] focus:shadow-[0_0_10px_#00FF9D60] 
                     transition-all duration-300"
        />
      </div>

      {/* Content Textarea */}
      <div>
        <label className="block text-gray-300 mb-2 text-lg font-medium">Content</label>
        <textarea
          placeholder="Write your note here..."
          rows="10"
          value={note.content}
          onChange={(e) => setNote({...note, content: e.target.value})}
          className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white 
                     resize-none focus:outline-none focus:border-[#00FF9D] 
                     focus:shadow-[0_0_10px_#00FF9D60] transition-all duration-300"
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          className="px-6 py-2.5 rounded-lg border border-[#00FF9D]/50 text-[#00FF9D] 
                     hover:bg-[#00FF9D]/10 hover:shadow-[0_0_10px_#00FF9D70] 
                     transition-all duration-300"
            onClick={handleCopy}
        >
          Copy
        </button>

        <button
          className="px-8 py-3 rounded-lg bg-[#00FF9D] text-gray-900 font-semibold 
                     hover:bg-[#00cc7a] hover:shadow-[0_0_15px_#00FF9D80] 
                     transition-all duration-300"
            onClick={handleSave}
            disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default ViewPage;