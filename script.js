//evitar click derecho en la pagina
document.oncontextmenu = function(){
	return false;
}

let textoModo = document.getElementById('modo');
let menu = document.getElementById('menu');
let menu2 = document.getElementById('menu2');
let menuGanador = document.getElementById('menuGanador');

let mensajeWin = document.getElementById('mensajeWin');

let modos = {
	frozen:{
		titulo:'Modo Pingui!🐧',
		clase:'nodoFrozen',
		mensajeWin:'Hallazte todos los peces 🐟 antes que los tiburones 🦈',
		normal:{fondo:'#88edf6',shadow:'0px 0px 3px 1px rgb(82 228 229)'},
		descubierto:{icono:'🐟',color:'blue',fondo:'rgb(27, 27, 27)',shadow:'none'},
		mina:{icono:'🦈',color:'orange',fondo:'rgb(27, 27, 27)',shadow:'none'},
		minador:{icono:'🐧',color:'red',fondo:'',shadow:'0px 0px 3px 1px rgb(82 228 229)'}		
	},
	panal:{
		titulo:'Modo Panal🐝',
		clase:'nodoPanal',
		mensajeWin:'Conseguiste todos los frascos de Miel 🍯 antes que los osos 🐻',
		normal:{fondo:'orange',shadow:'1px 1px 1px 4px orange'},
		descubierto:{icono:'🍯',color:'blue',fondo:'rgb(27, 27, 27)',shadow:'none'},
		mina:{icono:'🐻',color:'orange',fondo:'rgb(27, 27, 27)',shadow:'none'},
		minador:{icono:'🐝',color:'red',fondo:'',shadow:'1px 1px 1px 4px orange'}

	},
	toxico:{
		titulo:'Modo Toxic!☢',
		clase:'nodoToxico',
		mensajeWin:'Salvaste nuestras vidas ⛨☢ Gracias ⛑, ',
		normal:{fondo:'#12ff00',shadow:'0px 0px 15px 1px rgb(8 255 52)'},
		descubierto:{icono:'⛨',color:'#d50101',fondo:'rgb(27, 27, 27)',shadow:'none'},
		mina:{icono:'☢',color:'yellow',fondo:'rgb(27, 27, 27)',shadow:'none'},
		minador:{icono:'⛑',color:'red',fondo:'#2c8c25',shadow:'none'}
	}
}



let imagenBarra={icono:'◉',color:'blue'};
let estilo={color2:'#1b1b1b',color:'#343737'}






var container = document.getElementById('container');
var primerCuadrito=[1,1];
var primerJugada=false;

var allMinas=[];
var contadorBanderas=0;


