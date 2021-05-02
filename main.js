let header = document.querySelector(".header"),
  title = document.querySelector(".title"),
  hadeth_container = document.querySelector(".hadeth-container .ha"),
  number = document.querySelector(".hadeth-container .number"),
  prev = document.querySelector(".hadeth .prev"),
  next = document.querySelector(".hadeth .next"),
  index = 0,
  pig_mahdra = document.querySelector(".mahdrat .mahdra-large iframe"),
  sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li"),
  bars=document.querySelector(".bars"),
  albdr = [
    "https://www.youtube.com/embed/sAGUrYTLrOA",
    "https://www.youtube.com/watch?v=wi4NnUN_2yw",
    "https://www.youtube.com/watch?v=OoT385SmU54&list=PLNUarptHuvPXAxQJU3mpzjQgZgBu-hPSx",
    "https://www.youtube.com/watch?v=q2hVTbuNKhc&list=PLNUarptHuvPUUkTyGy133aWAtOaV6Jiot",
    "https://www.youtube.com/watch?v=z3NWKxFzBLk&list=PLNUarptHuvPWIe2MJverm9ollW2Gx85Ck",
    "https://www.youtube.com/watch?v=XsdYct9Lqtc",
    "https://www.youtube.com/watch?v=QOLnjBNXPPE",
    "https://www.youtube.com/watch?v=qcc37lU_f7k"
   
  ],
  mahdraLink = document.querySelectorAll(".mahdrat .small a"),
  small_mahdra=document.querySelectorAll(".small-mahdra div p"),
  qConainer = document.querySelector(".quran .container .surasContainer"),
  popup = document.querySelector(".popup"),
  ayapcontainer = document.querySelector(".popup .ayapcontainer"),
  closePopup = document.querySelector(".popup i"),
  ayaaudio = document.querySelector(".popup  .audio-container audio"),
  ayataray = [],
  scroll_up=document.querySelector(".scroll_up");
  function changeAya(i) {
    if (i < ayataray.length) {
      ayaaudio.src = ayataray[i].audio.primary;
  
      ayaaudio.play();
    }
  }
 
window.addEventListener("scroll", () => {
  // window.scrollY <280 ? title.style.display="block"  :title.style.display="none" ;
  if (window.scrollY > 100) {
    header.classList.add("active");
  // title.classList.add("active");
  } else {
    header.classList.remove("active");
 //   title.classList.remove("active");
  }
});
window.addEventListener("scroll",()=>{
window.scrollY>300?scroll_up.classList.add("active"):scroll_up.classList.remove("active");
});
scroll_up.addEventListener("click",()=>{
window.scrollTo(0,0);
});
function hadith_changer(index) {
  fetch(
    "https://api.hadith.sutanlab.id/books/bukhari?range=1-300%22,%22error%22:true"
  )
    .then((response) => {
      return response.json(); // converting byte data to json
    })
    .then((data) => {
      let hadiths = data.data.hadiths;
      hadeth_container.innerHTML = hadiths[index].arab;
      number.value = index + 1;
    });
}
let x = Math.floor(Math.random() * 299);
index = x;
hadith_changer(index);
prev.addEventListener("click", () => {
  if (index < 300) {
    hadith_changer(++index);
  }
});
next.addEventListener("click", () => {
  if (index > 0) {
    index--;
    hadith_changer(index);
  }
});

number.onfocus = function () {
  number.placeholder = "";
};
number.onblur = function () {
  number.placeholder = index + 1;
};
number.onchange = function () {
  let i = parseInt(number.value);
  if (i < 301 && i > 0) {
    index = i - 1;
    hadith_changer(index);
  }
};
pig_mahdra.src = albdr[0];
let mLI = Math.ceil(Math.random() * albdr.length);
let pindex=0
mahdraLink.forEach((link) => {
  let videoId =albdr[mLI].split("v=")[1].substring(0,11);
  var ytApiKey = "AIzaSyBWqSch6Ch2-yyKqHN9WctUFS7YrgkCmMQ";
  fetch( `https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=${videoId}&key=${ytApiKey}`).then((response) => {
    return response.json(); // converting byte data to json
  })
  .then((data) => {
   
   link.innerHTML=`<div class="small"><div class="small-mahdra"><p>${data.items[0].snippet.localized.title}</p></div>`;
  });
    //var obj = $.parseJSON(data);
    
 
  
  link.href = albdr[mLI];
  if (mLI < albdr.length - 2) {
    mLI++;
  } else {
    mLI = 1;
  }
});
bars.addEventListener("click",()=>{
  document.querySelector(".header ul").classList.toggle("active");
  if(!header.classList.contains("active")){
     header.classList.add("active");
  }
})
window.addEventListener("scroll",()=>{
 



links.forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    sections.forEach((section) => {
      if (section.classList.contains(link.dataset.filter)) {
        section.scrollIntoView(() => {
          behavior: "smooth";
        });
      }
     
    });
   
  });
})
});
function AddInqConainer() {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((response) => {
      return response.json(); // converting byte data to json
    })
    .then((data) => {
      for (let sora in data.data) {
        qConainer.innerHTML += `
  <div>
  <p>${data.data[sora].name.long}</p>
  <p>${data.data[sora].name.transliteration.en}</p>
  </div>`;
      }
      let dAll = document.querySelectorAll(".surasContainer div");
      let istwpa = false;
      dAll.forEach((dOne, index) => {
        dOne.addEventListener("click", () => {
          if (index + 1 != 9 && index + 1 != 1) {
            ayapcontainer.innerHTML = `<div>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
            ayaaudio.src =
              "https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3";
            ayaaudio.play();
          } else {
            ayaaudio.src = "./audio/الاستعاذة اعوذ بالله من الشيطان الرجيم.m4a";
            ayaaudio.play();
            ayapcontainer.innerHTML = `<div>اعوذ بالله من الشيطان الرجيم</div>`;
          }

          fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              popup.classList.add("active");
              let ayat = data.data.verses;
              ayat.forEach((aya) => {
                ayapcontainer.innerHTML += `
  <div>${aya.text.arab}</div>
  `;

                ayataray.push(aya);
              });
            });
          let i = 0;
          let ayad = document.querySelector(".ayapcontainer");
          let l = ayad.children;
          l[i].classList.add("active");
          ayaaudio.addEventListener("ended", () => {
            changeAya(i++);
            l[i - 1].classList.remove("active");
            l[i].classList.add("active");
            if(i>3){
                  l[i-3].scrollIntoView(
            ()=>{
              top:40
            }
            )
            }
        
          });

          closePopup.addEventListener("click", () => {
            popup.classList.remove("active");
            ayaaudio.pause();
            ayaaudio.src = "";
            i = 0;
            ayataray = [];
            ayapcontainer.innerHTML = "";
          });
        });
      });
    });
}

AddInqConainer();


