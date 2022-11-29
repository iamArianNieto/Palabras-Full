

 //var txt= '{"data":[{"ID":"1","pregunta":"El gato tiene [] patas.","respuesta":"CUATRO"},{"ID":"2","pregunta":"El señor usa un [] negro.","respuesta":"SOMBRERO"},'
	//		+ '{"ID":"3","pregunta":"Las interactividades planteadas son muy []","respuesta":"EXTENSAS"}]}';
var txt;

function inicio()
{
 document.getElementById('calificacion').innerHTML= "";
  document.getElementById('damita').style = "background-image: url(assets/mujer3.jpg);background-size: 35%;background-position: bottom right;background-repeat: no-repeat;";
 mostrar_preguntas(txt);
 mostrar_respuesta(txt);

}




function mostrar_preguntas(txt)
{
  var respuesta="";
    
	var jsonData = JSON.parse(txt);
	for (var i = 0; i < jsonData.data.length; i++) {
	    var counter = jsonData.data[i];
	    //console.log(counter.counter_name);
	    //alert(counter.pregunta);
	    var cadena =counter.pregunta;

	 //  alert(dividirCadena(cadena,'[]'));
	  
		respuesta = respuesta + "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 row'><div class='col-lg-2 col-md-2 col-sm-2 col-xs-2' ><h5>"+(i+1)+"</h5></div><div class='col-lg-7 col-md-7 col-sm-7 col-xs-7'><p>"+dividirCadena(cadena,'[]',i)+"</p></div><div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'><center><br><p id='p"+i+"'></p></div></div><input type='hidden' id='c"+i+"' value=''>";

	}
	respuesta = respuesta+"";

	//alert(respuesta);

    document.getElementById('preguntas').innerHTML = respuesta;
}


function dividirCadena(cadenaADividir,separador,contador) {
   var arrayDeCadenas = cadenaADividir.split(separador);
   var resultado="";

   
   	var auxint =0;
   for (var i=0; i < arrayDeCadenas.length; i++) {

   // resultado= resultado+arrayDeCadenas[i] + "<input type='text' class='form-control' witdh='50%'>";
   resultado = resultado+"<div class='col-sm-4 col-md-4 col-lg-4' class='preguntas' style='font-weight:bold'>"+arrayDeCadenas[i]+"</div>";
  	if(auxint==0)
  	{
  		resultado = resultado +"<div class='col-lg-4 col-md-4 col-sm-4'><div id='d"+contador+"' class='dropzone' ></div></div>";
  	}
  	auxint =auxint +1 ;
  
   }
  
  auxint=0;
   return resultado;
}

function numero_al_azar(minimo,maximo) 
{ 
  return Math.floor(Math.random() * (maximo - minimo + 1) + minimo); 
}


function existe_numero(numero)
{

}

function mostrar_respuesta(txt)
{

   var respuesta="";
   var azar=0;
   var array=[];

	var jsonData = JSON.parse(txt);

  for(var i = 0; i < jsonData.data.length; i++)
  {
      array[i]=i;
  }
  
	for (var i = 0; i < jsonData.data.length; i++) {

      //azar = numero_al_azar(0,jsonData.data.length);
       var counter;
       var cadena;
      
     
      do
      {
        var numeroAleatorio = numero_al_azar(0,(jsonData.data.length-1));
              var item = array[numeroAleatorio];
              if(item!="X")
              {
                  counter= jsonData.data[item];
                  array[item]="X";
                  cadena=counter.respuesta;
              }
       }while(item=="X");

	    respuesta = respuesta+ "<div class='col-lg-12 col-md-12 col-sm-12 respuestas' >";
  		respuesta = respuesta + "<center><button id='r"+i+"' type='button' onmouseenter='buton_precionado(this);' draggable='true' class='column' value='"+cadena+"'>"+cadena+"</button></center>";
	  	respuesta = respuesta + "</div>";
	  	respuesta =  respuesta + "";
		
        
	}
	respuesta = respuesta+"";


    document.getElementById('divrespuesta').innerHTML = respuesta;
}


