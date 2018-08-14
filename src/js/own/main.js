// скрипты

(function() {
  // открытие/закрытие меню
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mainNav = document.querySelector('.header__nav');

  hamburgerBtn.addEventListener('click', ()=>{
    mainNav.classList.toggle('header__nav_state_shown');
    hamburgerBtn.classList.toggle('hamburger-btn_action_close')
  });

  // листалка scenarios

  const bntRightScenarios = document.querySelector('.btn-slider-nav_section_scenarios.btn-slider-nav_direction_right');
  const bntLeftScenarios = document.querySelector('.btn-slider-nav_section_scenarios.btn-slider-nav_direction_left');
  const scenariosWrapper =  document.querySelector('.scenarios__wrapper');
  const scenarios = document.querySelectorAll('.scenarios__item');
  const columnsScenarios = Math.ceil(scenarios.length / 3);

  if ((window.matchMedia("(max-width: 800px)").matches && columnsScenarios > 1) ||
      (window.matchMedia("(max-width: 1040px)").matches && columnsScenarios > 2) ||
      (window.matchMedia("(min-width: 1041px)").matches && columnsScenarios > 3)) {
    bntRightScenarios.classList.add('btn-slider-nav_state_active');
  };

  bntRightScenarios.addEventListener('click', (e) => {
    let transform = getComputedStyle(scenariosWrapper).getPropertyValue('transform');

    if (transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)') {
      scenariosWrapper.style.transform = 'translateX(-100%)';
      bntLeftScenarios.classList.add('btn-slider-nav_state_active');
      columnsScenarios === 2 && bntRightScenarios.classList.remove('btn-slider-nav_state_active');
    } else if ((transform === 'matrix(1, 0, 0, 1, -228, 0)') &&  columnsScenarios === 3) {
      scenariosWrapper.style.transform = 'translateX(-200%)';
      bntRightScenarios.classList.remove('btn-slider-nav_state_active');
    } else {
      e.preventDefault();
    }
  });

  bntLeftScenarios.addEventListener('click', (e) => {
    let transform = getComputedStyle(scenariosWrapper).getPropertyValue('transform');

    if(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)') {
      e.preventDefault();
    } else if (transform === 'matrix(1, 0, 0, 1, -228, 0)') {
      scenariosWrapper.style.transform = 'translateX(0)';
      bntRightScenarios.classList.add('btn-slider-nav_state_active');
      bntLeftScenarios.classList.remove('btn-slider-nav_state_active');
    } else if ((transform === 'translateX(-200%)') &&  columnsScenarios === 3) {
      scenariosWrapper.style.transform = 'translateX(-100%)';
      bntRightScenarios.classList.add('btn-slider-nav_state_active');
    }
  });

  // крутилка

  const control = document.querySelector(".control__value"),
    controlThumb = document.querySelector('.control__thumb'),
    controlGrade = document.querySelector('.control__grade'),
    pointerBox = control.getBoundingClientRect(),
    centerPoint = window.getComputedStyle(control).transformOrigin,
    centers = centerPoint.split(" ");
  let move = false;


  control.addEventListener('mousedown', function(e) {
    move = true;
    rotatePointer(e);
  });

  control.addEventListener('touchstart', function(e) {
    move = true;
    rotatePointer(e);
  });

  document.addEventListener('mouseup', function() {
    move = false;
  });


  function rotatePointer(e) {
    if(move) {

      let pointerEvent = e;
      if (e.targetTouches && e.targetTouches[0]) {
        pointerEvent = e.targetTouches[0];
        mouseX = pointerEvent.pageX;
        mouseY = pointerEvent.pageY;
      } else {
        mouseX = e.clientX,
          mouseY = e.clientY;
      }

      const centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
        centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset;
      const GRADE_OFFSET = 153;

      let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
      let degrees = (radians * (180 / Math.PI) * -1) + 180;
      let orangeArea;

      if(degrees <= 146) {
        orangeArea = (degrees + 153)*697/360;
      } else if (degrees >= 146  && degrees <= 180) {
        orangeArea = 580;
      } else if (degrees >= 180 && degrees <= 210.3) {
        orangeArea = 0;
      } else {
        orangeArea = (degrees -360 + 153)*697/360;
      }

      let greyArea = 700 - orangeArea;


      console.log(degrees);

      if (degrees >= 146  && degrees <= 180) {
        controlThumb.style.transform = 'rotate(146deg) translateY(-87px)';
        controlGrade.style.strokeDasharray = orangeArea + ' ' + greyArea;

      } else if (degrees >= 180 && degrees <= 210.3) {
        controlThumb.style.transform = 'rotate(210.3deg) translateY(-87px)';
        controlGrade.style.strokeDasharray = orangeArea + ' ' + greyArea;
      } else {
        controlThumb.style.transform = 'rotate(' + degrees + 'deg)' + ' translateY(-87px)';
        controlGrade.style.strokeDasharray = orangeArea + ' ' + greyArea;
      };
    }
  }

    window.addEventListener('mousemove', rotatePointer);
    window.addEventListener('touchmove', rotatePointer);
})();
