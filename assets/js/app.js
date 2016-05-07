(function ($) {
    var questions = [];
    var QuestionNum = 0;
    var haveTested = [];

    function init() {
        questions = [];
        loadData('assets/data.json');
        nextQuestion();

    }

    $("#nextBtn").click(function () {
        if (questions.length > 0) {
            nextQuestion();
        }

    });
    
    $("#ansBtn").click(function () {
        $("#answer").fadeIn();
    });

    function loadData(url) {
        var result;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log('load success!');
                result = data;
            },
            error: function () {
                console.log('load failed.');
            }
        });

        $.each(result, function (question, answer) {
            questions.push({
                Q: question,
                A: answer
            });
        });
        QuestionNum = questions.length;

    }

    function nextQuestion() {
        var randNum = Math.floor(Math.random() * QuestionNum);
        while (haveTested.indexOf(randNum) >= 0) {
            randNum = Math.floor(Math.random() * QuestionNum);

            if (haveTested.length >= QuestionNum) {
                alert("全部考完了！");
                return;
            }
        }


        $("#question").text(questions[randNum].Q);
        $("#answer").text(questions[randNum].A);
        $("#answer").hide();

        haveTested.push(randNum);

    }

    init();





})(jQuery);