/* eventos activados en el objetivo arrastrable */
document.addEventListener("drag", function( event ) {
   
  }, false);

document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
      event.target.style.border = "none";
  }, false);

document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);


/* eventos disparados en los objetivos de caída */
document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "dropzone" ) {
          
      }

  }, false);

document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropzone" ) {
          
      }

  }, false);

 document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";

          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
          var myid =event.target.id; 


          var number = myid.substring(1,800000000);
 		  var auxboton = document.getElementById('auxrespuesta').value;

          //alert(myid);
 		
          var textboton = document.getElementById(auxboton).innerHTML;
         document.getElementById(myid).style.backgroundColor = "#0099E6";
    

          document.getElementById('c'+number).value=textboton;


      }
    
  }, false);


function buton_precionado(mio)
{
  document.getElementById('auxrespuesta').value=mio.id;

}


function calificar()
{

  //ocultar imagen de la mujer
  document.getElementById('damita').style.background = "white";


  $("#myModal").modal();
    var preguntas = 0;
    var respuesta = 0;
    var promedio = 0;
 
//var txt= '{"data":[{"ID":"1","pregunta":"El gato tiene [] patas.","respuesta":"CUATRO"},{"ID":"2","pregunta":"El señor usa un [] negro.","respuesta":"SOMBRERO"},'
	//		+ '{"ID":"3","pregunta":"Las interactividades planteadas son muy []","respuesta":"EXTENSAS"}]}';
 
	var jsonData = JSON.parse(txt);

	
	for (var i = 0; i < jsonData.data.length; i++) {
	    var counter = jsonData.data[i];
	    //console.log(counter.counter_name);
	    //alert(counter.pregunta);
        var texto = document.getElementById('c'+i);
       
        preguntas= preguntas+1;


	    var cadena =counter.respuesta;

	    //alert(texto.value+"=="+cadena);

	    if(texto.value==cadena)
	    {
             respuesta=respuesta+1;
             document.getElementById('p'+i).style.color = "#00edc4";
             document.getElementById('p'+i).innerHTML = "<B>Respuesta correcta¡¡</B>";
	    }
	    else
	    {
	    	respuesta=respuesta+0;
        document.getElementById('p'+i).style.color = "#7164f7";
        document.getElementById('p'+i).innerHTML = "<B>La respuesta correcta es: "+cadena+"</B>";
	    }
	}
	
    promedio = (respuesta*100)/preguntas;

    document.getElementById('calificacion').innerHTML = "Promedio es: "+promedio+" <br> No. preguntas: "+preguntas+" <br> No. respuesta correctas: "+respuesta;

if(promedio<10)
     {
      document.getElementById('procentaje').src='assets/porcentaje/0.png';
      

     }
     else if(promedio<20 && promedio>=10)
     {
      document.getElementById('procentaje').src='assets/porcentaje/10.png';
     }

     else if(promedio<30 && promedio>=20)
     {
      document.getElementById('procentaje').src='assets/porcentaje/20.png';
  
     }

     else if(promedio<40 && promedio>=30)
     {
      document.getElementById('procentaje').src='assets/porcentaje/30.png'; 
     }

     else if(promedio<50 && promedio>=40)
     {
      document.getElementById('procentaje').src='assets/porcentaje/40.png'; 
     }

     else if(promedio<60 && promedio>=50)
     {
      document.getElementById('procentaje').src='assets/porcentaje/50.png'; 

     }
     else if(promedio<70 && promedio>=60)
     {
      document.getElementById('procentaje').src='assets/porcentaje/60.png'; 

     }
     else if(promedio<80  && promedio>=70)
     {
      document.getElementById('procentaje').src='assets/porcentaje/70.png'; 

     }
     else if(promedio<90  && promedio>=80)
     {
      document.getElementById('procentaje').src='assets/porcentaje/80.png'; 

     }
     else if(promedio<100  && promedio>=90)
     {
      document.getElementById('procentaje').src='assets/porcentaje/90.png'; 

     }
     else if(promedio>=100)
     {
      document.getElementById('procentaje').src='assets/porcentaje/100.png';  

     }
     else
     {

     }


}



