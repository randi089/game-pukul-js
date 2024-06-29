const tanah = document.querySelectorAll(".tanah");
const qiqi = document.querySelectorAll(".qiqi");
const papanSkor = document.querySelector(".papan-skor");

let tanahSebelumnya;
let voiceSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomVoice() {
  const voice = Math.floor(Math.random() * 2);
  if (voice == voiceSebelumnya) {
    randomVoice();
  }
  voiceSebelumnya = voice;
  return voice;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) * min);
}

function munculkanTikus(tanah) {
  const qiqia = document.querySelector(".qiqia");
  const qiqia1 = document.querySelector(".qiqia1");
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(10, 120);
  const vRandom = randomVoice();
  tRandom.firstElementChild.classList.remove("qiqib");
  tRandom.classList.add("muncul");
  if (vRandom == 0) {
    qiqia.play();
  } else {
    qiqia1.play();
  }
  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      munculkanTikus(tanah);
    } else {
      Swal.fire({
        title: "Selamat",
        text: "Anda Mendapatkan Uang Rp.  " + skor.toLocaleString("id-ID"),
        icon: "success",
        confirmButtonColor: "#007BFF",
      });
    }
  }, wRandom);
}

function mulai() {
  const ost = document.querySelector(".ost");
  ost.play();
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus(tanah);
  setTimeout(() => {
    ost.pause();
    ost.currentTime = 0;
    selesai = true;
  }, 10000);
}

function pukul() {
  const slash = document.querySelector(".slash");
  const slash1 = document.querySelector(".slash1");
  if (this.parentNode.classList.contains("muncul")) {
    slash.pause();
    slash.currentTime = 0;
    slash1.pause();
    slash1.currentTime = 0;
    slash.play();
    slash1.play();
    this.classList.add("qiqib");
    skor += 1000;
    this.parentNode.classList.remove("muncul");
    papanSkor.textContent = skor.toLocaleString("id-ID");
  }
}

qiqi.forEach((q) => {
  q.addEventListener("click", pukul);
});