class Contenedor{
	constructor(nMinas, nNodosH, nNodosV,container,size,modo){
		this.container = container;
		this.nMinas = nMinas;
		this.nNodosH = nNodosH;
		this.nNodosV = nNodosV;
		this.size = size;
		this.modo = modo;
		textoModo.innerHTML = this.modo.titulo;
		mensajeWin.innerHTML = this.modo.mensajeWin;

		this.nodos = new Array(this.nNodosH);
		for (var i = 0; i < this.nodos.length; i++) {
			this.nodos[i]= new Array(this.nNodosV);
		}
		this.crear();
		this.crearGrid();
		this.llenarGrid();
	}
	crear(){
		for (var i = 0; i < this.nNodosH; i++) {
			for (var j = 0; j < this.nNodosV; j++) {
				this.nodos[i][j]=new Nodo(i,j,this.modo);
			}
		}

		for(let i =0;i<this.nNodosV;i++){
			this.nodos[0][i].div.innerHTML=imagenBarra.icono; 
			this.nodos[0][i].div.style.opacity = '0';
			this.nodos[this.nNodosH-1][i].div.innerHTML=imagenBarra.icono; 
			this.nodos[this.nNodosH-1][i].div.style.opacity = '0';
			this.nodos[0][i].estado=4;
			this.nodos[this.nNodosH-1][i].estado=4;
		}

		for (var i = 0; i <this.nNodosH; i++) {
				this.nodos[i][0].div.innerHTML=imagenBarra.icono;
				this.nodos[i][0].div.style.opacity = '0';
			    this.nodos[i][this.nNodosV-1].div.innerHTML=imagenBarra.icono; 
			    this.nodos[i][this.nNodosV-1].div.style.opacity = '0';
				this.nodos[i][0].estado=4;
				this.nodos[i][this.nNodosV-1].estado=4;
		}
	}
	primerJuego(primerCuadrito){
	
			for (var i = 0; i <=2; i++) {
					for (var k = 0; k <=2; k++) {
						this.nodos[primerCuadrito[0]+1-i][primerCuadrito[1]+1-k].mina=true;
					}
			}

			this.addMinas();
			for (var i = 0; i <=2; i++) {
					for (var k = 0; k <=2; k++) {
						this.nodos[primerCuadrito[0]+1-i][primerCuadrito[1]+1-k].mina=false;
					}
			}
			this.contabilizar();

	}
	addMinas(){
		for (var i = 0; i < this.nMinas; i++) {
			var xm=Math.floor(Math.random() * this.nNodosH);
			var ym=Math.floor(Math.random() * this.nNodosV);
			while(this.nodos[xm][ym].mina || xm==0 || ym ==0 || xm==this.nNodosH-1 || ym == this.nNodosV-1){
				xm=Math.floor(Math.random() * this.nNodosH);
				ym=Math.floor(Math.random() * this.nNodosV);				
			}
				this.nodos[xm][ym].mina =true;
				allMinas.push(this.nodos[xm][ym]);

		}
	}
	contabilizar(){
		for (var i = 1; i < this.nNodosH-1; i++) {
			for (var j = 1; j < this.nNodosV-1; j++) {
				var numerominas=0;

					for (var a = 0; a <=2; a++) {
						for (var b = 0; b <=2; b++) {
							if (this.nodos[i+1-a][j+1-b].mina && (a!=1 || b!=1)) {
								numerominas++;
							}
						}
					}
				this.nodos[i][j].vecinos.primero = this.nodos[i-1][j-1];
				this.nodos[i][j].vecinos.segundo = this.nodos[i-1][j];
				this.nodos[i][j].vecinos.tercero = this.nodos[i-1][j+1];
				this.nodos[i][j].vecinos.cuarto = this.nodos[i][j-1];
				this.nodos[i][j].vecinos.quinto= this.nodos[i][j+1];
				this.nodos[i][j].vecinos.sexto=this.nodos[i+1][j-1];
				this.nodos[i][j].vecinos.septimo=this.nodos[i+1][j];
				this.nodos[i][j].vecinos.octavo=this.nodos[i+1][j+1];
				this.nodos[i][j].cambiarValor(numerominas);
			}
		}
	}
	crearGrid(){
		let gridFilas=`${this.size}px`;
		let gridColumns=`${this.size}px`;
		this.container.style.marginTop = `-${this.size}px`;
		for(let i=1;i<this.nNodosH;i++){gridFilas+=` ${this.size}px`;}
		for(let j=1;j<this.nNodosV;j++){gridColumns+=` ${this.size}px`;}
		this.container.style.gridTemplateColumns=gridColumns;
		this.container.style.gridTemplateRows=gridFilas;
	}
	llenarGrid(){
		var container = this.container;
		this.nodos.map(a=>{
			a.map(e=>{
			this.container.appendChild(e.div);
			})
		})
	}
	activarTodasLasMinas(){
		for (var i = 1; i < this.nNodosH-1; i++) {
			for (var j = 1; j < this.nNodosV-1; j++) {
				if(this.nodos[i][j].mina){
					if(this.nodos[i][j].estado==3){
					this.nodos[i][j].div.innerHTML =this.modo.descubierto.icono;
						this.nodos[i][j].div.style.color=this.modo.descubierto.color;	
						this.nodos[i][j].div.style.background=this.modo.descubierto.fondo;
					this.nodos[i][j].div.style.boxShadow =this.modo.descubierto.shadow;

					}else{
					this.nodos[i][j].div.innerHTML =this.modo.mina.icono
					this.nodos[i][j].div.style.color=this.modo.mina.color;
					this.nodos[i][j].div.style.boxShadow=this.modo.mina.shadow;	
					this.nodos[i][j].div.style.background=this.modo.mina.fondo;

					}
				}
	}}	
	}
}
class Nodo{
	constructor(x,y,modo){
		this.modo=modo;
		this.posX = x;
		this.posY = y;
		this.mina = false;
		this.valor = 0;
		this.estado = 1;
		this.div = document.createElement('div');
		this.div.classList.add(this.modo.clase);
	
		this.div.addEventListener('click',()=>{
			if(!primerJugada && this.estado!=4 && this.estado!=3){
				primerJugada=true;
				primerCuadrito=[this.posX,this.posY];
				agregarMinas(buscaMina,primerCuadrito);
				 this.seleccionar();
			     this.explosion();
			}else{
			if(this.estado==1){
			if(this.mina){
				this.div.innerHTML =this.modo.mina.icono
				this.div.style.color = this.modo.mina.color;
				this.div.style.boxShadow = this.modo.mina.shadow;
				this.estado=2;
				this.muerte();
			}else{
			     this.seleccionar();
			     this.explosion();
			}
			}
		}
		})
		this.div.addEventListener('auxclick',()=>{
			
			if(this.estado==3){
				contadorBanderas--;
				this.estado=1;
				this.div.innerHTML =' '
					this.div.style.background = this.modo.normal.fondo;
					this.div.style.boxShadow = this.modo.normal.shadow;
			}else if(this.estado==1){
				contadorBanderas++;
				this.estado=3;
			this.div.innerHTML =this.modo.minador.icono;
			this.div.style.background = this.modo.minador.fondo;
			this.div.style.boxShadow = this.modo.minador.shadow;
			}	
			var minasRestantes = allMinas.filter(e=>e.estado==1);
			
				if(primerJugada){
						if(contadorBanderas==allMinas.length && minasRestantes.length==0){
							this.ganar();
						}		
				}	
		})
		this.vecinos ={
				primero:null,
				segundo:null,
				tercero:null,
				cuarto:null,
				quinto:null,
				sexto:null,
				septimo:null,
				octavo:null
		}
	
	}
	seleccionar(){

		if(this.estado==1){
			if(this.valor!=0){

				this.div.innerHTML = this.valor;
				
			}
		
		}
	}
	cambiarValor(valor){
		this.valor = valor;	
	}
	explosion(){		
		if(this.valor==0 && this.estado==1){
			this.estado=2;
			this.div.style.background = estilo.color;
			this.div.style.border = 'none';
			this.div.style.boxShadow  = 'none';
				for(let i in this.vecinos){
					if(this.vecinos[i]!=null){
						this.vecinos[i].seleccionar();
						this.vecinos[i].explosion();
					}
				}		
		}else{
			if(this.estado==1){
				this.estado=2;
				//Estilos del estado seleccionado
				this.div.style.background = '#1b1b1b';
				this.div.style.boxShadow = 'none';
			}
		}
	}
	muerte(){
		activarMinas(buscaMina);
		menu.style.height = '100%';
	}
	ganar(){
		activarMinas(buscaMina);
		menuGanador.style.width = '100%';
		menuGanador.classList.add('mostrarWin')
	}

}

