const sisbenScoreHandler = scoreText => parseFloat(scoreText.replace(',', '.'));

const convertToNumber = text => parseInt(text);

const userNameHandler = (name, lastname) => {
  const fullname = `${name} ${lastname}`;
  return fullname
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
};

module.exports = {
  sisbenScoreHandler,
  convertToNumber,
  userNameHandler,
};
