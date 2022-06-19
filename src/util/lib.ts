export const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const compareArrays = (a1: any[], a2: any[]) => {
  let i = a1.length;
  while (i--) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
};
