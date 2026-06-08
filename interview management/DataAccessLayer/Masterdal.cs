using InterviewSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace interview_management.DataAccessLayer
{
    public class Masterdal
    {
        private SqlConnection con;

        private void connection()
        {
            string constring =
                ConfigurationManager.ConnectionStrings["dbCon"].ConnectionString;

            System.Diagnostics.Debug.WriteLine(constring);

            con = new SqlConnection(constring);
            con.Open();
        }

        // ================= GET NEXT CANDIDATE ID =================
        public string GetNextCandidateid()
        {
            int maxCandidateid = 0;

            try
            {
                connection();

                SqlCommand cmd = new SqlCommand("sp_GetMaxCandidateID", con);
                cmd.CommandType = CommandType.StoredProcedure;

                object result = cmd.ExecuteScalar();

                if (result != null)
                {
                    string numericPart = Regex.Match(result.ToString(), @"\d+").Value;

                    maxCandidateid = !string.IsNullOrEmpty(numericPart)
                        ? Convert.ToInt32(numericPart)
                        : 0;
                }
            }
            catch (Exception)
            {
                return "Error";
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }

            string formattedCandidateid = $"CUST{maxCandidateid + 1:D4}";
            return formattedCandidateid;
        }

        // ================= SAVE CANDIDATE =================
        public bool SaveCandidate(Candidate candidate)
        {
            try
            {
                connection();

                SqlCommand cmd = new SqlCommand("sp_SaveCandidate", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CandidateName", candidate.CandidateName ?? "");
                cmd.Parameters.AddWithValue("@Email", candidate.CandidateEmail ?? "");
                cmd.Parameters.AddWithValue("@Mobile", candidate.CandidateMobNo ?? "");
                cmd.Parameters.AddWithValue("@Gender", candidate.CandidateGender ?? "");
                cmd.Parameters.AddWithValue("@PositionApplied", candidate.CandidatePositionApplied ?? "");
                cmd.Parameters.AddWithValue("@Qualification", candidate.CandidateQualification ?? "");
                cmd.Parameters.AddWithValue("@Experience", candidate.CandidateExperience ?? "");
                cmd.Parameters.AddWithValue("@Address", candidate.CandidateAddress ?? "");

                int rows = cmd.ExecuteNonQuery();

                return rows > 0;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        }

        // ================= GET CANDIDATE LIST =================
        public CandidateList GetCandidateList()
        {
            try
            {
                connection();

                SqlCommand cmd = new SqlCommand("sp_GetCandidateList", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter adp = new SqlDataAdapter();
                adp.SelectCommand = cmd;

                DataTable dt = new DataTable();
                adp.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    CandidateList CL = new CandidateList();
                    List<Candidate> candidates = new List<Candidate>();

                    foreach (DataRow dtr in dt.Rows)
                    {
                        Candidate C = new Candidate();

                        C.CandidateId = Convert.ToInt32(dtr["CandidateId"]);
                        C.CandidateName = dtr["CandidateName"].ToString();
                        C.CandidateEmail = dtr["Email"].ToString();
                        C.CandidateMobNo = dtr["Mobile"].ToString();
                        C.CandidateGender = dtr["Gender"].ToString();
                        C.CandidatePositionApplied = dtr["PositionApplied"].ToString();
                        C.CandidateQualification = dtr["Qualification"].ToString();
                        C.CandidateExperience = dtr["Experience"].ToString();
                        C.CandidateAddress = dtr["Address"].ToString();

                        candidates.Add(C);
                    }

                    CL.GetList = candidates;
                    return CL;
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        }

        // ================= GET CANDIDATE DETAILS BY ID =================
        public Candidate GetCandidateDetailsByID(int candidateId)
        {
            try
            {
                connection();

                SqlCommand cmd = new SqlCommand("sp_GetCandidateDetailsByID", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CandidateId", candidateId);

                SqlDataAdapter adp = new SqlDataAdapter();
                adp.SelectCommand = cmd;

                DataTable dt = new DataTable();
                adp.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    Candidate C = new Candidate();

                    C.CandidateId = Convert.ToInt32(dt.Rows[0]["CandidateId"]);
                    C.CandidateName = dt.Rows[0]["CandidateName"].ToString();
                    C.CandidateEmail = dt.Rows[0]["Email"].ToString();
                    C.CandidateMobNo = dt.Rows[0]["Mobile"].ToString();
                    C.CandidateGender = dt.Rows[0]["Gender"].ToString();
                    C.CandidatePositionApplied = dt.Rows[0]["PositionApplied"].ToString();
                    C.CandidateQualification = dt.Rows[0]["Qualification"].ToString();
                    C.CandidateExperience = dt.Rows[0]["Experience"].ToString();
                    C.CandidateAddress = dt.Rows[0]["Address"].ToString();

                    return C;
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        }

        // ================= DELETE CANDIDATE =================
        public bool DeleteCandidate(string CandidateID)
        {
            try
            {
                connection();

                SqlCommand cmd = new SqlCommand(
                    "DELETE FROM Candidate WHERE CandidateID = @CandidateID",
                    con);

                cmd.Parameters.AddWithValue("@CandidateID", CandidateID);

                int rows = cmd.ExecuteNonQuery();

                return rows > 0;
            }
            catch
            {
                return false;
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        }
    }
}