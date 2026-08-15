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
			

    }
</script>

<% if(Request.Cookies["OAuth_Token"] != null && Request.Params["forceDeleteToken"] != "true" 
//&& existTokenInDB == true
) { %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SoftGuardXXXX Desktop Security Suite - Login</title>
    <link rel="stylesheet" type="text/css" href="/Styles/Login.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
   	
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
	<link rel="stylesheet" href="/css/SgAppWebReport/css.boostrap.min.css" /> 
	
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
				<form id="loginForm" method="post" action="./PasswordSendMailHTML.aspx" >
			<% } %>
			
				<input type="hidden" name="ClientId" value="<%=ClientId %>" />
				<input type="hidden" name="cDealer" value="<%=dealerBack %>" />
				 <div style="color: #FFFFFF">
		        <label id="field1-label">Email:</label><br>
				</div>
				
		        
				<input class="fields_txt" required type="email" name="email" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" title='<%Response.Write(Localization.GetLocale("Por favor, ingrese un email correcto. Ejemplo, test@test.com"));%>'>
		        <br><br>



				<div class="row" style="padding-right: 83px;">
					<span class="d-inline-block" style="max-width: 150px;" >
						<p class="text-justify" style="color:#FFFFFF">
							<%Response.Write(Localization.GetLocale("Introduzca el Email con el que ingresas a la plataforma y luego presiona enviar, en minutos recibirás en esa misma cuenta un correo para realizar el cambio de contraseña"));%>
						</p>
					</span>
							        <br><br>
				</div>
				<div class="row">
					<div class="text-center">

						<button type="submit" class="btn btn-primary mb-2 float-right "><%Response.Write(Localization.GetLocale("Enviar"));%></button>
					</div>
				</div>
            </form>
            <% if (pRecovery == 1 ){%>
				<div class="sg-panel-forgot" style="margin-top: -35px;">
					<a href="#" onclick="forgotPass();return false;" style="color: #276889;text-decoration: none;font-size: 12px;"><%Response.Write(Localization.GetLocale("¿Olvidó su password?"));%></a>
				</div>	
			<% } %>					
	    </div>
	    	
	    <div class="sg-panel-copy" align="center" style="color: #FFFFFF">
		    Copyright &copy; SoftGuard Tech Corporation - All Rights Reserved.
	    </div>	
    </div>
</body>
	

	
</html>

<% } %>
