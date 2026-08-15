
      using System;
      using System.Xml;
      using System.Data;
      using Slbf;
      using Slbf.Helpers;
	  using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 
   ///<summary>
     ///Cuenta class   
     ///</summary>
    public partial class Cuenta : SpeCuenta
    {  ///<summary>
     ///Constructor   
     ///</summary>
    		public Cuenta(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    		{
    		}

 ///<summary>
     ///Constructor   
     ///</summary>
    		public Cuenta(SqlHelper SqlConfig, string Token) : base(SqlConfig, Slbf.Security.UserService.GetId(Token))
    		{
				this._DalObject.Token = Token ?? Slbf.Security.UserService.GetContextToken(null);
    		}
			
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Cuenta(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId, Id)
    		{
    		}
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Cuenta(SqlHelper SqlConfig, int UserId, SimpleCuenta Simple) : base(SqlConfig, UserId, Simple)
    		{
    		}					
 ///<summary>
     ///Saves object data   
     ///</summary>
public override void Save()
		{
			int OldId = base.Id;
			base.Save();

			//Save

			if(OldId == 0)
			   OnAfterInsert(new SimpleEventArgs(this.GetSimpleObject()));
			
			if(OldId != 0)
			   OnAfterUpdate(new SimpleEventArgs(this.GetSimpleObject()));
				
		}
		 ///<summary>
     ///Delete object   
     ///</summary>
		public override void Delete()
		{
			base.Delete ();

			//Delete

			OnAfterDelete(new SimpleEventArgs(this.GetSimpleObject()));
		}
		 ///<summary>
     ///Load object data   
     ///</summary>
		public override void Load(int Id)
		{
			base.Load (Id);

			//Load

			OnAfterSelect(new SimpleEventArgs(this.GetSimpleObject()));
		}		

        public Slbf.Objects.MetaData MetadataObject(string Name)
        {
            var objectId = this.Id;
            var objectTypeId = this.GetObjectType().Id;
            var o = Slbf.Objects.MetadataManager.GetFirst(objectId, objectTypeId, Name);
            var Out = ObjectFactoryService.Create<Slbf.Objects.MetaData>();
            if (o != null)
			{
                Out.SetSimpleObject(o);
			}
			Out.Name = Out.Name ?? Name;
			Out.ObjectTypeId = objectTypeId;
            Out.ObjectId = objectId;
            return Out;
        }

        public Slbf.Objects.MetaData MetadataObject()
        {
            return MetadataObject(Slbf.Objects.MetadataManager.DefaultName);
        }

        public dynamic Metadata(string Name)
        {
            return MetadataObject(Name).GetDynamic();
        }

        public dynamic Metadata()
        {
            return MetadataObject().GetDynamic();
        }


		public IEnumerable<dynamic> Falsas(){
			var v = Slbf.ObjectFactoryService.CreateByName("Falsa");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasFalsas()
        {
            foreach (var h in Falsas())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Horarios(){
			var v = Slbf.ObjectFactoryService.CreateByName("Horario");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasHorarios()
        {
            foreach (var h in Horarios())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> HorarioAlternativos(){
			var v = Slbf.ObjectFactoryService.CreateByName("HorarioAlternativo");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasHorarioAlternativos()
        {
            foreach (var h in HorarioAlternativos())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> HorarioExcepcions(){
			var v = Slbf.ObjectFactoryService.CreateByName("HorarioExcepcion");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasHorarioExcepcions()
        {
            foreach (var h in HorarioExcepcions())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> HorarioTolerancias(){
			var v = Slbf.ObjectFactoryService.CreateByName("HorarioTolerancia");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasHorarioTolerancias()
        {
            foreach (var h in HorarioTolerancias())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Notas(){
			var v = Slbf.ObjectFactoryService.CreateByName("Nota");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasNotas()
        {
            foreach (var h in Notas())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Panels(){
			var v = Slbf.ObjectFactoryService.CreateByName("Panel");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasPanels()
        {
            foreach (var h in Panels())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Telefonos(){
			var v = Slbf.ObjectFactoryService.CreateByName("Telefono");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasTelefonos()
        {
            foreach (var h in Telefonos())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Usuarios(){
			var v = Slbf.ObjectFactoryService.CreateByName("Usuario");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasUsuarios()
        {
            foreach (var h in Usuarios())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Zonas(){
			var v = Slbf.ObjectFactoryService.CreateByName("Zona");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasZonas()
        {
            foreach (var h in Zonas())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> ZonaTemps(){
			var v = Slbf.ObjectFactoryService.CreateByName("ZonaTemp");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasZonaTemps()
        {
            foreach (var h in ZonaTemps())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> MedicalInfos(){
			var v = Slbf.ObjectFactoryService.CreateByName("MedicalInfo");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasMedicalInfos()
        {
            foreach (var h in MedicalInfos())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Smss(){
			var v = Slbf.ObjectFactoryService.CreateByName("Sms");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasSmss()
        {
            foreach (var h in Smss())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Tests(){
			var v = Slbf.ObjectFactoryService.CreateByName("Test");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasTests()
        {
            foreach (var h in Tests())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Reportes(){
			var v = Slbf.ObjectFactoryService.CreateByName("Reporte");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasReportes()
        {
            foreach (var h in Reportes())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Estados(){
			var v = Slbf.ObjectFactoryService.CreateByName("Estado");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasEstados()
        {
            foreach (var h in Estados())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> EstadoItems(){
			var v = Slbf.ObjectFactoryService.CreateByName("EstadoItem");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		public bool HasEstadoItems()
        {
            foreach (var h in EstadoItems())
                return true;
            return false;
        }
	 }

}
