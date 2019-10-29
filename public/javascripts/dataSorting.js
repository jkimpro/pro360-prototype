let selected ="";

let sortCard = (option) =>{
    let button = document.getElementById(option);
    button.className = 'detailOptionBtn badge badge-pill badge-light';
    button.style= `
        border-radius: 16px;
        background-color: white;
        font-family: SFProText;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: -0.37px;
        text-align: center;
        color: #0269e6;
    `;
    
    if(selected === ""){
        selected = option;
    }
    else{
        let resetButton = document.getElementById(selected);
        resetButton.className = "detailOptionBtn badge badge-pill badge-light";
        resetButton.style = "";
        selected = option;
    }
}