

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Slbf.Objects;
using Slbf;
using Slbf.Services.Rest;

namespace SoftGuard.BusinessObjects.Rest
{
    // Start the service and browse objectTo http://<machine_name>:<port>/Metadata/help objectTo view the service's generated help page
    // NOTE: By default, a new instance of the service is created for each call; change the InstanceContextMode objectTo Single if you want
    // a single instance of the service objectTo process all calls.	
    
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    //[XmlSerializerFormat()]
    [DataContractFormat] // for JSON

    [ServiceKnownType("GetKnownTypes")] 
    public partial class CuentaRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>(){
                typeof(SimpleCuenta),
                typeof(Slbf.Objects.SimpleMembershipUser),
                typeof(Slbf.Objects.SimpleUserAccount),
                typeof(Slbf.Objects.SimpleMenu),
                typeof(Slbf.Objects.SimplePermission),
                typeof(Slbf.Objects.SimpleRole),
                typeof(Slbf.SimpleTaxonomy),
                typeof(Slbf.Objects.SimpleMenuItem),
                typeof(Slbf.Objects.SimpleGroups),
                typeof(Slbf.Objects.SimpleGroups),
                
                typeof(SimpleFalsa),
                
                typeof(SimpleHorario),
                
                typeof(SimpleHorarioAlternativo),
                
                typeof(SimpleHorarioExcepcion),
                
                typeof(SimpleHorarioTolerancia),
                
                typeof(SimpleNota),
                
                typeof(SimplePanel),
                
                typeof(SimpleTelefono),
                
                typeof(SimpleUsuario),
                
                typeof(SimpleZona),
                
                typeof(SimpleZonaTemp),
                
                typeof(SimpleMedicalInfo),
                
                typeof(SimpleSms),
                
                typeof(SimpleTest),
                
                typeof(SimpleReporte),
                
                typeof(SimpleEstado),
                
                typeof(SimpleEstadoItem),
                
