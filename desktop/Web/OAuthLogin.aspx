<%@ Page Language="C#" %>
<%@ Import namespace="Slbf.Services.Rest.Localization" %>
<%@ Import namespace="Slbf" %>
<%@ Import namespace="System.Web" %>
<%@ Import namespace="NLog" %>

<script runat="server">

	string ClientId = "";
	string cDealer = "";
	int pRecovery = 0;
	bool existTokenInDB = false;
	string reCaptcha = "";
	dynamic reCaptchaKey;
	string lang = "en-en";
	string dealerBack = "";
	Logger logger = LogManager.GetCurrentClassLogger();
	
	SoftguardLocalizationProvider Localization = LocalizationService.GetLocalization("Combined");
	
	
    void Page_Load(object sender, EventArgs args)
    {
		ClientId = (Request.Params["ClientId"] != null) ? Request.Params["ClientId"] : "191B8347-F356-48DE-8EC1-B996112E80C1";
		Localization.Language = "es-ar";
		
		// verifico si tiene cookie, si es asi borro el token
		string token = "";
		if(Request.Cookies["OAuth_Token"] != null) {
		token = Request.Cookies["OAuth_Token"].Value;
		}
		
		string cc = System.Configuration.ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;
			


		// Obtengo la KEY del Captcha y el idioma del SISTEMA.
		using (var ccCaptcha = new System.Data.SqlClient.SqlConnection(cc)) {
			ccCaptcha.Open();
			var sqlreCaptcha = string.Format("select par_cValor from _Tablas..t_parametros where par_ccodigo = 'CAPTCHA'");
			var sqlLanguaje = string.Format("select par_cValor from _Tablas..t_parametros where par_ccodigo = 'IDIOMAMSJ'");
			var sqlPasswordRecovery = string.Format("select par_ivalor from _Tablas..t_parametros where RTrim(par_ccodigo) = 'RECUPERARCONTRASEÑA'");			
			
			// KEY CAPTCHA
			using (var cmd = new System.Data.SqlClient.SqlCommand(sqlreCaptcha, ccCaptcha)) {
				string resultreCaptcha = (string)(cmd.ExecuteScalar());
				
				if (!String.IsNullOrEmpty(resultreCaptcha)) {
					reCaptchaKey = Slbf.DynamicJson.Parse(resultreCaptcha);
					reCaptcha = reCaptchaKey.key.ToString();
				}
			}
			
			// LENGUAJE
			using (var cmdL = new System.Data.SqlClient.SqlCommand(sqlLanguaje, ccCaptcha)) {
				var resultLanguaje = cmdL.ExecuteScalar().ToString();
				
				if (resultLanguaje != null) {
					lang = string.Format("https://www.google.com/recaptcha/api.js?hl={0}", resultLanguaje.ToString());
					Localization.Language = resultLanguaje;
					logger.Trace("El idioma es:"+resultLanguaje);
				}				
			}
			
			// KEY Password Recovery
			using (var cmdL = new System.Data.SqlClient.SqlCommand(sqlPasswordRecovery, ccCaptcha)) {
				var resultPasswordRecovery = cmdL.ExecuteScalar().ToString();
				
				if (resultPasswordRecovery != null) {
					pRecovery =  Int32.Parse(resultPasswordRecovery.ToString());
	
					logger.Trace("Recuperación de password: "+resultPasswordRecovery.ToString());
				}				
			}			
			
		}
		
		// Obtengo de la URL el parametro cdealer para el reemplazo del logo
		var cdealer = Request.Params["cdealer"];
		
		if(!String.IsNullOrEmpty(cdealer)) {
			if (cdealer.Length <= 3) {
				if (Regex.IsMatch(cdealer.ToString(), @"^[a-zA-Z0-9_-]+$")) {
					// Response.Write("esta OK.");
					dealerBack = cdealer.ToString();					
					// guardo el dealer en sesion para el logout y demas
					Session["cDealer"] = dealerBack;
				} else {
					// Response.Write("No tiene solo letras / numeros, si 3 caracteres");
				}
			} else {
				// Response.Write("Tiene mas de 3 caracteres");
			}
		}

		
		if(Request.Params["forceDeleteToken"] == "true")
		{
		   // tiene cookie, elimino el token de la base.
		  
		   Response.Cookies["OAuth_Token"].Expires = DateTime.Now.AddDays(-1); 
		   
		   using (var cn = new System.Data.SqlClient.SqlConnection(cc))
            {
                cn.Open();
				try {
					var sql = string.Format("delete from _desktop..token where AccessToken='{0}'",token);
				
					using (var cmd = new System.Data.SqlClient.SqlCommand(sql, cn))
					{
						cmd.ExecuteNonQuery();
					}
				} catch{
					// solo devel
				}
				
            }
		} else {
		//Request.Cookies["OAuth_Token"] != null &&
			if(Request.Cookies["OAuth_Token"] != null) {
				using (var cn = new System.Data.SqlClient.SqlConnection(cc))
				{
					cn.Open();
					var sql = string.Format("select * from _datos..token where AccessToken='{0}'",token);
					
					using (var cmd = new System.Data.SqlClient.SqlCommand(sql, cn))
					{
						var tokenSel = cmd.ExecuteScalar();
						
						/*foreach (var t in tokenSel){
							if(t.id>0) {
								existTokenInDB = true;
							}
						}*/
						if(tokenSel == null) {
							existTokenInDB = true;
						}
					}
				}
			}
		}
    }
