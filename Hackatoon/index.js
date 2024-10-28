function respp(){
    let score = 0;
    let form = document.getElementById('quizform');
    let answers = form.querySelectorAll('input[type="radio"]:checked');

    answers.forEach(answer => {
        if (answer.value === "1") {
        score++;
        }
    });

    console.log('Você acertou', score, 'de 5 perguntas.');
    document.getElementById('result').innerHTML = 'você acertou ' + score + ' de 5 perguntas.';

};