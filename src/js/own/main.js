// скрипты

(function() {
  // открытие/закрытие меню
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mainNav = document.querySelector('.header__nav');

  hamburgerBtn.addEventListener('click', ()=>{
    mainNav.classList.toggle('header__nav_state_shown');
    hamburgerBtn.classList.toggle('hamburger-btn_action_close')
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
        // e.preventDefault();
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