</script>

<% if(Request.Cookies["OAuth_Token"] != null && Request.Params["forceDeleteToken"] != "true" 
//&& existTokenInDB == true
) { %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SoftGuard Desktop Security Suite - Login</title>
    <link rel="stylesheet" type="text/css" href="/Styles/Login.css" />
	<link rel="stylesheet" href="/css/SgAppWebReport/css.boostrap.min.css" /> 
   	
	<style>
		/* pregunto si vino un cdealer bien formado */
		<% if( (!String.IsNullOrEmpty(dealerBack) && Request.Params["forceDeleteToken"] == "true") || !String.IsNullOrEmpty(dealerBack) ) { %>
			#sg-panel {
				background: transparent url("../../images/default/login/img_bkg_login_<%= dealerBack %>.png") no-repeat;
			}
			.sg-submit {
				background: transparent url("../../images/default/login/btn_login_<%= dealerBack %>.png") no-repeat 0 0 !important; 
			}
			.sg-submit.forgot{
				background: transparent url("../../images/default/login/btn_send_<%= dealerBack %>.png") no-repeat 0 0 !important; 
			}
		<% } else { %>
			#sg-panel {
				background: transparent url("../images/default/login/img_bkg_login.png") no-repeat;
			}
		<% } %>
	</style>

	<!-- Agregado para estilo nuevo, si es Captcha y algunos Dealers con logo en el medio -->
	<% if(reCaptcha != "" && reCaptcha != null ) { %>
		<style>
			#sg-panel {
				height: 440px;
				background-size: 100% 100%;
			}
			.sg-panel-copy {
				margin: 100px auto 0;
			}
			
		</style>
	<% } %>

</head>

<body>
    <div id="sg-panel">
	    <div class="sg-panel-form text" style="color: #FFFFFF">
            <h2><%Response.Write(Localization.GetLocale("Desktop sesion detectada"));%></h2>
			
			<!-- pregunto si vino un cdealer bien formado -->
			<% if(!String.IsNullOrEmpty(dealerBack)) { %>
				<a href="/d/<%=dealerBack %>/?forceDeleteToken=true" class="btn btn-success"><%Response.Write(Localization.GetLocale("Eliminar sesion"));%></a><br>
			<% } else { %>
				<a href="/?forceDeleteToken=true" class="btn btn-success"><%Response.Write(Localization.GetLocale("Eliminar sesion"));%></a><br>
			<% } %>
			
			<!--a href="/" class="btn btn-info" style="margin-top:10px"><%Response.Write(Localization.GetLocale("Reintentar"));%></a-->
	    </div>
	    	
	    <div class="sg-panel-copy" align="center" style="color: #FFFFFF">
		    Copyright &copy; SoftGuard Tech Corporation - All Right Reserved.
	    </div>	
    </div>
</body>
</html>

