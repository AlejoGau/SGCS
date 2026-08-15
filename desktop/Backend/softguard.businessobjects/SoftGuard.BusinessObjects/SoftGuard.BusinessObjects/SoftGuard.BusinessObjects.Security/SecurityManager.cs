using System;
using System.Xml;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Data.SqlClient;
using System.Runtime.Serialization;
using SoftGuard.Aladdin;
using Aladdin.HASP;
using System.Globalization;
using NLog;
using System.Data.SqlTypes;

namespace SoftGuard.BusinessObjects.Security
{
    [DataContract]
    public class ResultadoMensaje
    {
        [DataMember]
        public string Resultado { get; set; }

        [DataMember]
        public string Mensaje { get; set; }
    }
    [DataContract]
    public class UserData
    {
        [DataMember]
        public string UserId { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Company { get; set; }

        [DataMember]
        public string OrganizationName { get; set; }

        [DataMember]
        public int udw_idKey { get; set; }
        [DataMember]
        public int udw_tipo { get; set; }

        [DataMember]
        public int udw_iperfil { get; set; }

        public UserData()
        {
        }
    }
    [DataContract]
    public class KeyModule
    {
        [DataMember]
        public string Module { get; set; }

        [DataMember]
        public DateTime DueDate { get; set; }

        [DataMember]
        public int QuantityOfUsers { get; set; }
		
		[DataMember]
        public int ConcurrentInstances { get; set; }

        [DataMember]
        public List<string> Dependencies { get; set; }

        [DataMember]
        public string DisplayGrayIcons { get; set; }

        [DataMember]
        public string WebMonRanges { get; set; }

        
        [DataMember]
        public bool IsPerpetual { get; set; }

        public KeyModule()
        {
        }
    }
    [DataContract]
    public class CustomerInfo
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Serial { get; set; }

        [DataMember]
        public string QtyAccounts { get; set; }

        [DataMember]
        public string KeyId { get; set; }
        public CustomerInfo()
        {
        }
    }

    [DataContract]
    public class UserModule
    {
        [DataMember]
        public int ModuleId { get; set; }

        [DataMember]
        public string ModuleName { get; set; }

        [DataMember]
        public string KeyReference { get; set; }

        [DataMember]
        public string UserId { get; set; }

        [DataMember]
        public string MetaData { get; set; }

        [DataMember]
        public string Security { get; set; }

        [DataMember]
        public bool Available { get; set; }

        [DataMember]
        public int udm_disponible { get; set; }
        [DataMember]
        public string AppVersion { get; set; }

        public UserModule()
        {            
        }       
    }
    [DataContract]
    public class Permission
    {       
        [DataMember]
        public string Name { get; set; }

        public Permission()
        {            
        }       
    }
    [DataContract]
    public class Line
    {       
        [DataMember]
        public string Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public int RangeStart { get; set; }

        [DataMember]
        public int RangeEnd { get; set; }

        public Line()
        {            
        }       
    }

    [DataContract]
    public class KeyModuleSecurity
    {
        [DataMember]
        public string ModuleKeyReference { get; set; }
        [DataMember]
        public int QuantityOfUsers { get; set; }
        [DataMember]
        public int Availables { get; set; }
        [DataMember]
        public bool Status { get; set; }
    }

    [DataContract]
    public class AWCCUser
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Login { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public int CueIId { get; set; }
        [DataMember]
        public int Entity { get; set; }
        [DataMember]
        public string LoginTemplate { get; set; }
    }

    public class SecurityManager
    {
        public string ConnectionString { get; set; }
        private int licensetype;
        private Logger logger = LogManager.GetCurrentClassLogger();
        private string fingerprint;
        private List<string> compatibleFingerprints;
        private int errorcount = 0;

        public SecurityManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
            int TIPOLICENCIA=0;
            int.TryParse(
                   (Slbf.Data.DataService.ExecuteScalar("t_parametrosGetIValorByCodigo", new Dictionary<string, object>() { { "@par_ccodigo", "TIPOLICENCIA" } }) ?? "").ToString()
                   , out TIPOLICENCIA);

