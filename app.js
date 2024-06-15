const url = "http://universities.hipolabs.com/search?country=";
const btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("#country").value;
    let state = document.querySelector("#state").value;
    console.log(country, state);

    let collArr = await getCollege(country, state);
    console.log(collArr);
    show(collArr);
});

function show(collArr) {
    let list = document.querySelector("#list");
    list.innerHTML = "";
     for (let col of collArr) {
        console.log(col.name);

        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    }
}

async function getCollege(country, state) {
    try {
        let res = await axios.get(url + country);
        let universities = res.data;
        if(state){            
            universities = universities.filter(university => {
                return university["state-province"] && university["state-province"].toLowerCase() === state.toLowerCase();
            });
        }
        return universities;
    } catch (e) {
        console.log("error --- ", e);
        return [];
    }
}









