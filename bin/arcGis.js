const qs = require("querystring")

// extracted source from  John Hopkins CSSE dashboard 😔
// https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
let ROOT = "https://services1.arcgis.com/"
let RESOURCES = "0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time_v3/FeatureServer/0/"

const params = {
  f: 'json',
  where: '1=1',
  returnGeometry: 'false',
  spatialRel: 'esriSpatialRelIntersects',
  outFields: '*',
  orderByFields: 'Report_Date_String desc',
  resultOffset: '0',
  cacheHint: 'true'
}

const generateURL = (location) => {
  if(location) {
    RESOURCES = "0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/"
    params.where = "Confirmed > 0"
    params.orderByFields = "Confirmed desc"
  }
  
  const url = `${ROOT}${RESOURCES}query?${qs.stringify(params)}`
  return url
}

module.exports.generateURL = generateURL