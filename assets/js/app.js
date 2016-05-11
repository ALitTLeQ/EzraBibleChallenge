(function ($) {
    var questions = [];
    var QuestionNum = 0;
    var haveTested = [];

    function init() {
        questions = [];
        haveTested = [];
        loadData('assets/data.json');
        nextQuestion();

    }

    $("#nextBtn").click(function () {
        if (questions.length > 0) {
            nextQuestion();
        }

    });
    
    $("#ansBtn").click(function () {
        $("#answer").css('visibility','visible ');
    });
    
    $(document).keydown(function(event){
        if( event.which == 13 ) {
            if (questions.length > 0) {
                nextQuestion();
                $("#answer").css('visibility','hidden');
            }
        }
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
            console.info(question)
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
                init();
                return;
            }
        }


        $("#question").text(questions[randNum].Q);
        $("#answer").text(questions[randNum].A);
        $("#answer").css('visibility','hidden');

        haveTested.push(randNum);

    }

    init();





})(jQuery);