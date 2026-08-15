using System;
using System.Xml;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;

namespace SoftGuard.BusinessObjects.Customs
{    
    [DataContract]
    public class LineRange
    {       
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Code { get; set; }

        [DataMember]
        public int RangeStart { get; set; }

        [DataMember]
        public int RangeEnd { get; set; }

        [DataMember]
        public int PersonId { get; set; }

        public LineRange()
        {            
        }       
    }

    [DataContract]
    public class Person
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }
        
        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string MobilePhone { get; set; }

        public Person()
        {
        }
    }

    public class WebDealerManager
    {
        public string ConnectionString { get; set; }

        public WebDealerManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<LineRange> GetLinesForPerson(int PersonId)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("WebDealer_LineRangesForPerson", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@PersonId", PersonId);            
            
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    LineRange m = new LineRange();
                    m.Id = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    m.Name = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    m.Code = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    m.RangeStart = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
                    m.RangeEnd = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
                    m.PersonId = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
                    
                    yield return m;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public LineRange SaveLineRange(LineRange Range)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("WebDealer_LineRangeSave", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Id", Range.Id);
            Cmd.Parameters.AddWithValue("@Code", Range.Code);
            Cmd.Parameters.AddWithValue("@RangeStart", Range.RangeStart);
            Cmd.Parameters.AddWithValue("@RangeEnd", Range.RangeEnd);
            Cmd.Parameters.AddWithValue("@PersonId", Range.PersonId);

            LineRange ln = null;
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ln = new LineRange();
                    ln.Id = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    ln.Name = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    ln.Code = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    ln.RangeStart = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
                    ln.RangeEnd = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
                    ln.PersonId = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);                    
                }

                return ln;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<Person> GetPersonForMasterDealer(string MasterDealers)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("WebDealer_PersonForMasterDealer", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Ids", MasterDealers);

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    Person p = new Person();
                    p.Id = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    p.Name = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    p.LastName = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    p.Email = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    p.Phone = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
                    p.MobilePhone = Reader.IsDBNull(5) ? "" : Reader.GetString(5);

                    yield return p;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
       
    }
}
