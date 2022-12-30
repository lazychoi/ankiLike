const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const headings = document.getElementById("formatBlock");
const writingArea = document.getElementById("text-input");
const btnLink = document.getElementById("createLink");
const btnUnlink = document.getElementById("unlink");
const alignButtons = document.querySelectorAll(".align");
const btnIndent = document.getElementById("indent");
const btnOutdent = document.getElementById("outdent");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");
const btnForecolor = document.getElementById("foreColor");
const btnBackcolor = document.getElementById("backColor")
const imagePop = document.querySelector(".imagePop")
const imgUrl = document.getElementById("imgUrl");   // 이미지 주소 입력 박스

let selected = null;
let parent = null;
let rng = null;
let txt = null;

// List of fontlist
let fontList = [ "Dancing Script", "Dongle", "East Sea Dokdo", 
        "Kdam Thmor Pro", "Nanum Myeongjo", "Noto Sans KR", "Single Day", 
        "Arial", "Verdana", "Times New Roman", "Garamond", 
        "Georgia", "Courier New", "cursive"];

// Initialize Settings
const initializer = () => {
    // 선택되어 있는 버튼을 활성화모양으로 만드는 함수 호출 
    // link, unlink, lists, undo, redo 버튼은 한 번만 사용되기에 선택상태를 나타낼 필요 없다.
    // function calls for highlighting buttons
    // No highlights for link, unlink, lists, undo, redo since they are one time operations
    
    // highlighter(formatButtons, false); // 활성화/비활성화 토글 bold, italic, underline, strikethrough, superscript, subscript
    // highlighter(alignButtons, true);
    // highlighter(spacingButtons, true);
    // highlighter(scriptButtons, true);
    

    // 폰트 선택 드롭다운 버튼에 폰트 이름 추가
    fontList.map( (value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // 폰트 크기 드롭다운 버튼에 숫자 크기(1~7) 추가
    for( let i=1; i<=100; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }
    // 기본 폰트 크기 설정
    fontSizeRef.value = 16;

    //------ 버튼 이벤트(bold, italic, underline, strikethrough, super, sub) ------
    const formatText = ["bold", "italic", "underline", "strikethrough","superscript","subscript"];

    let arrformatText = new Array(); // 버튼 담는 배열 선언
    for(let i=0; i<formatText.length; i++)
    {
        // 버튼을 배열에 담기
        arrformatText[i] = document.getElementById(formatText[i]);
        arrformatText[i].addEventListener("click", function() 
        {
            // span 태그와 css class 추가 함수
            selected = document.getSelection();
            parent = selected.anchorNode.parentElement;
            rng = selected.getRangeAt(0);
            txt = selected.toString();   // 선택 영역 문자
            
            if (txt.indexOf('\n'))    // 줄바꿈 문자를 <br> 태그로 바꾸기
            {
                txt = txt.replace(/\r\n/, '<br>');
                txt = txt.replace(/\\n/, '<br>');
                txt = txt.replace(/\n/, '<br>');
                console.log("바뀐것 => ", txt);
            }
            
            // console.log(sel.toString(), rng, rng.startOffset, rng.endOffset);
            // range : 현재 커서가 위치한 node 정보와 위치 index 값이 저장
            // if ( rng.startOffset == rng.endOffset)
            if ( rng.collapsed)
            {
                console.log("no selection");
                // return;
            } else if (parent.classList.contains(formatText[i]))
            {
                parent.classList.toggle(formatText[i]);    // 텍스트 포맷 제거
            } else
            {
                let tmp = document.createElement('span');
                tmp.classList.toggle(formatText[i])
                tmp.innerHTML = txt;
                rng.deleteContents();           // 기존 문자열 제거
                rng.insertNode(tmp);            // 태그를 추가한 문자열 삽입
            }
            window.getSelection().removeAllRanges();  //버튼을 누르면 textarea가 비활성화되었는데도 선택영역으로 보이는 문제 해결
        });
    }     

//----------------------- 버튼 이벤트 align -----------------------------
    // 클래스 지우기
    const removeClass = () => 
    {
        for(let i=0; i<parent.classList.length; i++)
        {
            parent.classList.remove(parent.classList[i]);
        }
    }

    const alignClassNames = ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"];
    const btnJustifyLeft = document.getElementById("justifyLeft");
    const btnJustifyCenter = document.getElementById("justifyCenter");
    const btnJustifyRight = document.getElementById("justifyRight");
    const btnJustifyFull = document.getElementById("justifyFull");
    
    // 버튼 전체를 배열에 담으면 원인 모르게 작동이 잘 안되어 하나하나 구현
    btnJustifyLeft.addEventListener("click", () => 
    {
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        removeClass();
        parent.classList.toggle("justifyLeft");
        window.getSelection().removeAllRanges();
    });

    btnJustifyCenter.addEventListener("click", () => 
    {
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        removeClass();
        parent.classList.toggle("justifyCenter");
        window.getSelection().removeAllRanges();
    });

    btnJustifyRight.addEventListener("click", () => 
    {
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        removeClass();
        parent.classList.toggle("justifyRight");
        window.getSelection().removeAllRanges();
    });

    btnJustifyFull.addEventListener("click", () => 
    {
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        removeClass();
        parent.classList.toggle("justifyFull");
        window.getSelection().removeAllRanges();
    });

    //------------------ 버튼 이벤트 indent, outdent ------------------------
    btnIndent.addEventListener("click", () => 
    {
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        // 기존 패딩값 가져오기
        let paddingLeft = parent.style.paddingLeft;
        if (paddingLeft == '')
        {
            paddingLeft = 0;
        }
        paddingLeft = parseInt(paddingLeft) + 20;
        // console.log(paddingLeft, typeof(paddingLeft));
        parent.style.paddingLeft = `${paddingLeft}px`;
        window.getSelection().removeAllRanges();
    });

    btnOutdent.addEventListener("click", () => 
    {
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        // 기존 패딩값 가져오기
        let paddingLeft = parent.style.paddingLeft;
        if (paddingLeft == '')
        {
            paddingLeft = 0;
        }
        paddingLeft = parseInt(paddingLeft) - 20;
        // console.log(paddingLeft, typeof(paddingLeft));
        parent.style.paddingLeft = `${paddingLeft}px`;
        window.getSelection().removeAllRanges();
    });

    //----------------------- 버튼 이벤트 color -----------------------------
      
    let clickColor = (e) => 
    {
        console.log(btnForecolor.value);
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        rng = selected.getRangeAt(0);
        txt = selected.toString(); 

        if (txt.indexOf('\n'))    // 줄바꿈 문자를 <br> 태그로 바꾸기
        {
            txt = txt.replace(/\r\n/, '<br>');
            txt = txt.replace(/\\n/, '<br>');
            txt = txt.replace(/\n/, '<br>');
            console.log("바뀐것 => ", txt);
        }

        if ( rng.collapsed)
        {
            console.log("no selection");
            return;
        }
        console.log(parent.tagName);
        if(parent.tagName == 'span' | parent.tagName == 'SPAN')
        {
            parent.style.color = e.target.value;;
        } else 
        {
            let tmp = document.createElement('span');
            tmp.style.color = e.target.value;;
            tmp.innerHTML = txt;
            rng.deleteContents();           // 기존 문자열 제거
            rng.insertNode(tmp);            // 태그를 추가한 문자열 삽입
        }
    }

    let clickBackColor = (e) => 
    {
        // console.log(btnBackcolor.value);
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        rng = selected.getRangeAt(0);
        txt = selected.toString(); 

        if (txt.indexOf('\n'))    // 줄바꿈 문자를 <br> 태그로 바꾸기
        {
            txt = txt.replace(/\r\n/, '<br>');
            txt = txt.replace(/\\n/, '<br>');
            txt = txt.replace(/\n/, '<br>');
            console.log("바뀐것 => ", txt);
        }

        if ( rng.collapsed)
        {
            console.log("no selection");
            return;
        }
        console.log(parent.tagName);
        if(parent.tagName == 'span' | parent.tagName == 'SPAN')
        {
            parent.style.backgroundColor = btnBackcolor.value;
        } else 
        {
            let tmp = document.createElement('span');
            tmp.style.backgroundColor = btnBackcolor.value;
            tmp.innerHTML = txt;
            rng.deleteContents();           // 기존 문자열 제거
            rng.insertNode(tmp);            // 태그를 추가한 문자열 삽입
        }
        window.getSelection().removeAllRanges();
    };

    btnForecolor.addEventListener("input", clickColor);
    btnForecolor.addEventListener("change", clickColor);
    btnBackcolor.addEventListener("input", clickBackColor );
    btnBackcolor.addEventListener("change", clickBackColor );

    //----------------------- 버튼 이벤트 headings -----------------------------
    const headingsFunc = () => 
    {
        // 기존과 같은 값을 클릭할 때는 값을 출력하지 않는 문제 발생

        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        rng = selected.getRangeAt(0);
        txt = selected.toString(); 
        let rngStartIdx = rng.startOffset;
        console.log("범위 시작위치 => ", rngStartIdx);

        // 선택 영역이 없을 때는 커서 위치의 값을 가져옴
        if ( rng.collapsed)
        {
            selected.selectAllChildren(parent);
            rng = selected.getRangeAt(0);
            txt = selected.toString(); 
        }

        if (txt.indexOf('\n'))    // 줄바꿈 문자를 <br> 태그로 바꾸기
        {
            txt = txt.replace(/\r\n/, '<br>');
            txt = txt.replace(/\\n/, '<br>');
            txt = txt.replace(/\n/, '<br>');
            console.log("바뀐것 => ", txt);
        }
        // console.log(rng);
        // console.log("지금 선택한 headings =>", headings.value.toLowerCase());
        // console.log("부모 태그 이름 => ", parent.tagName);
        
        // '본문'을 선택하면 H 태그 지우기 <<<<<<<<<<<<<<<<<<<<< 미완성
        // 커서가 위치한 곳의 태그 내부를 전체 선택하는 방법 찾기 getRange()
        if(headings.value.toLowerCase() == 'maintext')
        {
            console.log("parent.tagName =>", parent.tagName);
            let tmp = document.createElement('span');      
            tmp.innerHTML = txt;
            parent.remove();                // 태그 제거
            rng.insertNode(tmp);            // span 노드를 추가하지 않고 텍스트만 넣는 방법은 없을까? 위치 인덱스만 
        } else
        {
            let tmp = document.createElement(headings.value.toLowerCase());
            tmp.innerHTML = txt;
            rng.deleteContents();           // 기존 문자열 제거
            rng.insertNode(tmp);            // 태그를 추가한 문자열 삽입
        }
        window.getSelection().removeAllRanges();
    };

    // headings.addEventListener("click", headingsFunc);
    headings.addEventListener("change", headingsFunc);


    //----------------------- 버튼 이벤트 font 선택 -----------------------------
    fontName.addEventListener("change", () => 
    {
        // console.log(fontName.value);
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        rng = selected.getRangeAt(0);
        txt = selected.toString(); 

        if (txt.indexOf('\n'))    // 줄바꿈 문자를 <br> 태그로 바꾸기
        {
            txt = txt.replace(/\r\n/, '<br>');
            txt = txt.replace(/\\n/, '<br>');
            txt = txt.replace(/\n/, '<br>');
            console.log("바뀐것 => ", txt);
        }

        if ( rng.collapsed)
        {
            console.log("no selection");
            return;
        } else 
        {
            let tmp = document.createElement('span');
            tmp.style.fontFamily = fontName.value;
            tmp.innerHTML = txt;
            rng.deleteContents();           // 기존 문자열 제거
            rng.insertNode(tmp);            // 태그를 추가한 문자열 삽입
        }
    });

    //----------------------- 버튼 이벤트 font size -----------------------------
    fontSizeRef.addEventListener("change", () => 
    {
        console.log(fontSizeRef.value);
        selected = document.getSelection();
        parent = selected.anchorNode.parentElement;
        rng = selected.getRangeAt(0);
        txt = selected.toString(); 

        if (txt.indexOf('\n'))    // 줄바꿈 문자를 <br> 태그로 바꾸기
        {
            txt = txt.replace(/\r\n/, '<br>');
            txt = txt.replace(/\\n/, '<br>');
            txt = txt.replace(/\n/, '<br>');
            console.log("바뀐것 => ", txt);
        }
        if ( rng.collapsed)
        {
            console.log("no selection");
            return;
        } else 
        {
            let tmp = document.createElement('span');
            tmp.style.fontSize = `${fontSizeRef.value}px`;
            tmp.innerHTML = txt;
            rng.deleteContents();           // 기존 문자열 제거
            rng.insertNode(tmp);            // 태그를 추가한 문자열 삽입
        }
    });

    //----------------------- 버튼 이벤트 이미지 url 입력 -----------------------------
    btnLink.addEventListener("click", () => 
    {
        imagePop.style.display = ((imagePop.style.display != 'none') ? 'none' : 'block');
        imgUrl.value = '';
    });
    
    imgUrl.addEventListener("focus", () =>
    {
        imgUrl.value = '';
    });

    const btnImg = document.querySelectorAll('.btnimg');
    // 확인 버튼
    btnImg[0].addEventListener("click", () => 
    {
        if (imgUrl.value == '')
        {
            imgUrl.value = '이미지 주소를 입력하세요.';
        } else if ( rng != null )  // 커서 위치에 삽입 <<<<< 작동 안 함
        {
            console.log("여기")
            let tmp = document.createElement('img');
            tmp.setAttribute('src', imgUrl.value);
            tmp.setAttribute('width', "30%");
            tmp.style.float = 'left';
            tmp.style.marginRight = "5px";
            tmp.style.borderRadius = "10px";
            rng.insertNode(tmp);
            imagePop.style.display = 'none'
        } else        // 맨 끝에 삽입
        {
            let tmp = document.createElement('img');
            tmp.setAttribute('src', imgUrl.value);
            tmp.setAttribute('width', "30%");
            tmp.style.float = 'left';
            tmp.style.marginRight = "5px";
            tmp.style.borderRadius = "10px";
            writingArea.appendChild(tmp);           // 이미지 주소가 잘못되었을 때 코드 삽입 필요
            imagePop.style.display = 'none';
        }
    });
    // 취소 버튼
    btnImg[1].addEventListener("click", () => 
    {
        imgUrl.value = '';
        imagePop.style.display = 'none';
        selected = document.getSelection();
    });
}

window.onload = initializer();

// 클릭된 버튼 활성화모양/비활성화모양으로 만들기 className = button, needsRemoval = boolean
// const highlighter = (className, needsRemoval) => {
//     className.forEach( (button) => {
//         if(selected != null)
//         {
//             button.addEventListener("click", () => {
//                 // needsRemoval == true -> 묶음 버튼(list, link, align) 중 오직 버튼 하나만 활성화모양이 됨
//                 if (needsRemoval) {
//                     let alreadyActive = false;
        
//                     // 현재 클릭된 버튼이 이미 클릭(활성화)되어 있다면
//                     if (button.classList.contains("active")) {
//                         alreadyActive = true;
//                     }
        
//                     // 다른 버튼의 활성화모양 제거 Remove highlight from other buttons
//                     highlighterRemover(className);
//                     if (!alreadyActive) {    // 클릭된 버튼이 활성화 상태가 아니라면
//                         // 클릭된 버튼 활성화모양 클래스 추가
//                         button.classList.add("active"); 
//                     }
//                 } else { // 묶음 버튼이 아니라면 활성화 상태 토글
//                     button.classList.toggle("active");
//                 }
//             });
//         }
        
//     });
// };


// const highlighterRemover = (className) => {
//     className.forEach( (button) => {
//         button.classList.remove("active");
//     });
// }




/* 버튼 비활성화 설정 --- 오류
// initializer 함수 안에 작성
const btnStatus = (tag) =>
{
    // console.log("tag =>", tag);
    if(tag) { document.getElementById(tag).classList.add("active"); } 
}

writingArea.addEventListener("blur", () => 
{
    let btnFormatText = document.getElementsByClassName("options");
    for(let i=0; i<parent.classList.length; i++)
    {
        btnFormatText[i].classList.remove("active");
    }
});


// writingArea - 클릭한 지점의 위치가 포함된 태그 가져오기
writingArea.addEventListener("click", () => 
{
    selected = document.getSelection();
    parent = selected.anchorNode.parentElement;
    console.log(parent.className);
    switch(parent.className)
    {
    case 'bold':
        btnStatus('bold');
        break;
    case 'italic':
        btnStatus('italic');
        break; 
    case 'underline':
        btnStatus('underline');
        break; 
    default:
        let formatBtn = document.getElementsByClassName("options");
        for(let i=0; i<formatBtn.length; i++)
        {
            formatBtn[i].classList.remove("active");
        }
        break;
    }
});
*/

// 태그로 만들어 넣기 
// initialize 함수 안에 작성
// for(let i=0; i<alignButtons.length; i++)
// {
//     alignButtons[i].addEventListener("click", function() 
//     {
//         let selected = document.getSelection();
//         let parent = selected.anchorNode.parentElement;
//         console.log(parent.classList);
//         // 기존 정렬 클래스 삭제 코드 추가
//         for(let j=0; j<alignButtons.length; j++)
//         {
//             parent.classList.remove("justifyCenter");
//             console.log(parent.classList);
//         }

//         // align 지정
//         parent.classList.add(alignClassNames[i]);
        
//     });
// }

// 글자 모양 변형 함수 - 태그 만들어 넣기
// 매개변수(선택, 태그)
// let changeText = (selected, textFormat) => {
    
//     let rng = selected.getRangeAt(0);
//     let txt = selected.toString();   // 선택 영역 문자
//     // console.log(sel.toString(), rng, rng.startOffset, rng.endOffset);
    
//     if ( rng.startOffset == rng.endOffset)
//     {
//         console.log("no selection");
//         return;
//     } else 
//     {
//         let tmp = document.createElement(textFormat);
//         tmp.
//         tmp.innerHTML = txt.toString();
//         rng.deleteContents();
//         rng.insertNode(tmp);
//     }
// };

// // format buttons(bold, italic, underline, strikethrough)
// const formatText = 
// [   ["bold", "b"], 
//     ["italic", "i"], 
//     ["underline", "u"], 
//     ["strikethrough", "s"],
//     ["superscript", "sup"],
//     ["subscript", "sub"]
// ];
// for(let i=0; i<formatText.length; i++)
// {
//     let arr = new Array();
//     arr[i] = document.getElementById(formatText[i][0]);
//     arr[i].addEventListener("click", function() 
//     {
//         let selected = document.getSelection();
//         changeText(selected, formatText[i][1]);
//     });
// } 



// --------------- 문법 -------------------
// arr.map : 배열 요소 전체를 대상으로 함수를 호출하고, 함수 호출 결과를 배열로 반환
// fontName : <select name="" id="fontName" class="adv-option-button"></select>
// option -> <option></option>
// option.value -> <option value="폰트이름"></option>
// option.innerHTML -> <option value="폰트이름"></option>
// appendChild -> <select name="" id="fontName" class="adv-option-button"><option value="폰트이름"></option></select>

// --------------- 문법 -------------------
// 클래스 속성값 전체를 바꾸고 싶을 때는 className으로, 
// 개별 클래스를 조작하고 싶을 때는 classList를 사용하면 됩니다.
// classList에 구현된 메서드는 다음과 같습니다.
// elem.classList.add/remove("class") – class를 추가하거나 제거
// elem.classList.toggle("class") – class가 존재할 경우 class를 제거하고, 그렇지 않은 경우엔 추가
// elem.classList.contains("class") – class 존재 여부에 따라 true/false를 반환

// --------------- 문법 -------------------
// 커서 위치의 자식 전체를 가져오는 방법(선택 영역이 없을 때)
// if ( rng.collapsed)
// {
//     selected.selectAllChildren(parent);
//     rng = selected.getRangeAt(0);
//     txt = selected.toString(); 
// }

// --------------- 문법 -------------------
// 선택한 색상이 실시간으로 반영되지 않을 때
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#example

// --------------- 문법 -------------------


