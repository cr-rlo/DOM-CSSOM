function parseCSS(cssText){
  // CSS 규칙을 찾기 위한 정규식
  const ruleRegex = /(\w+)\s*\{([^}]+)\}/g;
  // 정규 표현식을 통해 CSS 코드 안의 규칙을 찾아냄
  // (\w+) : 이 부분은 하나 이상의 단어 문자를 찾아 그룹으로 묶음. 즉, 선택자를 찾음(예: h1, p 등)
  // \s* : 선택자와 중괄호 사이의 공백을 허용, s*는 공백 문자(스페이스, 탭 등)를 의미
  // \{([^}]+)\} : 중괄호 안의 선언부를 찾음, [^}]+는 중괄호 닫힘 }가 나오기 전까지의 모든 문자를 의미
  // /g 플래그는 전역 검색을 의미, 즉 CSS 텍스트 전체에서 모든 규칙을 찾음

  const stylesheet = [];
  // 최종 css 규칙들을 담는 빈 배열
  let match;
  // 정규표현식 매칭 결과를 저장할 변수

  while ((match = ruleRegex.exec(cssText))){
    // exec 메서드를 사용하여 ruleRegex 정규식을 cssText에 적용, 매칭되는 규칙이 있을 때마다 match 변수에 결과를 저장
   // exec 메서드는 정규표현식 객체의 메서드로 문자열에서 정규식 패턴과 일치하는 정보를 탐색함
   // 일치하는 녀석을 찾으면 상세한 정보가 담긴 배열을 반환, 찾지 못하면 null 반환
    console.log('\n 새로운 규칙 발견:');
    console.log('전체 match:', match);
    //

    const selector = match[1];
    // match[1]은 첫 번째 그룹에 해당하는 선택자 부분을 의미

    const declarationsBlock = match[2];
    // match[2]는 두 번째 그룹에 해당하는 선언부 부분을 의미

    console.log(`선택자: ${selector}`);
    console.log(`선언부: ${declarationsBlock}`);

    const declarations = declarationsBlock
      // 이제 선언부를 ;을 기준으로 나누어 각 조각을 속성 - 값 쌍으로 분리
      .split(';')
      // split 메서드를 사용하여 선언부 문자열을 세미콜론(;)을 기준으로 나누어 배열로 만듦
      .filter(Boolean)
      // filter(Boolean)을 사용하여 빈 문자열을 제거, 즉 실제 선언이 있는 부분만 남김
      .map(decl => {
        const [property, value] = decl.split(':').map(s => s.trim());
        // map 메서드를 통해 각 항목을 :을 기준으로 나누고 앞 뒤 공백 제거한 뒤 property와 value로 분리
        console.log(`  속성: ${property}, 값: ${value}`);
        return { property, value };
      });

      const rule = { selector, declarations };
      // 선택자와 선언부를 객체 형태로 묶어 rule 객체 생성
      stylesheet.push(rule);
      // rule 객체를 stylesheet 배열에 추가
      
      console.log('\n 현재 CSSOM 트리 상태:');
      console.log(JSON.stringify(stylesheet, null, 2));
  }
  return stylesheet;
}

const cssCode = 
  ` h1 {
    color: blue;
    font-size: 24px;
    }
    p {
    color: gray;
    }
  `;  

console.log('\n=== CSS파싱 시작 ===');
const cssOM = parseCSS(cssCode);
console.log('\n 최종 CSSOM 결과');
console.dir(cssOM, { depth: null });