function parseSimpleHtml(html){
  const tagRegex = /<(\w+)>|<\/(\w+)>|([^<>]+)/g;
  // 이 정규식은 HTML 문자열을 3가지 유형의 토큰으로 나눔
  // 첫 번째 그룹은 <body> <h1> 같은 시작태그
  // 두 번째 그룹은 </body> </h1> 같은 종료태그
  // 세 번째 그룹은 텍스트 콘텐츠
  const root = { type: 'Document', children: [] };
  // 다큐먼트 타입의 루트 노드를 생성, children 속성은 하위 노드들을 배열 형태로 저장하여 계층 구조를 표현
  const stack = [root];
  // 스택으로 현재 열린 태그를 추적
  // 현재 열린 태그들을 스택에 저장 => 시작 시 root만 포함 -> 시작태그가 나오면 스택에 추가, 종료태그가 나오면 스택에서 제거
  // 스택 최상단 노드가 현재 처리 중인 부모 노드가 됨
  // 종료태그가 나왔을 때 스택에서 제거하는 이유는 현재 열린 태그가 끝났음을 의미하기 때문

let match;
// 정규표현식의 실행 결과를 저장할 변수 

while ((match = tagRegex.exec(html))){
  // while 루프를 통해 HTML 문자열을 순회하며 정규식에 매칭되는 토큰을 찾음
  if (match[1]){
    const node = { type: 'Element', tag: match[1], children: [] };
    stack[stack.length - 1].children.push(node);
    stack.push(node);
    // 시작태그가 매칭되면 새로운 Element 노드를 생성하고 스택 최상단 노드(현재 처리 중인 부모 노드)의 children에 추가
    // 새 노드를 스택에 push하여 이후 하위 노드들이 이 노드의 children에 추가되도록 함
  } else if (match[2]){
    stack.pop();
    // 종료태그가 매칭되면 스택에서 최상단 노드를 제거하여 현재 열린 태그가 끝났음을 표시
    // 스택에서 제거하면 해당 노드의 계층이 닫히고 이후 노드는 상위 부모에 추가됨 -> 스택 최상단 노드가 현재 처리 중인 부모 노드가 됨
  } else if (match[3].trim()){
    const node = { type: 'Text', content: match[3].trim() };
    stack[stack.length - 1].children.push(node);
    // 텍스트 콘텐츠가 매칭되면 새로운 Text 노드를 생성하고 스택 최상단 노드의 children에 추가
  }
}
return root;
// 파싱이 끝나면 document 루트 객체를 반환
// 이 객체의 children 안에 계층적으로 완성된 노드 트리가 모두 담겨 있음

}

const html = 
`<body>
  <h1>Hello</h1>
  <p>World</p>
</body>`;
console.log(JSON.stringify(parseSimpleHtml(html), null, 2));
// 위 코드는 HTML 문자열을 파싱하여 DOM 트리 구조를 JSON 형태로 출력하는 예제