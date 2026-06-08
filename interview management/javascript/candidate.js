$(document).ready(function () {
    GetCandidateList();
});

function CandidateSave() {
    let candidate = {
       
        CandidateName: $("#inputCandidateName").val(),
        CandidateEmail: $("#inputCNEmail").val(),
        CandidateMobNo: $("#inputCNMobNo").val(),
        CandidateGender: $("#inputCNGender").val(),
        CandidatePositionApplied: $("#inputCNPositionApplied").val(),
        CandidateQualification: $("#inputCNQualification").val(),
        CandidateExperience: $("#inputCNExperience").val(),
        CandidateAddress: $("#inputCNAddress").val()
    };
    $.ajax({
        type: "POST",
        url: "/Home/SaveCandidate",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(candidate),
        dataType: "json",
        success: function (response) {
            alert(response.message);
            if (response.success) {
                $("#inputCandidateId").val('0'); 
                $("#inputCandidateName").val('');
                $("#inputCNEmail").val('');
                $("#inputCNMobNo").val('');
                $("#inputCNGender").val('');
                $("#inputCNPositionApplied").val('');
                $("#inputCNQualification").val('');
                $("#inputCNExperience").val('');
                $("#inputCNAddress").val('');
                $("#candidateModal").modal("hide");
                GetCandidateList();
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}

function GetCandidateList() {
    $.ajax({
        type: "GET",
        url: "/Home/GetCandidateList",
        dataType: "json",
        success: function (data) {

            if ($.fn.DataTable.isDataTable('#tblCandidateList')) {
                $('#tblCandidateList').DataTable().destroy();
            }

            $("#tblCandidateList tbody").empty();

            $.each(data.GetList, function (i, c) {
                let serialNo = i + 1;
                let row =
                    "<tr>" +
                    "<td>" + serialNo + "</td>" +
                    "<td>" + c.CandidateName + "</td>" +
                    "<td>" + c.CandidateEmail + "</td>" +
                    "<td>" + c.CandidateMobNo + "</td>" +
                    "<td>" + c.CandidateGender + "</td>" +
                    "<td>" + c.CandidatePositionApplied + "</td>" +
                    "<td>" + c.CandidateQualification + "</td>" +
                    "<td>" + c.CandidateExperience + "</td>" +
                    "<td>" + c.CandidateAddress + "</td>" +
                    "<td>" +
                    "<button class='btn btn-warning btn-sm me-1' onclick='EditCandidate(" + c.CandidateId + ")'>" +
                    "<i class='bi bi-pencil-fill'></i> Edit" +
                    "</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='DeleteCandidate(" + c.CandidateId + ")'>" +
                    "<i class='bi bi-trash-fill'></i> Delete" +
                    "</button>" +
                    "</td>" +
                    "</tr>";
                $("#tblCandidateList tbody").append(row);
            });

            $('#tblCandidateList').DataTable({
                autoWidth: true,
                columnDefs: [
                    { orderable: false, targets: [9] }   // disable sort on Action column
                ]
            });
        },
        error: function (xhr) {
            console.log("Error loading candidate list: " + xhr.responseText);
        }
    });
}

function EditCandidate(id) {
    $.ajax({
        type: "GET",
        url: "/Home/GetCandidateByID",
        data: { CandidateID: id },
        success: function (data) {
           
            $("#inputCandidateName").val(data.CandidateName);
            $("#inputCNEmail").val(data.CandidateEmail);
            $("#inputCNMobNo").val(data.CandidateMobNo);
            $("#inputCNGender").val(data.CandidateGender);
            $("#inputCNPositionApplied").val(data.CandidatePositionApplied);
            $("#inputCNQualification").val(data.CandidateQualification);
            $("#inputCNExperience").val(data.CandidateExperience);
            $("#inputCNAddress").val(data.CandidateAddress);
            $("#candidateModal").modal("show");
        },
        error: function (xhr) {
            console.log("Error fetching candidate: " + xhr.responseText);
        }
    });
}

function DeleteCandidate(id) {
    $('#DeleteModal .modal-body')
        .text("Are you sure you want to delete this candidate?");
    $('#DeleteModal').modal('show');
    $('#btnYes').off('click').on('click', function () {
        $.ajax({
            type: "POST",
            url: "/Home/DeleteCandidate",
            data: { CandidateID: id },
            success: function (response) {
                alert(response.message);
                if (response.success) {
                    $('#DeleteModal').modal('hide');
                    GetCandidateList();
                }
            },
            error: function (xhr) {
                console.log("Error deleting candidate: " + xhr.responseText);
            }
        });
    });
}