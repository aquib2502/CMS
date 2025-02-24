'use client';
import { useState, useEffect } from 'react';

export default function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:5000/upload/videos');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched videos:', data);
        setUploadedVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);

    if (!selectedFile) {
      alert('Please select a video file');
      return;
    }

    setVideo(selectedFile);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!video) {
      alert('Please select a video file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', video);

    try {
      const response = await fetch('http://localhost:5000/upload/videoUpload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      alert('Video uploaded successfully!');

      setUploadedVideos((prevVideos) => [data, ...prevVideos]);
      setVideo(null);
      document.getElementById('videoInput').value = '';
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:5000/upload/video/${videoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete video. Status: ${response.status}`);
      }

      setUploadedVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert(`Failed to delete video: ${error.message}`);
    }
  };

  return (
    <>
      <div className="p-8 min-h-screen bg-[#1C1C1C] text-[#E0E0E0]">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-[#A0A0A0]">
          Upload & Manage Videos
        </h1>

        <div className="mb-8 p-6 rounded-xl bg-[#2A2A2A] shadow-xl w-full max-w-lg mx-auto">
          <input
            type="file"
            id="videoInput"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-[#A0A0A0] rounded-lg bg-[#E0E0E0] text-[#1C1C1C] focus:ring-2 focus:ring-[#A0A0A0] transition"
          />
          <button
            onClick={handleFileUpload}
            className="mt-4 w-full bg-[#A0A0A0] text-[#1C1C1C] font-semibold py-2 px-4 rounded-lg hover:bg-[#E0E0E0] transition-all duration-300 ease-in-out shadow-md"
          >
            Upload Video
          </button>
        </div>

        {/* Uploaded Videos Section */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#71BBB2]">
          Uploaded Videos
        </h2>
        {loading ? (
          <p className="text-[#EFE9D5] text-center">Loading videos...</p>
        ) : uploadedVideos.length === 0 ? (
          <p className="text-[#EFE9D5] text-center">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto">
            {uploadedVideos.map((video) => (
              <div key={video._id} className="p-4 bg-[#497D74] rounded-lg flex justify-between items-center shadow-md">
                <video controls className="rounded-lg w-32 h-20 border-2 border-[#71BBB2]">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-sm text-[#EFE9D5] text-center">
                   Uploaded on: {new Date(video.uploadedAt).toLocaleString()}
                  </p>


                <button
                  onClick={() => handleDeleteVideo(video._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
