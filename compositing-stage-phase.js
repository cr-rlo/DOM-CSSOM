function composite(layers){
  // 여러 레이어를 입력받아 최종 화면으로 합성하는 함수
  // 실제 브라우저에서는 GPU 사용
  // 각 레이어의 투명도, z-index 등을 고려해 겹치는 순서로 최종 이미지 변환
  console.log('\n 컴포지팅 시작');
  // 합성 시작 메세지 출력
  // 실제 브라우저에서는 이 시점에 GPU가 레이어 버퍼를 받아 합성 준비

  layers.sort((a,b) => a.zIndex - b.zIndex); 
  // 레이어를 z-index기준으로 정렬
  // 숫자가 클수록 위에 보이는 요소

  layers.forEach(layer => {
    console.log(`레이어 ${layer.name} (zIndex=${layer.zIndex})`);
    layer.commands.forEach(cmd => {
      console.log(`  ${cmd}`);
    // 정렬된 순서대로 각 레이어를 순차 처리
    });
  });
  console.log('\n 모든 레이어가 하나의 화면으로 합성되었습니다. \n');
}

const layers = [
  {
    name: 'background',
    zIndex: 0,
    commands: [
      'fill rect (0,0,300x100) with #ffffff',
      'draw image banner.png at (0,0)'
    ]
  },
  {
    name: 'content',
    zIndex: 1,
    commands: [
      'draw h1 at (0,100) with blue text',
      'draw p at (0,130) with gray text'
    ]
  },
  {
    name: 'modal',
    zIndex: 100,
    commands: [
      'fill rect (50, 50, 200x100) with rgba(0,0,0,0.5)',
      'draw button at (100, 100) with white text'
    ]
  }
];

composite(layers);