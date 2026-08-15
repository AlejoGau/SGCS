using System;
using System.Management;
using System.Security.Cryptography;
using System.Security;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using NLog;
using Slbf.Json.Serialization;

namespace SoftGuard.BusinessObjects.Security
{
    /// <summary>
    /// Generates a 16 byte Unique Identification code of a computer
    /// Example: 4876-8DB5-EE85-69D3-FE52-8CF7-395D-2EA9
    /// </summary>
    public class FingerPrint
    {
        private static readonly Dictionary<string, string> fingerPrintCache = new Dictionary<string, string>();
        private static readonly object fingerPrintCacheSync = new object();
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public static string Value(bool _short = false)
        {
            return Value(_short, false);
        }
        public static string Value(bool _short, bool ignoreCpuRevision)
        {
            return ValueInternal(_short, ignoreCpuRevision, null);
        }
        public static string ValueFromCpu(string cpuIdentifier, bool _short = false)
        {
            return ValueInternal(_short, false, cpuIdentifier);
        }
        private static string ValueInternal(bool _short, bool ignoreCpuRevision, string cpuIdentifier)
        {
            string sfinger = BuildRawValue(_short, ignoreCpuRevision, cpuIdentifier);
            lock (fingerPrintCacheSync)
            {
                string cachedValue;
                if (!fingerPrintCache.TryGetValue(sfinger, out cachedValue))
                {
                    string xLog = sfinger + "\nDISK >> " + diskId() + "\nVIDEO >> " + videoId() + "\nMAC >> " + macId() + "\nBASE >> " + baseId();
                    logger.Info("G : " + xLog);

                    //logger.Trace("Calculo fingerprint: "+ sfinger);
                    cachedValue = GetHash(sfinger);
                    //logger.Trace("Resultado fingerprint: " + cachedValue);

                    fingerPrintCache[sfinger] = cachedValue;

                    logger.Info("R : " + cachedValue);
                }

                return cachedValue;
            }
        }
        public static string RawValue(bool _short = false)
        {
            return RawValue(_short, false);
        }
        public static string RawValue(bool _short, bool ignoreCpuRevision)
        {
            return BuildRawValue(_short, ignoreCpuRevision, null);
        }
        public static List<string> GetCpuIdLegacyVariants()
        {
            List<string> variants = new List<string>();
            string cpuIdentifier = cpuId();

            if (!string.IsNullOrEmpty(cpuIdentifier))
            {
                variants.Add(cpuIdentifier);
            }

            if (string.IsNullOrEmpty(cpuIdentifier) || cpuIdentifier.Length == 0)
            {
                return variants;
            }

            char lastDigit = char.ToUpperInvariant(cpuIdentifier[cpuIdentifier.Length - 1]);
            if (!Uri.IsHexDigit(lastDigit))
            {
                return variants;
            }

            string prefix = cpuIdentifier.Substring(0, cpuIdentifier.Length - 1);
            const string hexDigits = "0123456789ABCDEF";
            foreach (char digit in hexDigits)
            {
                string variant = prefix + digit;
                if (!variants.Contains(variant))
                {
                    variants.Add(variant);
                }
            }

            return variants;
        }
        private static string BuildRawValue(bool _short, bool ignoreCpuRevision, string cpuIdentifier)
        {
            string sfinger = "CPU >> " + cpuId(ignoreCpuRevision, cpuIdentifier) + "\nBIOS >> " + biosId(_short) + "\nUUID >> " + uuid();
            //logger.Trace("RawValue fingerprint: " + sfinger);
            return sfinger;
        }
        private static string GetHash(string s)
        {
            logger.Trace("computo hash: " + s);
            MD5 sec = new MD5CryptoServiceProvider();
            ASCIIEncoding enc = new ASCIIEncoding();
            byte[] bt = enc.GetBytes(s);
            byte[] bhash = sec.ComputeHash(bt);
            return GetHexString(bhash);
        }
        private static string GetHexString(byte[] bt)
        {
            string s = string.Empty;
            for (int i = 0; i < bt.Length; i++)
            {
                byte b = bt[i];
                int n, n1, n2;
                n = (int)b;
                n1 = n & 15;
                n2 = (n >> 4) & 15;
                if (n2 > 9)
                    s += ((char)(n2 - 10 + (int)'A')).ToString();
                else
                    s += n2.ToString();
                if (n1 > 9)
                    s += ((char)(n1 - 10 + (int)'A')).ToString();
                else
                    s += n1.ToString();
                if ((i + 1) != bt.Length && (i + 1) % 2 == 0) s += "-";
            }
            return s;
        }
        #region Original Device ID Getting Code
        //Return a hardware identifier
        private static string identifier(string wmiClass, string wmiProperty, string wmiMustBeTrue)
        {
            string result = "";
            System.Management.ManagementClass mc = new System.Management.ManagementClass(wmiClass);
            System.Management.ManagementObjectCollection moc = mc.GetInstances();
            foreach (System.Management.ManagementObject mo in moc)
            {
                if (mo[wmiMustBeTrue].ToString() == "True")
                {
                    //Only get the first one
                    if (result == "")
                    {
                        try
                        {
                            result = mo[wmiProperty].ToString();
                            break;
                        }
                        catch
                        {
                        }
                    }
                }
            }
            return result;
        }
        //Return a hardware identifier
        private static string identifier(string wmiClass, string wmiProperty)
        {
            string result = "";
            try
            {
                System.Management.ManagementClass mc = new System.Management.ManagementClass(wmiClass);
                System.Management.ManagementObjectCollection moc = mc.GetInstances();
                foreach (System.Management.ManagementObject mo in moc)
                {
                    //Only get the first one
                    if (result == "")
                    {
                        try
                        {
                            if (mo[wmiProperty] != null)
                            {
                                result = mo[wmiProperty].ToString();
                                break;
                            }
                        }
                        catch (Exception e)
                        {
                            logger.Trace(e.Message);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                logger.Error("Error al cargar los datos: "+wmiClass+"|"+ wmiProperty);
                logger.Trace(e.Message);
                logger.Trace(e.StackTrace);
            }

            return result;
        }
        private static string cpuId(bool ignoreCpuRevision = false, string cpuIdentifier = null)
        {
            //Uses first CPU identifier available in order of preference
            //Don't get all identifiers, as very time consuming
            string retVal = cpuIdentifier;
            if (string.IsNullOrEmpty(retVal))
            {
                retVal = identifier("Win32_Processor", "UniqueId");
                if (retVal == "") //If no UniqueID, use ProcessorID
                {
                    retVal = identifier("Win32_Processor", "ProcessorId");
                    if (retVal == "") //If no ProcessorId, use Name
                    {
                        retVal = identifier("Win32_Processor", "Name");
                        if (retVal == "") //If no Name, use Manufacturer
                        {
                            retVal = identifier("Win32_Processor", "Manufacturer");
                        }
                        //Add clock speed for extra security
                        retVal += identifier("Win32_Processor", "MaxClockSpeed");
                    }
                }
            }

            if (ignoreCpuRevision)
            {
                retVal = normalizeCpuId(retVal);
            }

            return retVal;
        }
        private static string normalizeCpuId(string cpuIdentifier)
        {
            if (string.IsNullOrEmpty(cpuIdentifier) || cpuIdentifier.Length < 2)
            {
                return cpuIdentifier;
            }

            char lastDigit = char.ToUpperInvariant(cpuIdentifier[cpuIdentifier.Length - 1]);
            if (!Uri.IsHexDigit(lastDigit))
            {
                return cpuIdentifier;
            }

            return cpuIdentifier.Substring(0, cpuIdentifier.Length - 1);
        }
        //BIOS Identifier
        public static string biosId(bool _short = false)
        {
            string _bios = identifier("Win32_BIOS", "Manufacturer")
            + identifier("Win32_BIOS", "SMBIOSBIOSVersion")
            + identifier("Win32_BIOS", "IdentificationCode")
            + identifier("Win32_BIOS", "SerialNumber");

            // agrego el manejo para no tomar la fecha y la version en el bios por problemas con google cloud (DSS-529)
            if (!_short)
            {
                _bios += identifier("Win32_BIOS", "ReleaseDate")
                + identifier("Win32_BIOS", "Version");
            }

            return _bios;
        }

        //Main physical hard drive ID
        private static string diskId()
        {
            return identifier("Win32_DiskDrive", "Model")
            + identifier("Win32_DiskDrive", "Manufacturer")
            + identifier("Win32_DiskDrive", "Signature")
            + identifier("Win32_DiskDrive", "TotalHeads");
        }
        //Motherboard ID
        private static string baseId()
        {
            return identifier("Win32_BaseBoard", "Model")
            + identifier("Win32_BaseBoard", "Manufacturer")
            + identifier("Win32_BaseBoard", "Name")
            + identifier("Win32_BaseBoard", "SerialNumber");
        }
        //Primary video controller ID
        private static string videoId()
        {
            return identifier("Win32_VideoController", "DriverVersion")
            + identifier("Win32_VideoController", "Name");
        }
        //First enabled network card ID
        private static string macId()
        {
            return identifier("Win32_NetworkAdapterConfiguration", "MACAddress", "IPEnabled");
        }

        private static string uuid()
        {
            string result = "";
            try {
                result=identifier("Win32_ComputerSystemProduct", "UUID");
            }
            catch
            {
                result = "UUID_INVALIDO";
            }
            return result;
        }
        #endregion
    }
}
