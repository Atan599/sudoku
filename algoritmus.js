class node{
    constructor(head){
        if(head){
            this.head=true;
            this.length=0;
        }else{
            this.head=false;
        }
    }
}
var matrix;
function generateMatrix(){
    let counter=0;
    var startNode=new node(true);
    
    var lastNode=startNode;
    for(let i=0;i<324;i++){
        var actualNode=new node(true);
        actualNode.left=lastNode;
        lastNode.right=actualNode;
        actualNode.up=actualNode;
        actualNode.down=actualNode;
        if(i<81){
            actualNode.x=i%9;
            actualNode.y=Math.floor(i/9);
        }else if(i<162){
            actualNode.x=i%9;
            actualNode.number=Math.floor((i-81)/9)+1;
        }else if(i<243){
            actualNode.y=i%9;
            actualNode.number=Math.floor((i-162)/9)+1; 
        }else{
            actualNode.square=i%9;
            actualNode.number=Math.floor((i-243)/9)+1;
        }
        lastNode=actualNode;
    }
    lastNode.right=startNode;
    startNode.left=lastNode;
    matrix=startNode;
    for(let i=0;i<729;i++){
        let nodes=0;
        let x=i%9;
        let y=Math.floor(i/9)%9;
        let number=Math.floor(i/81)+1;
        let squarex=Math.floor(x/3);
        let squarey=Math.floor(y/3);
        let square=squarex+3*squarey;
        let previousHead=startNode;
        let previousNode;
        let firstNode;
        for(let j=0;j<324;j++){
            let actualHead=previousHead.right;
            let matches=0;
            matches+=(x==actualHead.x)+(y==actualHead.y)+(number==actualHead.number)+(square==actualHead.square);
            if(matches==2){
                let actualNode=new node(false);
                actualNode.up=actualHead.up;
                actualNode.up.down=actualNode;
                actualHead.up=actualNode;
                actualNode.down=actualHead;
                actualHead.length+=1;
                actualNode.colum=actualHead;
                nodes+=1;
                
                if(nodes>1){
                    
                    previousNode.right=actualNode;
                    actualNode.left=previousNode;
                    
                }else{

                    firstNode=actualNode;
                    previousNode=actualNode;
                    
                }
                counter++;
                previousNode=actualNode;
                
            }
            previousHead=actualHead;
        }
        previousNode.right=firstNode;
        firstNode.left=previousNode;
    }
    console.log(counter);
}
function hideColum(node){
    if(node.head&&!node.hiden){
        node.hiden=true;
        let actualNode=node.down;
        while(actualNode!=node){
            hideLine(actualNode);
            actualNode=actualNode.down;
        }
        
    }
}
function hideLine(node){
    
    if(!(node.head)){
        let actualNode=node.right;
        
        while(actualNode!=node){
            
            actualNode.up.down=actualNode.down;
            actualNode.down.up=actualNode.up;
            actualNode.colum.length-=1;
            actualNode=actualNode.right;
            
        }
    }

}
function showColum(node){
    if(node.head&&node.hiden){
        node.hiden=false;
        let actualNode=node.up;
        while(actualNode!=node){
            showLine(actualNode);
            actualNode=actualNode.up;
        }
    }
}
function showLine(node){
    if(!(node.head)){
        let actualNode=node.left;
        while(actualNode!=node){
            actualNode.up.down=actualNode;
            actualNode.down.up=actualNode;
            actualNode.colum.length+=1;
            actualNode=actualNode.left;
            
        }
    }
}
function isValid(table){
    for(let y=0;y<9;y++){
        for(let x=0;x<9;x++){
            let target=table[x][y].finalValue;
            if(target.value!=0){
                for(let colum=matrix.right;colum!=matrix;colum=colum.right){
                    if(colum.hiden){continue;}
                    let squarex=Math.floor(target.x/3);
                    let squarey=Math.floor(target.y/3);
                    let square=squarex+3*squarey;
                    let matches=(colum.x==target.x)+(colum.y==target.y)+(colum.number==target.value)+(colum.square==square);
                    if(matches==2){
                        hideColum(colum);
                    }
                }
            }
        }
    }
    let result=solve();
    
    
    for(let y=8;y>=0;y--){
        for(let x=8;x>=0;x--){
            
            let target=table[x][y].finalValue;
            if(target.value!=0){
                for(let colum=matrix.left;colum!=matrix;colum=colum.left){
                    if(!colum.hiden){continue;}
                    let squarex=Math.floor(target.x/3);
                    let squarey=Math.floor(target.y/3);
                    let square=squarex+3*squarey;
                    let matches=(colum.x==target.x)+(colum.y==target.y)+(colum.number==target.value)+(colum.square==square);
                    if(matches==2){
                        showColum(colum);
                    }
                }
            }
        }
    }
    
    if(result==1){
        console.log("uspech");
        return true;
    }else{
        console.log("chyba"+result);
       // logSudoku(table);
        return false;
    }
}
function solve(){
    let lowestColum;
    for(let colum=matrix.left;colum!=matrix;colum=colum.left){
        if(colum.hiden)continue;
        if(lowestColum==undefined||lowestColum.length>colum.length){
            lowestColum=colum;
            if(colum.length.down==colum){
                console.log(" 0 řešení");
                return 0;
                
            }
        }
    }
    if(lowestColum==undefined){
        console.log("jedno řešení");
        return 1;
    }
    let buffer=0;
    for(let row=lowestColum.down;row!=lowestColum;row=row.down){

        for(let nodeInRow=row;!nodeInRow.colum.hiden;nodeInRow=nodeInRow.left){
            hideColum(nodeInRow.colum);
        }
        buffer += solve();
        for(let nodeInRow=row.right;nodeInRow.colum.hiden;nodeInRow=nodeInRow.right){
            showColum(nodeInRow.colum);
        }
        if(buffer>1){
            console.log("dvě řešení");
            return 2;
        }
    }
    //console.log("jedno řešení")
    return buffer;
    
}