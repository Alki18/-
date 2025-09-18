const sheetUrls = [
  // 1-й слайд: таблица
  'https://docs.google.com/spreadsheets/d/1nd52zcb1HE2yYA7HhEj5BvAP4dg9Ssx9oSSdu8XCTv8/edit?gid=0#gid=0',
  // 2-й слайд: лидер дня
  'https://docs.google.com/spreadsheets/d/15JY119IYuofWoOGSKuZs1p2AP79eYbu63ayWnBCiD58/edit?gid=0#gid=0'
];



let currentIndex = 0;
let slides = [];

function loadAllSheets() {
  const container = document.getElementById('slider-content');
  container.innerHTML = '';
  slides = [];

  for (let i = 0; i < sheetUrls.length; i++) {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const iframe = document.createElement('iframe');
    iframe.src = sheetUrls[i] + '&t=' + Date.now();  // Добавляем timestamp для обхода кэша
    iframe.width = '100%';
    iframe.height = '6000px';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.onload = () => console.log('Iframe loaded for slide ' + i);  // Лог для отладки
    iframe.onerror = () => {
      console.error('Iframe failed to load for slide ' + i);
      // Альтернатива: показать сообщение
      slide.innerHTML = '<p>Не удалось загрузить файл. <a href="' + sheetUrls[i] + '" target="_blank">Открыть в новой вкладке</a></p>';
    };

    slide.appendChild(iframe);
    container.appendChild(slide);
    slides.push(slide);
  }

  if (slides.length > 0) {
    showSlide(0);
  }
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  currentIndex = index;
}

// Кнопки навигации
document.querySelector('.prev').addEventListener('click', () => {
  if (slides.length > 0) {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  }
});

document.querySelector('.next').addEventListener('click', () => {
  if (slides.length > 0) {
    showSlide((currentIndex + 1) % slides.length);
  }
});

// // Автопереключение
// setInterval(() => {
//   if (slides.length > 0) {
//     showSlide((currentIndex + 1) % slides.length);
//   }
// }, 10000);

loadAllSheets();