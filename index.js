
function getTimeString(time){
    const hour = parseInt(time/3600)
    let second = time % 3600
    const minute = parseInt(second/60)
    second = second % 60
    return `${hour} hour ${minute} minute ${second} second ago`
}

const removeActiveClass = () =>{
 const buttons = document.getElementsByClassName("category-btn")
 for(const btn of buttons){
    btn.classList.remove("active")
 }
 
}

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategiries(data.categories))
    .catch((error) => console.log(error))
}

const loadVideos = (searchText ="") =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
}

const loadCategoriesVideo = (id)=>{
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        //   remove all active button 
         removeActiveClass()
        // active id
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}

const videoDetails =async (videoId)=>{
    console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.video)
}
 const displayDetails = (video=>{
    console.log(video)

    const detailContainer = document.getElementById("modal-content")
    detailContainer.innerHTML = `

     <img src="${video.thumbnail}"/>
     <p class="pt-4">${video.description}</p>
    `
    // way-1
    // document.getElementById("showModaldata").click()

    // way-2
    document.getElementById("customModal").showModal()
 })

const cardDemo = {
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
            "profile_name": "Kevin Hart",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
}

const displayVideos = (videos) =>{
    const videosContainer = document.getElementById('videos')
    videosContainer.innerHTML = ""

    if(videos.length == 0){
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = 
        `
        <div class="min-h-[300px] flex flex-col items-center justify-center space-y-5">
        <img src="./assets/Icon.png"/>
        <h2 class="text-xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
        </div>

        `
        return;
    }
    else{
        videosContainer.classList.add('grid')
    }
    videos.forEach((video) =>{
        console.log(video)
        
        const card = document.createElement('div')
        card.classList = "card card-compact"
        card.innerHTML = 
        `
        
  <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes"/>
      ${
        video.others.posted_date?.length == 0 ? '':
        `<span class="absolute text-xs right-3 bottom-2 bg-black px-3 py-1 text-white">${getTimeString(video.others.posted_date)}</span>`
    }
      
  </figure>
  <div class="px-0 py-3 flex gap-2">
   <div>
   <img class="w-10 h-10 rounded-full" src=${video.authors[0].profile_picture}/>
   </div>
    
   <div class="space-y-1">
   <h2 class="text-lg font-semibold">${video.title}</h2>
   <div class="flex items-center gap-2">
   <p>${video.authors[0].profile_name}</p>
   ${video.authors[0].verified == true? 
    '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>':''
    }
   </div>
   
   <p><button onclick="videoDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
   </div>
  </div>
        `
    videosContainer.append(card)
})
}

/* category: "Music"
category_id: "1001" */

// create display categories
const displayCategiries = (categories) =>{
    categories.forEach((item) => {
        console.log(item)
        // create button
        const categoryContainer = document.getElementById("category")
        const buttonContainer = document.createElement('div')
         buttonContainer.innerHTML = 
         `
         <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn">
         ${item.category}
         </button>
         ` 
         categoryContainer.append(buttonContainer)
    });
}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value)
})
loadCategories()
loadVideos()