            licensetype = TIPOLICENCIA;
            compatibleFingerprints = BuildCompatibleFingerprints();
            fingerprint = compatibleFingerprints.First();
        }

        public string Decrypt(string text)
        {
            string d = text;
            if (licensetype == 2)
            {
                foreach (string pass in GetDecryptionFingerprints())
                {
                    try
                    {
                        d = Rijndael.Decrypt(text, pass);
                        fingerprint = pass;
                        return d;
                    }
                    catch (Exception)
                    {
                    }
                }

                logger.Trace("[Decrypt] Error con fingerprints compatibles. Fingerprint actual: " + fingerprint);

                if (!isSupportAvailable() && errorcount == 0)
                {
                    logger.Trace("[Decrypt] Busco el fingerprint en la base");
                    errorcount++;
                    DataTable s_systemdata = getSystemData("FINGERPRINT");
                    if (s_systemdata != null && s_systemdata.Rows.Count > 0)
                    {
                        fingerprint = s_systemdata.Rows[0]["sdt_fingerprint"].ToString();
                        logger.Trace("[Decrypt] Uso el fingerprint de la base: " + fingerprint);
                        d = Decrypt(text);
                        errorcount = 0;
                        return d;
                    }
                }

                logger.Error("[Decrypt] Error al desencriptar sgkey: " + text + " " + fingerprint + " " + FingerPrint.RawValue()
                + "\nNo se pudo desencriptar con ningun fingerprint compatible.");

                logger.Trace("[Decrypt] disparo SgInvalidKeyException");
                errorcount = 0;
                throw new SgInvalidKeyException("[Decrypt] Error al desencriptar sgkey");
            } else
            {
                HaspHelper haspHelper = new HaspHelper();
                Hasp hasp = haspHelper.Login();
                d = haspHelper.Decrypt(hasp, text);
                //Logout
                haspHelper.Logout(ref hasp);
            }

            return d;
        }

        private bool isSupportAvailable()
        {
            DateTime utcNow = DateTime.UtcNow;
            TimeZoneInfo gmtMinus3 = TimeZoneInfo.CreateCustomTimeZone("GMT-3", TimeSpan.FromHours(-3), "GMT-3", "GMT-3");
            DateTime gmtMinus3Now = TimeZoneInfo.ConvertTimeFromUtc(utcNow, gmtMinus3);
            int currentHour = gmtMinus3Now.Hour;
            return currentHour >= 10 && currentHour < 17;
        }

        public string Encrypt(string text)
        {
            string d = text;
            if (licensetype == 2)
            {
                string pass = compatibleFingerprints.First();
                d = Rijndael.Encrypt(text, pass);
            }
            else
            {
                HaspHelper haspHelper = new HaspHelper();
                Hasp hasp = haspHelper.Login();
                d = haspHelper.Encrypt(hasp, text);
                //Logout
                haspHelper.Logout(ref hasp);
            }
            return d;
        }

