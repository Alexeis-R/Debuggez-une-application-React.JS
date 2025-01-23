import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // Récupère les données du contexte
  const [index, setIndex] = useState(0); // Initialise l'état pour l'index de la carte affichée

  // Trie les événements par date décroissante
  const byDateDesc =
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    ) || [];

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // Si l'index est plus petit que la longueur du tableau, ajoute 1, sinon revient à 0
      5000
    );
  };

  // Utilise useEffect pour appeler nextCard à chaque changement d'index ou de longueur de byDateDesc
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || `event-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={event.id || `radio-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Si l'index est égal à radioIdx, l'input est coché
                  onChange={() => setIndex(radioIdx)} // Change l'index lorsque l'input est sélectionné
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
