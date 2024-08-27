import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const GameDashboard = () => {

  const games = [
    {
      name: "snake",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1724418689/MarketPlace/pngwing.com_fbzye6.png",
      id: 21
    },
    {
      name: "ball",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1724418689/MarketPlace/pngwing.com_fbzye6.png",
      id: 43
    }
  ]


  return (
    <Fragment>
      <Helmet>
        <title>Games Dashboard | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
      </Helmet>
      <div className='page flexcol wh'>

        <div className="textBig">Game Dashboard</div>
        <div className="game-dashboard-grid">
          {games && games.length > 0 && games.map((game) => (
            <div className="game-dashboard-item" key={game.id}>
              <img src={game.img} alt={game.name} />
              <div className="game-detail">
                <div className="textBig blue">{game.name}</div>
                <button className='addFriend'>Play</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
};

export default GameDashboard;