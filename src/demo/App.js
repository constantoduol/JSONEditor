import React from 'react';
import {JSONViewer, JSONEditor} from '../lib';
// npm run build
// to compile a production version
//npm publish to publish
const App = () => (
  <div>
    <JSONEditor 
      data={{
          "mobile": {
            "possibleLengths": {
              "national": "5"
            },
            "exampleNumber": "40123",
            "nationalNumberPattern": "4\\d{4}"
          },
          "id": "AC",
          "generalDesc": {
            "nationalNumberPattern": "[46]\\d{4}|[01589]\\d{5}"
          },
          "countryCode": "247",
          "uan": {
            "possibleLengths": {
              "national": "6"
            },
            "exampleNumber": "542011",
            "nationalNumberPattern": "[01589]\\d{5}"
          },
          "references": {
            "sourceUrl": "http://www.itu.int/oth/T02020000AF/en"
          },
          "internationalPrefix": "00",
          "fixedLine": {
            "possibleLengths": {
              "national": "5"
            },
            "exampleNumber": "62889",
            "nationalNumberPattern": "6[2-467]\\d{3}"
          }
        }}
      view="dual"
      collapsible
      onChange={this.onJsonChange}
    />
  </div>
);

export default App;
