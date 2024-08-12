document.addEventListener('DOMContentLoaded', function () {
    const nextCity = document.getElementById('next-city');
    const nextBusiness = document.getElementById('next-business');
    const nextProblems = document.getElementById('next-problems');
    const prevBusiness = document.getElementById('prev-business');
    const prevProblems = document.getElementById('prev-problems');
    const prevContacts = document.getElementById('prev-contacts');
    const submitButton = document.getElementById('submit');

    const radioCity = document.querySelectorAll('#step-city input[type="radio"]');
    const businessSector = document.querySelector('#step-business input[name="businessSector"]');
    const radioProblems = document.querySelectorAll('#step-problems input[type="radio"]');
    const contactInputs = document.querySelectorAll('#step-contacts input');

    const stepIndicators = document.querySelectorAll('.step-indicator .current-step');

    function updateStepIndicator(step) {
        stepIndicators.forEach(indicator => {
            indicator.textContent = step;
        });
    }

    // Шаг 1: Активация кнопки "Далее" при выборе города
    radioCity.forEach(radio => {
        radio.addEventListener('change', function () {
            nextCity.disabled = !Array.from(radioCity).some(r => r.checked);
        });
    });

    // Шаг 2: Активация кнопки "Далее" при заполнении поля
    businessSector.addEventListener('input', function () {
        nextBusiness.disabled = !businessSector.value.trim();
    });

    // Шаг 3: Активация кнопки "Далее" при выборе проблемы
    radioProblems.forEach(radio => {
        radio.addEventListener('change', function () {
            nextProblems.disabled = !Array.from(radioProblems).some(r => r.checked);
        });
    });

    // Шаг 4: Активация кнопки "Отправить" при заполнении всех контактных данных
    contactInputs.forEach(input => {
        input.addEventListener('input', function () {
            submitButton.disabled = !Array.from(contactInputs).every(i => i.value.trim());
        });
    });

    // Переход на шаг 2: Яка сфера вашого бізнесу?
    nextCity.addEventListener('click', function () {
        document.getElementById('step-city').style.display = 'none';
        document.getElementById('step-business').style.display = 'block';
        updateStepIndicator(2);
    });

    // Переход на шаг 3: Які проблеми потрібно вирішити?
    nextBusiness.addEventListener('click', function () {
        document.getElementById('step-business').style.display = 'none';
        document.getElementById('step-problems').style.display = 'block';
        updateStepIndicator(3);
    });

    // Переход на шаг 4: Залиште свої контакти для зв‘язку
    nextProblems.addEventListener('click', function () {
        document.getElementById('step-problems').style.display = 'none';
        document.getElementById('step-contacts').style.display = 'block';
        updateStepIndicator(4);
    });

    // Возврат на шаг 1: Яке ваше місто?
    prevBusiness.addEventListener('click', function () {
        document.getElementById('step-business').style.display = 'none';
        document.getElementById('step-city').style.display = 'block';
        updateStepIndicator(1);
    });

    // Возврат на шаг 2: Яка сфера вашого бізнесу?
    prevProblems.addEventListener('click', function () {
        document.getElementById('step-problems').style.display = 'none';
        document.getElementById('step-business').style.display = 'block';
        updateStepIndicator(2);
    });

    // Возврат на шаг 3: Які проблеми потрібно вирішити?
    prevContacts.addEventListener('click', function () {
        document.getElementById('step-contacts').style.display = 'none';
        document.getElementById('step-problems').style.display = 'block';
        updateStepIndicator(3);
    });

    // Отправка формы и перенаправление на другую страницу
    document.getElementById('quiz-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        const data = {
            'Місто': formData.get('city'),
            'Сфера бізнесу': formData.get('businessSector'),
            'Проблеми': formData.get('problems'),
            'Контакти': {
                'Ім\'я': formData.get('name'),
                'Телефон': formData.get('phone'),
                'Email': formData.get('email')
            }
        };

        // Здесь вы можете отправить данные на сервер, например, с использованием fetch
        fetch('/submit-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                window.location.href = '/thank-you-page';  // Перенаправление на страницу благодарности
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    });
});




document.addEventListener('DOMContentLoaded', function () {
    // Найдем все элементы с классом custom-radio в шаге "problems"
    const radios = document.querySelectorAll('#step-problems .quiz-step__box .custom-radio input[type="radio"]');

    radios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            // Сначала сбросим класс no-hover для всех .custom-radio
            radios.forEach(function (radio) {
                radio.closest('.custom-radio').classList.remove('no-hover');
            });

            // Добавим класс no-hover к выбранному элементу
            if (radio.checked) {
                radio.closest('.custom-radio').classList.add('no-hover');
            }
        });
    });
});

