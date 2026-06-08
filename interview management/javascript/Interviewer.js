function InterviewerSave() {
    let error = false;
    let InterviewerName = $("#inputInterviewerName").val();
    let InterviewerMobNo = $("#inputInterviewerMobNo").val();
    let InterviewerDesignation = $("#inputInterviewerDesignation").val();
    let InterviewerDepartment = $("#inputInterviewerDepartment").val();
    if (InterviewerMobNo && CNMobNo !== "N/A") {
        if (InterviewerMobNo.length !== 10) {
            $("#validateCEMob").text("Please Provide Valid Mobile Number");
            error = true;
        }
    } else {
        InterviewerMobNo = "N/A";

        if (error) { return; }
        let InterviewerDetails = {
            Name: InterviewerName,
            PhoneNumber: InterviewerMobNo,
            Designation: InterviewerDesignation,
            Department: InterviewerDepartment,
            
        }
        $.ajax({
            type: "POST",
            url: "SaveInterviewer",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(InterviewerDetails),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {
                let message = response.success ? "Success: " + response.message : "Error: " + response.message;
                let type = response.success ? 'success' : 'danger';
                showToast(message, type);
                setTimeout(function () {
                    window.location.reload(true);
                }, 3000);
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }
 function GetInterviewerList() {
        $.ajax({
            type: "GET",
            url: "/Master/GetInterviewerList",
            dataType: "json",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: true,
            cache: false,
            success: function (data) {
                if (data != null && data.GetList.length > 0) {
                    data.GetList.forEach(function (Interviewer) {
                        let InterviewerDetail = `<tr>` +
                            `<td class='text-center'>` + Interviewer.Name + `</td>` +
                            `<td class='text-center'>` + Interviewer.InterviewerMobNo + `</td>` +
                            `<td class='text-center'>` + Interviewer.InterviewerDesignation + `</td>` +
                            `<td class='text-center'>` + Interviewer.InterviewerDepartment + `</td>` +
                            `<td class='text-center'><button type'button' class='btn btn-info btn-sm' style="border-radius: 20px; padding: 3px 8px;" onclick='EditSubDepartment("${Interviewer.InterviwerID}")'><i class='fa fa-pencil-square-o'></i></button></td>` +
                            `<td class='text-center'><button type='button' class='btn btn-danger btn-sm' style="border-radius: 20px; padding: 3px 8px;" onclick='DeleteSubDepartment("${Interviewre.InterviewerID}")'><i class='fa fa-times-circle-o'></i></button></td>` +
                            `</tr>`;
                        $("#tblInterviewerList tbody").append(InterviewerDetail);

                    });
                    $('#tblInterviewerList').DataTable();
                } else {
                    showToast("No Data Available", 'info');
                    $('#tblInterviewerList').DataTable();
                }
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }
}