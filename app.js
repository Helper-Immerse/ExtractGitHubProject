const userInfo = document.getElementById("user-info");
const ulId = document.getElementById("ulreposit")
const teData = document.getElementById('textData');
const repoDisplay = document.getElementById('apart');

finalData();

function requestUserAccount(username){
    
    
    const xhr = new XMLHttpRequest();
    
    
    const url = `https://api.github.com/users/${username}`;
    
    //const repositoryApi = `https://api.github.com/users/${username}`;
    
    
    xhr.open('GET', url, true);
    
   
    xhr.onload = function() {
    
      
        const data = JSON.parse(this.response);
        
        
        console.log(data);
        const {avatar_url, name,bio, created_at, followers, following,id,location, login,public_repos,public_gists,email,twitter_username,updated_at} = data;
        const liEl = document.createElement("li");
        
        userInfo.innerHTML=`
        <div class="photo">
        <img src="${avatar_url}"/>
        <h3>User Name: ${login}<h3>
        <h3>Registered Name: ${name} </h3>
        <h3>Git id : ${id}</h3>
        <h3>Place : ${location}</h3>
        <h3>Email : ${email} </h3>
        <h3>Twitter :${twitter_username} </h3>
    </div>
    <div class="text-info">
        <h3>${bio}</h3>
            <div class="ffr">
                <h3> ${followers} Followers</h3>
                <h3> ${following} Following</h3>
                <h3> ${public_repos} Repositories</h3>
            </div>
            <div class="pracrp">
                <h4>${public_gists} Gists</h4>
                <h4>Created: ${created_at}</h4>
                <h4>Updated: ${updated_at}</h4>
            </div>
            
    </div>
        
        
        `;

    }
    
    // Send the request to the server
    xhr.send();
    
}




    async function showRepo(useraname){
        
        const firstHalf ="https://api.github.com/users/";
        const secondHalf="/repos"
        const halfApi= firstHalf + useraname + secondHalf;
        const response = await fetch(halfApi);
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.JSON){
            const delEl = document.createElement("div");
            delEl.innerHTML= `<h2>Current user's some good repos.</br>Click on the text to acess them</h2>`;
            repoDisplay.appendChild(delEl);
           
        }
        
        responseData.forEach(responsed=>{
            const {name}= responsed;
            console.log(name);
            const createEl = document.createElement('ul');
            createEl.classList.add('refer');
            createEl.innerHTML=`
            <li ><a href="https://github.com/${useraname}/${name}">${name}</a></li>
            `;
            repoDisplay.appendChild(createEl);
        });

       
        
        
    }

    function finalData() {
        
        const setValue = teData.value;
        if(setValue){
            requestUserAccount(setValue);
            showRepo(setValue);
            teData.value="";
        }

    }