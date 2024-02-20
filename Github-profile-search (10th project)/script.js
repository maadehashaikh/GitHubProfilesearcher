let avatr_img = document.querySelector(".avatar");
let userName = document.querySelector(".username");
let UserBio = document.querySelector(".userBio");
let Followers = document.querySelector(".followers");
let Following = document.querySelector(".following");
let repositories = document.querySelector(".repositories");
let searchBox = document.querySelector("#search");


const API = "https://api.github.com/users/";
const getUser = async(username) =>{
  const response = await fetch(API + username);
  const data = await response.json();
  userName.textContent = data.name ;
  UserBio.textContent = data.bio;
  avatr_img.src = data.avatar_url;
  Followers.textContent = data.followers;
  Following.textContent = data.following;
  repositories.textContent = data.public_repos;
  getRepos(username);
}


const getRepos = async(username) =>{
 const repos = document.querySelector("#repos");
 const response = await fetch(API + username + "/repos");
 const data = await response.json();
 data.forEach(
  (item) => {
    const elemnt = document.createElement("a");
    elemnt.classList.add("repo");
    elemnt.href = item.html_url;
    elemnt.innerText = item.name;
    elemnt.target = "_blank";
    repos.appendChild(elemnt);
  }
 )
} 
const formSubmit = () =>{
  if(searchBox.value != ""){
   getUser(searchBox.value);
   searchBox.value ="";
  }
  return false
}
searchBox.addEventListener("focusout",function (){
   formSubmit()
})