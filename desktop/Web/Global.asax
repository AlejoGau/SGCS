<%@ Application Language="C#" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.Mvc" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="System.Web.Hosting" %>
<%@ Import Namespace="Slbf" %>
<%@ Import Namespace="Slbf.Ui" %>
<%@ Import Namespace="Slbf.Ui.Application" %>
<%@ Import Namespace="SoftGuard.BusinessObjects.Security" %>
<%@ Import Namespace="NLog" %>

<script runat="server">

    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
        filters.Add(new HandleErrorAttribute());
    }

    public static void RegisterRoutes(RouteCollection routes)
    {
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

        RouteTable.Routes.MapRoute(
            "Js", // Route name
            "js/{*path}", // URL with parameters
            new { controller = "JsMapper", action = "Map" } // Parameter defaults
        );

        RouteTable.Routes.MapRoute(
            "Css", // Route name
            "css/{*path}", // URL with parameters
            new { controller = "Css", action = "Index" } // Parameter defaults
        );
				
        RouteTable.Routes.MapRoute(
            "uiapplication", // Route name
            "a/{Id}", // URL with parameters
            new { controller = "UIApplication", action = "Index" } // Parameter defaults
        );  
        RouteTable.Routes.MapRoute(
            "Handler", // Route name
            "handler/{*path}", // URL with parameters
            new { controller = "Handler", action = "Index" } // Parameter defaults
        );
     /* 
	routes.MapRoute(
                "Cache", // Route name
                "cache/{action}/{id}", // URL with parameters
                new { controller = "Cache", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );
*/

	routes.MapRoute(
                "CacheInvalidate", // Route name
                "cache/invalidate/{id}", // URL with parameters
                new { controller = "Cache", action = "Invalidate", id = UrlParameter.Optional } // Parameter defaults
            );

	routes.MapRoute(
                "Upload", // Route name
                "Upload/new/{id}", // URL with parameters
                new { controller = "Upload", action = "new", id = UrlParameter.Optional } // Parameter defaults
            );

	
            routes.MapRoute(
                "jsuiapplicationbundle", // Route name
                "jsuiapplicationbundle/{*Id}", // URL with parameters
                new { controller = "JsUIApplicationBundle", action = "Index" } // Parameter defaults
            );
            routes.MapRoute(
                 "jsuiapplicationbundleadd", // Route name
                 "jsuiapplicationbundleadd/{*Id}", // URL with parameters
                 new { controller = "JsUIApplicationBundleAdd", action = "Index" } // Parameter defaults
             );
            routes.MapRoute(
                 "jsexternaluiapplicationbundleadd", // Route name
                 "jsexternaluiapplicationbundleadd/{*Id}", // URL with parameters
                 new { controller = "JsExternalUIApplicationBundleAdd", action = "Index" } // Parameter defaults
             );
    }
	
	
	//protected void Application_PreSendRequestHeaders()
	//{
	//if (Response != null && Response.Cookies["ASP.NET_SessionId"] != null)
	//{
		//Response.Cookies["ASP.NET_SessionId"].SameSite = SameSiteMode.Strict;
	//}
	//}
	
	
	
    
    void Application_Start(object sender, EventArgs e) 
    {        
        NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
		logger.Trace("Application_Start");
		
        var c = System.Configuration.ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;
        // Register virtual path provider
        HostingEnvironment.RegisterVirtualPathProvider(new Slbf.Ui.Application.DbVirtualPathProvider(c));

        AreaRegistration.RegisterAllAreas();

        RegisterGlobalFilters(GlobalFilters.Filters);
        RegisterRoutes(RouteTable.Routes);	

		// diccionario para guardar la cantidad de licencias concurrentes usadas
		logger.Trace("[Global.asax] diccionario para guardar la cantidad de licencias concurrentes usadas");
		Dictionary<string, int> ModuleUsage = new Dictionary<string, int>();	
		Application["Slbf.Ui.ModuleUsage"] = ModuleUsage;
		
		// diccionario para guardar los usuarios que estan en cada modulo
		logger.Trace("[Global.asax] diccionario para guardar los usuarios que estan en cada modulo");
		Dictionary<string, List<string>> ModuleToken = new Dictionary<string, List<string>>();	
		Application["Slbf.Ui.ModuleToken"] = ModuleToken;
		
		//Read Key Modules
            Dictionary<string, DateTime> ModuleList = new Dictionary<string, DateTime>();
			Dictionary<string, int> ModuleConcurrent = new Dictionary<string, int>();

            SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);

	
            List<KeyModule> KeyModules = new List<KeyModule>();
            
            try {
				logger.Trace("[Global.asax] leo modulos de la llave");
                KeyModules = Manager.GetKeyModules();
            }
            catch{
                logger.Error("[Global.asax] Error al obtener la lista de módulos");
            }
            
			Application["Slbf.Ui.KeyModules"] = KeyModules;			
            foreach (KeyModule Module in KeyModules)
            {				
                foreach (string Dependency in Module.Dependencies)
                {
                    string KeyModule = Dependency.ToLower();
                    DateTime _duedate = DueDate(Module.DueDate);
                    if (ModuleList.ContainsKey(KeyModule))
                    {
                        ModuleList[KeyModule] = _duedate;
                    }
                    else
                    {
                        ModuleList.Add(KeyModule, _duedate);
                    }
					
					if (ModuleConcurrent.ContainsKey(KeyModule))
                    {
                        ModuleConcurrent[KeyModule] = Module.ConcurrentInstances;
                    }
                    else
                    {
                        ModuleConcurrent.Add(KeyModule, Module.ConcurrentInstances);
                    }
                }
            }
	    ModuleList.Add("razor", DateTime.Now.AddYears(1));
	    ModuleList.Add("ace", DateTime.Now.AddYears(1));
	    ModuleList.Add("audit", DateTime.Now.AddYears(1));
	    ModuleList.Add("filemanager", DateTime.Now.AddYears(1));
	    ModuleList.Add("slbf", DateTime.Now.AddYears(1));
	    Application["Slbf.Ui.Security"] = ModuleList;
		
		Application["Slbf.Ui.ModuleConcurrent"] = ModuleConcurrent;		
    }

    public static DateTime DueDate(DateTime _duedate){
        NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        // agrego 4 dias
        DateTime dueDateWithGracePeriod = _duedate.AddDays(4);
        logger.Trace("[DueDate] dueDateWithGracePeriod:"+dueDateWithGracePeriod.ToString());

        // tomo el dia de la semana actual para analizar si ya vencio en una ventana anterior
        int day = DateTime.Now.DayOfWeek == DayOfWeek.Sunday ? 7 : (int)DateTime.Now.DayOfWeek;
        logger.Trace("[DueDate] dias actual:"+day.ToString());

        // Calcula cuántos días hace que la funcionalidad está vencida.
        int daysExpired = (DateTime.Now - dueDateWithGracePeriod).Days;
        logger.Trace("[DueDate] dias vencido:"+daysExpired.ToString());


        // Si el modulo puede vencer, devolver la fecha de vencimiento.
        if (isKeyDeadline() || (daysExpired+3-day)>0)
        {
            logger.Trace("[DueDate] puede vencer");
            return dueDateWithGracePeriod;
        }
        // Si el modulo no puede vencer, devolver un día después del día actual.
        else
        {
            logger.Trace("[DueDate] fuera de la ventana");
            return DateTime.Now.AddDays(1);
        }
    }

    public static bool isKeyDeadline(){
        // Obtener la fecha y hora actual
        DateTime ahora = DateTime.Now;

        // Comprobar si el día de la semana está entre Lunes y Miércoles
        if (ahora.DayOfWeek >= DayOfWeek.Monday && ahora.DayOfWeek <= DayOfWeek.Wednesday)
        {
            // Comprobar si la hora está entre las 9:00 y las 18:00
            if (ahora.TimeOfDay >= new TimeSpan(9, 0, 0) && ahora.TimeOfDay <= new TimeSpan(18, 0, 0))
            {
                return true;
            }
        }

        return false;
    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown	    
    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        // Code that runs when an unhandled error occurs
		Exception exc = Server.GetLastError();
		
		logger.Error(exc.GetType().FullName);
        logger.Error(exc.Message);
        logger.Error(exc.StackTrace);
        logger.Error(exc.InnerException);
   
		if(exc.Message.Contains("HaspStatus") || exc.GetType().FullName.Contains("SgInvalidKeyException") )
		{
			Response.StatusCode = 402;
			Response.End();
		}

        if (exc is HttpRequestValidationException)
        {
            Response.Redirect("~/500.htm");
            //Response.StatusCode = 500;
			//Response.End();
        }
    }

    void Session_Start(object sender, EventArgs e) 
    {
        NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        var url = HttpContext.Current.Request.Url;
		logger.Trace("Session_Start:"+url.ToString());
		
		//Read Key Modules
            Dictionary<string, DateTime> ModuleList = new Dictionary<string, DateTime>();

            SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
			logger.Trace("[Global.asax] Session_Start modulos de la llave");
            List<KeyModule> KeyModules = Manager.GetKeyModules();	
            Application["Slbf.Ui.KeyModules"] = KeyModules;

            foreach (KeyModule Module in KeyModules)
            {				
                foreach (string Dependency in Module.Dependencies)
                {
                    string KeyModule = Dependency.ToLower();
                    DateTime _duedate = DueDate(Module.DueDate);
                    if (ModuleList.ContainsKey(KeyModule))
                    {
                        ModuleList[KeyModule] = _duedate;
                    }
                    else
                    {
                        ModuleList.Add(KeyModule, _duedate);
                    }
                }
            }
	    ModuleList.Add("razor", DateTime.Now.AddYears(1));
	    ModuleList.Add("ace", DateTime.Now.AddYears(1));
	    ModuleList.Add("audit", DateTime.Now.AddYears(1));
	    ModuleList.Add("filemanager", DateTime.Now.AddYears(1));
	    ModuleList.Add("slbf", DateTime.Now.AddYears(1));

	    HttpContext.Current.Application["Slbf.Ui.Security"] = ModuleList;
		
    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
