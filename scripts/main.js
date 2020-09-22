const keyApi = '4d76e91f4c501ef72fa82cad607b6711';
let resultApi;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
    }, () => {
        alert(`Vous avez refusé la géolocalisation, comment vous donnez la météo de votre ville sans savoir où vous êtes ? 😓`)
    })
}

function AppelAPI(long, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        resultApi = data;

        temps.innerText = resultApi.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultApi.current.temp)}°`;
        localisation.innerText = resultApi.timezone;

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++){

            let heureInc = heureActuelle + i * 3;

            if(heureInc > 24){
                heure[i].innerText = `${heureInc - 24} h`;
            } else if (heureInc === 24) {
                heure[i].innerText = "00 h";
            } else {
                heure[i].innerText = ` ${heureInc} h`;
            }


        }
        
        for(let j = 0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultApi.hourly[j * 3].temp)}°`;
        }

})
}