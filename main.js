window.onload = init;
import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import Stamen from 'ol/source/Stamen';
import LayerGroup from 'ol/layer/Group';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
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
        baseLayergroupe.getLayers().forEach(function(element, index, array){
           let baseCouhceLayers = element.get('title');
           element.setVisible(baseCouhceLayers===changeCoucheValue)
           console.log(element.get('title'),element.get('visible'))
        })
      })
    }
          console.log(changeCouche);



          // vector marocain 
          const marocainVector = new VectorImageLayer({
           source: new VectorSource({
            url: '.data/nationale.geojson',
            format: new GeoJSON(),
           }),
           visible: true,
           title: 'Maroc',
          })
          map.addLayer(marocainVector);
          1


 
     };

                    
                    
            

                   