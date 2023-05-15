class square{
    constructor(x,y,posibilities){
        this.x=x;
        this.y=y;
        this.value=0;
        this.posibilities=posibilities;
    }
}
function createSudoku(){
    let table=new Array(9);
    for(let i=0;i<9;i++){
        table[i]=new Array(9);
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let arr=[1,2,3,4,5,6,7,8,9];
            
            table[i][j]=new square(i,j,arr);

        }
    }
    while(true){
        for(let i=0;i<81;i++){
            let lowest=10;
            let lowests=[];
            for(let j=0;j<9;j++) {
                for(let k=0;k<9;k++){
                    if(table[j][k].posibilities.length=lowest){
                        lowests.push(table[j][k]) ;
                        
                    }else if(table[j][k].posibilities.length<lowest){
                        lowest=table[j][k].posibilities.length;
                        lowests=[];
                        lowests.push(table[j][k]);
                    }

                }
            }
        }

    }
}
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}