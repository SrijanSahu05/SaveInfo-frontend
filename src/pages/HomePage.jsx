import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import NoteCard from '../components/NoteCard';
import { Search } from 'lucide-react';
import RateLimitUI from '../components/RateLimitUI';
import toast from 'react-hot-toast';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);

  const navigate = useNavigate();

  // Fetch all notes
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/SaveInfo.com/auth/login');
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/notes');
        setNotes(data);
        setIsRateLimited(false);
        setError(null);
      } catch (error) {
        const status = error.response?.status;
        setError(error.response?.data?.message || 'Failed to fetch notes');

        if (status === 401) {
          localStorage.removeItem('userInfo');
          navigate('/SaveInfo.com/auth/login');
        } else if (status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests! Please wait a minute.");
        } else {
          setError(error.response?.data?.message || 'Failed to fetch notes');
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
         {/* Notes Count */}
         <span className='text-white font-semibold text-center sm:text-left text-base sm:text-lg'>Total numbers of notes created: {notes.length} </span>

         {/* Search Bar */}
         <div className="relative w-full sm:w-80 md:w-96 mx-auto sm:mx-0">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
          />
        </div>
      </div>


      {/* Main Render Section */}
      {loading ? (
        // Loading Spinner
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-t-transparent border-[#00FF9D] rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        // Error Message
        <p className="text-red-500 text-center">{error}</p>
      ) : isRateLimited ? (
        // Rate Limit Message
        <RateLimitUI />
      ) : notes.length === 0 ? (
        // No Notes Exist
        <NotesNotFound />
      ) : filteredNotes.length > 0 ? (
        // Notes Found
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      ) : (
        // No Results for Search
        <p className="text-gray-400 text-center">No notes found.</p>
      )}
    </div>
  );
};

export default HomePage;