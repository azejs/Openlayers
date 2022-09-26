window.onload = init;
import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
 
import LayerGroup from 'ol/layer/Group';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Draw from 'ol/interaction/Draw';
 
 
import Snap from 'ol/interaction/Snap';
 
import VectorLayer from 'ol/layer/Vector';
 
 
 
      function init(){
        
        const OSMStandard = new TileLayer({
          source: new OSM(), 
          visible: true,
          title: 'OSMStandard',
        });
        const OSMHumanitaire = new TileLayer({
          source: new OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr./hot/{z}/{x}/{y}.png',
          }), 
          visible: true,
          title: 'OSMHumanitaire',
        });
        const  stamenTerrain = new TileLayer({
          source:  new XYZ({
            url:'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
            // url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.png',
            attributions:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
          }),
          title: 'stamenTerrain', 
          visible: true,
        });
        const satellite = new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB',
            maxZoom: 14,
          }),
          title: 'satellite', 
          visible: true,
        });
      // this is were the drawn features go
    
        const baseLayergroupe = new LayerGroup({
          layers:[OSMHumanitaire,stamenTerrain,satellite,OSMStandard] 
        })
  
      const map = new Map({
        target: 'map',
        // layers: [osm, stamen],
        view: new View({

          center:  new fromLonLat([-6.240234,33.100745]),
          zoom: 4,
          maxZoom:40,
          minZoom:4,
          rotation:0.5,
         

        })
      }); 

      map.addLayer(baseLayergroupe);
         
      const changeCouches = document.querySelectorAll('.sidebar > ul > li >a> input[type=radio]');
    for(let changeCouche of changeCouches){
      changeCouche.addEventListener('change', function(){
        let changeCoucheValue = this.value;
        baseLayergroupe.getLayers().forEach(function(element){
           let baseCouhceLayers = element.get('title');
           element.setVisible(baseCouhceLayers===changeCoucheValue)
           console.log(element.get('title'),element.get('visible'))
        })
      })
    }
           // features in this layer will be snapped to
           const baseVector = new VectorLayer({
            source: new VectorSource({
              format: new GeoJSON(),
              url: './data/maroc.geojson',
            }),
            style: {
              'fill-color': 'rgba(255, 0, 0, 0.3)',
              'stroke-color': 'rgba(255, 0, 0, 0.9)',
              'stroke-width': 2,
            },
            visible: true,
          });
            map.addLayer(baseVector)
    

            const drawVector = new VectorLayer({
              source: new VectorSource(),
              style: {
                'stroke-color': 'rgba(100, 255, 0, 1)',
                'stroke-width': 3,
                'fill-color': 'rgba(100, 255, 0, 0.3)',
              },
            });
 
            map.addLayer(drawVector)
            let drawInteraction;

            const snapInteraction = new Snap({
              source: baseVector.getSource(),
            });

            const typeSelect = document.getElementById('type');

            function addInteraction() {
              const value = typeSelect.value;
              if (value !== 'None') {
                drawInteraction = new Draw({
                  type: value,
                  source: drawVector.getSource(),
                  trace: true,
                  traceSource: baseVector.getSource(),
                  style: {
                    'stroke-color': 'rgba(255, 255, 100, 0.5)',
                    'stroke-width': 3,
                    'fill-color': 'rgba(255, 255, 100, 0.25)',
                    'circle-radius': 6,
                    'circle-fill-color': 'rgba(255, 255, 100, 0.5)',
                  },
                });
                map.addInteraction(drawInteraction);
                map.addInteraction(snapInteraction);
              }
            }

            typeSelect.onchange = function () {
              map.removeInteraction(drawInteraction);
              map.removeInteraction(snapInteraction);
              addInteraction();
            };
            addInteraction();
                }

                    
                    
            

                   