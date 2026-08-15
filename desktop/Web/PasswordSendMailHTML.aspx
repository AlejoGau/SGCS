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
	string email = "";
	string host = "";

	string userid = "";
	Logger logger = LogManager.GetCurrentClassLogger();
	

	
	SoftguardLocalizationProvider Localization = LocalizationService.GetLocalization("Combined");
	

	
    void Page_Load(object sender, EventArgs args)
    {
		email = Request.Params["email"];
		string absolute = HttpContext.Current.Request.Url.AbsoluteUri;
		Uri uri = new Uri(absolute);        
		string url =  uri.Scheme + Uri.SchemeDelimiter + uri.Host + ":" + uri.Port ;
		//string url =  Request.Url.Host +(Request.Url.IsDefaultPort ? "" : ":" + Request.Url.Port+"/");
		
		string cc = System.Configuration.ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;
		var sqlPasswordRecoverySearch = string.Format("_Desktop.dbo.passwordRecoverySearch");
		
//---------------------------------------------------------

	
		string sqlParametro = "select par_cvalor from _tablas..t_parametros where par_ccodigo='DESKTOPEXTERNALURL'";
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

//---------------------------------------------------------		
		
		using (var ccCon = new System.Data.SqlClient.SqlConnection(cc)) {
			ccCon.Open();
			using(var cmd = new System.Data.SqlClient.SqlCommand(sqlPasswordRecoverySearch, ccCon)){
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.Add(new SqlParameter("@email", email));
				cmd.Parameters.Add(new SqlParameter("@host", url));
				using (SqlDataReader rdr = cmd.ExecuteReader()) {

					// iterate through results, printing each to console
					while (rdr.Read())
					{
						//aux = rdr["token"].ToString();
					}
				}
				//if (result != null) {

					Response.Redirect(url);
				//}			
			}			
		}
		


	}
</script>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
       	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
		rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                    
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, maximum-scale=1">
    </head>
<body>



</body>

</html>