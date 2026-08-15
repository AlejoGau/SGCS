using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Slbf.Services.Rest.Localization
{
    public class SoftguardLocalizationProvider
    {
        public string UiApplication { get; set; }
        public string Language { get; set; }
        public void SetUiApplication(string UiApplication) {
            this.UiApplication = UiApplication;
        }
        public string GetUserLanguage()
        {
            var token = HttpContext.Current.Request["oauth_token"];
            var language = HttpContext.Current.Request.Params["Language"];

            if (String.IsNullOrEmpty(language))
            {
                var sSecurityRestService = new SoftGuard.EnterpriseServices.Rest.SecurityRestService();
                var metadata = sSecurityRestService.GetUserMetaDataByToken(token);

                if (String.IsNullOrEmpty(metadata))
                {
                    language = "es-ar";
                }
                else
                {
                    dynamic metadataDynamic = Slbf.Json.Linq.JValue.Parse(metadata);
                    if (metadataDynamic == null || metadataDynamic.Property("language") == null)
                    {
                        language = "es-ar";
                    }
                    else
                    {
                        var metadatalanguage = metadataDynamic.Property("language").Value;
                        language = metadatalanguage.ToString();
                    }
                }
            }
            return language;
        }

        public string GetLocale(string q)
        {
            object language = this.Language;
            if (language == null)
            {
                language = GetUserLanguage();
                this.Language = language.ToString();
            }
            object o = Slbf.Data.DataService.ExecuteScalar("LocalizationGetLocale", new Dictionary<string, object>(){
                {"Name", q}
                ,{"Language", language.ToString()}
                ,{"UiApplication", UiApplication}
            });
            return o.ToString();
        }
    }
}