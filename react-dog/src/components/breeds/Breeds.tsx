import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getBreedImages } from '../../api/dogApi';
import './breeds.scss'

const Breeds = () => {
  const  { breed } = useParams();
  const [images, setImage] = useState([]);
  const [chatText, setChatText] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const navigate = useNavigate();

  const fetchBreedImage = async () => {
    try {
        const  data  = await getBreedImages(breed || "",3);

      if (data.status === "success") {
        setImage(data.message);
      } else {
        console.error("Failed to fetch breed image");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSendMessage = () => {
    if (chatText.trim() !== '') {
      setChatMessages([...chatMessages, chatText]);
      setChatText('');
    }
  };
  useEffect(() => {
    fetchBreedImage();
  }, [breed]);

  return (
    <div>
      <div className="breed-page">
        <h1>{breed}</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <div className="breed-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${breed}-${index + 1}`} />
        ))}
        </div>
        <div className="chat-box">
          <input
            type="text"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Breeds


