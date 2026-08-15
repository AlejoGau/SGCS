<%@ Page Language="C#" %>
<script runat="server">
    string ClientId = "";
	string redirectKey = "";
    void Page_Load(object sender, EventArgs args)
    {
        ClientId = "191B8347-F356-48DE-8EC1-B996112E80C1";//Request.Params["ClientId"];
		redirectKey = Request.Params["redirectKey"];
    }
</script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SoftGuard Security - Login</title>
    <link rel="stylesheet" type="text/css" href="Styles/Login.css" />
</head>

<body>
    <div id="sg-panel">
	    <div class="sg-panel-form">	
            <form method="post" action="OAuthLogin.ashx">
                <input type="hidden" name="ClientId" value="<%=ClientId%>" />
				<input type="hidden" name="redirectKey" value="<%=redirectKey%>" />
		        <label id="field1-label">User:</label><br>
		        <input class="fields_txt" type="text" name="username" id="field1" value="" autocomplete="off" />

		        <br><br>

		        <label id="field2-label">Password:</label><br>
		        <input class="fields_txt" type="password" name="password" id="field2" value="" autocomplete="off" />
		
		        <input id="submitBtn" class="sg-submit" type="image" src="/images/space.gif" />						
            </form>
	    </div>	
	    <div class="sg-panel-copy" align="center">
		    Copyright &copy; SoftGuard Tech Corporation - All Right Reserved.******
	    </div>	
    </div>
</body>
</html>