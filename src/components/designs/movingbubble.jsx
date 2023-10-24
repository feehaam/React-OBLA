import "../../components/styles/movingbubble.css";
function MovingBubble() {
  return (
    <>
      <svg
        className="moving-bubble"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <path
          fill="#ecf7ff"
          d="M53.7,-48.8C69.7,-37.7,82.9,-18.8,81.7,-1.2C80.5,16.5,65,33,49,47.1C33,61.2,16.5,73,1.6,71.4C-13.3,69.8,-26.6,54.8,-36,40.7C-45.5,26.6,-51,13.3,-52.6,-1.6C-54.2,-16.5,-51.9,-33,-42.4,-44.1C-33,-55.2,-16.5,-60.8,1.2,-62C18.8,-63.2,37.7,-59.8,53.7,-48.8Z"
          transform="translate(100,100)"
        />
      </svg>
    </>
  );
}

export default MovingBubble;
