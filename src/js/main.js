// скрипты

(function() {
  // открытие/закрытие главного меню
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mainNav = document.querySelector('.header__nav');

  hamburgerBtn.addEventListener('click', ()=>{
    mainNav.classList.toggle('header__nav_state_shown');
    hamburgerBtn.classList.toggle('hamburger-btn_action_close')
  });

  // листалка сценариев

  const bntRightScenarios = document.querySelector('.btn-slider-nav_section_scenarios.btn-slider-nav_direction_right');
  const bntLeftScenarios = document.querySelector('.btn-slider-nav_section_scenarios.btn-slider-nav_direction_left');
  const scenariosWrapper =  document.querySelector('.scenarios__wrapper');
  const scenarios = document.querySelectorAll('.scenarios__item');

  const possibleScenariosOffsetCount = Math.ceil(scenarios.length / 3) - 1; // максимально возможное количество смещений
  const wrapperScenariosWidth = scenariosWrapper.getBoundingClientRect().width; // ширина врапера
  const maxScenariosOffset = wrapperScenariosWidth * possibleScenariosOffsetCount; // максимальное смещение

  // реализовано только на ширине экрана до 800px

  if ((window.matchMedia("(max-width: 800px)").matches && possibleScenariosOffsetCount > 0)) {
    bntRightScenarios.classList.add('btn-slider-nav_state_active');
  }

  bntRightScenarios.addEventListener('click', () => {
    let transformScenario = getComputedStyle(scenariosWrapper).getPropertyValue('transform'); // значение свойства трансформ врапера со страницы, строка вида 'matrix(1, 0, 0, 1, -228, 0)'
    let translate = Math.abs(+ transformScenario.split(",")[4]); //модуль параметра транслейта
    let coefficient;

    transformScenario === 'none' ? coefficient = 1 : coefficient = translate/ wrapperScenariosWidth + 1;
    console.log(coefficient);
    if ((possibleScenariosOffsetCount > 0) && ((maxScenariosOffset - translate) !== 0 || transformScenario === 'none')) {
      scenariosWrapper.style.transform = 'translateX(-' + (wrapperScenariosWidth * coefficient) + 'px)';
      bntLeftScenarios.classList.add('btn-slider-nav_state_active');
      (translate + wrapperScenariosWidth === maxScenariosOffset || wrapperScenariosWidth === maxScenariosOffset) && bntRightScenarios.classList.remove('btn-slider-nav_state_active');
    }
  });

  bntLeftScenarios.addEventListener('click', () => {
    let transformScenario = getComputedStyle(scenariosWrapper).getPropertyValue('transform'); // уже трансформ врапера со страницы, строка вида  'matrix(1, 0, 0, 1, 0, 0)'
    let translate = Math.abs(+ transformScenario.split(",")[4]); //модуль транслейта  типа 228 или 456 ....
    let coefficient = translate/ wrapperScenariosWidth - 1;

    if ((possibleScenariosOffsetCount > 0) && ((translate - wrapperScenariosWidth) >= 0)) {
      scenariosWrapper.style.transform = 'translateX(-' + (wrapperScenariosWidth * coefficient) + 'px)';
      bntRightScenarios.classList.add('btn-slider-nav_state_active');
      (translate - wrapperScenariosWidth === 0) && bntLeftScenarios.classList.remove('btn-slider-nav_state_active');
    }
  });

  //листалка девайсов

  const bntRightDevices = document.querySelector('.btn-slider-nav_section_devices.btn-slider-nav_direction_right');
  const bntLeftSDevices = document.querySelector('.btn-slider-nav_section_devices.btn-slider-nav_direction_left');
  const devicesWrapper =  document.querySelector('.devices__wrapper');
  const devices = document.querySelectorAll('.devices__item');
  const visibleDevices = Array.from(devices).filter(item => {item.style.display = 'flex'});
  const device = document.querySelector('.devices__item');
  const wrapperDevicesWidth = devicesWrapper.getBoundingClientRect().width;
  const deviceWidth = device.getBoundingClientRect().width;
  const margin = (getComputedStyle(device).getPropertyValue('margin-right'));
  const marginValue = + margin.slice(0, (margin.length - 2));
  const devicesAtViewPort = Math.floor(wrapperDevicesWidth/(deviceWidth + marginValue));
  const offsetDevices =  (devicesAtViewPort * (deviceWidth + marginValue));
  const possibleDevicesOffsetCount = Math.ceil( + (visibleDevices.length / devicesAtViewPort)) - 1;
  const maxDevicesOffset = offsetDevices * possibleDevicesOffsetCount;

  bntRightDevices.addEventListener('click', () => {
    let transformDevices = getComputedStyle(devicesWrapper).getPropertyValue('transform');
    let translate = Math.abs(+ transformDevices.split(",")[4]);
    let coefficient;

    transformDevices === 'none' ? coefficient = 1 : coefficient = translate/ offsetDevices + 1;

    devicesWrapper.style.transform = 'translateX(-' + coefficient * offsetDevices + 'px)';
    bntLeftSDevices.classList.add('btn-slider-nav_state_active');
    (translate + offsetDevices === maxDevicesOffset || offsetDevices === maxDevicesOffset) && bntRightDevices.classList.remove('btn-slider-nav_state_active');

  });

  bntLeftSDevices.addEventListener('click', () => {
    let transformDevices = getComputedStyle(devicesWrapper).getPropertyValue('transform');
    let translate = Math.abs(+ transformDevices.split(",")[4]);
    let coefficient = translate/ offsetDevices - 1;

    // if ((possibleScenariosOffsetCount > 0) && ((translate - wrapperScenariosWidth) >= 0)) {
    devicesWrapper.style.transform = 'translateX(-' + coefficient * offsetDevices + 'px)';
    bntRightDevices.classList.add('btn-slider-nav_state_active');
    (translate - offsetDevices === 0) && bntLeftSDevices.classList.remove('btn-slider-nav_state_active');
    // }
  });

  // крутилка

  const control = document.querySelector(".control__value");
  const controlThumb = document.querySelector('.control__thumb');
  const controlGrade = document.querySelector('.control__grade');
  let move = false;

  control.addEventListener('mousedown', function(e) {

    move = true;
    rotatePointer(e);
  });

  control.addEventListener('touchstart', function(e) {
    e.stopPropagation();
    move = true;
    rotatePointer(e);
  });

  document.addEventListener('mouseup', function(e) {
    move = false;
  });

  function rotatePointer(e) {
    const pointerBox = control.getBoundingClientRect();
    const centerPoint = window.getComputedStyle(control).transformOrigin;
    const centers = centerPoint.split(' ');
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

  // открытие фильтр-меню на ширине вьюпорта < 660px и фильтрация девайсов

  const filters = document.querySelectorAll('.filter-btn');
  const btnContainer = document.querySelector('.devices__wrapper');
  const filterMenuBtn = document.querySelector('.equipment__menu-toggle');
  const filterMenu = document.querySelector('.filters-menu');

  filters.forEach(item => {
    item.addEventListener('click', () => {
      filters.forEach(item => {
        item.checked = false;
        item.removeAttribute('checked');
      })

      item.checked = true;
      item.setAttribute('checked', 'checked');
      let itemId = item.id;

        filterMenuBtn.textContent = item.dataset.html; // присваивание текста выбранного фильтра в кнопку открытия меню
        filterMenu.classList.remove('filters-menu_state_visible');

      // фильтр девайсов
      switch (itemId) {
        case 'filter-btn_value_all':
          const all = btnContainer.querySelectorAll('.filtered_all');
          const notAll = btnContainer.querySelectorAll('.filtered:not(.filtered_all)');
          notAll.forEach(item => item.style.display = 'none');
          all.forEach(item => item.style.display = 'flex');
          break;
        case 'filter-btn_value_kitchen':
          const kitchen = btnContainer.querySelectorAll('.filtered_kitchen');
          const notKitchen = btnContainer.querySelectorAll('.filtered:not(.filtered_kitchen)');
          notKitchen.forEach(item => item.style.display = 'none');
          kitchen.forEach(item => item.style.display = 'flex');
          break;
        case 'filter-btn_value_room':
          const room = btnContainer.querySelectorAll('.filtered_room');
          const notRoom = btnContainer.querySelectorAll('.filtered:not(.filtered_room)');
          notRoom.forEach(item => item.style.display = 'none');
          room.forEach(item => item.style.display = 'flex');
          break;
        case 'filter-btn_value_bulbs':
          const bulbs = btnContainer.querySelectorAll('.filtered_bulbs');
          const notBulbs = btnContainer.querySelectorAll('.filtered:not(.filtered_bulbs)');
          notBulbs.forEach(item => item.style.display = 'none');
          bulbs.forEach(item => item.style.display = 'flex');
          break;
        case 'filter-btn_value_cameras':
          const cameras = btnContainer.querySelectorAll('.filtered_cameras');
          const notCameras = btnContainer.querySelectorAll('.filtered:not(.filtered_cameras)');
          notCameras.forEach(item => item.style.display = 'none');
          cameras.forEach(item => item.style.display = 'flex');
          break;
      }
    })

  });

  // открытие фильтр меню
  filterMenuBtn.addEventListener('click', ()=>{
    filterMenu.classList.add('filters-menu_state_visible');
  });



  // попапы

    const btnOpenPopupLight = document.querySelector('.btn_action_open-popup-light');
    const btnOpenPopupHeat = document.querySelector('.btn_action_open-popup-heat');
    const btnOpenPopupFloor = document.querySelector('.btn_action_open-popup-floor');
    const popupLight = document.querySelector('.popup_type_light');
    const popupHeat = document.querySelector('.popup_type_heat');
    const popupFloor = document.querySelector('.popup_type_floor');
    const popups = document.querySelectorAll('.popup');
    const popupBtnsClose = document.querySelectorAll('.popup__btn_type_close');
    const page = document.querySelector('.page__wrapper');
    const popupFloorContent = popupFloor.querySelector('.popup__content');
    const popupLightContent = popupLight.querySelector('.popup__content');
    const popupHeatContent = popupHeat.querySelector('.popup__content');

    function blurPage() {
      page.classList.add('page__wrapper_state_blur');
      document.body.style.overflow = 'hidden';
    }

    function unblurPage() {
      page.classList.remove('page__wrapper_state_blur');
      document.body.style.overflow = 'auto';
    }

    function openPopup(btn, popup, content) {
      const rect = btn.getBoundingClientRect();

      content.style.top = rect.top + 'px';
      content.style.left = rect.left + 'px';

      blurPage();

      setTimeout(function () {
        popup.classList.add('popup_state_visible');
      }, 5);
    }

    btnOpenPopupFloor.addEventListener('click', () => {
      openPopup(btnOpenPopupFloor, popupFloor, popupFloorContent);
    });

    btnOpenPopupLight.addEventListener('click', () => {
      openPopup(btnOpenPopupLight, popupLight, popupLightContent);
    });

    btnOpenPopupHeat.addEventListener('click', () => {
      openPopup(btnOpenPopupHeat, popupHeat, popupHeatContent);
    });

    popupBtnsClose.forEach(item => {
      item.addEventListener('click', () => {
        popups.forEach(item => item.classList.contains('popup_state_visible') && item.classList.remove('popup_state_visible'));
        unblurPage();
      })
    });

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        popups.forEach(item => item.classList.contains('popup_state_visible') && item.classList.remove('popup_state_visible'));
        unblurPage();
      }
    });


  // скрытие кнопки по scroll

  const container = document.querySelector('.main-devices');
  const doubleArrow = document.querySelector('.btn-slider-nav_type_double-arrow');

  function hideDoubleArrow () {
    doubleArrow.style.display = 'none';
    container.removeEventListener('scroll', hideDoubleArrow);
  }

  container.addEventListener('scroll', hideDoubleArrow);

})();
