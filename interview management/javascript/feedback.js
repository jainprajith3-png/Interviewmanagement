function FeedbackSave() {

    let error = false;

    let CandidateID = $("#inputCandidateName").val();
    let FeedbackDate = $("#inputFeedbackDate").val();
    let TechnicalRating = $("#inputTechnicalRating").val();
    let CommunicationRating = $("#inputCommunicationRating").val();
    let AptitudeRating = $("#inputAptitudeRating").val();
    let Status = $("#inputStatus").val();
    let Remarks = $("#inputRemarks").val();

    $(".text-danger").text("");

    if (CandidateID == "") {
        $("#validateCandidate").text("Please Select Candidate");
        error = true;
    }

    if (FeedbackDate == "") {
        $("#validateFeedbackDate").text("Please Select Feedback Date");
        error = true;
    }

    if (TechnicalRating == "") {
        $("#validateTechnicalRating").text("Please Enter Technical Rating");
        error = true;
    }

    if (CommunicationRating == "") {
        $("#validateCommunicationRating").text("Please Enter Communication Rating");
        error = true;
    }

    if (AptitudeRating == "") {
        $("#validateAptitudeRating").text("Please Enter Aptitude Rating");
        error = true;
    }

    if (Status == "") {
        $("#validateStatus").text("Please Select Status");
        error = true;
    }

    if (error) {
        return;
    }

    let FeedbackDetails = {

        CandidateID: CandidateID,
        FeedbackDate: FeedbackDate,
        TechnicalRating: TechnicalRating,
        CommunicationRating: CommunicationRating,
        AptitudeRating: AptitudeRating,
        Status: Status,
        Remarks: Remarks

    };

    $.ajax({

        type: "POST",
        url: "/Master/SaveFeedback",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(FeedbackDetails),
        dataType: "json",
        async: true,
        cache: false,

        success: function (response) {

            let message = response.success
                ? "Success : " + response.message
                : "Error : " + response.message;

            let type = response.success ? "success" : "danger";

            showToast(message, type);

            setTimeout(function () {

                location.reload(true);

            }, 2000);

        },

        error: function (xhr, status, error) {

            alert("Error : " + error);

        }

    });

}
function GetFeedbackList() {

    $.ajax({

        type: "GET",
        url: "/Master/GetFeedbackList",
        dataType: "json",

        success: function (data) {

            $("#tblFeedbackList tbody").empty();

            if (data != null && data.GetList.length > 0) {

                data.GetList.forEach(function (Feedback) {

                    let FeedbackRow = `<tr>

                        <td class='text-center'>${Feedback.CandidateName}</td>

                        <td class='text-center'>${Feedback.FeedbackDate}</td>

                        <td class='text-center'>${Feedback.TechnicalRating}</td>

                        <td class='text-center'>${Feedback.CommunicationRating}</td>

                        <td class='text-center'>${Feedback.AptitudeRating}</td>

                        <td class='text-center'>${Feedback.Status}</td>

                        <td class='text-center'>${Feedback.Remarks}</td>

                        <td class='text-center'>

                            <button type='button'
                                    class='btn btn-warning btn-sm'
                                    onclick='EditFeedback("${Feedback.FeedbackID}")'>

                                <i class='bi bi-pencil-square'></i>

                            </button>

                        </td>

                        <td class='text-center'>

                            <button type='button'
                                    class='btn btn-danger btn-sm'
                                    onclick='DeleteFeedback("${Feedback.FeedbackID}")'>

                                <i class='bi bi-trash-fill'></i>

                            </button>

                        </td>

                    </tr>`;

                    $("#tblFeedbackList tbody")
                        .append(FeedbackRow);

                });

                $('#tblFeedbackList').DataTable();

            }
            else {

                showToast("No Data Available", "info");

                $('#tblFeedbackList').DataTable();

            }

        },

        error: function (xhr, status, error) {

            alert("Error : " + error);

        }

    });

}
