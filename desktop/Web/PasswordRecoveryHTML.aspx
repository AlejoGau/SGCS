<%@ Page Language="C#" %>
<%@ Import namespace="Slbf.Services.Rest.Localization" %>
<%@ Import namespace="Slbf" %>
<%@ Import namespace="System.Web" %>
<%@ Import namespace="NLog" %>
<%@ Import namespace="System.IO" %>
<%@ Import namespace="System.Collections.Generic" %>
<%@ Import namespace="System.Text" %>
<%@ Import namespace="System.Data" %>
<%@ Import namespace="System.Data.SqlClient" %>


<script runat="server">


	string html = "";
	string token = "";
	string userid = "";
	string action = "";
	string email = "";
	
	Logger logger = LogManager.GetCurrentClassLogger();
	
	SoftguardLocalizationProvider Localization = LocalizationService.GetLocalization("Combined");
	
	string replaceValues(string htmlReplace,string email, string url){
		string absolute = HttpContext.Current.Request.Url.AbsoluteUri;
		Uri uri = new Uri(absolute);        
		string host =  url;//uri.Scheme + Uri.SchemeDelimiter + uri.Host + ":" + uri.Port ;
		action = host+"/PasswordChangingHTML.aspx?token="+token;

        htmlReplace = htmlReplace.Replace("{email}",email);
		htmlReplace = htmlReplace.Replace("{linkaction}",action);
        htmlReplace = htmlReplace.Replace("{msg1}","Recibiste este correo porque solicitaste recuperar la contraseña de tu usuario de Desktop.");
        htmlReplace = htmlReplace.Replace("{msg2}","Toca el siguiente botón para crear una nueva.");
        htmlReplace = htmlReplace.Replace("{msgbtn}","Crear una nueva contraseña");		
		htmlReplace = htmlReplace.Replace("{logoimg}",host+"/RecoveryPassword/resources/images/Logo.png");


		htmlReplace = htmlReplace.Replace("'{linkaction}'",action);
		
		
		return htmlReplace;
	}
	
    void Page_Load(object sender, EventArgs args)
    {


        string filepath = Server.MapPath("~/RecoveryPassword/passrecovery_template.html");
        logger.Trace("[Passwordrecovery] leo el template html:"+filepath);
        html = File.ReadAllText(filepath);		
		email = Request.Params["email"];
		token = Request.Params["token"];

		


		string cc = System.Configuration.ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;
			
		string url = "";
	
		string sqlParametro = "select par_cvalor from _tablas.dbo.t_parametros where par_ccodigo='DESKTOPEXTERNALURL'";
		using (var sqlConn = new System.Data.SqlClient.SqlConnection(cc)) {
			sqlConn.Open();
				using (var cmdTok = new System.Data.SqlClient.SqlCommand(sqlParametro, sqlConn)) {

					using (SqlDataReader rdr = cmdTok.ExecuteReader()) {	
						while (rdr.Read())
						{
							url = rdr["par_cvalor"].ToString();
							
						}					
					}					
				}
		}

		html = replaceValues(html,email,url);

	}
</script>


<!doctype html> 
<html>
    <head>

                    
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, maximum-scale=1">

    </head>
<body>


             <table>

                <tr>
                    <td>

							<%Response.Write(html);%>
                            
                        
                    </td>
                </tr>		
			</table>

</body>

</html>