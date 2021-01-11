export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getCurrentYear(){
  let d = new Date();
  return d.getFullYear();
}

export function convertPriceToText(value: number){
  return value.toLocaleString("id-ID", {
    currency: "IDR",
    style: "currency",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}