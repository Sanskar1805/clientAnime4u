import WelText from "./welcomeText";
import CarouselOne from "./carousel1";
import AnimeGrid from "./animeGrid";
import NavBar from "./navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function WelcContent() {
  const [animeList, setAnimeList] = useState([]);

  // Sample data to be used while fetching from the API
  const sampleData = [
    {
      _id: "1",
      name: "Naruto",
      genre: ["Action", "Adventure"],
      pictures: [
        "https://c4.wallpaperflare.com/wallpaper/738/62/544/naruto-chidori-naruto-naruto-uzumaki-rasengan-naruto-sasuke-uchiha-hd-wallpaper-preview.jpg",
      ],
      ratings: 8.6,
    },
    {
      _id: "2",
      name: "Demon Slayer",
      genre: ["Action", "Supernatural"],
      pictures: [
        "https://images.immediate.co.uk/production/volatile/sites/3/2022/10/MV5BOGZmYjkxMDItNmQ3ZC00YzdlLThjMDktYWJkOGZiOWU1NmY0XkEyXkFqcGdeQXVyMTA3MzQ4MTcw.V1-f69daeb.jpg",
      ],
      ratings: 8.9,
    },
    {
      _id: "3",
      name: "Death Note",
      genre: ["Mystery", "Psychological"],
      pictures: [
        "https://images2.alphacoders.com/139/thumbbig-13992.webp",
      ],
      ratings: 9,
    },
    {
      _id: "4",
      name: "One Piece",
      genre: ["Action", "Adventure"],
      pictures: [
        "https://wallpaperaccess.com/full/17350.jpg",
      ],
      ratings: 8.7,
    },
    {
      _id: "5",
      name: "Haikyuu",
      genre: ["Sports", "Comedy"],
      pictures: [
        "https://c4.wallpaperflare.com/wallpaper/430/354/442/haikyuu-haikyuu-hinata-shouyou-kageyama-tobio-azumane-asahi-hd-wallpaper-preview.jpg",
      ],
      ratings: 8.9,
    },
    {
      _id: "6",
      name: "Fullmetal Alchemist",
      genre: ["Action", "Adventure"],
      pictures: [
        "https://c4.wallpaperflare.com/wallpaper/963/106/331/fullmetal-alchemist-fullmetal-alchemist-edward-elric-riza-hawkeye-wallpaper-preview.jpg",
      ],
      ratings: 9.1,
    },
  ];

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get('https://serveranime4u-1.onrender.com/animes'); // Replace '/api/animes' with your API endpoint to retrieve anime data
        setAnimeList(response.data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
        // Fallback to sample data if there is an error
        setAnimeList(sampleData);
      }
    };

    fetchAnime();
  }, []);

  const location = useLocation();
  const username = new URLSearchParams(location.search).get('name');
  var username2 = username === null ? "anonymous" : username;

  const pictures = animeList.map(anime => anime.pictures[0]);
  const names = animeList.map(anime => anime.name);

  const filteredAnime2 = animeList.filter(anime => {
    const lowerCaseGenres = anime.genre.map(genre => String(genre).toLowerCase());
    return lowerCaseGenres.includes("action");
  });

  const names2 = filteredAnime2.map(anime => anime.name);
  const pictures2 = filteredAnime2.map(anime => anime.pictures[0]);

  const animeList2 = animeList;
  animeList2.sort((a, b) => b.ratings - a.ratings);

  const names3 = animeList2.map(anime => anime.name);
  const pictures3 = animeList2.map(anime => anime.pictures[0]);

  const filteredAnime3 = animeList.filter(anime => {
    const lowerCaseGenres = anime.genre.map(genre => String(genre).toLowerCase());
    return lowerCaseGenres.includes("adventure");
  });

  const names4 = filteredAnime3.map(anime => anime.name);
  const pictures4 = filteredAnime3.map(anime => anime.pictures[0]);

  return (
    <div className='bg-dark'>
      <NavBar bgCol="bg-warning" textCol="white" userName={username2} />
      <div className="row bg-dark grid content" style={{ backgroundColor: "white" }}>
        <div className="col-6 grid-item" style={{ paddingLeft: "2%", paddingRight: "2%" }} md={6}><WelText /></div>
        <div className="col-6 grid-item" style={{ paddingTop: "3%", paddingLeft: "2%", paddingRight: "2%" }} md={6}><CarouselOne /></div>
      </div>
      <AnimeGrid userName={username2} pictures={pictures} name={names} board="1" heading="Top Rated Animes" bgCol="bg-dark" />
      <AnimeGrid userName={username2} pictures={pictures2} name={names2} board="1" heading="Action Animes" bgCol="bg-dark" />
      <AnimeGrid userName={username2} pictures={pictures3} name={names3} board="1" heading="Adventure Animes" bgCol="bg-dark" />
    </div>
  );
}

export default WelcContent;
