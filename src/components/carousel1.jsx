import React from "react";
import HomePageVideo from "./homeVideo";

function CarouselOne(){
    const url1 = "https://www.youtube.com/watch?v=k_CxMefC7mA";
    const url2 = "https://www.youtube.com/watch?v=9hNOAMFPoBc";
    const url3 = "https://www.youtube.com/watch?v=thMXb5r792s";
    return <div id="carouselExampleRide" class="carousel " data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <HomePageVideo url = {url1} mute = {false}/>
      </div>
      <div class="carousel-item">
        <HomePageVideo url = {url2} mute = {true} />
      </div>
      <div class="carousel-item">
        <HomePageVideo url = {url3} mute = {true} />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
}
export default CarouselOne;