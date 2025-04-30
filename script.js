function showForm() {
    document.getElementById('restaurantContainer').style.display = 'block';
    generateFormQuestions();
}

function closeForm() {
    document.getElementById('restaurantContainer').style.display = 'none';
    document.getElementById('formQuestions').innerHTML = '';
    document.getElementById('passwordPrompt').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('restaurantForm').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

function generateFormQuestions() {
    const container = document.getElementById('formQuestions');
    if (container.children.length > 0) return;

    for (let i = 1; i <= 21; i++) {
        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.textContent = `~Question ${i}~`;

        const input1 = document.createElement('input');
        input1.type = 'radio';
        input1.name = `question${i}`;
        input1.value = 'Option 1';
        input1.id = `q${i}o1`;

        const label1 = document.createElement('label');
        label1.setAttribute('for', input1.id);
        label1.textContent = getOptionLabel(i, 1);

        const input2 = document.createElement('input');
        input2.type = 'radio';
        input2.name = `question${i}`;
        input2.value = 'Option 2';
        input2.id = `q${i}o2`;

        const label2 = document.createElement('label');
        label2.setAttribute('for', input2.id);
        label2.textContent = getOptionLabel(i, 2);

        div.appendChild(h3);
        div.appendChild(input1);
        div.appendChild(label1);
        div.appendChild(document.createElement('br'));
        div.appendChild(input2);
        div.appendChild(label2);

        container.appendChild(div);
    }
}

function getOptionLabel(questionNumber, optionNumber) {
    if (questionNumber <= 7) {
        return optionNumber === 1 ? 'a' : 'c';
    } else if (questionNumber <= 14) {
        return optionNumber === 1 ? 'd' : 'f';
    } else {
        return optionNumber === 1 ? 'b' : 'e';
    }
}

function showPasswordPrompt() {
    document.getElementById('formWrapper').style.display = 'none';
    document.getElementById('passwordPrompt').style.display = 'block';
}

function validatePassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === '123') {
        document.getElementById('passwordPrompt').style.display = 'none';
        submitForm();
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function submitForm() {
    const form = document.getElementById('restaurantForm');
    const formData = new FormData(form);
    const answers = {};

    for (let [name, value] of formData.entries()) {
        if (!answers[name]) answers[name] = {};
        if (!answers[name][value]) answers[name][value] = 0;
        answers[name][value]++;
    }

    const sectionResults = {
        section1: { a: 0, c: 0 },
        section2: { d: 0, f: 0 },
        section3: { b: 0, e: 0 }
    };

    for (let question in answers) {
        const questionNumber = parseInt(question.replace('question', ''));
        const answer = answers[question];
        const count1 = answer['Option 1'] || 0;
        const count2 = answer['Option 2'] || 0;

        if (questionNumber <= 7) {
            sectionResults.section1[count1 > count2 ? 'a' : 'c']++;
        } else if (questionNumber <= 14) {
            sectionResults.section2[count1 > count2 ? 'd' : 'f']++;
        } else {
            sectionResults.section3[count1 > count2 ? 'b' : 'e']++;
        }
    }

    const section1Result = sectionResults.section1.a > sectionResults.section1.c ? 't' : 'r';
    const section2Result = sectionResults.section2.d > sectionResults.section2.f ? 's' : 'c';
    const section3Result = sectionResults.section3.b > sectionResults.section3.e ? 's' : 'm';

    const resultText = `
        Section 1 Result: ${section1Result}<br>
        Section 2 Result: ${section2Result}<br>
        Section 3 Result: ${section3Result}
    `;

    document.getElementById('resultText').innerHTML = resultText;
    document.getElementById('result').style.display = 'block';
}
