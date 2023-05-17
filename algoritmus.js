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
                nodes++;
                if(nodes>1){
                    previousNode.right=actualNode;
                    actualNode.left=previousNode;
                    
                }{
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