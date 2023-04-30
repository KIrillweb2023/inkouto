window.addEventListener('DOMContentLoaded', () =>{



const modal = document.querySelector('.modal');
const openModal = document.querySelectorAll('[data-open]');
const closeModal = document.querySelector('[data-close]');



function modalOpen(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}
openModal.forEach(item =>{
    item.addEventListener('click', modalOpen);
});

closeModal.addEventListener('click', () =>{
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
});



const forms = document.querySelectorAll('form');

const message = {
    loading: '../src/icons/spinner.svg',
    completed: 'Данные успешно отправились! Мы вам перезвоним в ближайшее время...',
    faulting: 'Ошибка!'
};
forms.forEach(item =>{
    postServer(item);
});

function postServer(form){
    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.textAlign = 'center';
        statusMessage.style.marginTop = '20px';
        form.append(statusMessage);

        const text = document.createElement('div');
        text.style.textAlign = 'center';
        text.style.marginTop = '20px';
        form.append(text);



        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        const formData = new FormData(form);
        request.send(formData);

        request.addEventListener('load', () =>{
            if(request.status === 200){
                console.log(request.response);
                setInterval(() =>{
                    text.textContent = message.completed;
                }, 2200);
                form.reset();
                setTimeout(() =>{text.remove();}, 5000);
                setTimeout(() =>{
                    statusMessage.remove();
                }, 2000);
            }else {
                setInterval(() =>{
                    text.textContent = message.faulting;
                }, 2200);
                setTimeout(() =>{text.remove();}, 5000);
                setTimeout(() =>{
                    statusMessage.remove();
                }, 2000);
            }
        });
    });
}





//slider 
    const slider = document.querySelectorAll('.offer__slide'); // сам слайдер
    const slidesImg = document.querySelector('.offer__slider');
    const prev = document.querySelector('.offer__slider-prev'); // стрелка влево
    const next = document.querySelector('.offer__slider-next'); // стрелка вправо
    const sliderWrapper = document.querySelector('.offer__slider-wrapper');
    const sliderInner = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(sliderWrapper).width;

    let indexSlide = 1;
    let offset = 0;

    sliderInner.style.width = 100 * slider.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.6s all';
    sliderWrapper.style.overflow = 'hidden';

    slider.forEach(item =>{
        item.style.width = width;
    });
    slidesImg.style.position = 'relative';

    function deleteDot(str){
        return +str.replace(/\D/g, '');
    }
    function translateWidth(styleWidth){
        return styleWidth.style.transform = `translateX(-${offset}px)`;
    }
    next.addEventListener('click', () =>{
        if (offset == deleteDot(width) * (slider.length - 1)){
            offset = 0;
        } else {
            offset += deleteDot(width);
        }
        translateWidth(sliderInner);
        if(indexSlide == slider.length){
            indexSlide = 1;
        }else {
            indexSlide++;
        }
    });
    prev.addEventListener('click', () => {
        if (offset == 0){
            
            offset = deleteDot(width) * (slider.length - 1);
        } else {
            offset -= deleteDot(width);
        }
        translateWidth(sliderInner);
        if(indexSlide == 1){
            
            indexSlide = slider.length;
        }else {
            indexSlide--;
        }
    });
});
// descr


const button = document.querySelectorAll('.question_arrow');
const description = document.querySelector('.question_descr');
const reim = document.querySelector('.question_reimer');


button.forEach(item =>{
    item.addEventListener('click', () =>{
        description.classList.toggle('active');
        reim.classList.toggle('height');
    });
});

const header = document.querySelector('.header');
const closeBtn = document.querySelector('.close_header');
const openBtn = document.querySelector('.hamburger');

openBtn.addEventListener('click', () =>{
    header.classList.add('active');
});
closeBtn.addEventListener('click', () =>{
    header.classList.remove('active');
});

const arrowClick = document.querySelector('.arrow');
const menu = document.querySelector('.menu');

arrowClick.addEventListener('click', () =>{
    menu.classList.toggle('active');
    arrowRotate(arrowClick);
});
function arrowRotate(arrow){
    if(menu.classList.contains('active')){
        arrow.style.transform = 'rotate(90deg)';
        arrow.style.transition = '0.6s all';
        arrow.style.marginTop = '160px';
    } else {
        arrow.style.transform = '';
        arrow.style.marginTop = '';
    }
}


