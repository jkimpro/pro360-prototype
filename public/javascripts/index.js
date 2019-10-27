
let cardSetCount =0;
let cardCount =0;
let isInit = false;

const formatNumber = (num) => {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
        return '0';
}

let data = new Array();
$.ajax({
    url:'mockTable.json',
    dataType:'json',
    type:'get',
    cache:false,
    success: getAllData = (temp) =>{
        console.log("succeess");
        data = temp;
        console.log(data);
    }
});

//row 만드는 작업 추가하기
let makeCardSet = ()=>{
    let tableTemp = document.createElement('div');
    tableTemp.className = "col-12 d-flex align-content-center";

    let rowTemp = document.createElement('div');
    rowTemp.className = 'row';
    rowTemp.style ='margin-bottom:28px';

    let divTemp = document.createElement('div');    
    divTemp.className = 'card-deck mr-0 ml-0 flex-grow-1 d-flex align-items-center flex-wrap'
    divTemp.id = 'cardSet'+cardSetCount;
    console.log(divTemp.id);

    rowTemp.appendChild(divTemp);
    tableTemp.appendChild(rowTemp);

    document.getElementById("cardContainer").appendChild(tableTemp);
}

//데이터 검색을 끝냈다는 전제를 함
let makeCard = () =>{

    //해당 되는 데이터를 가져오는 로직 (생략)

    //카드 테이블 초기화 (첫타임일떄만 초기화할 것)
    let initTable = document.getElementById('cardTable');
    
    if(isInit == false){            //
        initTable.innerHTML = "";
        initTable.innerHTML =  '<div class="row" style="margin-bottom:28px">\
            <div id="cardSet0" class="card-deck mr-0 ml-0 flex-grow-1 d-flex align-items-center flex-wrap">\
            </div></div>';    
        isInit = true;
    }
    
    // 남은 카드 개수에 따라 col의크기를 결정할 것
    

    //데이터 매핑
    data.map((element)=>{
        if(cardCount!==0 && cardCount%4 === 0){ 
            cardSetCount +=1;
            makeCardSet();
        }

        let nowCardId = "cardSet" + cardSetCount;

        let divTemp = document.createElement('div');
        let imageUrl = `http://image.gsshop.com/image/${String(element.prd_cd).substring(0, 2)}/${String(element.prd_cd).substring(2, 4)}/${element.prd_cd}${$(".nav-link.active").attr('id') === 'pc'? '_N1.jpg':'_B1.jpg'}`;
  
        divTemp.className = 'card cardBackground container-fluid';
        divTemp.innerHTML = `<div class="row" style="padding-top:5px">
            <a class="col-4 d-flex align-self-center" href="#" style = "height: 96px; align-items: center;">
                <img src="${imageUrl}" class="cardImage">
            </a>
            <div class="col">
                <div class="row" style="margin-top: 10px"> <div id="cardProductCode" class="col cardProductCode">상품코드 : ${element.prd_cd}</div></div>
                <div class="row"> <div id="cardCompanyName" class="col cardCompanyName" style="text-overflow:ellipsis; overflow:hidden;">${element.sup_nm}</div></div>
                <div class="row"> <div id="cardProductName" class="col cardProductName" style="text-overflow:ellipsis; overflow:hidden;">${element.prd_nm}</div></div>
                <div class="row"> <div id="cardProductSubName" class="col cardProductSubName" style="text-overflow:ellipsis; overflow:hidden;">${element.ec_expos_prd_nm}</div></div>
            </div>
        </div>
        <div class ="row"> <div class="col topDivider"></div>
        </div>
        <div class="row">
            <div class="cardPriceMessage col-5">판매가</div>
            <div class="cardPrice col d-flex align-items-center flex-row-reverse flex-wrap">${formatNumber(element.prd_sale_prc)}원</div>
        </div>
        <div class="topDivider"></div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-6 cardDetailInfoBox">
                    <div class="subUpperMessage row">업체지급액</div>
                    <div id="subVenderPrice" class="subPriceAndRate row">${formatNumber(element.sup_giv_amt)}원</div>
                </div>
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">마진율</div>
                    <div id="subMarginRate" class ="subPriceAndRate row">${Math.round(element.margn_rt * 1e2) / 1e2}%</div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">주문수량</div>
                    <div class ="subTotalOrderQt row">${formatNumber(element.tot_ord_qty)}개</div>
                </div>
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">총주문금액</div>
                    <div class ="subTotalOrderPrice row">${formatNumber(element.tot_ord_amt)}원</div>
                </div>
            </div>  
            <div class="row">
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">순주문금액</div>
                    <div class ="subPureOrdPrice row">${formatNumber(element.net_ord_amt)}원</div>
                </div>
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">예상취급액</div>
                    <div class ="subExpctSalAmt row">${formatNumber(element.expct_sal_amt)}원</div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">누적UV</div>
                    <div class ="subUv row">${formatNumber(element.daily_uv)}</div>
                </div>
                <div class="col-6 cardDetailInfoBox">
                    <div class ="subUpperMessage row">누적CR</div>
                    <div class ="subCr row">${formatNumber(element.daily_cr)}%</div>
                </div>
            </div>
        </div>
        <div class ="row"> <div class="col topDivider"></div></div>
        <div class="row">
            <div class="warningMessage col-6">
                <img src="/images/cardImages/warningIcon.png" class="warningImage">
                일부 속성 품절</div>
            <div class="col-6 d-flex align-items-center flex-row-reverse flex-wrap">
                <a href=# class="contactLabel">연락하기</a>
            </div>
        </div>`;
        document.getElementById(nowCardId).appendChild(divTemp);
        cardCount+=1;
    })
}

