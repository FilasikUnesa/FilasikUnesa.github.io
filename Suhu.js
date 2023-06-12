function Suhu(){
	aturCanvas();
	setJudul("Suhu dan Konversi Suhu.js");
	hapusLayar("#b3cfe5");
	
	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUp;
	
	var suhuK = 300;
	var suhuC = 27;
	var suhuF = 80.6;
	var suhuR = 21.5;
	var suhuX = 52;
	var suhuInput = 0;

	var slider1 = {tipe:"H", nama:"suhu", x:850,y:350, p:200, minS:0, maxS:373, valS:300, desimal:0, label:"K"}
	var tombolAktif = "kelvin";

	var termo1 = {x:120, y:180, l:25, t:250, min:273, max:373, val:300, offset: 15, warnaGaris: "#f8f8f8", warnaIsi: "red",label:["273", "373"]}
	var termo2 = {x:270, y:180, l:25, t:250, min:0, max:100, val:27, offset: 15, warnaGaris: "#f8f8f8", warnaIsi: "red",label:["0", "100"]}
	var termo3 = {x:420, y:180, l:25, t:250, min:32, max:212, val:80.6, offset: 15, warnaGaris: "#f8f8f8", warnaIsi: "red",label:["32", "212"]}
	var termo4 = {x:570, y:180, l:25, t:250, min:0, max:80, val:21.5, offset: 15, warnaGaris: "#f8f8f8", warnaIsi: "red",label:["0", "80"]}
	var termo5 = {x:720, y:180, l:25, t:250, min:20, max:140, val:52, offset: 15, warnaGaris: "#f8f8f8", warnaIsi: "red",label:["20", "140"]}

	function setSimulasi() {
		hapusLayar();
		teks("Suhu dan Konversi Suhu", 0.5*(canvas.width), 70, 'bold 36pt Calibri', 'blue', 'center');
		teks("Simulasi perubahan suhu", 0.5*(canvas.width), 100, "24pt Calibri", "#000", "center");
		
		if(tombolAktif =="kelvin"){
			slider1.label="K";
			slider1.minS=0;
			slider1.maxS=373;
			
			teks("Temperatur = "+suhuInput+"K", slider1.x-15, slider1.y-20, "bold 16pt Calibri", "black", "left");
			
			suhuK=suhuInput;
			suhuC = suhuK-273;
			suhuF = (suhuC*9/5)+32;
			suhuR = suhuC*4/5;
			suhuX = (suhuC*6/5)+20;
		} else if (tombolAktif=="celcius"){
			slider1.label="°C";
			slider1.minS=0;
			slider1.maxS=100;
			
			teks("Temperatur = "+suhuInput+"°C", slider1.x-15, slider1.y-20, "bold 16pt Calibri", "black", "left");
			
			suhuC = suhuInput;
			suhuK = suhuC+273;
			suhuF = (suhuC*9/5)+32;
			suhuR = suhuC*4/5;
			suhuX = (suhuC*6/5)+20;
		} else if (tombolAktif=="farenheit"){
			slider1.label="°F";
			slider1.minS=0;
			slider1.maxS=212;
			
			teks("Temperatur = "+suhuInput+"°F", slider1.x-15, slider1.y-20, "bold 16pt Calibri", "black", "left");
			
			suhuF = suhuInput;
			suhuK = (suhuC+273);
			suhuC = (suhuF-32)*5/9;
			suhuR = suhuC*4/5;
			suhuX = (suhuC*6/5)+20;
		} else if (tombolAktif=="reamur"){
			slider1.label="°R";
			slider1.minS=0;
			slider1.maxS=80;
			
			teks("Temperatur = "+suhuInput+"°R", slider1.x-15, slider1.y-20, "bold 16pt Calibri", "black", "left");
			
			suhuR = suhuInput;
			suhuK = suhuC+273;
			suhuC = suhuR*5/4;
			suhuF = (suhuC*9/5)+32;
			suhuX = (suhuC*6/5)+20;
		} else if (tombolAktif=="skalaX"){
			slider1.label="°X";
			slider1.minS=-308;
			slider1.maxS=140;
			
			teks("Temperatur = "+suhuInput+"°X", slider1.x-15, slider1.y-20, "bold 16pt Calibri", "black", "left");
			
			suhuX = suhuInput;
			suhuK = suhuC+273;
			suhuC = (suhuX-20)*5/6;
			suhuF = (suhuC*9/5)+32;
			suhuR = suhuC*4/5;
		}
		
		termo1.val = suhuK;
		termo2.val = suhuC;
		termo3.val = suhuF;
		termo4.val = suhuR;
		termo5.val = suhuX;
		
		slider(slider1);
		
		
		tombol("kelvin", 785, 400, 65, 30, "bold 12pt Calibri", "white", "#12b098", "#12b098", "r");
		tombol("celcius", 865, 400, 65, 30, "bold 12pt Calibri", "white", "#12b098", "#12b098", "r");
		tombol("farenheit", 945, 400, 65, 30, "bold 12pt Calibri", "white", "#12b098", "#12b098", "r");
		tombol("reamur", 1025, 400, 65, 30, "bold 12pt Calibri", "white", "#12b098", "#12b098", "r");
		tombol("skalaX", 1105, 400, 65, 30, "bold 12pt Calibri", "white", "#12b098", "#12b098", "r");
		
		termometer(termo1);
		termometer(termo2);
		termometer(termo3);
		termometer(termo4);
		termometer(termo5);

		teks(suhuK.toFixed(2)+"K", termo1.x+20, 525);
		teks(suhuC.toFixed(2)+"°C", termo2.x+20, 525);
		teks(suhuF.toFixed(2)+"°F", termo3.x+20, 525);
		teks(suhuR.toFixed(2)+"°R", termo4.x+20, 525);
		teks(suhuX.toFixed(2)+"°X", termo5.x+20, 525);
	}


	function mouseDown(event){
		canvas.onmousemove = mouseDrag;
	}

	function mouseDrag(event){
		var sliderAktif = cekSlider(event);
		if (sliderAktif != null){
			if (sliderAktif.nama == "suhu") {
				suhuInput = Number(sliderAktif.valS);
				setSimulasi();
			}
		}
	}

	function mouseUp(event){
	var tombol = cekTombol(event);
	if (tombol != ""){
		if (tombol == "kelvin"){
			resetInteraktif();
			tombolAktif= tombol;
			setSimulasi();
		}else if(tombol == "celcius"){
			resetInteraktif();
			tombolAktif= tombol;
			setSimulasi();
		}else if(tombol == "reamur"){
			resetInteraktif();
			tombolAktif= tombol;
			setSimulasi();
		}else if(tombol == "farenheit"){
			resetInteraktif();
			tombolAktif= tombol;
			setSimulasi();
		}else if(tombol == "skalaX"){
			resetInteraktif();
			tombolAktif= tombol;
			setSimulasi();
		}
		
	}
	canvas.onmousemove = null;
}

	setSimulasi();
}