function activarMinas(buscaMina){
	let bus = buscaMina;
	bus.activarTodasLasMinas();
}


function agregarMinas(buscaMina,primerCuadrito){
	this.bus=buscaMina;
	this.bus.primerJuego(primerCuadrito);
}





let configTabla = {
	minas:10,
	x:11,
	y:11,
	size:48,
	modo:modos.panal
}


var buscaMina = new Contenedor(configTabla.minas,configTabla.x,configTabla.y,container,configTabla.size,configTabla.modo);
	


function cambiarNivel(contador){
		switch (contador) {
			case 1:
				configTabla.minas=10;
				configTabla.x=11;
				configTabla.y=11;
				configTabla.size=48;
				break;
			case 2:
				configTabla.minas=40;
				configTabla.x=18;
				configTabla.y=18;
				configTabla.size=28;
			break;
			case 3:
				configTabla.minas=99;
				configTabla.x=18;
				configTabla.y=32;
				configTabla.size=28;
			break;
			defaul:
				configTabla.minas=10;
				configTabla.x=11;
				configTabla.y=11;
				configTabla.size=48;
				break;
		}
	 allMinas=[];
	contadorBanderas=0;
	primerJugada=false;
	container.innerHTML='';
	buscaMina = new Contenedor(configTabla.minas,configTabla.x,configTabla.y,container,configTabla.size,configTabla.modo);
	menu.style.height = '0';
	menuGanador.style.width = '0';

}



function reiniciar(){
	menuGanador.classList.remove('mostrarWin');
	allMinas=[];
	contadorBanderas=0;
	primerJugada=false;
	container.innerHTML='';
	buscaMina = new Contenedor(configTabla.minas,configTabla.x,configTabla.y,container,configTabla.size,configTabla.modo);
	menu.style.height = '0';
	menuGanador.style.width = '0';
}



function cambiarModo(contador){
	allMinas=[];
	contadorBanderas=0;
	primerJugada=false;
	container.innerHTML='';
		switch (contador) {
			case 1:
				configTabla.modo = modos.panal;
				break;
			case 2:
				configTabla.modo = modos.frozen;
			break;
			case 3:
				configTabla.modo = modos.toxico;			
			break;
			defaul:
				configTabla.modo = modos.panal;
			break;
		}

	buscaMina = new Contenedor(configTabla.minas,configTabla.x,configTabla.y,container,configTabla.size,configTabla.modo);

	menu.style.height = '0';
	menuGanador.style.width = '0';

}









let openMenu = document.getElementById('OpenMenu');
openMenu.onclick = ()=>{
	menu2.style.height='100%';
}
menu2.onclick=()=>{
	menu2.style.height='0';
}





//estado 1=reposo;
//estado 2=seleccionado;
//Estado 3 = minador;//aveja
//estado=4 = pared;


