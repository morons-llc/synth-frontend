function ParamSpec(sourceLow, sourceHigh, distLow, distHigh, clamp = true) {
  const domain = sourceHigh - sourceLow
  const range = distHigh - distLow
  let map
  let unmap

  if (clamp) {
    map = (val) => {
      let result

      if (val < sourceLow) result = distLow
      else if (val > sourceHigh) result = distHigh
      else result = (((val - sourceLow) / domain) * range) + distLow

      return result
    }

    unmap = (val) => {
      let result

      if (val < distLow) result = sourceLow
      else if (val > distHigh) result = sourceHigh
      else result = (((val - distLow) / range) * domain) + sourceLow

      return result
    }
  } else {
    map = (val) => {
      return (((val - sourceLow) / domain) * range) + distLow
    }

    unmap = (val) => {
      return (((val - distLow) / range) * domain) + sourceLow
    }
  }

  return { map, unmap }
}

export default ParamSpec
