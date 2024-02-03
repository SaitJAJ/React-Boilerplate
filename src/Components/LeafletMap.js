import {useEffect, useRef} from "react";

export default function LeafletMap(){
    const mapRef = useRef()
    let map;
    useEffect(() => {
        if(mapRef && mapRef.current){
            // This is the API key for my ArcGis account. Its free but we can use mine ATM
            const apiKey = "AAPK32a42f389c19427797b066aae489e1051fCSRLZe461fHqMhXOmahERtRv77LiehtVjik54LU5ubiFV_G87C9Y5C5JAGHWpz"
            // Basemap is the Map Picture that is rendered.
            const basemap = "arcgis/streets"
            // This is required to have run correctly in UseEffect.
            if(map !== undefined){
                map.remove();
            }
            // Defines map. By passing 'map' we tell it the ID of the Div to imbed map into
            map = L.map('map',{
                minZoom:2,
                maxZoom:20,
            })
            L.esri.Vector.vectorBasemapLayer(basemap, { apiKey: apiKey }).addTo(map);

            // Set the initial view (Would generally be set to user location)
            map.setView([51,-114],9)

            // Example of simple markers.
            let marker = L.marker([51, -114.014]).addTo(map);
            marker.bindPopup("I am a marker.")

            // Click on map, see what event data is called
            // map.on("click",(e)=>{
            //     console.log(e)
            // })
            let geoJ = L.geoJSON().addTo(map)
            getGeoJson("https://data.calgary.ca/resource/fwyk-8pth.geojson").then(data=>{
                geoJ.addData(data)
            })

        }
    }, []);
    const getGeoJson=async (link)=>{
        return await fetch(link).then(res=>{
            if(res.ok){
                return res.json()
            }
            throw new Error("Status "+res.status)
        }).then(data=>{
            return data;
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div id={"map"} style={{height:"900px",width:"600px",backgroundColor:"red"}} ref={mapRef}></div>
    )
}