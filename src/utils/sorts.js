// Sort Columns/Card
export const mapOrder = (originArray, orderArray, key) => {
  if (!originArray || !orderArray || !key) return []
  return [...originArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}