<% } else { %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SoftGuard Desktop Security Suite - Login</title>
    <link rel="stylesheet" type="text/css" href="/Styles/Login.css" />
	
	<!-- CAPTCHA -->
	<script src="<%= lang %>" async defer ></script>
		
	<style>
		/* Muevo el form para arriba, para que se vea OK */
		<% if(reCaptcha != "" && reCaptcha != null ) { %>
			
			#sg-panel {
				height: 440px;
				background-size: 100% 100% !important;
			}
			.sg-panel-copy {
				margin: 100px auto 0;
			}
			.sg-panel-form {
				padding-top : 130px;
			}
			
		<% } %>
		
		/* pregunto si vino un cdealer bien formado */
		<% if( !String.IsNullOrEmpty(dealerBack) && Request.Params["forceDeleteToken"] == "true" ) { %>
			#sg-panel {
				background: transparent url("../../images/default/login/img_bkg_login_<%= dealerBack %>.png") no-repeat;
			}
			.sg-submit {
				background: transparent url("../../images/default/login/btn_login_<%= dealerBack %>.png") no-repeat 0 0 !important; 
			}
			.sg-submit.forgot{
				background: transparent url("../../images/default/login/btn_send_<%= dealerBack %>.png") no-repeat 0 0 !important; 
			}
		<% } else if (!String.IsNullOrEmpty(dealerBack)) { %>
					
			#sg-panel {
				background: transparent url("../images/default/login/img_bkg_login_<%= dealerBack %>.png") no-repeat;
			}
			.sg-submit {
				background: transparent url("../../images/default/login/btn_login_<%= dealerBack %>.png") no-repeat 0 0 !important; 
			}
			.sg-submit.forgot{
				background: transparent url("../../images/default/login/btn_send_<%= dealerBack %>.png") no-repeat 0 0 !important; 
			}
			
		<% } %>
	</style>
	

</head>

<body>
	

    <div id="sg-panel">
	    <div class="sg-panel-form">
            <!-- Cambio desde donde se toma el OauthLogin.ashx cuando es login de dealer -->
			<% if( (!String.IsNullOrEmpty(dealerBack) && Request.Params["forceDeleteToken"] == "true") || !String.IsNullOrEmpty(dealerBack) ) { %>
				<form id="loginForm" method="post" action="../OAuthLogin.ashx">
			<% } else { %>
				<form id="loginForm" method="post" action="OAuthLogin.ashx" >
			<% } %>
			
				<input type="hidden" name="ClientId" value="<%=ClientId %>" />
				<input type="hidden" name="cDealer" value="<%=dealerBack %>" />
				 <div style="color: #FFFFFF">
		        <label id="field1-label">Email:</label><br>
				</div>
				
		        <input class="fields_txt" type="text" name="username" id="field1" value="" />

		        <br><br>
				<div style="color: #FFFFFF">
		        <label id="field2-label">Password:</label><br>
				</div>
		        <input class="fields_txt" type="password" name="password" id="field2" value="" />

                <%
					if (Request.Params["Login"] == "false") { 
						var blocking = Request.Params["blocking"];
						var blockingText = "";
						int blockingValue;
						if (!string.IsNullOrEmpty(blocking) && int.TryParse(blocking, out blockingValue)) {
							blockingText = (blockingValue == -1 ? "El Usuario se encuentra bloqueado. Contacte con su proveedor del servicio para poder reestablecerlo." : "El email y/o password es incorrecto. Por favor, verifique los datos e intente nuevamente.");
						} else {
							blockingText = "Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente más tarde.";
						}
				%>
				<div style="color: #ac1212; padding-right: 83px;">
					<div style="color: #FFFFFF">
						<%=blockingText%>
					</div>
				</div>
				<% 
					}
				%>
				
				<% if(reCaptcha != "" && reCaptcha != null ) { %>
					<div id="g-recaptcha" class="g-recaptcha" align="center" data-callback="enableEnviar" ></div>
					<input id="submitBtn" class="sg-submit pointerevent" type="image" src="/images/space.gif" />
				<% } else { %>
					<input id="submitBtn" class="sg-submit " type="image" src="/images/space.gif" />
				<% } %>	
            </form>

            <% if (pRecovery == 1 ){%>
				<div class="sg-panel-forgot" style="margin-top: -35px;">
					<a href="PasswordRecovery.aspx"  class="sg-forgot-link"><%Response.Write(Localization.GetLocale("¿Olvidó su password?"));%></a>
				</div>	
			<% } %>					
	    </div>
	    	
	    <div class="sg-panel-copy" align="center" style="color: #FFFFFF">
		    Copyright &copy; SoftGuard Tech Corporation - All Rights Reserved.
	    </div>	
    </div>
</body>
	
	<% if(reCaptcha != "" && reCaptcha != null ) { %>
		<script type="text/javascript">

			document.getElementById('loginForm').addEventListener("keydown", function(event){
				if (event.keyCode == 13) {
					event.preventDefault();
					return false;
				}
					
			});
				
			/* Carga del ReCaptcha */
			document.getElementById('g-recaptcha').setAttribute('data-sitekey', '<%=reCaptcha %>');
			
			function enableEnviar() {
				document.getElementById('submitBtn').classList.remove('pointerevent');
			}

		</script>
	<% } %>
	
</html>

<% } %>
