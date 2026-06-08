function ScheduleSave() {

    let error = false;

    let CandidateName = $("#inputCandidateName").val();
    let InterviewerName = $("#inputInterviewerName").val();
    let InterviewDate = $("#inputInterviewDate").val();
    let InterviewTime = $("#inputInterviewTime").val();
    let InterviewType = $("#inputInterviewType").val();
    let MeetingLink = $("#inputMeetingLink").val();
    let Remarks = $("#inputRemarks").val();

    if (CandidateName == "") {
        error = true;
        $("#validateCandidate").text("Select Candidate");
    }

    if (InterviewerName == "") {
        error = true;
        $("#validateInterviewer").text("Select Interviewer");
    }

    if (InterviewDate == "") {
        error = true;
        $("#validateDate").text("Select Interview Date");
    }

    if (InterviewTime == "") {
        error = true;
        $("#validateTime").text("Select Interview Time");
    }

    if (error) {
        return;
    }

    let ScheduleDetails = {

        CandidateName: CandidateName,
        InterviewerName: InterviewerName,
        InterviewDate: InterviewDate,
        InterviewTime: InterviewTime,
        InterviewType: InterviewType,
        MeetingLink: MeetingLink,
        Remarks: Remarks

    };

    $.ajax({

        type: "POST",
        url: "/Home/SaveInterviewSchedule",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ScheduleDetails),
        dataType: "json",

        success: function (response) {

            let message = response.success
                ? "Success : " + response.message
                : "Error : " + response.message;

            let type = response.success ? "success" : "danger";

            showToast(message, type);

            setTimeout(function () {

                location.reload();

            }, 2000);
        },

        error: function (xhr, status, error) {

            alert("Error : " + error);

        }

    });

}
function GetInterviewScheduleList() {

    $.ajax({

        type: "GET",
        url: "/Master/GetInterviewScheduleList",
        dataType: "json",

        success: function (data) {

            $("#tblScheduleList tbody").empty();

            if (data != null && data.GetList.length > 0) {

                data.GetList.forEach(function (Schedule) {

                    let ScheduleDetail = `<tr>

                        <td class='text-center'>${Schedule.CandidateName}</td>

                        <td class='text-center'>${Schedule.InterviewerName}</td>

                        <td class='text-center'>${Schedule.InterviewDate}</td>

                        <td class='text-center'>${Schedule.InterviewTime}</td>

                        <td class='text-center'>${Schedule.InterviewType}</td>

                        <td class='text-center'>${Schedule.MeetingLink}</td>

                        <td class='text-center'>${Schedule.Remarks}</td>

                        <td class='text-center'>

                            <button type='button'
                                    class='btn btn-warning btn-sm'
                                    onclick='EditSchedule("${Schedule.ScheduleID}")'>

                                <i class='bi bi-pencil-square'></i>

                            </button>

                        </td>

                        <td class='text-center'>

                            <button type='button'
                                    class='btn btn-danger btn-sm'
                                    onclick='DeleteSchedule("${Schedule.ScheduleID}")'>

                                <i class='bi bi-trash-fill'></i>

                            </button>

                        </td>

                    </tr>`;

                    $("#tblScheduleList tbody")
                        .append(ScheduleDetail);

                });

                $('#tblScheduleList').DataTable();

            }
            else {

                $('#tblScheduleList').DataTable();

            }

        },

        error: function (xhr, status, error) {

            alert("Error : " + error);

        }

    });

}
function DeleteSchedule(scheduleId) {

    $('#DeleteModal .modal-body')
        .text('Are you sure you want to delete this Interview Schedule ?');

    $('#DeleteModal').modal('show');

    // Remove previous click events
    $('#btnYes').off('click').on('click', function () {

        $.ajax({
            type: "POST",
            url: "DeleteSchedule",
            dataType: "json",
            data: { scheduleId: scheduleId },
            async: true,
            cache: false,

            success: function (response) {

                let message = response.success
                    ? "Success: " + response.message
                    : "Error: " + response.message;

                let type = response.success
                    ? "danger"
                    : "info";

                showToast(message, type);

                setTimeout(function () {
                    window.location.reload(true);
                }, 3000);
            },

            error: function (xhr, status, error) {
                alert("Error : " + error);
            }
        });

    });
}