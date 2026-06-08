using System.Collections.Generic;
using System.Web.Mvc;
using InterviewSchedulingSystem.Models;
using interview_management.DataAccessLayer;

namespace InterviewSchedulingSystem.Controllers
{
    public class HomeController : Controller
    {
        readonly Masterdal masterdal = new Masterdal();

        public ActionResult Index()
        {
            return View();
        }

        // ================= CANDIDATE PAGE =================

        public ActionResult Candidate()
        {
            return View();
        }

        // ================= GET CANDIDATE ID =================

        [HttpGet]
        public JsonResult GetCandidateID()
        {
            var candidateId = masterdal.GetNextCandidateid();
            return Json(candidateId, JsonRequestBehavior.AllowGet);
        }

        // ================= SAVE CANDIDATE =================

        [HttpPost]
        public JsonResult SaveCandidate(Candidate candidate)
        {
            if (ModelState.IsValid)
            {
                bool IsExecuted = masterdal.SaveCandidate(candidate);

                if (IsExecuted)
                {
                    return Json(new
                    {
                        success = true,
                        message = "Candidate saved successfully."
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "Failed To Save Candidate Details."
                    });
                }
            }

            return Json(new
            {
                success = false,
                message = "Invalid Candidate Data."
            });
        }

        // ================= GET CANDIDATE LIST =================

        [HttpGet]
        public JsonResult GetCandidateList()
        {
            var candidateList = masterdal.GetCandidateList();

            if (candidateList != null)
            {
                return Json(candidateList, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new
                {
                    GetList = new List<Candidate>()
                }, JsonRequestBehavior.AllowGet);
            }
        }
        // ================= GET CANDIDATE BY ID =================

        [HttpGet]
        public JsonResult GetCandidateByID(int CandidateID)
        {
            var candidateDetails = masterdal.GetCandidateDetailsByID(CandidateID);

            if (candidateDetails != null)
            {
                return Json(candidateDetails,
                            JsonRequestBehavior.AllowGet);
            }

            return Json(new Candidate(),
                        JsonRequestBehavior.AllowGet);
        }


        // ================= DELETE CANDIDATE =================

        [HttpPost]
        public JsonResult DeleteCandidate(string CandidateID)
        {
            bool IsExecuted = masterdal.DeleteCandidate(CandidateID);

            if (IsExecuted)
            {
                return Json(new
                {
                    success = true,
                    message = "Candidate deleted successfully."
                });
            }

            return Json(new
            {
                success = false,
                message = "Failed To Delete Candidate."
            });
        }
        public ActionResult Dashboard()
        {
            return View();
        }



        public ActionResult Interviewer()
        {
            return View();
        }
        public ActionResult Schedule()
        {
            return View();
        }
        public ActionResult Feedback()
        {
            return View();
        }
        public ActionResult Reports()
        {
            return View();
        }





    }
}