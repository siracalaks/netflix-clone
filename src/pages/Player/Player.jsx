import "./Player.css";
import back_arrow_icon from "../../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTljZDk5Yzg1MTUyNWQwMWE5YTNjMzM5ZjhiZTI2NCIsIm5iZiI6MTc0MDIyMDE4OS4yMzUwMDAxLCJzdWIiOiI2N2I5YTcxZDU1ZTM5OTRiYmQ0NjUwOWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BtNbusLylLPHHF_pcp2KWTmBPugSi7JrgvFpz__oBDM'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));    
    }
)


  return (
    <div className="player">
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}}/>
      <iframe
        width="600"
        height="400"
        title="trailer"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        frameborder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
