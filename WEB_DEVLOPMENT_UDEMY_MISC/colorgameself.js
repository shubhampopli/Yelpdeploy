var colors= generaterandomcolors(6);
var squares=document.querySelectorAll(".square");
var pickedcolor=pickedcolor()
var colordisplay=document.getElementById("colordisplay")
var messagedisplay=document.getElementById("message");
colordisplay.textContent=pickedcolor;
for(var i=0;i<squares.length;i++){
    squares[i].style.backgroundColor=colors[i];
    squares[i].addEventListener("click",function(){
                             var clickedcolor=(this.style.backgroundColor);
        if (clickedcolor===pickedcolor)
            {
                messagedisplay.textContent="correct";
                changecolor(pickedcolor);
                
            }
        else{
            this.style.backgroundColor="black";
            messagedisplay.textContent="try again";
        }
                             })
}
function changecolor(colors){
    for(var i=0;i<squares.length;i++)
        {
    squares[i].style.backgroundColor=colors;
        }
}
function pickedcolor(){
    var random=Math.floor(math.random()*color.length);
    return colors[random];
}
function generaterandomcolors(num)
    {
        var arr[]
        
        
        return arr;
    }