                typeof(Slbf.Objects.SimpleMetaData)
            };
        }

        [WebGet(UriTemplate = "?Page={Page}&Start={Start}&Limit={Limit}&Sort={Sort}&Group={Group}&Filter={Filter}")]
        public PagedOutput GetCollection(string Page, string Start,string Limit, string Sort, string Group, string Filter )
        {
			int iLimit = int.TryParse(Limit, out iLimit) ? iLimit : 10;
            int iPage = int.TryParse(Page, out iPage) ? iPage : 1;
            int iStart = int.TryParse(Start, out iStart) ? iStart : 1;
            int TotalRows = 0;
		
            List<Slbf.SimpleBaseObject> oo = new List<SimpleBaseObject>();
            var Object = GetCurrentObject();

            var taxonomies = Slbf.ObjectFactoryService.CreateTaxonomyCollection();
            DataTable t = Object.GetDataByFilter(iPage, iStart, iLimit, Sort, Group, Filter, ref TotalRows);
            foreach (DataRow r in t.Rows)
            {
                DataColumn c;
                var s = new SimpleCuenta();
                foreach (var p in s.GetType().GetProperties())
                    if ((c = t.Columns[p.Name]) != null && r[c] != DBNull.Value)
                        p.SetValue(s, r[c], null);

                oo.Add(s);
            }

            var Out = new PagedOutput();
            Out.rows = oo;
            Out.total = TotalRows;
            return Out;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Falsa")]
        public SimpleFalsa[] GetCollectionFalsa(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Falsa>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Falsa", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateFalsa(string id, SimpleFalsa instance)
        {
            var v = new FalsaRestService();
            v.SetCurrentObjectName("Falsa");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Falsa", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateFalsa(string id, SimpleFalsa instance)
        {
            var v = new FalsaRestService();
            v.SetCurrentObjectName("Falsa");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Falsa>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Horario")]
        public SimpleHorario[] GetCollectionHorario(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Horario>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Horario", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateHorario(string id, SimpleHorario instance)
        {
            var v = new HorarioRestService();
            v.SetCurrentObjectName("Horario");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Horario", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateHorario(string id, SimpleHorario instance)
        {
            var v = new HorarioRestService();
            v.SetCurrentObjectName("Horario");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Horario>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/HorarioAlternativo")]
        public SimpleHorarioAlternativo[] GetCollectionHorarioAlternativo(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<HorarioAlternativo>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/HorarioAlternativo", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateHorarioAlternativo(string id, SimpleHorarioAlternativo instance)
        {
            var v = new HorarioAlternativoRestService();
            v.SetCurrentObjectName("HorarioAlternativo");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/HorarioAlternativo", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateHorarioAlternativo(string id, SimpleHorarioAlternativo instance)
        {
            var v = new HorarioAlternativoRestService();
            v.SetCurrentObjectName("HorarioAlternativo");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<HorarioAlternativo>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/HorarioExcepcion")]
        public SimpleHorarioExcepcion[] GetCollectionHorarioExcepcion(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<HorarioExcepcion>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/HorarioExcepcion", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateHorarioExcepcion(string id, SimpleHorarioExcepcion instance)
        {
            var v = new HorarioExcepcionRestService();
            v.SetCurrentObjectName("HorarioExcepcion");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/HorarioExcepcion", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateHorarioExcepcion(string id, SimpleHorarioExcepcion instance)
        {
            var v = new HorarioExcepcionRestService();
            v.SetCurrentObjectName("HorarioExcepcion");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<HorarioExcepcion>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/HorarioTolerancia")]
        public SimpleHorarioTolerancia[] GetCollectionHorarioTolerancia(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<HorarioTolerancia>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/HorarioTolerancia", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateHorarioTolerancia(string id, SimpleHorarioTolerancia instance)
        {
            var v = new HorarioToleranciaRestService();
            v.SetCurrentObjectName("HorarioTolerancia");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/HorarioTolerancia", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateHorarioTolerancia(string id, SimpleHorarioTolerancia instance)
        {
            var v = new HorarioToleranciaRestService();
            v.SetCurrentObjectName("HorarioTolerancia");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<HorarioTolerancia>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Nota")]
        public SimpleNota[] GetCollectionNota(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Nota>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Nota", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateNota(string id, SimpleNota instance)
        {
            var v = new NotaRestService();
            v.SetCurrentObjectName("Nota");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Nota", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateNota(string id, SimpleNota instance)
        {
            var v = new NotaRestService();
            v.SetCurrentObjectName("Nota");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Nota>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Panel")]
        public SimplePanel[] GetCollectionPanel(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Panel>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Panel", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdatePanel(string id, SimplePanel instance)
        {
            var v = new PanelRestService();
            v.SetCurrentObjectName("Panel");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Panel", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreatePanel(string id, SimplePanel instance)
        {
            var v = new PanelRestService();
            v.SetCurrentObjectName("Panel");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Panel>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Telefono")]
        public SimpleTelefono[] GetCollectionTelefono(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Telefono>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Telefono", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateTelefono(string id, SimpleTelefono instance)
        {
            var v = new TelefonoRestService();
            v.SetCurrentObjectName("Telefono");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Telefono", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateTelefono(string id, SimpleTelefono instance)
        {
            var v = new TelefonoRestService();
            v.SetCurrentObjectName("Telefono");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Telefono>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Usuario")]
        public SimpleUsuario[] GetCollectionUsuario(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Usuario>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Usuario", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateUsuario(string id, SimpleUsuario instance)
        {
            var v = new UsuarioRestService();
            v.SetCurrentObjectName("Usuario");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Usuario", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateUsuario(string id, SimpleUsuario instance)
        {
            var v = new UsuarioRestService();
            v.SetCurrentObjectName("Usuario");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Usuario>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Zona")]
        public SimpleZona[] GetCollectionZona(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Zona>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Zona", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateZona(string id, SimpleZona instance)
        {
            var v = new ZonaRestService();
            v.SetCurrentObjectName("Zona");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Zona", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateZona(string id, SimpleZona instance)
        {
            var v = new ZonaRestService();
            v.SetCurrentObjectName("Zona");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Zona>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/ZonaTemp")]
        public SimpleZonaTemp[] GetCollectionZonaTemp(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<ZonaTemp>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/ZonaTemp", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateZonaTemp(string id, SimpleZonaTemp instance)
        {
            var v = new ZonaTempRestService();
            v.SetCurrentObjectName("ZonaTemp");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/ZonaTemp", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateZonaTemp(string id, SimpleZonaTemp instance)
        {
            var v = new ZonaTempRestService();
            v.SetCurrentObjectName("ZonaTemp");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<ZonaTemp>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/MedicalInfo")]
        public SimpleMedicalInfo[] GetCollectionMedicalInfo(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<MedicalInfo>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/MedicalInfo", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateMedicalInfo(string id, SimpleMedicalInfo instance)
        {
            var v = new MedicalInfoRestService();
            v.SetCurrentObjectName("MedicalInfo");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/MedicalInfo", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateMedicalInfo(string id, SimpleMedicalInfo instance)
        {
            var v = new MedicalInfoRestService();
            v.SetCurrentObjectName("MedicalInfo");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<MedicalInfo>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Sms")]
        public SimpleSms[] GetCollectionSms(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Sms>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Sms", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateSms(string id, SimpleSms instance)
        {
            var v = new SmsRestService();
            v.SetCurrentObjectName("Sms");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Sms", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateSms(string id, SimpleSms instance)
        {
            var v = new SmsRestService();
            v.SetCurrentObjectName("Sms");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Sms>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Test")]
        public SimpleTest[] GetCollectionTest(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Test>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Test", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateTest(string id, SimpleTest instance)
        {
            var v = new TestRestService();
            v.SetCurrentObjectName("Test");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Test", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateTest(string id, SimpleTest instance)
        {
            var v = new TestRestService();
            v.SetCurrentObjectName("Test");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Test>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Reporte")]
        public SimpleReporte[] GetCollectionReporte(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Reporte>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Reporte", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateReporte(string id, SimpleReporte instance)
        {
            var v = new ReporteRestService();
            v.SetCurrentObjectName("Reporte");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Reporte", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateReporte(string id, SimpleReporte instance)
        {
            var v = new ReporteRestService();
            v.SetCurrentObjectName("Reporte");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Reporte>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/Estado")]
        public SimpleEstado[] GetCollectionEstado(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<Estado>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/Estado", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateEstado(string id, SimpleEstado instance)
        {
            var v = new EstadoRestService();
            v.SetCurrentObjectName("Estado");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/Estado", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateEstado(string id, SimpleEstado instance)
        {
            var v = new EstadoRestService();
            v.SetCurrentObjectName("Estado");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<Estado>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		
		[WebGet(UriTemplate = "/{id}/EstadoItem")]
        public SimpleEstadoItem[] GetCollectionEstadoItem(string Id)
        {
            int iid = int.Parse(Id);

            var o = Slbf.ObjectFactoryService.Create<EstadoItem>();
            var oo = o.GetByParent(GetCurrentObjectName(), iid);
            return oo.ToArray();
        }
		
        [WebInvoke(UriTemplate = "{id}/EstadoItem", Method = "PUT"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject UpdateEstadoItem(string id, SimpleEstadoItem instance)
        {
            var v = new EstadoItemRestService();
            v.SetCurrentObjectName("EstadoItem");
            return v.Update(id, instance);
        }
		
        [WebInvoke(UriTemplate = "{id}/EstadoItem", Method = "POST"
           , RequestFormat = WebMessageFormat.Json
           , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject CreateEstadoItem(string id, SimpleEstadoItem instance)
        {
            var v = new EstadoItemRestService();
            v.SetCurrentObjectName("EstadoItem");
            var s = v.Create(instance);

            var ss = ObjectFactoryService.Create<EstadoItem>();
            ss.Load(s.Id);
            var iid = int.Parse(id);
            var c = this.GetCurrentObject(iid);
            c.AddChild(ss);
            c.Save();

            return s;
        }
		
		

        Cuenta GetCurrentObject(int Id = 0)
        {
            var Object = Slbf.ObjectFactoryService.Create<Cuenta>();
			if(Id != 0) Object.Load(Id);
            return Object;
        }

        string _CurrentObjectName;
        [WebGet(UriTemplate = "/GetCurrentObjectName")]
        public string GetCurrentObjectName()
        {
            return _CurrentObjectName ?? (_CurrentObjectName = "Cuenta");
        }
        public string SetCurrentObjectName(string NewObjectName)
        {
            return _CurrentObjectName = NewObjectName;
        }

        [WebGet(UriTemplate = "{id}", ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Get(string id)
        {
            var o = GetObject(id);
            if (o.Id == 0)
            {
                WebOperationContext ctx = WebOperationContext.Current;
                ctx.OutgoingResponse.StatusCode = System.Net.HttpStatusCode.NotFound;
                return null;
            }
            else
            {
                var s = o.GetSimpleObject();
                return s;
            }
        }

        [WebInvoke(UriTemplate = "", Method = "POST"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Create(SimpleCuenta instance)
        {
			instance.Id = 0;
            var p = GetCurrentObject();
            p.SetSimpleObject(instance);
            p.Save();
            return p.GetSimpleObject();
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Update(string id, SimpleCuenta instance)
        {
			var iid = int.Parse(id);
			var p = GetCurrentObject(iid); // this also loads an object
			AssignSimpleObjectProperties(p, instance);
			p.Save();
			return p.GetSimpleObject();
        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE")]
        public void Delete(string id)
        {
            GetObject(id).Delete();
        }

        private ISpecialization GetObject(string id)
        {
            var p = GetCurrentObject();
            p.Load(Int32.Parse(id));
            return p;
        }

        private void AssignSimpleObjectProperties(object objectTo, object objectFrom)
        {
            BindingFlags flags = BindingFlags.Instance | BindingFlags.Public;
            foreach (PropertyInfo propFrom in objectFrom.GetType().GetProperties(flags))
            {
                object value = propFrom.GetValue(objectFrom, null);
                if (value != null)
                {
                    PropertyInfo propTo = objectTo.GetType().GetProperty(propFrom.Name);
                    if (propTo != null && propTo.GetSetMethod() != null)
                        propTo.SetValue(objectTo, value, null);
                }
            }
        }


        [WebGet(UriTemplate = "{id}/Taxonomies?Node={ParentId}", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<SenchaTreeNode> GetTaxonomiesJustOneLevel(string id, string ParentId)
        {
            int intParentId = Convert.ToInt32(ParentId);
            int intObjectTypeId = GetCurrentObject().GetObjectType().Id;
            int intId = Convert.ToInt32(id);

            var taxcol = ObjectFactoryService.CreateTaxonomyCollection();
            SimpleTaxonomy[] taxos = taxcol.Get(intParentId, intObjectTypeId, intId);

            return from x in taxos
                   select new SenchaTreeNode
                   {
                       @checked = x.IsChecked.ToString().ToLower(),
                       id = x.Id.ToString(),
                       text = x.Name
                   };
        }

        [WebInvoke(UriTemplate = "{id}/Taxonomies", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public SenchaTreeNode PutTaxonomy(SenchaTreeNode Put, string id)
        {
            bool Checked = bool.Parse(Put.@checked);
            int TId = int.Parse(Put.id);

            var o = GetObject(id);
            var t = o.Taxonomies.GetObject(TId);
            t.IsChecked = Checked;
            o.Save();

            if (t != null && t.Id != 0 && t.Name != Put.text)
            {
                var tt = ObjectFactoryService.Create<Taxonomy>();
                tt.Load(t.Id);
                tt.Name = Put.text;
                tt.Save();
                t = (SimpleTaxonomy)tt.GetSimpleObject();
            }
            Slbf.ObjectFactoryService.InvalidateTaxonomyCollection();

            return new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
        }
        [WebInvoke(UriTemplate = "{id}/Taxonomies", Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public SenchaTreeNode PostTaxonomy(SenchaTreeNode Put, string id)
        {
            bool Checked = bool.Parse(Put.@checked);
            int TId = int.Parse(Put.id);
            int TParentId = int.Parse(Put.parentId);

            var tt = ObjectFactoryService.Create<Taxonomy>();
            tt.Load(TId);
            tt.Name = Put.text;
            tt.Parent = TParentId;
            tt.Save();
            Slbf.ObjectFactoryService.InvalidateTaxonomyCollection();

            var t = (SimpleTaxonomy)tt.GetSimpleObject();

            return new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
        }
        [WebInvoke(UriTemplate = "{id}/Taxonomies?id={tid}", Method = "DELETE", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public SenchaTreeNode DeleteTaxonomy(string id, string tid)
        {
            int TId = int.Parse(tid);
            var t = ObjectFactoryService.Create<Taxonomy>();
            t.Load(TId);
            var Out = new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
            t.Delete();
            Slbf.ObjectFactoryService.InvalidateTaxonomyCollection();
            return Out;
        }

        [WebGet(UriTemplate = "{id}/Relations", ResponseFormat = WebMessageFormat.Json)]
        public List<Slbf.Relation> GetRelations(string id)
        {
            string name = GetCurrentObjectName();
            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);

            var r = Slbf.ObjectFactoryService.CreateRelationCollection();
            r.Load(o.GetObject());

            var res = new List<Slbf.Relation>();
            foreach (Slbf.Relation rel in r) res.Add(rel);
            return res;
        }
		
		[WebGet(UriTemplate = "{id}/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<SimpleFrameworkAudit> GetAuditById(string id, string pagecount, string pagepresent, string functionid)
        {
            int iPageCount = 100; int.TryParse(pagecount, out iPageCount);
            int iPagePresent = 1; int.TryParse(pagepresent, out iPagePresent);
            int iFunctionId = 0; int.TryParse(functionid, out iFunctionId);
            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);
            return o.GetAudit(iFunctionId, iPageCount, iPagePresent);
        }

        [WebGet(UriTemplate = "/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<SimpleFrameworkAudit> GetAudit(string pagecount, string pagepresent, string functionid)
        {
            int iPageCount = 100; int.TryParse(pagecount, out iPageCount);
            int iPagePresent = 1; int.TryParse(pagepresent, out iPagePresent);
            int iFunctionId = 0; int.TryParse(functionid, out iFunctionId);

            var o = GetCurrentObject();
            var f = new FrameworkAudit(o.Security.SqlConfig, o.Security.UserId);
            return f.GetBySearch(o.GetObjectType().Id, o.Id, iFunctionId, iPageCount, iPagePresent);
        }
		
		[WebGet(UriTemplate = "{id}/metadata", ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetMetadata(string id)
        {
            return GetMetadataByName(id, null);
        }

        [WebGet(UriTemplate = "{id}/metadata/{name}", ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetMetadataByName(string id, string name = null)
        {
            var Object = GetCurrentObject(int.Parse(id));

            MetaData m = string.IsNullOrEmpty(name) ? Object.MetadataObject() : Object.MetadataObject(name);
            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
            if (String.IsNullOrEmpty(m.XmlData))
            {
                WebOperationContext ctx = WebOperationContext.Current;
                ctx.OutgoingResponse.StatusCode = System.Net.HttpStatusCode.NotFound;
                return null;
            }
            var Out = m.XmlData;
            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
        }

        [WebInvoke(UriTemplate = "{id}/metadata", Method = "POST"
            , RequestFormat = WebMessageFormat.Json
        )]
        public System.IO.Stream SetMetadata(string id)
        {
            var s = System.Web.HttpContext.Current.Request.Form.ToString();
            s = System.Web.HttpUtility.UrlDecode(s);
            var p = GetCurrentObject(int.Parse(id)).MetadataObject();
            p.SetDynamicJson(s);
            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(s));
        }
		
		[WebGet(UriTemplate = "{id}/children", ResponseFormat = WebMessageFormat.Json)]
        public List<Slbf.Relation> GetChildren(string id)
        {
            var res = new List<Slbf.Relation>();

            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);
			
			
            var t1 = Slbf.ObjectFactoryService.Create<Falsa>();
            var tt1 = t1.GetByParent("Cuenta", pid);
            foreach (var ttt in tt1)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t2 = Slbf.ObjectFactoryService.Create<Horario>();
            var tt2 = t2.GetByParent("Cuenta", pid);
            foreach (var ttt in tt2)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t3 = Slbf.ObjectFactoryService.Create<HorarioAlternativo>();
            var tt3 = t3.GetByParent("Cuenta", pid);
            foreach (var ttt in tt3)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t4 = Slbf.ObjectFactoryService.Create<HorarioExcepcion>();
            var tt4 = t4.GetByParent("Cuenta", pid);
            foreach (var ttt in tt4)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t5 = Slbf.ObjectFactoryService.Create<HorarioTolerancia>();
            var tt5 = t5.GetByParent("Cuenta", pid);
            foreach (var ttt in tt5)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t6 = Slbf.ObjectFactoryService.Create<Nota>();
            var tt6 = t6.GetByParent("Cuenta", pid);
            foreach (var ttt in tt6)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t7 = Slbf.ObjectFactoryService.Create<Panel>();
            var tt7 = t7.GetByParent("Cuenta", pid);
            foreach (var ttt in tt7)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t8 = Slbf.ObjectFactoryService.Create<Telefono>();
            var tt8 = t8.GetByParent("Cuenta", pid);
            foreach (var ttt in tt8)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t9 = Slbf.ObjectFactoryService.Create<Usuario>();
            var tt9 = t9.GetByParent("Cuenta", pid);
            foreach (var ttt in tt9)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t10 = Slbf.ObjectFactoryService.Create<Zona>();
            var tt10 = t10.GetByParent("Cuenta", pid);
            foreach (var ttt in tt10)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t11 = Slbf.ObjectFactoryService.Create<ZonaTemp>();
            var tt11 = t11.GetByParent("Cuenta", pid);
            foreach (var ttt in tt11)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t12 = Slbf.ObjectFactoryService.Create<MedicalInfo>();
            var tt12 = t12.GetByParent("Cuenta", pid);
            foreach (var ttt in tt12)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t13 = Slbf.ObjectFactoryService.Create<Sms>();
            var tt13 = t13.GetByParent("Cuenta", pid);
            foreach (var ttt in tt13)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t14 = Slbf.ObjectFactoryService.Create<Test>();
            var tt14 = t14.GetByParent("Cuenta", pid);
            foreach (var ttt in tt14)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t15 = Slbf.ObjectFactoryService.Create<Reporte>();
            var tt15 = t15.GetByParent("Cuenta", pid);
            foreach (var ttt in tt15)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t16 = Slbf.ObjectFactoryService.Create<Estado>();
            var tt16 = t16.GetByParent("Cuenta", pid);
            foreach (var ttt in tt16)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
            var t17 = Slbf.ObjectFactoryService.Create<EstadoItem>();
            var tt17 = t17.GetByParent("Cuenta", pid);
            foreach (var ttt in tt17)
            {
                var t = new Slbf.Relation(0, ttt.Type, ttt.Id, ttt.Name);
                res.Add(t);
            }
			
			
            return res;
        }
    }
}
																
