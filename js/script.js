const tanah = document.querySelectorAll('.tanah');
const qiqi = document.querySelectorAll('.qiqi');
const papanSkor = document.querySelector('.papan-skor');

let tanahSebelumnya;
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

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) * min);
}

function munculkanTikus(tanah) {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(10, 120);
    tRandom.classList.add('muncul');
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTikus(tanah);
        } else {
            alert('Selamat Anda Mendapatkan Uang Rp. ' + skor.toLocaleString('id-ID'));
        }
    }, wRandom);
}

function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculkanTikus(tanah);
    setTimeout(() => {
        selesai = true;
    }, 10000);
}

function pukul() {
    skor += 1000;
    this.parentNode.classList.remove('muncul');
    papanSkor.textContent = skor.toLocaleString('id-ID');
}

qiqi.forEach(q => {
    q.addEventListener('click', pukul);
});