import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center bg-gray-800">
      <div className="bg-[#00FF9D]/10 rounded-full p-8 border border-[#00FF9D]/30 shadow-lg">
        <NotebookIcon className="w-10 h-10 text-[#00FF9D]" />
      </div>

      <h3 className="text-2xl font-bold text-white">No Notes Yet</h3>

      <p className="text-gray-400 max-w-sm">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>

      <Link
        to="/SaveInfo.com/note/create"
        className="px-6 py-3 rounded-lg bg-[#00FF9D] text-black font-semibold 
                   hover:bg-[#00e68a] transition-all duration-300 shadow-md"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;