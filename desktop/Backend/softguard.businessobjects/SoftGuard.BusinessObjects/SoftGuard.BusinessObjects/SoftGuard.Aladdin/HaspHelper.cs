using System;
using System.Xml;
using System.Collections.Specialized;
using System.Text;
using System.Runtime.InteropServices;
using Aladdin.HASP;

namespace SoftGuard.Aladdin
{
    public class HaspHelper
    {
        protected StringCollection stringCollection;
        public string scope = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><haspscope/> ";        

        public HaspHelper()
        {
            // next could be considered ugly.
            // build up a string collection holding
            // the status codes in a human readable manner.
            string[] stringRange = new string[] 
            {
                "Success.",
                "Invalid memory address.",
                "Unknown/invalid feature id option.",
                "Memory allocation failed.",
                "Too many open features.",
                "Feature access denied.",
                "Incompatible feature.",
                "HASP not found.",
                "En-/decryption length too short.",
                "Invalid handle.",
                "Invalid file id / memory descriptor.",
                "Driver or support daemon version too old.",
                "Real time support not available.",
                "Generic error from host system call.",
                "Hardware key driver not found.",
                "Unrecognized info format.",
                "Request not supported.",
                "Invalid update object.",
                "Key with requested id was not found.",
                "Update data consistency check failed.",
                "Update not supported by this key.",
                "Update counter mismatch.",
                "Invalid vendor code.",
                "Requested encryption algorithm not supported.",
                "Invalid date / time.",
                "Clock out of power.",
                "Update requested ack., but no area to return it.",
                "Terminal services (remote terminal) detected.",
                "Feature type not implemented.",
                "Unknown algorithm.",
                "Signature check failed.",
                "Feature not found",
                "Trace log not enabled.",
                "Communication error between application and local LM",
                "Vendor code unknown to API library (run apigen to make it known)",
                "Invalid XML spec",
                "Invalid XML scope",
                "Too many keys connected",
                "Too many users",
                "Broken session",
                "Communication error between local and remote LM",
                "The feature is expired",
                "HASP LM version too old",
                "HASP SL secure storage I/O error or USB request error",
                "Update installation not allowed",
                "System time has been tampered",
                "Secure channel communication error",
                "Secure storage contains garbage",
                "Vendor lib cannot be found",
                "Vendor lib cannot be loaded",
                "No feature matching scope found",
                "Virtual machine detected",
                "HASP update incompatible with this hardware; HASP key is locked to other hardware",
                "Login denied because of user restrictions",
                "Update was already installed",
                "Another update must be installed first",
                "Vendor library version too old",
                "Upload error",
                "Invalid XML recipient parameter for hasp_detach",
                "Invalid XML action parameter for hasp_detach",
                "Scope for hasp_detach does not select a unique Product",
                "Invalid Product information"
            };

            stringCollection = new StringCollection();
            stringCollection.AddRange(stringRange);

            for (int n = stringCollection.Count; n < 400; n++)
            {
                stringCollection.Insert(n, "");
            }

            stringRange = new string[]  
            {
                "A required API dynamic library was not found",
                "The found and assigned API dynamic library could not be verified",
            };

            stringCollection.AddRange(stringRange);

            for (int n = stringCollection.Count; n < 500; n++)
            {
                stringCollection.Insert(n, "");
            }

            stringRange = new string[]  
            {
                "Calling invalid object.",
                "A parameter is invalid.",
                "Already logged in.",
                "Already logged out."
            };

            stringCollection.AddRange(stringRange);

            for (int n = stringCollection.Count; n < 525; n++)
            {
                stringCollection.Insert(n, "");
            }

            stringCollection.Insert(525, "Unable to excecute/complete the operation.");

            for (int n = stringCollection.Count; n < 600; n++)
            {
                stringCollection.Insert(n, "");
            }

            stringCollection.Insert(600, "No classic memory extension block available.");

            for (int n = stringCollection.Count; n < 650; n++)
            {
                stringCollection.Insert(n, "");
            }

            stringCollection.Insert(650, "Invalid port type.");
            stringCollection.Insert(651, "Invalid port.");

            for (int n = stringCollection.Count; n < 698; n++)
            {
                stringCollection.Insert(n, "");
            }

            stringCollection.Insert(698, "Capability is not available.");
            stringCollection.Insert(699, "Internal API error.");
        }

