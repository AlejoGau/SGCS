<%@ Page Language="C#" %>
<%@ Import namespace="Slbf.Services.Rest.Localization" %>
<%@ Import namespace="Slbf" %>
<%@ Import namespace="System.Web" %>
<%@ Import namespace="NLog" %>
<%@ Import namespace="System.IO" %>
<%@ Import namespace="SoftGuard.BusinessObjects.Security" %>
<%@ Import namespace="System.Web.Configuration" %>
<%@ Import namespace="System.Data.SqlClient" %>
<%@ Import namespace="System.Data" %>
<%@ Import namespace="System.Data.SqlClient" %>


<script runat="server">
	Logger logger = LogManager.GetCurrentClassLogger();
	int param1=0;
	string token="";
	int idToken = 0;
	string changedPassword = "A";
	string password1 = "";
	string password2 = "";
	string passwordUpd = "";
	string url = "";
	
	
	
	SoftguardLocalizationProvider Localization = LocalizationService.GetLocalization("Combined");
	
	string encriptar(string password){
		 string Connect = WebConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;		 
		 SecurityManager manager = new SecurityManager(Connect);
		 CustomerInfo info = manager.GetKeyCustomerInfo();

		 string e = Rijndael.Encrypt(password, info.Serial);	
		 return e;
	}
	
    void Page_Load(object sender, EventArgs args)
    {
		Localization.Language = "es-ar";
		token = Request.Params["token"];
		string idTokenStr = Request.Params["idToken"];
		string userIdStr = Request.Params["param1"];
		if(!string.IsNullOrEmpty(idTokenStr)){
			idToken = Int32.Parse(idTokenStr);
		}
		if(!string.IsNullOrEmpty(userIdStr)){
			param1 = Int32.Parse(userIdStr);
		}
		password1 = Request.Params["password1"];
		password2 = Request.Params["password2"];
		string absolute = HttpContext.Current.Request.Url.AbsoluteUri;
		Uri uri = new Uri(absolute);  		
		url =  uri.Scheme + Uri.SchemeDelimiter + uri.Host + ":" + uri.Port ;
		
	 
		string cc = System.Configuration.ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;		
		string sqlToken = "SELECT Id,userId from _Datos..temporaltoken where status='A' AND  Token='"+token+"'";
		using (var sqlConn = new System.Data.SqlClient.SqlConnection(cc)) {
			sqlConn.Open();
			if(idToken==0){
				using (var cmdTok = new System.Data.SqlClient.SqlCommand(sqlToken, sqlConn)) {

					using (SqlDataReader rdr = cmdTok.ExecuteReader()) {	
						while (rdr.Read())
						{
							idToken = Int32.Parse(rdr["Id"].ToString());
							param1 = Int32.Parse(rdr["userId"].ToString());
						}					
					}					
				}	
			}else{
				if(!(string.IsNullOrEmpty(password1) && string.IsNullOrEmpty(password2)) ){
					passwordUpd = encriptar(password1);
					string sqlupdtoken= string.Format("_Desktop.dbo.TemporalTokenInctivarUpd");
					string sqlupdpassword = string.Format("_Desktop.dbo.UsersDesktopWebUpdPass");
					using(var cmdPassUpd = new System.Data.SqlClient.SqlCommand(sqlupdpassword, sqlConn)){
						cmdPassUpd.CommandType = CommandType.StoredProcedure;
						cmdPassUpd.Parameters.Add(new SqlParameter("@Id", param1));
						cmdPassUpd.Parameters.Add(new SqlParameter("@udw_clave", passwordUpd));
						cmdPassUpd.ExecuteNonQuery();			
					}					
					using(var cmdTokenUpd = new System.Data.SqlClient.SqlCommand(sqlupdtoken, sqlConn)){
						cmdTokenUpd.CommandType = CommandType.StoredProcedure;
						cmdTokenUpd.Parameters.Add(new SqlParameter("@Id", idToken));
		
						var result = cmdTokenUpd.ExecuteScalar();
						if(result != null){
							changedPassword = result.ToString();
						}
					}		
				}
				
				
			}
		}			
		 
	}
