import React, { useState } from 'react';
import { Input, Row, Col, Button, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './AddMedia.css';

function MediaEmbedder() {
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const url = event.target.value;
    setMediaUrl(url);
    setError('');
  
    if (url.includes('youtube.com')) {
      setMediaType('youtube');
    } else if (url.includes('vimeo.com')) {
      setMediaType('vimeo');
    } else if (url.includes('wistia.net')) {
      setMediaType('wistia');
    } else if (url.includes('bunnycdn.com')) {
      setMediaType('bunny');
    } else if (/\.(jpeg|jpg|gif|png)$/.test(url)) {
      setMediaType('image');
    } else {
      setMediaType(null);
    }
  };
  

  const extractYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|.*[?&]v=)|watch\?v=)|youtu\.be)([^"&?/]+)/
    );

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  };

  const extractVimeoVideoId = (url) => {
    const match = url.match(/vimeo\.com\/([0-9]+)/);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  };

  const embedMedia = () => {
    if (!mediaUrl) {
      setError('Please enter a URL');
      return;
    }

    // Add any other validation or processing logic here
  };

  return (
    <div>
      <div className="add-media-breadcrumb">
        <div className="add-media-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: '22px',
              fontFamily: 'Rajdhani',
              padding: 0,
              margin: 0,
            }}
          >
            <Link to={'/admin/card1'}>
              <LeftOutlined style={{ fontSize: '14px' }} /> &nbsp; Back to
              lesson layout
            </Link>
          </p>

          <Space>
            <Button style={{ fontFamily: 'Rajdhani' }}>Preview</Button>
            <Button style={{ fontFamily: 'Rajdhani' }}>Publish</Button>
          </Space>
        </div>
      </div>
      <div className="add-media-container">
        <div className="add-media-subcontainer">
          <Row gutter={16}>
            <Col span={12} xs={24}>
              <h2>Embed Media</h2>
              <div className="add-media-subcontainer0">
                <Input
                  type="text"
                  placeholder="Enter YouTube, Vimeo, Image, Wistia, or Bunny Player URL"
                  value={mediaUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>
              &nbsp; &nbsp;
              <Button className="add-media-btn" onClick={embedMedia}>
                Embed Media
              </Button>
            </Col>
          </Row>
          <div style={{ marginTop: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                {mediaType === 'youtube' && (
                  <iframe
                    width="300"
                    height="315"
                    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
                      mediaUrl
                    )}`}
                    frameBorder="0"
                    allowFullScreen
                    title="YouTube Video"
                  />
                )}
                {mediaType === 'vimeo' && (
                  <iframe
                    src={`https://player.vimeo.com/video/${extractVimeoVideoId(
                      mediaUrl
                    )}`}
                    width="300"
                    height="315"
                    frameBorder="0"
                    allowFullScreen
                    title="Vimeo Video"
                  />
                )}
                {mediaType === 'image' && (
                  <img src={mediaUrl} alt="Image" style={{ maxWidth: '100%' }} />
                )}
                {mediaType === 'wistia' && (
                  <iframe
                    src={mediaUrl}
                    width="300"
                    height="315"
                    frameBorder="0"
                    allowFullScreen
                    title="Wistia Video"
                  />
                )}
                {mediaType === 'bunny' && (
                  <iframe
                    src={mediaUrl}
                    width="300s"
                    height="315"
                    frameBorder="0"
                    allowFullScreen
                    title="Bunny Player Video"
                  />
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaEmbedder;
