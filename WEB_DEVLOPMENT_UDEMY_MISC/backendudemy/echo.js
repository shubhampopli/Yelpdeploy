function average (Scores){
    var total=0;
    Scores.forEach(function(Scores){
        total+=Scores;
    })
    
    
    var avg=total/Scores.length;
    return Math.round(avg);
   
}

var Scores=[90,98,89,100,100,86,94]
console.log(average(Scores));