        public Hasp Login()
        {
            // create a key object using a feature
            // and perform a login using the vendor code.
            HaspFeature feature = HaspFeature.FromFeature(1);
            Hasp hasp = new Hasp(feature);

            HaspStatus status = hasp.Login(VendorCode.Code, scope);
            ReportStatus(status);            
            
            return hasp.IsLoggedIn() ? hasp : null;
        }      
        public void Logout(ref Hasp hasp)
        {
            // sanity check
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");            

            HaspStatus status = hasp.Logout();
            ReportStatus(status);

            // get rid of the key immediately.
            hasp.Dispose();
            hasp = null;            
        }
        public string Encrypt(Hasp hasp, string text)
        {
            // sanity check
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            // convert the string into a byte array.
            byte[] data = UTF8Encoding.Default.GetBytes(text);

            // encrypting a string using the native .net API            
            HaspStatus status = hasp.Encrypt(ref text);
            ReportStatus(status);

            return text;
        }
        public string Decrypt(Hasp hasp, string text)
        {
            // sanity check
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            // convert the string into a byte array.
            byte[] data = UTF8Encoding.Default.GetBytes(text);

            // decrypting a string using the native .net API
            HaspStatus status = hasp.Decrypt(ref text);
            ReportStatus(status);

            return text;
        }                           
        public DateTime GetRtc(Hasp hasp)
        {
            // sanity check
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            DateTime time = DateTime.Now;
            HaspStatus status = hasp.GetRtc(ref time);
            ReportStatus(status);

            // return time
            return time;            
        }
        public string GetSessionInfo(Hasp hasp)
        {
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            string info = "";
            HaspStatus status = hasp.GetSessionInfo(Hasp.SessionInfo, ref info);
            ReportStatus(status);

            return info;
        }
        public string GetLicenseInfo(Hasp hasp)
        {
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            string licenseFormat = @"<haspformat root='hasp_info'><feature><attribute name='id' /><attribute name='locked' /><attribute name='expired' /><attribute name='disabled' /><attribute name='usable' /><element name='license' /><element name='expired' /></feature></haspformat>";
            string info = "";
            HaspStatus status = hasp.GetSessionInfo(licenseFormat, ref info);
            ReportStatus(status);

            return info;
        }
        public string GetUpdateInfo(Hasp hasp)
        {
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            string info = "";
            HaspStatus status = hasp.GetSessionInfo(Hasp.UpdateInfo, ref info);
            ReportStatus(status);

            return info;
        }
        public string GetKeyInfo(Hasp hasp)
        {
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            string info = "";
            HaspStatus status = hasp.GetSessionInfo(Hasp.KeyInfo, ref info);
            ReportStatus(status);

            return info;
        }

        public string GetKeyId(Hasp hasp)
        {
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");

            string info = "";
            HaspStatus status = hasp.GetSessionInfo(Hasp.KeyInfo, ref info);
            ReportStatus(status);

            //Parse Xml   
            bool IsXmlData = true;
            XmlDocument XmlDoc = new XmlDocument();
            try
            {
                XmlDoc.LoadXml(info.Replace("\0", ""));
            }
            catch (Exception)
            {
                IsXmlData = false;
            }

            if (IsXmlData)
            {
                XmlNode haspid = XmlDoc.SelectSingleNode("//haspid");
                info = haspid.InnerText;
            }


            return info;
        }

        public byte[] ReadOnly(Hasp hasp, HaspFileId fileId)
        {
            // sanity check
            if ((null == hasp) || !hasp.IsLoggedIn())
                throw new Exception("Hasp is null or is not logged in");
            
            HaspFile file = hasp.GetFile(fileId);
            if (!file.IsLoggedIn())
                throw new Exception("HaspFile is not logged in");            

            // get the file size
            int size = 0;
            HaspStatus status = file.FileSize(ref size);
            ReportStatus(status);     

            // read the contents of the file into a buffer
            byte[] bytes = new byte[size];
            
            status = file.Read(bytes, 0, bytes.Length);
            ReportStatus(status);

            return bytes;                          
        }
        protected void ReportStatus(HaspStatus status)
        {
            if (HaspStatus.StatusOk != status)
                throw new Exception(string.Format("Result: {0} (HaspStatus::{1})", stringCollection[(int)status], status.ToString()));
        }
    }
}
