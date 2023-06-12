aturCanvas();
setJudul("Fisika Laboratorium Asik");
hapusLayar("#1b53a8");

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

var fileGUI = {
	bg: "images/bg1.jpg",
	judul: "images/FilasikBig.png",
	juduls: "images/FilasikSmall.png",
	bg_setting: "images/bg_setting.png",
	avatar: "images/avatar.png",
	tombol_home: "images/tombol_home.png",
	tombol_mulai: "images/tombol_mulai.png"
};

var inputNama = {nama:"nama", x:520, y:350, p:200, t:30, huruf:"13pt Calibri", val:"", max:30, limit:"*", warnaLayar:"#f0f0f0"};
var popup1 = {x:400, y:250, l:400, t:150, warnaBG:"#f7f7f7", warnaGaris:"#bababa", val:"", huruf:"14pt-Calibri-center-1.5", warnaHuruf:"#8c1515", tutup:"ok", func: ceknamaPengguna}

var namaPengguna = "";
var noSimulasi = 1;
var mainTimer;

preload(fileGUI, halamanJudul);

function halamanJudul(){
	hapusLayar();
	gambar(dataGambar.bg, 0, 0);
	gambar(dataGambar.judul, 240, 50);
	tombolImg("mulai", 400, 300, 337, 103, dataGambar.tombol_mulai);
}

function halamanNama(){
	hapusLayar();
	gambar(dataGambar.bg, 0, 0);
	kotak(0,0,canvas.width, canvas.height, 1, "none", "rgba(19,41,155,0.7)");
	gambar(dataGambar.juduls, 330, 150);
	gambar(dataGambar.avatar, 600, 50);
	gambar(dataGambar.bg_setting, 400, 250);
	
	teksHTML("Selamat datang di <b>FILASIK</b>, <br>sebelum memulai tuliskan nama anda terlebih dahulu !", 500, 280, 250, "12pt-Arial-center-1.6", "#690608");
	teksInput(inputNama);
	
	tombol("OK/id=cek_nama", 575, 400, 80, 30, "bold 14pt Calibri", "white", "#12b098", "#12b098", "r");
}

function halamanMenu(){
	hapusLayar("#b3cfe5", {stat:"clear"});
	gambar(dataGambar.bg, 0, 0);
	kotak(0,0,canvas.width, canvas.height, 1, "none", "rgba(19,41,155,0.7)");
	gambar(dataGambar.juduls, 450, 50);

	
	kotakrs(300, 480, 600, 100, 10, 2, "#8f8f8f", "#e6e6e6", "black");
	gambar(dataGambar.avatar, 150, 380);
	teksHTML("Haiii... <b>"+namaPengguna+"</b> silahkan <b>Klik Simulasi Fisika</b> yang anda inginkan<br>Klik tombol kembali jika anda ingin memilih ulang jenis simulasi!", 350, 500, 500, "12pt-Arial-center-1.6", "#690608");

	tombol("Suhu dan Konversi Suhu/id=Suhu", 450, 220, 300, 40, "bold 14pt Calibri", "white", "#d49715", "#d49715", "r");
	tombol("Peneraan Termometer/id=Peneraan", 450, 300, 300, 40, "bold 14pt Calibri", "white", "#d49715", "#d49715", "r");	
}

function tambahHome(){
	gambar(dataGambar.juduls, 880, 10);
	tombolImg("home", 10, 10, 60, 60, dataGambar.tombol_home, keluarSimulasi);
}

function halamanSimulasi(){
	hapusLayar("#b3cfe5", {stat:"run", func:tambahHome});
	if (noSimulasi == 1) Suhu();
	if (noSimulasi == 2) Peneraan();
}

function ceknamaPengguna(){
	if (namaPengguna == ""){
		halamanNama();
	}else{
		resetInteraktif();
		halamanMenu();
	}
}

function mouseDown(event){
	canvas.onmousemove = mouseDrag;
}

function mouseDrag(event){
}

function mouseUp(event){
	cekTeksInput(event);
	cekPopup(event);
	var tombolAktif = cekTombol(event);
	if (tombolAktif != ""){
		if (tombolAktif == "mulai"){
			resetInteraktif();
			halamanNama();
		}
		if (tombolAktif == "cek_nama"){
			if (inputNama.val == "nama" || inputNama.val == ""){
				popup1.val = "Anda belum mengetikan nama, silahkan <b>klik pada kolom nama<b> dan ketikan nama anda!";
			}else{
				namaPengguna = inputNama.val;
				popup1.val = "Salam <b>"+namaPengguna+"</b>, selamat datang di <b>Filasik</b>. Disini anda dapat mencoba beberapa simulasi Fisika";
			}
			popup(popup1); 
		}
		if (tombolAktif == "Suhu"){
			noSimulasi = 1;
			resetInteraktif();
			halamanSimulasi();
		}
		if (tombolAktif == "Peneraan"){
			noSimulasi = 2;
			resetInteraktif();
			halamanSimulasi();
		}
		if (tombolAktif == "home"){
			resetInteraktif();
			halamanMenu();
		}
	}
	canvas.onmousemove = null;
}
function keluarSimulasi(){
	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUp;
	window.clearTimeout(mainTimer);
	resetInteraktif();
	halamanMenu();
}