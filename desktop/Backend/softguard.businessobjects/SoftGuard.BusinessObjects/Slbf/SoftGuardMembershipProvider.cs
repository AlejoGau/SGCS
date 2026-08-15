using System;
using System.Web;
using System.Web.Security;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Security;
using System.Security.Permissions;
using System.Configuration;
using System.Configuration.Provider;
using System.Collections;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aladdin.HASP;
using SoftGuard.Aladdin;
using NLog;

namespace SoftGuard.BusinessObjects.Security
{
    [SqlClientPermission(SecurityAction.Demand, Unrestricted = true)]
    public class SoftGuardMembershipProvider : SqlMembershipProvider
    {
        private string _ConnectionString;
        private int licensetype;
        private Logger logger = LogManager.GetCurrentClassLogger();

        public string ConnectionString
        {
            get { return this._ConnectionString; }
            set { this._ConnectionString = value; }
        }

        public override void Initialize(string Name, NameValueCollection Config)
        {            
            if (Config == null)
                throw new ArgumentNullException("Config");

            if (String.IsNullOrEmpty(Name))
                Name = "SoftGuardMembershipProvider";

            if (string.IsNullOrEmpty(Config["description"]))
            {
                Config.Remove("description");
                Config.Add("description", "SoftGuard Membership Provider");
            }

            base.Initialize(Name, Config);

            string Connect = Config["connectionStringName"];

            if (String.IsNullOrEmpty(Connect))
                Connect = "Slbf";

            Config.Remove("connectionStringName");

            if (WebConfigurationManager.ConnectionStrings[Connect] == null)
                throw new ProviderException("Missing connection string");

            ConnectionString = WebConfigurationManager.ConnectionStrings[Connect].ConnectionString;

            if (String.IsNullOrEmpty(this._ConnectionString))
                throw new ProviderException("Empty connection string");

            if (Config.Count > 0)
            {
                string Attr = Config.GetKey(0);
                if (!String.IsNullOrEmpty(Attr))
                    throw new ProviderException("Unrecognized attribute: " + Attr);
            }


            int TIPOLICENCIA = 0;
            int.TryParse(
                   (Slbf.Data.DataService.ExecuteScalar("t_parametrosGetIValorByCodigo", new Dictionary<string, object>() { { "@par_ccodigo", "TIPOLICENCIA" } }) ?? "").ToString()
                   , out TIPOLICENCIA);

            licensetype = TIPOLICENCIA;

        }

        public override bool ChangePassword(string Username, string OldPassword, string NewPassword)
        {
            //Encrypt Passwords
            string EncryptedOldPassword = Encrypt(OldPassword);
            string EncryptedNewPassword = Encrypt(NewPassword);
            

            //Validate
            SqlConnection Conn = new SqlConnection(ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_MembershipProvider_ChangePassword", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Username", Username);
            Cmd.Parameters.AddWithValue("@OldPassword", EncryptedOldPassword);
            Cmd.Parameters.AddWithValue("@NewPassword", EncryptedNewPassword);

            try
            {
                Conn.Open();
                int Return = (int)Cmd.ExecuteScalar();

                return (Return != 0) ? true : false;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public override bool ValidateUser(string Username, string Password)
        {
            string EncryptedPassword = Encrypt(Password);
            logger.Trace("Valido password:"+EncryptedPassword);
            //Validate
            SqlConnection Conn = new SqlConnection(ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_MembershipProvider_ValidateUser", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Username", Username);
            Cmd.Parameters.AddWithValue("@Password", Password);
            Cmd.Parameters.AddWithValue("@EncryptedPassword", EncryptedPassword);

            try
            {
                Conn.Open();
                int Return = (int) Cmd.ExecuteScalar();

                return (Return != 0) ? true : false;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }


        public string Decrypt(string text)
        {
            string d = text;
            if (licensetype == 2)
            {
                SecurityManager manager = new SecurityManager(ConnectionString);
                CustomerInfo info = manager.GetKeyCustomerInfo();
                //string pass = FingerPrint.Value();
                d = Rijndael.Decrypt(text, info.Serial);
            }
            else
            {
                HaspHelper haspHelper = new HaspHelper();
                Hasp hasp = haspHelper.Login();
                d = haspHelper.Decrypt(hasp, text);
                haspHelper.Logout(ref hasp);
            }

            return d;
        }

        public string Encrypt(string text)
        {
            string d = text;
            if (licensetype == 2)
            {
                SecurityManager manager = new SecurityManager(ConnectionString);
                CustomerInfo info = manager.GetKeyCustomerInfo();
                //string pass = FingerPrint.Value();
                logger.Trace("Encripto :"+ info.Serial+" "+text);
                d = Rijndael.Encrypt(text, info.Serial);
            }
            else
            {
                HaspHelper haspHelper = new HaspHelper();
                Hasp hasp = haspHelper.Login();
                d = haspHelper.Encrypt(hasp, text);
                haspHelper.Logout(ref hasp);
            }
            return d;
        }
    }
}
