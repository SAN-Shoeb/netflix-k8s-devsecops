import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import videojs from 'video.js';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Fetch video catalog from backend API
    axios.get('/api/videos')
      .then(res => {
        setVideos(res.data);
        if (res.data.length > 0) setSelectedVideo(res.data[0]);
      })
      .catch(() => {
        // Fallback demo video
        const fallback = {
          title: 'Big Buck Bunny (Demo HLS Stream)',
          description: 'HLS Test stream via CDN distribution',
          streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
        };
        setVideos([fallback]);
        setSelectedVideo(fallback);
      });
  }, []);

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [{ src: selectedVideo.streamUrl, type: 'application/x-mpegURL' }]
        });
      } else {
        playerRef.current.src({ src: selectedVideo.streamUrl, type: 'application/x-mpegURL' });
      }
    }
  }, [selectedVideo]);

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h1 style={{ color: '#E50914', margin: 0 }}>STREAMFLIX</h1>
        <span style={{ fontSize: '14px', color: '#aaa' }}>Powered by K3s & CloudFront</span>
      </header>

      <div style={{ marginTop: '20px', maxWidth: '900px', margin: '20px auto' }}>
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
        {selectedVideo && (
          <div style={{ marginTop: '15px' }}>
            <h2>{selectedVideo.title}</h2>
            <p style={{ color: '#aaa' }}>{selectedVideo.description}</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Featured Content</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {videos.map((vid, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedVideo(vid)}
              style={{ background: '#222', padding: '15px', borderRadius: '6px', cursor: 'pointer', minWidth: '200px' }}
            >
              <h4 style={{ margin: '0 0 8px 0' }}>{vid.title}</h4>
              <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Click to play stream</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}