        public UserData GetUserData(string UserName)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_GetUserData", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserName", UserName);            

            UserData u = new UserData();
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    u.UserId = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    u.FirstName = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    u.LastName = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    u.Company = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    if (Reader.FieldCount > 4)
                        u.OrganizationName = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
                    if (Reader.FieldCount > 5)
                        u.udw_idKey = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
                    if (Reader.FieldCount > 6)
                        u.udw_tipo = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
                    if (Reader.FieldCount > 7)
                        u.udw_iperfil = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
                }

                return u;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<UserModule> GetModulesForUser(string UserName)
        {
           return GetModulesForUser(UserName, String.Empty);
        }

        public IEnumerable<UserModule> GetModulesForUser(string UserName, string ip)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_GetModules", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserName", UserName);
            Cmd.Parameters.AddWithValue("@remoteIp", ip);
            
            Conn.Open();
            SqlDataReader Reader = Cmd.ExecuteReader();
            while (Reader.Read())
            {
                UserModule m = new UserModule();

                try
                {
                    m.ModuleId = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    m.ModuleName = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    m.KeyReference = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    m.UserId = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    m.MetaData = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
                    m.Security = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
                    m.udm_disponible = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
                    m.Available = Reader.IsDBNull(6) ? false : (Reader.GetInt32(6) == 0) ? false : true;//(Reader.IsDBNull(6) == 0) ? false : true;
                    m.AppVersion = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
                    m.udm_disponible = Reader.IsDBNull(8) ? 0 : Decimal.ToInt32(Reader.GetDecimal(8));

                }
                catch (Exception ex)
                {
                    logger.Error(ex.Message);
                    logger.Error(ex.StackTrace);
                }

                yield return m;
            }
            if (Conn.State != ConnectionState.Closed)
                Conn.Close();
        }

        public bool TokenHasModule(string token, string ModuleName)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_TokenHasModule", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Token", token);
            Cmd.Parameters.AddWithValue("@Module", ModuleName);

            int result = 0;
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    result = Reader.GetInt32(0);
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }

            return result>0?true:false;
        }

        public string SetMetaDataForUser(int UserId, string UserName, string MetaData)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_SetMetaData", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserId", UserId);
            Cmd.Parameters.AddWithValue("@UserName", UserName);            
            Cmd.Parameters.AddWithValue("@MetaData", MetaData);

            string MetaDataReturn = "";
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    MetaDataReturn = Reader.IsDBNull(0) ? "" : Reader.GetString(0);                    
                }

                return MetaDataReturn;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public UserModule SetModuleMetaDataForUser(string UserName, int ModuleId, string MetaData)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_Module_SetMetaData", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserName", UserName);
            Cmd.Parameters.AddWithValue("@ModuleId", ModuleId);
            Cmd.Parameters.AddWithValue("@MetaData", MetaData);

            UserModule m = new UserModule();
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    m.ModuleId = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    m.ModuleName = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    m.UserId = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    m.MetaData = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    m.Security = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
                }

                return m;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public UserModule SetModuleSecurityForUser(string UserName, int ModuleId, string MetaData, string Token="")
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_Module_SetSecurity", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserName", UserName);
            Cmd.Parameters.AddWithValue("@ModuleId", ModuleId);
            Cmd.Parameters.AddWithValue("@MetaData", MetaData);
            Cmd.Parameters.AddWithValue("@Token", Token);

            UserModule m = new UserModule();
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    m.ModuleId = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    m.ModuleName = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    m.UserId = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    m.MetaData = Reader.IsDBNull(2) ? "" : Reader.GetString(3);
                    m.Security = Reader.IsDBNull(3) ? "" : Reader.GetString(4);
                }

                return m;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public string GetMetaDataForUser(int UserId, string UserName)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_GetMetaData", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserId", UserId);
            Cmd.Parameters.AddWithValue("@UserName", UserName);            

            string MetaDataReturn = "";
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    MetaDataReturn = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                }

                return MetaDataReturn;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public string GetModuleSecurityForUser(string UserName, int ModuleId)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_Module_GetSecurity", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserName", UserName);
            Cmd.Parameters.AddWithValue("@ModuleId", ModuleId);            

            string SecurityData = "";
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    SecurityData = Reader.IsDBNull(0) ? "" : Reader.GetString(0);                    
                }

                return SecurityData;
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<Permission> GetPermissionsForUserAndType(string UserName, string UserType)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_GetUserPermissions", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserName", UserName);            

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    Permission p = new Permission();
                    p.Name = Reader.IsDBNull(0) ? "" : Reader.GetString(0);

                    yield return p;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<Line> GetLinesForUser(string Username, string Password)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_GlobalUser_GetUserLines", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Username", Username);
            Cmd.Parameters.AddWithValue("@Password", Password);       

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    Line p = new Line();
                    p.Id = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    p.Name = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    p.RangeStart = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
                    p.RangeEnd = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);

                    yield return p;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }


        public DataTable getSystemData(string type = "LICENSE")
        {
            if (type == "LICENSE")
            {
                return GetLicenseSystemData(type);
            }

            if (type == "FINGERPRINT")
            {
                return GetFallbackLicenseSystemData(type);
            }

            string filter = "[{\"property\":\"sdt_code\",\"value\":\"" + type + "\"}]";
            logger.Trace(filter);
            DataTable s_systemdata = Slbf.Data.DataService.ExecuteTable("s_systemdatabyfilter", new Dictionary<string, object>() { { "filter", filter } });
            return ValidateSystemDataDate(s_systemdata);
        }

        private DataTable GetLicenseSystemData(string type)
        {
            foreach (string candidateFingerprint in compatibleFingerprints)
            {
                string filter = "[{\"property\":\"sdt_code\",\"value\":\"" + type + "\"},{\"property\":\"sdt_fingerprint\",\"value\":\"" + candidateFingerprint + "\"}]";
                logger.Trace(filter);

                DataTable s_systemdata = Slbf.Data.DataService.ExecuteTable("s_systemdatabyfilter", new Dictionary<string, object>() { { "filter", filter } });
                if (s_systemdata.Rows.Count > 0)
                {
                    fingerprint = s_systemdata.Rows[0]["sdt_fingerprint"].ToString();
                    if (fingerprint != candidateFingerprint)
                    {
                        logger.Info("Fingerprint de licencia resuelto por compatibilidad. Usado: " + candidateFingerprint + " | guardado: " + fingerprint);
                    }

                    return ValidateSystemDataDate(s_systemdata);
                }
            }

            string fallbackFilter = "[{\"property\":\"sdt_code\",\"value\":\"" + type + "\"}]";
            logger.Trace(fallbackFilter);
            DataTable fallbackData = Slbf.Data.DataService.ExecuteTable("s_systemdatabyfilter", new Dictionary<string, object>() { { "filter", fallbackFilter } });
            if (fallbackData.Rows.Count == 1)
            {
                fingerprint = fallbackData.Rows[0]["sdt_fingerprint"].ToString();
                logger.Info("Fingerprint de licencia resuelto por fallback de compatibilidad sobre una unica licencia.");
                return ValidateSystemDataDate(fallbackData);
            }

            if (fallbackData.Rows.Count > 1)
            {
                logger.Error("Se encontraron multiples licencias para " + type + " y ninguna coincide con los fingerprints compatibles.");
            }

            if (!isSupportAvailable())
            {
                logger.Trace("[getSystemData] No encontro coincidencia por fingerprint. Fuera de horario de soporte, uso fallback de base.");
                return GetFallbackLicenseSystemData("FINGERPRINT");
            }

            throw new SgInvalidKeyException("[getSystemData] Error de licenciamiento, fingerprint inválido");
        }

        private DataTable GetFallbackLicenseSystemData(string type)
        {
            logger.Trace("[getSystemData] Busco el primer registro de LICENSE");
            string filter = "[{\"property\":\"sdt_code\",\"value\":\"LICENSE\"}]";
            logger.Trace(filter);
            DataTable s_systemdata = Slbf.Data.DataService.ExecuteTable("s_systemdatabyfilter", new Dictionary<string, object>() { { "filter", filter } });
            if (s_systemdata != null && s_systemdata.Rows.Count > 0)
            {
                fingerprint = s_systemdata.Rows[0]["sdt_fingerprint"].ToString();
            }

            if (type == "FINGERPRINT")
            {
                return s_systemdata;
            }

            return s_systemdata;
        }

        private DataTable ValidateSystemDataDate(DataTable s_systemdata)
        {
            if (s_systemdata != null && s_systemdata.Rows.Count > 0)
            {
                DateTime sqldate = DateTime.Parse(s_systemdata.Rows[0]["sqldate"].ToString());
                DateTime now = DateTime.Now;
                int diferencia = (now - sqldate).Days;
                if (diferencia != 0)
                {
                    logger.Error("[getSystemData] La fecha del server es inv�lida " + now.ToString() + " - " + sqldate.ToString());
                    return null;
                }
            }

            return s_systemdata;
        }

        private IEnumerable<string> GetDecryptionFingerprints()
        {
            List<string> candidates = new List<string>();

            if (!string.IsNullOrEmpty(fingerprint))
            {
                candidates.Add(fingerprint);
            }

            foreach (string candidate in compatibleFingerprints)
            {
                if (!candidates.Contains(candidate))
                {
                    candidates.Add(candidate);
                }
            }

            return candidates;
        }

        private List<string> BuildCompatibleFingerprints()
        {
            List<string> candidates = new List<string>();

            AddFingerprintCandidate(candidates, FingerPrint.Value(false, true));
            AddFingerprintCandidate(candidates, FingerPrint.Value(true, true));
            AddFingerprintCandidate(candidates, FingerPrint.Value());
            AddFingerprintCandidate(candidates, FingerPrint.Value(true));

            foreach (string cpuVariant in FingerPrint.GetCpuIdLegacyVariants())
            {
                AddFingerprintCandidate(candidates, FingerPrint.ValueFromCpu(cpuVariant));
                AddFingerprintCandidate(candidates, FingerPrint.ValueFromCpu(cpuVariant, true));
            }

            return candidates;
        }

        private void AddFingerprintCandidate(List<string> candidates, string candidate)
        {
            if (!string.IsNullOrEmpty(candidate) && !candidates.Contains(candidate))
            {
                candidates.Add(candidate);
            }
        }


        public string getKeyData(bool forceKey = false)
        {

            // me fijo donde esta la data de licenciamiento
            int TIPOLICENCIA = 0;
            string Info = "";

            if (!forceKey) {
                TIPOLICENCIA = licensetype;
            }

            if (TIPOLICENCIA > 0)
            {
                // leo de la base de datos
                DataTable s_systemdata = getSystemData();
                // desencripto
                try
                {
                    Info = Decrypt(s_systemdata.Rows[0]["sdt_data"].ToString());
                }
                catch
                {
                    throw new SgInvalidKeyException("[getKeyData] Error al desencriptar sgkey");
                }

                return Info;
            }
            else
            {
                //Login
                HaspHelper haspHelper = new HaspHelper();
                Hasp hasp = haspHelper.Login();
                // leo de la llave
                //Read Data
                byte[] bytes = haspHelper.ReadOnly(hasp, HaspFileId.ReadOnly);
                System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
                Info = encoding.GetString(bytes);
                //Logout
                haspHelper.Logout(ref hasp);

            }

            return Info;
        }

        public string GetKeyId(bool forceKey = false)
        {

            // me fijo donde esta la data de licenciamiento
            int TIPOLICENCIA = 0;
            string Info = "";

            if (!forceKey)
            {
                TIPOLICENCIA = licensetype;
            }

            if (TIPOLICENCIA > 0)
            {

                // leo de la base de datos
                DataTable s_systemdata = getSystemData();
                // desencripto
                Info = Decrypt(s_systemdata.Rows[0]["sdt_data"].ToString());

                return Info;
            }
            else
            {
                //Login
                HaspHelper haspHelper = new HaspHelper();
                Hasp hasp = haspHelper.Login();
                // leo de la llave
                //Read Data
                Info = haspHelper.GetKeyId(hasp);
                //Logout
                haspHelper.Logout(ref hasp);
            }

            return Info;
        }

        public List<KeyModule> GetKeyModules()
        {
            List<KeyModule> Modules = new List<KeyModule>();

            string Info = getKeyData();

            //Parse Xml   
            bool IsXmlData = true;
            XmlDocument XmlDoc = new XmlDocument();
            try
            {                
                XmlDoc.LoadXml(Info.Replace("\0", ""));
            }
            catch (Exception)
            {
                IsXmlData = false;
            }

            if (IsXmlData)
            {
                /*
                // me fijo si el serial es valido
                string serial = GetKeyId();

                // tengo qe usar el ID de la llave y no de la licencia
                List<string> invalid = new List<string>{
                    "347430736",
                    "933329933",
                    "1605022545",
                    "641643995",
                    "554500829",
                    "1424869499",
                    "842312642",
                    "233022976",
                    "261411996",
                    "2098862521",
                    "925843827",
                    "1328754600",
                    "318252807",
                    "1293267272",
                    "905510736",
                    "1482985495",
                    "1866475503",
                    "19660354",
                    "971942886",
                    "1945644994",
                    "2063387004",
                    "278383696",
                    "253452317",
                    "1037794313",
                    "1318452066",
                    "326647108",
                    "975084201",
                    "1250106340",
                    "1164740653",
                    "1271884798",
                    "949896773",
                    "1436988704",
                    "554023143",
                    "1606603129",
                    "680765395",
                    "304212888",
                    "1568942810",
                    "963328527"
                };
                string match = invalid.FirstOrDefault(stringToCheck => stringToCheck.Contains(serial));

                if (string.IsNullOrEmpty(match))
                {
                    throw new System.AccessViolationException("Llave inv�lida, serial:"+serial);
                }
                */

                XmlNodeList XmlModules = XmlDoc.SelectNodes("//Module");
                foreach (XmlNode XmlModule in XmlModules)
                {
                    try
                    {
                        string Module = XmlModule.Attributes["Name"].Value;
                        string DueDate = XmlModule.Attributes["DueDate"].Value.Trim().ToLower();
                        string QuantityOfUsers = XmlModule.Attributes["QtyUsers"].Value.Trim();
                        string Dependencies = XmlModule.Attributes["Dependencies"].Value.Trim();
						// no uso una variable porque el campo puede no existir mejorar best practice
                        //string ConcurrentInstances = XmlModule.Attributes["ConcurrentInstances"].Value.Trim();

                        KeyModule KeyModule = new KeyModule();
                        KeyModule.Module = Module;

                        if (DueDate.Equals("perpetual", StringComparison.InvariantCultureIgnoreCase))
                        {
                            KeyModule.IsPerpetual = true;
                            KeyModule.DueDate = DateTime.Now.AddMonths(1);
                        }
                        else
                        {
                            KeyModule.IsPerpetual = false;
                            KeyModule.DueDate = ParseIso8601(DueDate);
                        }

                        try
                        {
                            KeyModule.QuantityOfUsers = int.Parse(QuantityOfUsers);
                        }
                        catch (Exception)
                        {
                            KeyModule.QuantityOfUsers = 0;
                        }
						
						try
                        {
                            KeyModule.ConcurrentInstances = int.Parse(XmlModule.Attributes["ConcurrentInstances"].Value.Trim());
                        }
                        catch (Exception)
                        {
                            KeyModule.ConcurrentInstances = 0;
                        }

                        KeyModule.Dependencies = new List<string>();
                        try
                        {
                            KeyModule.Dependencies.AddRange(Dependencies.Split(new char[] { ',', char.Parse("\u0000") }, StringSplitOptions.RemoveEmptyEntries));
                        }
                        catch (Exception)
                        {

                        }

                        KeyModule.DisplayGrayIcons = "";
                        try
                        {
                            KeyModule.DisplayGrayIcons = XmlModule.Attributes["DisplayGrayIcons"].Value.Trim();
                        }
                        catch (Exception)
                        {
                        }

                        KeyModule.WebMonRanges = "";
                        try
                        {
                            KeyModule.WebMonRanges = XmlModule.Attributes["WebMonRanges"].Value.Trim();
                        }
                        catch (Exception)
                        {
                        }

                        Modules.Add(KeyModule);
                    }
                    catch (Exception)
                    {

                    }
                }
            }

            //Parse Data
            if (!IsXmlData)
            {
                string[] InfoRows = Info.Split(new char[] { '\r' });

                foreach (string InfoRow in InfoRows)
                {
                    try
                    {
                        string[] Module = InfoRow.Split(new char[] { '|' });
                        KeyModule KeyModule = new KeyModule();
                        KeyModule.Module = Module[0].Trim();

                        if (Module[1].Equals("perpetual", StringComparison.InvariantCultureIgnoreCase))
                        {
                            KeyModule.IsPerpetual = true;
                            KeyModule.DueDate = DateTime.Now.AddMonths(1);
                        }
                        else
                        {
                            KeyModule.IsPerpetual = false;
                            KeyModule.DueDate = ParseIso8601(Module[1]);
                        }

                        try
                        {
                            KeyModule.QuantityOfUsers = int.Parse(Module[2]);
                        }
                        catch (Exception)
                        {
                            KeyModule.QuantityOfUsers = 0;
                        }

                        KeyModule.Dependencies = new List<string>();
                        try
                        {
                            KeyModule.Dependencies.AddRange(Module[3].Split(new char[] { ',', char.Parse("\u0000") }, StringSplitOptions.RemoveEmptyEntries));
                        }
                        catch (Exception)
                        {

                        }

                        Modules.Add(KeyModule);
                    }
                    catch (Exception)
                    {

                    }
                }
            }

            //Load free modules
            if (licensetype != 2)
            {
                if (this.ConnectionString.Length == 0)
                    throw new Exception("Connection String not defined");

                SqlConnection Conn = new SqlConnection(this.ConnectionString);
                SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_GetModulesFree", Conn);
                Cmd.CommandType = CommandType.StoredProcedure;

                string freeModules = "";
                string freeModulesEncrypted = "";
                try
                {
                    Conn.Open();
                    freeModulesEncrypted = Cmd.ExecuteScalar().ToString();
                    if (freeModulesEncrypted.Length != 0)
                    {
                        freeModules=Decrypt(freeModulesEncrypted);
                    }
                    foreach (string freeModule in freeModules.Split(new char[] { '|', ';', ',' }))
                    {
                        if (freeModule.ToLower().StartsWith("sgapp") || freeModule.ToLower().StartsWith("sgutil"))
                        {
                            KeyModule KeyModule = new KeyModule();
                            KeyModule.Module = freeModule;
                            KeyModule.DisplayGrayIcons = "";
                            KeyModule.WebMonRanges = "";
                            KeyModule.Dependencies = new List<string>();
                            KeyModule.Dependencies.Add(freeModule);
                            KeyModule.IsPerpetual = true;
                            KeyModule.DueDate = DateTime.Now.AddMonths(1);

                            Modules.Add(KeyModule);
                        }
                    }
                }
                finally
                {
                    if (Conn.State != ConnectionState.Closed)
                        Conn.Close();
                }

                
            }
            

            //Return
            return Modules;
        }
        public CustomerInfo GetKeyCustomerInfo(bool forceKey = false)
        {
            string Info = getKeyData(forceKey);
            //Return
            return GetKeyCustomerInfo(Info);
        }

        // parseo el string
        public CustomerInfo GetKeyCustomerInfo(string Info)
        {
            //logger.Trace(filter);
            XmlDocument XmlDoc = new XmlDocument();
            XmlDoc.LoadXml(Info.Replace("\0", ""));

            CustomerInfo Customer = new CustomerInfo();

            Customer.Name = XmlDoc.SelectSingleNode("//Customer").Attributes["Name"].Value;
            Customer.Serial = XmlDoc.SelectSingleNode("//Customer").Attributes["Serial"].Value;

            try
            {
                Customer.KeyId = XmlDoc.SelectSingleNode("//Customer").Attributes["KeyId"].Value;
            }
            catch
            {
                // el xml de la llave fisica no tiene keyid
                Customer.KeyId = Customer.Serial;
            }
            

            var nameAttribute = XmlDoc.SelectSingleNode("//Customer").Attributes["QtyAccounts"];
            if (nameAttribute != null)
                Customer.QtyAccounts = nameAttribute.Value;

            //Return
            return Customer;
        }

        public KeyModuleSecurity CheckQuantityOfUsersForModule(int ModuleId)
        {            
            //Get QuantityOfUsers Of DB
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("SoftGuard_SecurityManager_Module_CheckQuantityOfUsers", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;            
            Cmd.Parameters.AddWithValue("@ModuleId", ModuleId);

            string KeyReference = "";
            int QuantityOfUsers = 0;
            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    KeyReference = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    QuantityOfUsers = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                }                
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }

            //Get Key Module
            KeyModule KeyModule = null;
            List<KeyModule> KeyModules = GetKeyModules();
            foreach (KeyModule Module in KeyModules)
            {
                if (Module.Module == KeyReference)
                {
                    KeyModule = Module;
                    break;
                }
            }
            
            //Return
            KeyModuleSecurity KeyModuleSecurity = new KeyModuleSecurity();
            KeyModuleSecurity.ModuleKeyReference = KeyReference;
            KeyModuleSecurity.QuantityOfUsers = QuantityOfUsers;

            if (KeyModule == null)
            {
                KeyModuleSecurity.Availables = 0;
                KeyModuleSecurity.Status = false;
            }
            if (KeyModule != null)
            {
                KeyModuleSecurity.Availables = (KeyModule.QuantityOfUsers == 0) ? 99 : (KeyModule.QuantityOfUsers - QuantityOfUsers);
                KeyModuleSecurity.Status = (KeyModuleSecurity.Availables > 0) ? true : false;
            }

            return KeyModuleSecurity;
        }

        #region AWCC
        public void AWCC_AsignarCuentas(string Accion, string Login, int CueIId)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("_Sistema.dbo.UsuariosAWCC_AsignarCuentas", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Accion", Accion);
            Cmd.Parameters.AddWithValue("@nombrelogin", Login);
            Cmd.Parameters.AddWithValue("@cue_iid", CueIId);
            
            try
            {
                Conn.Open();
                Cmd.ExecuteNonQuery();
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public ResultadoMensaje AWCC_Usuarios(string Accion, AWCCUser User)
        {
            var Out = new ResultadoMensaje();

            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            using(SqlConnection Conn = new SqlConnection(this.ConnectionString))
            using (SqlCommand Cmd = new SqlCommand("_Sistema.dbo.UsuariosAWCC_ABM", Conn))
            {
                Cmd.CommandType = CommandType.StoredProcedure;
                Cmd.Parameters.AddWithValue("@Accion", Accion);
                Cmd.Parameters.AddWithValue("@nombrelogin", User.Login);
                Cmd.Parameters.AddWithValue("@contrasena", User.Password);
                Cmd.Parameters.AddWithValue("@nombre_mostrar", User.Name);
                Cmd.Parameters.AddWithValue("@email", User.Email);
                Cmd.Parameters.AddWithValue("@cue_iid ", User.CueIId);
                Cmd.Parameters.AddWithValue("@entidad", User.Entity);
                Cmd.Parameters.AddWithValue("@nombreloginTemplate", User.LoginTemplate);

                Conn.Open();
                using (var r = Cmd.ExecuteReader())
                {
                    while (r.Read())
                    {
                        if(r.GetName(0) == "resultado")
                            Out.Resultado = (string)r["resultado"];

                        if (r.GetName(1) == "mensaje")
                            Out.Mensaje = (string)r["mensaje"];
                    }
                }
            }

            return Out;
        }
        #endregion



        private DateTime ParseIso8601(string value)
        {
            string Iso8601Format = "yyyy-MM-dd";
            return DateTime.ParseExact(value, Iso8601Format, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal);
        }
    }
}
