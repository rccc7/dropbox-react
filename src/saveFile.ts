// Important: The following three function will not work if the origin server hast not enabled CORS *
// 'Access-Control-Allow-Origin' *. that is enable fetching from remote servers 

import axios from "axios";


// Firebase doesn't have this option enabled so it won't work.
export function saveFileFromExternalURL(externalURL: string, customName: string){
    
    window.URL = window.URL || window.webkitURL;
    let xhr = new XMLHttpRequest(),
        a = document.createElement('a'), file;
    xhr.open('GET', externalURL, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        file = new Blob([xhr.response], { type : 'application/octet-stream' });
        a.href = window.URL.createObjectURL(file);
        a.download = customName;  // Set to whatever file name you want
        // Now just click the link you created
        // Note that you may have to append the a element to the body somewhere
        // for this to work in Firefox
        a.click();
    };
    xhr.send();
}

export async function saveFileFromExternalURLAsBlob(externalURL:string, customName:string){
    let blob = await fetch(externalURL).then(r => r.blob()).then((blobresp) => {
        var blob = new Blob([blobresp], {type: "octet/stream"});
        var url = window.URL.createObjectURL(blob);
 
        var link = document.createElement("a");
        link.download = customName;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
    })
    // console.log('The blob>>>', blob)
}

export async function saveFileUsingAxios(externalURL:string, customName:string){
    axios.get(externalURL, {
        headers: {
            
          "Content-Type": "application/octet-stream"
        },
        responseType: "blob"
      })
        .then(response => {
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(response.data);
          a.href = url;
          a.download = customName;
          a.click();
        })
        .catch(err => {
          console.log("error", err);
        });
}