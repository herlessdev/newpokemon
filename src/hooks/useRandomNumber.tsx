import { useState } from "react";

const useRandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 10);
    setRandomNumber(random);
  };

  return { randomNumber, generateRandomNumber };
};

export default useRandomNumber;
