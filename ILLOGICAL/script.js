document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementsByClassName("container")[0];
    let input = document.getElementsByClassName("field")[0];
    let size = 0;

    //Play click
    document.getElementsByClassName("field_btn")[0].addEventListener("click", e =>{
        //data validation
        if((isNaN(input.value) || input.value < 1 || input.value > 10))
            input.value = "";
        else
            play();
    });   
    
    play = () =>{
        size = parseInt(input.value);
        document.getElementsByClassName("setup")[0].classList.add("hidden");
        container.classList.remove("hidden");
        container.setAttribute("style",`grid-template-rows: repeat(${size}, 1fr)`);
        container.setAttribute("style",`grid-template-columns: repeat(${size}, 1fr)`);
        
        //Random Scenario
        const promise = new Promise ( (res,rej) =>{
            for(let i = 0; i<size*size; i++){
                let element = document.createElement("div");
                element.classList.add("button");
                if(Math.floor(Math.random()*10)%2==0)
                    element.classList.add("button_up");
                else
                    element.classList.add("button_down");
                container.appendChild(element);
            }
            res();
        })
        .then( res => {
            let buttons = document.getElementsByClassName("button");
            //Click listener, toggle clases
            for(let i=0; i<buttons.length; i++){
                buttons[i].addEventListener("click", e => {
                    toggleButton(e.target);
                    //changing every neighbour 
                    let number = i+1;
                    if(number%size==0){
                        toggleButton(buttons[i-1]);
                        if(number-size>0)
                            toggleButton(buttons[i-size]);
                        if(number+size<=size*size)
                            toggleButton(buttons[i+size]);
                    } else if(number%size==1){
                        toggleButton(buttons[i+1]);
                        if(number-size>0)
                            toggleButton(buttons[i-size]);
                        if(number+size<=size*size)
                            toggleButton(buttons[i+size]);
                    } else{
                        toggleButton(buttons[i-1]);
                        toggleButton(buttons[i+1]);
                        if(number-size>0)
                            toggleButton(buttons[i-size]);
                        if(number+size<=size*size)
                            toggleButton(buttons[i+size]);
                    }
                    //win
                    if(checkWin())
                        win();
                })
            };
    
            toggleButton = btn =>{
                btn.classList.toggle("button_down");
                btn.classList.toggle("button_up");
            }
    
            checkWin = () =>{
                for(let i=0; i<buttons.length; i++){
                    if(buttons[i].classList.contains("button_up"))
                        return false;
                };
                return true;
            }
                // ------------------- write sth man
            win = () =>{
                window.alert("choć poczochraj już mój plusz");
            }
        }); 
    }

});