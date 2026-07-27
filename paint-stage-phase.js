function paint(renderNode){
  // 렌더 트리의 한 노드를 입력으로 받아 시각적으로 그리는 역할
  // 실제 브라우저에서은 GPU에 드로잉 명령을 보내 화면에 렌더링하는 과정이 포함되지만, 여기서는 단순히 콘솔에 출력
  const { x, y, width, height } = renderNode.layout;
  // 레이아웃 단계에서 계산된 좌표와 크기 정보를 구조 분해 할당으로 추출
  // 구조 분해 할당이란 객체의 속성을 변수로 쉽게 추출하는 문법
  // 이 값들이 박스의 위치와 크기를 결정하는데 사용됨
  const color = renderNode.style['color'] || 'black';
  // 스타일에서 color 속성을 찾아 사용, 없으면 기본값 black 사용

  console.log(`${renderNode.tag} -> (${x}, ${y}, ${width}, ${height}) color: ${color}`);
  // 이 줄이 페인트의 핵심
  // 콘솔에 요소의 위치, 크기, 색상을 출력하여 시각적으로 그리는 과정을 시뮬레이션

  renderNode.children.forEach(child => {
    paint(child);
    // 자식 요소들에 대해 재귀적으로 paint 호출
    // 실제 브라우저에서는 자식 요소들도 부모 요소의 좌표를 기준으로 그려지므로, 부모-자식 관계를 유지하며 순차적으로 그려짐
  });
}

const layoutedTree = {
  tag: 'div',
  style: {},
  layout: { x: 0, y: 0, width: 300, height: 16 },
  children: [
    {
      tag: 'h1',
      style: {color: 'blue', 'font-size': '24px'},
      layout: {x: 0, y: 0, width: 300, height: 24},
      children: []
    },
    {
      tag: 'p',
      style: {color: 'gray'},
      layout: {x: 0, y: 40, width: 300, height: 16},
      children: []
    }
  ]
};

console.log('\n 페인팅 시작');
paint(layoutedTree);