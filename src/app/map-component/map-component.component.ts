import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import { indexOf } from '@amcharts/amcharts4/.internal/core/utils/Array';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  constructor() { }

    // ans ARRAY MAINTAINS THE RECORD OF ALL THE ID'S OF COUNTRIES SELECTED
    private ans : String[] = [];
  
  
    private chart: am4maps.MapChart;

  ngOnInit(): void {

      this.chart = am4core.create("chartdiv",am4maps.MapChart);
      this.chart.geodata = am4geodata_worldHigh;
      this.chart.projection = new am4maps.projections.NaturalEarth1();
  
      let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.mapPolygons.template.strokeWidth = 0.5;
      polygonSeries.useGeodata = true;
      // polygonSeries.exclude = ["AQ"];
  
      let polygonTemplate = polygonSeries.mapPolygons.template;
      // THIS METHOD HELPS TO PRINT THE NAMES OF COUNTRY ON HOVER
      polygonTemplate.tooltipText = '{id} : {name}';
      
      
    
      // THIS IS TO HANDLE THE DEFAULT COLOR OF MAP
      polygonTemplate.polygon.fillOpacity = 0.8;
      polygonTemplate.fill = am4core.color("#808080");
  
      // THIS IS TO HANDLE HOVER COLOR OF COUNTRY
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#74X999");
      // hs.properties.fill = this.chart.colors.getIndex(1);
  
      // THIS IS TO HANDLE THE AFTER CLICK COLOR OF COUNTRY
      var activeState = polygonTemplate.states.create("active");
  // activeState.properties.fill = this.chart.colors.getIndex(2);
      activeState.properties.fill = am4core.color("#00008b");
  
  
      polygonTemplate.events.on("hit", (ev) => {
       
        // console.log("id: ", ev.target._dataItem['_dataContext']['id']);
  
        if(ev.target._dataItem['_dataContext']['id']){
  
          
          
          if(this.ans.includes(ev.target._dataItem['_dataContext']['id'])){
            let index = indexOf(this.ans,ev.target._dataItem['_dataContext']['id'])
            this.ans.splice(index,1);
            ev.target.isActive = !ev.target.isActive;
          }
  
          else{
            this.ans.push(ev.target._dataItem['_dataContext']['id']);
            ev.target.isActive = !ev.target.isActive;
          }
  
        }
        
        console.log(this.ans)
      })
  }

  ngOnDestroy(){
    if(this.chart){
      this.chart.dispose();
    }
  }
  

}