let pageSet=(page)=>{
    let set = document.getElementById('watchBasic');
    let setFont = document.getElementById('basicFont');

    let dset = document.getElementById('watchMobile');
    let dsetFont = document.getElementById('mobileFont');
    //color: #0269e6;
// <div class="col-5 d-flex align-content-center flex-row flex-wrap">
//                     <div id="watchBasic" class="optionBtn d-flex align-content-center flex-wrap" style="width:120px; margin-left:10px;">
//                         <a href="#" id="basicFont" style="padding-left: 6px; padding-top:" onClick= "pageSet('basic')" >기본 이미지 보기</a>
//                     </div>
//                     <div id="watchMobile" class="optionBtn  d-flex align-content-center flex-wrap" style="width:120px; margin-left:10px">
//                         <a href="#" id="moblieFont" class="optionBtn" onClick= "pageSet('mobile')">모바일 배너로 보기</a>
//                     </div>
    //                 </div> 

    if(page==='mobile'){
   
        set.style = 'width:120px; height:100%; margin-left:10px;';
        dset.style = 'width:120px; height:100%; margin-left:10px; border-bottom:2px solid #0062ff;';
        
        setFont.style='padding-left: 6px;';
        dsetFont.style='color: #0269e6';
    }
    else{
        set.style = 'width:120px; height:100%; margin-left:10px; border-bottom:2px solid #0062ff;';
        dset.style = 'width:120px; height:100%; margin-left:10px;';

        setFont.style='padding-left: 6px; color: #0269e6';
        dsetFont.style='';
    }
}


        // let topTemp = document.createElement('div');
        
        // let imageLink = document.createElement('a');
        // imageLink.style ='height: 96px; align-items: center';
        // imageLink.className='col-4 d-flex align-self-center';
        // imageLink.href ='#';
        // imageLink.innerHTML ='<img src="/images/cardImages/sample.png" class="cardImage">';
        // topTemp.appendChild(imageLink);
        
        // let detailCol = document.createElement('div');

        // let detailRow1 = document.createElement('div');
        // detailRow1.style ='margin-top:10px';
        // let deTemp1 = document.createElement('div');
        // deTemp1.id = cardProductCode;
        // deTemp1.className = 'col cardProductCode';
        // deTemp1.innerHTML = "상품 코드 : " + element['prd_cd'];
        // detailRow1.appendChild(deTemp1);

        // let detailRow2 = document.createElement('div');
        // let deTemp2 = document.createElement('div');
        // deTemp2.id = "cardCompanyName";
        // deTemp2.className = "col cardCompanyName";
        // deTemp2.innerHTML = element['sup_nm'];
        // detailRow2.appendChild(deTemp2);

        // let detailRow3 = document.createElement('div');
        // deTemp3.id = "cardProductName";
        // deTemp3.className = "col cardProductName";
        // deTemp3.innerHTML = element['prd_nm'];
        // detailRow3.appendChild(deTemp3);

        // let detailRow4 = document.createElement('div');
        
        
      //  divTemp.getElementById('cardProductCode').innerHTML = '상품코드 : '+element['prd_cd'];

