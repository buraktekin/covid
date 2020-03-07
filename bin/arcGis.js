const qs = require("querystring")

// extracted source from  John Hopkins CSSE dashboard :/
// https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
const ROOT = "https://services1.arcgis.com/"
const RESOURCES = "0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time_v3/FeatureServer/0/"

const params = {
  f: 'json',
  where: '1=1',
  returnGeometry: 'false',
  spatialRel: 'esriSpatialRelIntersects',
  outFields: '*',
  orderByFields: 'Report_Date_String asc',
  resultOffset: '0',
  cacheHint: 'true'
}

const stringifyParams = () => qs.stringify(params)
const url = `${ROOT}${RESOURCES}query?${stringifyParams()}`

module.exports.url = url