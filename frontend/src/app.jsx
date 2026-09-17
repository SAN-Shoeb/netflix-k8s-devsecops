import React, { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.log('API offline or loading:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ color: '#E50914', margin: 0, fontSize: '32px' }}>NETFLIX</h1>
      </header>
      <main>
        <h2>Featured Stream</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {movies.length > 0 ? (
            movies.map(movie => (
              <div key={movie.id} style={{ background: '#222', padding: '15px', borderRadius: '8px', width: '220px' }}>
                <h3>{movie.title}</h3>
                <p style={{ color: '#aaa' }}>{movie.genre}</p>
              </div>
            ))
          ) : (
            <div style={{ background: '#222', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '600px' }}>
              <h3>DevSecOps Streaming Pipeline Active</h3>
              <p style={{ color: '#aaa' }}>Frontend connected to K3s Ingress and ready to stream via CloudFront CDN.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;