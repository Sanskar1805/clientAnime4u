import { useParams } from 'react-router-dom';
import NavBar from './navbar';
import axios from "axios";
import Carousel from './carousel';
import React, { useState, useEffect } from "react";
import { Add } from '@mui/icons-material';
import dataAnime from "./../animeData.json";

function AnimeDetails() {
  const [animeList, setAnimeList] = useState(dataAnime);
  const [toggle, setToggle] = useState(false);
  const [review, setReview] = useState("");
  const [revs, setRevs] = useState([]);  // Keep track of reviews

  const { encodedName } = useParams();
  const nameA = decodeURIComponent(encodedName);

  const handleReview = () => {
    setToggle(!toggle);
  };

  const handleReviewSend = async (e) => {
    e.preventDefault();
    try {
      // Post the new review to the server
      const response = await axios.post('https://serveranime4u-1.onrender.com/review', { review, naam });
      console.log(response);

      // Update reviews state with the new review after successful post
      setRevs((prevRevs) => [...prevRevs, review]); // Add the new review locally

      // Clear the input field after submitting
      setReview("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get('https://serveranime4u-1.onrender.com/animes');
        setAnimeList(response.data);

        // Find the selected anime by its name and set its reviews
        const desiredObject = response.data.find((obj) => obj.name === nameA);
        if (desiredObject) {
          setRevs(desiredObject.userReviews || []);  // Set the reviews for the selected anime
        }
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnime();
  }, [nameA]);

  const desiredObject = animeList.find((obj) => obj.name === nameA);
  const naam = desiredObject ? desiredObject.name : "";
  const pics = desiredObject ? desiredObject.pictures : [];
  const description = desiredObject ? desiredObject.desc : "";
  const imdb = desiredObject ? desiredObject.ratings : 0;
  const genre = desiredObject ? desiredObject.genre : [];

  return (
    <div style={{ backgroundColor: "black", color: "white", paddingBottom: "20px" }}>
      <NavBar bgCol="bg-warning" textCol="black" />
      <div style={{ fontFamily: "Righteous", backgroundColor: "black", marginBottom: "20px" }} className="p-3 text-warning content">
        <center><h1 style={{ fontSize: "50px" }}>{naam}</h1></center>
      </div>
      <Carousel pics={pics} />
      <center>
        <div>
          <p style={{ paddingLeft: "30%", paddingRight: "30%", paddingTop: "20px" }}>
            <h4 className="text-warning">Description :</h4> {description}
          </p>
          <p>
            <h4 className="text-warning">Genre :</h4> {genre.map((gen, index) => (
              <React.Fragment key={index}>
                {gen}
                {index !== genre.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          <p><h4 className="text-warning">Imdb :</h4> {imdb}</p>
        </div>
      </center>
      <div style={{ paddingLeft: "20px", paddingTop: "20px" }}>
        <h3 className="text-warning">User Reviews
          <button onClick={handleReview} style={{ color: "white", background: "none", border: "none" }}>
            <Add />
          </button>
        </h3>
        <ul>
          {revs.map((rev, index) => <li key={index}><p>{rev}</p></li>)}
        </ul>
        
        {toggle && (
          <div className="input-group mb-3">
            <form onSubmit={handleReviewSend}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  value={review}
                  placeholder="Add your review here..."
                  onChange={(e) => setReview(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="submit">Add</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimeDetails;
