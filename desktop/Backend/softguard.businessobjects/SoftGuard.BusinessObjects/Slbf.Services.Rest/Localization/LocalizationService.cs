using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Slbf.Services.Rest.Localization
{
    public static class LocalizationService
    {
        public static SoftguardLocalizationProvider GetLocalization(string uiapplication) {
            var o = new SoftguardLocalizationProvider();
            o.SetUiApplication(uiapplication);
            return o;
        }

        public static SoftguardLocalizationProvider GetLocalization(string uiapplication, string Language)
        {
            var o = new SoftguardLocalizationProvider();
            o.SetUiApplication(uiapplication);
            o.Language = Language;
            return o;
        }
    }
}