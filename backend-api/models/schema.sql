CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    video_key VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    uploader_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed an initial video record for testing playback
INSERT INTO videos (title, description, video_key, thumbnail_url) 
VALUES (
    'AWS Free Tier Streaming Demo', 
    'Sample HLS streaming running on Kubernetes and CloudFront CDN.', 
    'demo/master.m3u8', 
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85'
) ON CONFLICT DO NOTHING;