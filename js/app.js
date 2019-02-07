/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {

        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {

    var attendance = JSON.parse(localStorage.attendance);
    console.log(attendance);

        // attendance = {
        //     studentName: [true,false,...]
        // };



        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {

        //use the model not the view to count the missing
        for (var key in attendance){
            debugger
            let dayAttendance = attendance[key];
            // var studentRow = $(this).parent('tr'),
            //     dayChecks = $(studentRow).children('td').children('input'),
            let numMissed = 0;

            dayAttendance.forEach(function(day) {
                if (day===false) {
                    numMissed++;
                }
            });

            dayAttendance.push[numMissed];
        };

    }


    var controller = {

        setAttendance: function(newAttendance){
            localStorage.attendance = JSON.stringify(newAttendance);
        }
    };

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};


        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        controller.setAttendance(newAttendance);
        countMissing();
        
    });

    countMissing();
}());
