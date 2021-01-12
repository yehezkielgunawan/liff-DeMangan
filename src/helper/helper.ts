import { MenuItemType, OrderedItemType } from "../components/MenuContainer";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getCurrentYear() {
  let d = new Date();
  return d.getFullYear();
}

export function convertPriceToText(value: number) {
  return value.toLocaleString("id-ID", {
    currency: "IDR",
    style: "currency",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

export function countQtyByType(items: OrderedItemType[], type: MenuItemType) {
  return items
    .filter((item) => item.type === type && item.qty > 0)
    .reduce((prev, curr) => prev + curr.qty, 0);
}
