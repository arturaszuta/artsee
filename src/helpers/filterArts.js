export default filterArts = (arts, param) => {

  function compare(a, b) {
   
    let newParam = param + '_count';
    return b[newParam] - a[newParam];
  }
  let arrayToBeSorted = Object.keys(arts).map((el) => {return {...arts[el], id: el}})

  arrayToBeSorted.sort ( compare );

  const result = arrayToBeSorted.map((el) => el.id);


  return result;

}