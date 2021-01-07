export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getCurrentYear(){
  let d = new Date();
  return d.getFullYear();
}