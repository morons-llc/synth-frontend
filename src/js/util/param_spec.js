function ParamSpec(sourceLow, sourceHigh, distLow, distHigh) {
  const domain = sourceHigh - sourceLow
  const range = distHigh - distLow

  function map(val) {
    return (((val - sourceLow) / domain) * range) + distLow
  }

  function unmap(val) {
    return (((val - distLow) / range) * domain) + sourceLow
  }

  return { map, unmap }
}

export default ParamSpec
