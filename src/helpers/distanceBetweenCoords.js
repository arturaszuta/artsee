export default distance = (coordinate1, coordinate2) => {
  const toRadian = n => (n * Math.PI) / 180
  let lat2 = coordinate2.latitude
  let lon2 = coordinate2.longitude
  let lat1 = coordinate1.latitude
  let lon1 = coordinate1.longitude
  let R = 6371 // km
  let x1 = lat2 - lat1
  let dLat = toRadian(x1)
  let x2 = lon2 - lon1
  let dLon = toRadian(x2)
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
  return d
}