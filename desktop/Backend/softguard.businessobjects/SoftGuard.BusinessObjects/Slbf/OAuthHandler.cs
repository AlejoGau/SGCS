using System;
using System.Web;
using System.Configuration;
using Slbf;
using Slbf.OAuth;

namespace SoftGuard.OAuth
{
    public class OAuthHandler : IHttpHandler
    {
        #region IHttpHandler Members
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest Request = context.Request;
            HttpResponse Response = context.Response;
            
            string UserId = (Request.Params["UserId"] != null) ? Request.Params["UserId"] : "";
            string Code = (Request.Params["Code"] != null) ? Request.Params["Code"] : "";            

            if (UserId.Length == 0 || Code.Length == 0)
                throw new HttpException("Invalid Parameters");

            string ClientId = ConfigurationManager.AppSettings["OAuthHandler.ClientId"];
            string ClientSecret = ConfigurationManager.AppSettings["OAuthHandler.ClientSecret"];
            string RedirectUrl = ConfigurationManager.AppSettings["OAuthHandler.RedirectUrl"];


            Token OAuthToken = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            string AccessToken = OAuthToken.GetAccessToken(ClientId, ClientSecret, Code);

            Response.SetCookie(new HttpCookie("OAuth_Token", AccessToken));
            Response.Redirect(RedirectUrl + AccessToken, true);
        }

        #endregion
    }
}
