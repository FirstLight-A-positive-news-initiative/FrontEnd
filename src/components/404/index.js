import errsvg from "../../assets/images/404.svg";
import "./styles.css";

const FourZeroFour = () => {
  return (
    <div className="news-page__404">
      <img src={errsvg} alt="Error 404" />
      <p>The page could not be found. Maybe it was taken away by aliens!</p>
    </div>
  );
};

export default FourZeroFour;
