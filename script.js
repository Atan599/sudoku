function createSudoku(){
    let table=new Array(9);
    for(let i=0;i<9;i++){
        table[i]=new Array(9);
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let arr=new Array(9);
            for(let k=0;k<9;k++){
                arr[k]=k+1;
            }
            table[i][j]=arr;

        }
    }

}
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}