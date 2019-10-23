
let searchData = () => {
    $.getJSON("mockTable.json", function(json) {
        console.log(json); // this will show the info it in firebug console
    });

    console.log("start");
    let divTemp = document.createElement('div');    
    divTemp.className = 'card cardBackground flex-shrink-0 container-fluid';
    divTemp.innerHTML = '\
    <div class="row" style="padding-top:5px">\
            <a class="col-4 d-flex align-self-center" href="#" style = "height: 96px; align-items: center;">\
            <img src="/images/cardImages/sample.png" class="cardImage">\
        </a>\
        <div class="col">\
            <div class="row" style="margin-top: 10px"> <div class="col cardProductCode"> 상품코드 : 99999999</div> </div>\
            <div class="row"> <div class="col cardCompanyName"> 올리비아비 / 주식회사 세정글로벌</div></div>\
            <div class="row"> <div class="col cardProductName"> [몬테밀라노] 몬테밀라노 </div></div>\
            <div class="row"> <div class="col cardProductSubName"> [OLIVIA.B] 레인 드롭 후드...</div></div>\
        </div>\
    </div>\
    <div class ="row"> <div class="col topDivider"></div></div>';
    document.getElementById("cardSet").appendChild(divTemp);
};