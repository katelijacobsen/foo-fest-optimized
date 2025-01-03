"useClient";
import Newsletter from "./Newsletter";
import ValidationNews from "./ValidationNews";
import { useState, useEffect } from "react";
const Container = () => {
  const [validation, setValidation] = useState(true);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter === 0) {
      setValidation(!validation);
      return;
    }

    setTimeout(() => {
      setCounter(counter - 1);
    }, 500);
  }, [counter]);

  return (
    <div className="flex flex-col relative place-items-center">
      <Newsletter setCounter={setCounter} setValidation={setValidation} validation={validation} />

      {validation === true && <ValidationNews />}
    </div>
  );
};

export default Container;
