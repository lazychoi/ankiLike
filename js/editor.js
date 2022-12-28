let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align")
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fontlist
let fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "cursive"];

// Initialize Settings
const initializer = () => {
    // 선택되어 있는 버튼을 활성화모양으로 만드는 함수 호출 
    // link, unlink, lists, undo, redo 버튼은 한 번만 사용되기에 선택상태를 나타낼 필요 없다.
    // function calls for highlighting buttons
    // No highlights for link, unlink, lists, undo, redo since they are one time operations
    highlighter(formatButtons, false); // 활성화/비활성화 토글 bold, italic, underline, strikethrough, superscript, subscript
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(scriptButtons, true);

    // 폰트 선택 드롭다운 버튼에 폰트 이름 추가
    fontList.map( (value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // 폰트 크기 드롭다운 버튼에 숫자 크기(1~7) 추가
    for( let i=1; i<=7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }
    // 기본 폰트 크기 설정
    fontSizeRef.value = 3;

    // main logic
    const modifyText = (command, defaultUi, value) => {
        // 선택된 텍스트에 명령 실행
        document.execCommand(command, defaultUi, value);
    };

    // 매개변수가 필요 없는 기능
    optionsButtons.forEach( (button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        });
    });

    // 매개변수가 필요한 기능(색상, 폰트 등)
    advancedOptionButton.forEach( (button) => {
        button.addEventListener("change", () => {
            modifyText(button.id, false, button.value);
        });
    });

    // link
    linkButton.addEventListener("click", () => {
        let userLink = prompt("URL을 입력하세요");
        if(/http/i.test(userLink)){
            modifyText(linkButton.id, false, userLink);
        } else {
            userLink = "http://" + userLink;
            modifyText(linkButton.id, false, userLink);
        }
    })
};

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

// 클릭된 버튼 활성화모양/비활성화모양으로 만들기 className = button, needsRemoval = boolean
const highlighter = (className, needsRemoval) => {
    className.forEach( (button) => {
        button.addEventListener("click", () => {
            // needsRemoval == true -> 묶음 버튼(list, link, align) 중 오직 버튼 하나만 활성화모양이 됨
            if (needsRemoval) {
                let alreadyActive = false;
    
                // 현재 클릭된 버튼이 이미 클릭(활성화)되어 있다면
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
    
                // 다른 버튼의 활성화모양 제거 Remove highlight from other buttons
                highlighterRemover(className);
                if (!alreadyActive) {    // 클릭된 버튼이 활성화 상태가 아니라면
                    // 클릭된 버튼 활성화모양 클래스 추가
                    button.classList.add("active"); 
                }
            } else { // 묶음 버튼이 아니라면 활성화 상태 토글
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach( (button) => {
        button.classList.remove("active");
    });
}

window.onload = initializer();
