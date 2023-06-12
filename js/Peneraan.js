function Peneraan (){
	aturCanvas();
	setJudul("Peneraan Termometer");
	hapusLayar("#b3cfe5");

	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUp;
	
	var suhuC = 27;
	var suhuX = 52;
	var suhuY = 46;

	var slider1 = {tipe:"H", nama:"suhu", x:770,y:320, p:200, minS:0, maxS:100, valS:27, desimal:0, label:"°C"}
	var graf = {startX:170, startY:90, dataW:63, dataH:60, tileW:7.56, skalaX:1, skalaY:2, desimalX:0, desimalY:1, offsetX:-0.5, offsetY:53, xLabel:"noaxis", yLabel:"y (mm)", fontLabel:'bold 6pt Calibri', warnaBG:'#dbf4d8', warnaGaris:'#00cc99', warnaLabel:'#000'}
	
	var termo1 = {x:247, y:110, l:30, t:350, min:0, max:120, val:27, offset: 15, warnaGaris: "#000", warnaIsi: "red",label:["", ""]}
	var termo2 = {x:391, y:110, l:30, t:350, min:0, max:150, val:52, offset: 15, warnaGaris: "#000", warnaIsi: "blue",label:["", ""]}
	var termo3 = {x:534, y:110, l:30, t:350, min:0, max:160, val:46, offset: 15, warnaGaris: "#000", warnaIsi: "yellow",label:["", ""]}

	
	function setSimulasi() {
		hapusLayar();
		teks("Peneraan Termometer", 0.5*(canvas.width), 40, 'bold 18pt Calibri', 'blue', 'center');
		teks("Peneraan termometer skala Celcius terhadap termometer tanpa skala", 0.5*(canvas.width), 60, "12pt Calibri", "#000", "center");
		teks("(1 kotak = 2 milimeter)", 400 , 560, "12pt Calibri", "#000", "center");
		teks("Termometer Celcius", 865 , 205, "bold 12pt Calibri", "#000", "center");
		teks("Termometer Biru", 855 , 235, "bold 12pt Calibri", "#000", "center");
		teks("Termometer Kuning", 865 , 265, "bold 12pt Calibri", "#000", "center");

		garis(760, 200, 790, 200, 5, "red");
		garis(760, 230, 790, 230, 5, "blue");
		garis(760, 260, 790, 260, 5, "yellow");
		
		teks("Temperatur = "+suhuC+"°C", slider1.x-15, slider1.y-20, "bold 13pt Calibri", "black", "left");
		slider(slider1);
	
		grafik(graf);
				
		termo1.val = suhuC;
		suhuX = (suhuC*6/5)+20;
		termo2.val = suhuX;
		suhuY = (suhuC*4/5)+18;
		termo3.val = suhuY;
		termometer(termo1);
		termometer(termo2);
		termometer(termo3);
		
	}

	function mouseDown(event){
		canvas.onmousemove = mouseDrag;
	}

	function mouseDrag(event){
		var sliderAktif = cekSlider(event);
		if (sliderAktif != null){
			if (sliderAktif.nama == "suhu") {
				suhuC = Number(sliderAktif.valS);
				setSimulasi();
			}
		}
	}

	function mouseUp(event){
		canvas.onmousemove = null;
}
	setSimulasi();
}