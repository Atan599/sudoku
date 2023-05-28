class square{
    constructor(x,y,posibilities){
        this.x=x;
        this.y=y;
        this.value=0;
        this.finalValue=0;
        this.posibilities=posibilities;
    }
}
var dificulty=81;
var actualTable;
var images=["Logo.jpg","Slide1.jpg","Slide2.jpg"];
var actualImage=0;
var seed=undefined;
var random;
function createSudoku(){
    let table;
    while(true){
    table=new Array(9);
    for(let i=0;i<9;i++){
        table[i]=new Array(9);
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let arr=[1,2,3,4,5,6,7,8,9];
            
            table[i][j]=new square(i,j,arr);

        }
    }
    
        let finished=true;
        for(let i=0;i<81;i++)generace:{
            let lowest=10;
            let lowests=[];
            for(let j=0;j<9;j++) {
                for(let k=0;k<9;k++){
                    if(table[j][k].value==0){
                        if(table[j][k].posibilities.length==lowest){
                            lowests.push(table[j][k]) ;
                            
                        }else if(table[j][k].posibilities.length<lowest){
                            lowest=table[j][k].posibilities.length;
                            if(lowest==0){
                                finished=false;
                                break generace;
                            }
                            lowests=[];
                            lowests.push(table[j][k]);
                        }                        
                    }


                }
            }
            let target=lowests[randomInt(0,lowests.length-1)];
            target.value=target.posibilities[randomInt(0,target.posibilities.length-1)];
            let num=target.value;
            target.finalValue={value:num,x:target.x,y:target.y};
            for(let j=0;j<9;j++){
                
               let arr= table[j][target.y].posibilities;
               if(arr.indexOf(num)>-1){
                arr.splice(arr.indexOf(num),1);
        
              }

              arr= table[target.x][j].posibilities;
              if(arr.indexOf(num)>-1){
                arr.splice(arr.indexOf(num),1); 
 
                               
              }
              arr=subSquare(target.x,target.y,j,table);
              if(arr.indexOf(num)>-1){
                arr.splice(arr.indexOf(num),1); 
               
              }
            }
        }
        if(finished)break;

    }
    return table;
}
function randomInt(min,max){
    if(seed==undefined){
        return Math.floor(Math.random()*(max-min+1)+min);   
    }
    else{
        return Math.floor(random()*(max-min+1)+min);
    }

}
function subSquare(x,y,index,table){
    let sqrx=Math.floor(x/3);
    let sqry=Math.floor(y/3);
    let indexx=sqrx*3+index%3;
    let indexy=sqry*3+Math.floor(index/3)
    return table[indexx][indexy].posibilities;
}
function sudokuTable(){
    var out=document.getElementById("sudoku");
    var outstring="<table class='tabulkaSudoku'>";
    var table=createSudoku();
    if(matrix==undefined){
        generateMatrix();
        console.log("hotovo");
    }
    celarSudoku(table);
    for(let i=0;i<9;i++){
        outstring+="<tr>";
        for(let j=0;j<9;j++){
            outstring+="<td class='bunkaSudoku "+(((Math.floor(i/3)+(Math.floor(j/3)%2!=0?1:0))%2==0)?"ctverecLichy":"ctverecSudy")+"'>"+table[i][j].finalValue.value+"</td>";
        }
        outstring+="</tr>";
    }
    outstring+="</table>";
    out.innerHTML=outstring;
    actualTable=table;
    logSudoku(table);
    generateMatrix();
    loadSeed();
}


