import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import "./GameBar.css";

function GameBar(props) {
  const { t } = props;
  const [timer, setTimer] = useState(props.time);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    if (timer === 0) {
      setTimer(props.time);
      setCurrentRound(currentRound + 1);
    } else {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer, props.time, currentRound]);

  return (
    <div className="gamebar">
      <div className="game-info">
        <span className="timer" data-testid="timer-display">
          {timer}
        </span>
        <span>
          {t("Round status", {
            currentRound: currentRound,
            numberOfRounds: props.numberOfRounds,
          })}
        </span>
      </div>
      <span className="hint">m _ m _ c _</span>
    </div>
  );
}

GameBar.propTypes = {
  t: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  numberOfRounds: PropTypes.number.isRequired,
};

export default withNamespaces()(GameBar);
