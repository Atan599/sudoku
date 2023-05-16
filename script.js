class square{
    constructor(x,y,posibilities){
        this.x=x;
        this.y=y;
        this.value=0;
        this.finalValue=0;
        this.posibilities=posibilities;
    }
}
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
            target.finalValue=num;
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
    return Math.floor(Math.random()*(max-min+1)+min);
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
    celarSudoku(table);
    for(let i=0;i<9;i++){
        outstring+="<tr>";
        for(let j=0;j<9;j++){
            outstring+="<td class='bunkaSudoku "+(((Math.floor(i/3)+(Math.floor(j/3)%2!=0?1:0))%2==0)?"ctverecLichy":"ctverecSudy")+"'>"+table[i][j].finalValue+"</td>";
        }
        outstring+="</tr>";
    }
    outstring+="</table>";
    out.innerHTML=outstring;
}
function removeSudokuTile(table,tile){
    tile.finalValue=0;
    target=tile;
    let num=tile.value;
    for(let j=0;j<9;j++){
                
        let arr= table[j][target.y].posibilities;
        if(arr.indexOf(num)==-1){
            arr.push(num);
           
          }

       arr= table[target.x][j].posibilities;
       if(arr.indexOf(num)==-1){
        arr.push(num);
       
      }
       arr=subSquare(target.x,target.y,j,table);
       if(arr.indexOf(num)==-1){
         arr.push(num);
        
       }
     }
}
function celarSudoku(table){
    let can=true;
    while(can){
        let zeros=[];
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                var actual=table[i][j];
                if(actual.posibilities.length==0){
                    zeros.push(actual);
                }
            }
        }
        if(zeros.length>0){
            removeSudokuTile(table,zeros[randomInt(0,zeros.length-1)]);              
        }else{
            can=false;
        }
 
    }

}