function celarSudoku(table){
    let arr=new Array(81);
    for(let i=0;i<81;i++){
        arr[i]=table[i%9][Math.floor(i/9)].finalValue;
    }
    for(let i=0;i<Math.floor(dificulty/2);i++){
        let target=arr[randomInt(0,arr.length-1)];
        let taregtValue=target.value;
        target.value=0;
        let secondTarget=table[target.x*-1+8][target.y*-1+8].finalValue;
        let secondTargetValue=secondTarget.value;
        secondTarget.value=0;
        target.value="<select class='vyberSudoku' id='vyber"+target.x+"X"+target.y+"Y' onchange=\"onFill("+target.x+","+target.y+",'vyber"+target.x+"X"+target.y+"Y')\"><option value=''></option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select>";
        secondTarget.value="<select class='vyberSudoku' id='vyber"+secondTarget.x+"X"+secondTarget.y+"Y' onchange=\"onFill("+secondTarget.x+","+secondTarget.y+",'vyber"+secondTarget.x+"X"+secondTarget.y+"Y')\"><option value=''></option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select>";
            
        if(isValid(table)){
            arr.splice(arr.indexOf(target),0);

            arr.splice(arr.indexOf(secondTarget),0);
            

            //console.log("dostraněno");
        }else{
            if(!(target.x==4&&target.y==4)){
                target.value=taregtValue;
                arr.splice(arr.indexOf(target),0);
                secondTarget.value=secondTargetValue;
                arr.splice(arr.indexOf(secondTarget),0);                
            }else{
                target.value=taregtValue;
                arr.splice(arr.indexOf(target),0);
            }

        }

    }
    
    

}

function datum(){
    let datumOb = new Date();
    let roky = datumOb.getFullYear();
    let mesice = datumOb.getMonth()+1;
    let dny = datumOb.getDate();
    let denTyden = datumOb.getDay();
    switch(denTyden){
        case 0: denTyden = "neděle"; break;
        case 1: denTyden = "pondělí"; break;
        case 2: denTyden = "úterý"; break;
        case 3: denTyden = "středa"; break;
        case 4: denTyden = "čtvrtek"; break;
        case 5: denTyden = "pátek"; break;
        case 6: denTyden = "sobota"; break;
        
    }
    let footerRef = document.getElementsByTagName("footer");
    footerRef[0].innerHTML = "Dnes je " + denTyden + " " + dny + "." + mesice + "." + roky + "<br>" + "<img src='https://jigsaw.w3.org/css-validator/images/vcss'>"; 

}
function load(){
    datum();
    generateMatrix();
    for(let actualNode=matrix.right;actualNode!=matrix;actualNode=actualNode.right){
        if(!actualNode.hiden)
        console.log(actualNode.length);
    }
    hideColum(matrix.left.left);
   // hideColum(matrix.left.left.left.left.left.left);
    for(let actualNode=matrix.right;actualNode!=matrix;actualNode=actualNode.right){
        if(!actualNode.hiden)
        console.log(actualNode.length);
    }
}
function logSudoku(table){
    let outstring="";
    for(let i=0;i<9;i++){
        
        for(let j=0;j<9;j++){
            outstring+=" "+table[i][j].value;
        }
        console.log(outstring);
        outstring="";
    }
    outstring="";
   /* for(let i=0;i<9;i++){
        
        for(let j=0;j<9;j++){
            outstring+=" "+(typeof(table[i][j].finalValue.value)!=Number?table[i][j].finalValue.value:" ");
        }
        console.log(outstring);
        outstring="";
    }*/
}
function changeDificulty(){
    dificulty=document.getElementById("dificultySelect").value*1;
}
function onFill(x,y,id){
    var value=parseInt(document.getElementById(id).value);
    if(value==0){
        actualTable[x][y].guess=value;
    }else{
        actualTable[x][y].guess=value;
        for(let i=0;i<81;i++){
            var target=actualTable[i%9][Math.floor(i/9)];
            if(target.value!=target.finalValue.value){
                if(target.guess!=target.value){
                    console.log(target.value);
                    console.log(target.guess);
                    console.log("nesedí")
                    return;
                }else{
                    console.log("sedí");
                }
            }
        }
        alert("vyhrál si");
    }
}
function startSlideshow(){
setTimeout(slideshow,0)
}
function slideshow(){
   var out= document.getElementById("slideshow");
   out.src="./Images/"+images[(actualImage++)%images.length];
   setTimeout(slideshow,5000);
}
function loadSeed(){
    var value=document.getElementById("seed").value;
    if(value!=""){
        seed=cyrb128(value);
    random=sfc32(seed[0],seed[1],seed[2],seed[3]);    
    }else{
        seed=undefined;
        random=undefined;
    }

}
//zde začíná zkopírovaný kód
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}
function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}
//zde končí zkopírovaný kód
function bigTlac(x) {
    x.style.padding = "80px 148px";
  }
function normalTlac(x){
    x.style.padding = "60px 128px";
}
