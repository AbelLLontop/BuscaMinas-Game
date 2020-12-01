//evitar click derecho en la pagina
document.oncontextmenu = function(){
	return false;
}

let descubierto = {icono2:'⛨',icono:'🍯',color:'blue'};

let mina = {icono2:'☢',icono:'🐻',color:'orange'};
let color3= 'blue';
let minador={icono:'🐝',icono2:'⛑',color:'red'};

let imagenBarra={icono:'◉',color:'blue'};


var container = document.getElementById('container');

var primerCuadrito=[1,1];
var primerJugada=false;

class Contenedor{
	constructor(nMinas, nNodosH, nNodosV,container,size){
		this.container = container;
		this.nMinas = nMinas;
		this.nNodosH = nNodosH;
		this.nNodosV = nNodosV;
		this.size = size;

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
				this.nodos[i][j]=new Nodo(i,j);
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
					this.nodos[i][j].div.innerHTML =descubierto.icono;
						this.nodos[i][j].div.style.color=descubierto.color;	
	
					}else{
					this.nodos[i][j].div.innerHTML =mina.icono
					this.nodos[i][j].div.style.color=mina.color;
					}
				}
	}}	
	}
}
class Nodo{
	constructor(x,y){
		this.posX = x;
		this.posY = y;
		this.mina = false;
		this.valor = 0;
		this.estado = 1;
		this.div = document.createElement('div');
		this.div.classList.add('nodo');
	
		this.div.addEventListener('click',()=>{
			if(!primerJugada && this.estado!=4){
				primerJugada=true;
				primerCuadrito=[this.posX,this.posY];
				agregarMinas(buscaMina,primerCuadrito);
				 this.seleccionar();
			     this.explosion();
			}else{
			if(this.estado==1){
			if(this.mina){
				this.div.innerHTML =mina.icono
				this.div.style.color = mina.color;
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
				this.estado=1;
				this.div.innerHTML =' '
			}else if(this.estado==1){
				this.estado=3;
			this.div.innerHTML =minador.icono;
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
			this.div.style.background = '#1b1b1b';
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
				this.div.style.background = '#1b1b1b';
			}
		}
	}
	muerte(){
		activarMinas(buscaMina);
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

var buscaMina = new Contenedor(40,10,20,container,50);


	
function reiniciar(){
	primerJugada=false;
	container.innerHTML='';
	buscaMina = new Contenedor(10,20,20,container,28);
}







//estado 1=reposo;
//estado 2=seleccionado;
//Estado 3 = minador;
//estado=4 = pared;