</script>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SoftGuard Desktop Security Suite - Login</title>
    <link rel="stylesheet" type="text/css" href="/Styles/Login.css" />
	<link rel="stylesheet" href="/css/SgAppWebReport/css.boostrap.min.css" /> 
	


	

</head>

<body>
	<% if (idToken>0 && changedPassword.Equals("A")) {%> 

    <div id="sg-panel">
	    <div class="sg-panel-form" style='padding-top: 80px;' >
				<form id="loginForm" method="post" action="" >
					<input type="hidden" name="idToken" value="<%=idToken %>" />
					<input type="hidden" name="param1" value="<%=param1 %>" />
				 <H2><p class="text-justify" style="color:#FFFFFF">
				<%Response.Write(Localization.GetLocale("Cambio de Contrase&ntildea"));%>
				 </p></H2>
			

				<input type="hidden" name="token" value="<%Response.Write(token);%>" />
				<div style="color: #FFFFFF">
		        <label id="field1-label"><%Response.Write(Localization.GetLocale("Ingresar Contrase&ntilde;a"));%></label><br>
				</div>
				
		        <div class="row">
					<input class="fields_txt" id="password1" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,16}" type="password" name="password1" onkeyup='check();' title='<%Response.Write(Localization.GetLocale("Minimo 6 caracteres, una Mayuscula, una minuscula y un numero"));%>'>
		        </div>
				<br><br>

				<div style="color: #FFFFFF">
		            <label id="field1-label"><%Response.Write(Localization.GetLocale("Repita Contrase&ntilde;a"));%></label><br>
				</div>
				<div  class="row">

							<input style="float:left" class="fields_txt" id="password2" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,16}" type="password" name="password2" onkeyup='check();'  title='<%Response.Write(Localization.GetLocale("Minimo 6 caracteres, una Mayuscula, una minuscula y un numero"));%>'>



				</div>
				<br><br><br>
				<div class="row">			
							<span style="float:left; padding-right: 15px;" class="sg-forgot-link" id='message'></span>
				</div>					

				<br><br>


				<div class="row">
					<div class="text-center">

						<button type="submit" onClick="return check();" class="btn btn-primary mb-2 float-right "><%Response.Write(Localization.GetLocale("Enviar"));%></button>
					</div>
				</div>
            </form>
				
	    </div>
	    	
	    <div class="sg-panel-copy" align="center" style="color: #FFFFFF">
		    Copyright &copy; SoftGuard Tech Corporation - All Rights Reserved.
	    </div>	
    </div>
	<% }else{
			if(changedPassword.Equals("A")){	
	%>
				<div id="sg-panel">
					<div class="sg-panel-form">
						 <H2><p class="text-justify" style="color:#FFFFFF">
						<%Response.Write(Localization.GetLocale("El link al que ingres&oacute no es v&aacutelido o ya expir&oacute"));%>
						 </p></H2>			
						
					</div>
				</div>
	<%
			}else{
		%>
				<div id="sg-panel">
					<div class="sg-panel-form">
						 <H2><p class="text-justify" style="color:#FFFFFF">
						<%Response.Write(Localization.GetLocale("La contrase&ntildea se cambi&oacute correctamente."));%>
						 </p></H2>	
							<br><br>
						 <p >
							<a class="sg-forgot-link" href='<% Response.Write(url);%>' >
								<%Response.Write(Localization.GetLocale("Ingresar con usuario y contrase&ntildea"));%>
							<a>
						 </p>
					</div>
				</div>			
	<%
			}
	}%>
</body>
	
		
	<script>
		var check = function() {
		  if(document.getElementById('password1').value == '' &&
			document.getElementById('password2').value == ''){
			document.getElementById('message').innerHTML = '';
			return false;
		}
		  if (document.getElementById('password1').value ==
			document.getElementById('password2').value) {
			document.getElementById('message').style.color = 'green';
			document.getElementById('message').innerHTML = '<%Response.Write(Localization.GetLocale("Las contrase&ntildeas coinciden"));%>';
			return true;
		  } else {
			document.getElementById('message').style.color = 'red';
			document.getElementById('message').innerHTML = '<%Response.Write(Localization.GetLocale("Las contrase&ntildeas no coinciden o no cumple con los requesitos necesarios, por favor, valide los datos ingresados"));%>';
			return false;
		  }
		  
		}
		

	</script>
	
</html>

