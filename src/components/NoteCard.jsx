import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/utils';

const NoteCard = ({note, setNotes}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try{
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id));
            toast.success("Note deleted successfully");
        }
        catch (error) {
            //console.log("Error in handleDelete", error);
            toast.error("Failed to delete note.");
        }
    };

  return (
    <Link
        to={`/SaveInfo.com/note/${note._id}`}
        className='relative flex flex-col justify-between h-full rounded-2xl bg-gray-900 border border-gray-700
        hover:border-[#00FF9D]/70 hover:shadow-[0_0_15px_#00FF9D40]
        transition-all duration-300 transform hover:-translate-y-1 overflow-hidden'
    >
        {/* Note Content */}
        <div className="p-5 pb-16">
            <h3 className="text-xl font-semibold text-white mb-3 truncate">
                {note.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                {note.content}
            </p>
        </div>

        {/* Fixed Footer (Date + Actions) */}
        <div
            className='absolute bottom-0 left-0 w-full flex justify-between items-center 
            bg-gray-900/90 border-t border-gray-700 px-5 py-3 text-gray-500 backdrop-blur-sm'
        >
            <span className='text-xs italic'>
                {formatDate(new Date(note.createdAt))}
            </span>

            <div className='flex items-center gap-3'>
                <button
                    title="Edit"
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <PenSquareIcon className="w-4 h-4 text-[#00FF9D]" />
                </button>

                <button
                    title="Delete"
                    className="p-2 rounded-lg hover:bg-red-900/40 transition-colors"
                    onClick={(e) => handleDelete(e, note._id)}
                >
                    <Trash2Icon className="w-4 h-4 text-red-400" />
                </button>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard;