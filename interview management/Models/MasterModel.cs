using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InterviewSchedulingSystem.Models
{
    public class Candidate
    {
        public int CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string CandidateEmail { get; set; }
        public string CandidateMobNo { get; set; }
        public string CandidateGender { get; set; }
        public string CandidatePositionApplied { get; set; }
        public string CandidateQualification { get; set; }
        public string CandidateExperience { get; set; }
        public string CandidateAddress { get; set; }
    }
    public class CandidateList
    {
        public ICollection<Candidate> GetList { get; set; }
    }
    public class Interviewer
    {
        public string InterviewerID { get; set; }

        public string InterviewerName { get; set; }

        public string InterviewerMobNo { get; set; }

        public string InterviewerDesignation { get; set; }

        public string InterviewerDepartment { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }
    }

    public class InterviewerList
    {
        public ICollection<Interviewer> GetList { get; set; }
    }
}

