
export const shuffleObj = (object, setObject) => {
  const keys = Object.keys(object);
  const shuffledKeys = shuffleArray(keys);
  const shuffledList = {};
  
  shuffledKeys.forEach((key, index) => {
    shuffledList[index + 1] = object[key];
  });
  
  setObject(shuffledList);
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};