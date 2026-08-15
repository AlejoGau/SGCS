
using System;
using System.Xml;
using System.Data;
using Slbf;
using Slbf.Helpers;    	    	 
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 	
  ///<summary>
    ///DispositivoMovil Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleDispositivoMovil : SimpleBaseObject
    { 
			 ///<summary>
     ///Brand   
     ///</summary>
	 [DataMember]
     public string Brand { get;set;} 
	  ///<summary>
     ///Model   
     ///</summary>
	 [DataMember]
     public string Model { get;set;} 
	  ///<summary>
     ///Year   
     ///</summary>
	 [DataMember]
     public int Year { get;set;} 
	  ///<summary>
     ///Domain   
     ///</summary>
	 [DataMember]
     public string Domain { get;set;} 
	  ///<summary>
     ///Colour   
     ///</summary>
	 [DataMember]
     public string Colour { get;set;} 
	  ///<summary>
     ///VehicleType   
     ///</summary>
	 [DataMember]
     public string VehicleType { get;set;} 
	  ///<summary>
     ///Photo   
     ///</summary>
	 [DataMember]
     public string Photo { get;set;} 
	  ///<summary>
     ///PhotoType   
     ///</summary>
	 [DataMember]
     public string PhotoType { get;set;} 
	  ///<summary>
     ///VehicleBrand   
     ///</summary>
	 [DataMember]
     public int VehicleBrand { get;set;} 
	  ///<summary>
     ///VehicleModel   
     ///</summary>
	 [DataMember]
     public int VehicleModel { get;set;} 
	  ///<summary>
     ///OwnerTypeId   
     ///</summary>
	 [DataMember]
     public int OwnerTypeId { get;set;} 
	  ///<summary>
     ///OwnerId   
     ///</summary>
	 [DataMember]
     public int OwnerId { get;set;} 
	  ///<summary>
     ///DriverTypeId   
     ///</summary>
	 [DataMember]
     public int DriverTypeId { get;set;} 
	  ///<summary>
     ///DriverId   
     ///</summary>
	 [DataMember]
     public int DriverId { get;set;} 
	  ///<summary>
     ///SIM1   
     ///</summary>
	 [DataMember]
     public string SIM1 { get;set;} 
	  ///<summary>
     ///CompaniaSIM1   
     ///</summary>
	 [DataMember]
     public string CompaniaSIM1 { get;set;} 
	  ///<summary>
     ///SIM2   
     ///</summary>
	 [DataMember]
     public string SIM2 { get;set;} 
	  ///<summary>
     ///CompaniaSIM2   
     ///</summary>
	 [DataMember]
     public string CompaniaSIM2 { get;set;} 
	  ///<summary>
     ///NroMotor   
     ///</summary>
	 [DataMember]
     public string NroMotor { get;set;} 
	  ///<summary>
     ///NroChasis   
     ///</summary>
	 [DataMember]
     public string NroChasis { get;set;} 
	  ///<summary>
     ///PersonaDNI   
     ///</summary>
	 [DataMember]
     public string PersonaDNI { get;set;} 
	  ///<summary>
     ///PersonaGenero   
     ///</summary>
	 [DataMember]
     public string PersonaGenero { get;set;} 
	  ///<summary>
     ///PersonaFechaNacimiento    
     ///</summary>
	 [DataMember]
     public DateTime? PersonaFechaNacimiento  { get;set;} 
	  ///<summary>
     ///MascotaRaza   
     ///</summary>
	 [DataMember]
     public string MascotaRaza { get;set;} 
	  ///<summary>
     ///MascotaFechaNacimiento   
     ///</summary>
	 [DataMember]
     public DateTime? MascotaFechaNacimiento { get;set;} 
	  ///<summary>
     ///MascotaGenero   
     ///</summary>
	 [DataMember]
     public string MascotaGenero { get;set;} 
	  ///<summary>
     ///MascotaColor   
     ///</summary>
	 [DataMember]
     public string MascotaColor { get;set;} 
	  ///<summary>
     ///OtroTextolibre   
     ///</summary>
	 [DataMember]
     public string OtroTextolibre { get;set;} 
	  ///<summary>
     ///MaxSpeed   
     ///</summary>
	 [DataMember]
     public int MaxSpeed { get;set;} 
	  ///<summary>
     ///Odometer   
     ///</summary>
	 [DataMember]
     public int Odometer { get;set;} 
	  ///<summary>
     ///OdometerDate   
     ///</summary>
	 [DataMember]
     public DateTime? OdometerDate { get;set;} 
	  ///<summary>
     ///ParkingLot   
     ///</summary>
	 [DataMember]
     public bool ParkingLot { get;set;} 
	 ///<summary>
        ///DispositivoMovil Constructor
        ///</summary>
        public SimpleDispositivoMovil() : base()
  {
  InitClass();
  }
        ///<summary>
        ///DispositivoMovil Constructor
        ///</summary>
        public SimpleDispositivoMovil(int Id, string Name, string Brand, string Model, int Year, string Domain, string Colour, string VehicleType, string Photo, string PhotoType, int VehicleBrand, int VehicleModel, int OwnerTypeId, int OwnerId, int DriverTypeId, int DriverId, string SIM1, string CompaniaSIM1, string SIM2, string CompaniaSIM2, string NroMotor, string NroChasis, string PersonaDNI, string PersonaGenero, DateTime? PersonaFechaNacimiento , string MascotaRaza, DateTime? MascotaFechaNacimiento, string MascotaGenero, string MascotaColor, string OtroTextolibre, int MaxSpeed, int Odometer, DateTime? OdometerDate, bool ParkingLot) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.Brand = Brand;
this.Model = Model;
this.Year = Year;
this.Domain = Domain;
this.Colour = Colour;
this.VehicleType = VehicleType;
this.Photo = Photo;
this.PhotoType = PhotoType;
this.VehicleBrand = VehicleBrand;
this.VehicleModel = VehicleModel;
this.OwnerTypeId = OwnerTypeId;
this.OwnerId = OwnerId;
this.DriverTypeId = DriverTypeId;
this.DriverId = DriverId;
this.SIM1 = SIM1;
this.CompaniaSIM1 = CompaniaSIM1;
this.SIM2 = SIM2;
this.CompaniaSIM2 = CompaniaSIM2;
this.NroMotor = NroMotor;
this.NroChasis = NroChasis;
this.PersonaDNI = PersonaDNI;
this.PersonaGenero = PersonaGenero;
this.PersonaFechaNacimiento  = PersonaFechaNacimiento ;
this.MascotaRaza = MascotaRaza;
this.MascotaFechaNacimiento = MascotaFechaNacimiento;
this.MascotaGenero = MascotaGenero;
this.MascotaColor = MascotaColor;
this.OtroTextolibre = OtroTextolibre;
this.MaxSpeed = MaxSpeed;
this.Odometer = Odometer;
this.OdometerDate = OdometerDate;
this.ParkingLot = ParkingLot;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3045, "DispositivoMovil");
        }
///<summary>
    ///Returns SimpleBaseObject
    ///</summary>
		public override SimpleBaseObject GetObject()
		{
			return (SimpleBaseObject) this;
		}
///<summary>
    ///Returns BaseObject
    ///</summary>  
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			BaseObject Object = new DalDispositivoMovil(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerDispositivoMovil Caller = new CallerDispositivoMovil();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.Brand = this.Brand;
Caller.Model = this.Model;
Caller.Year = this.Year;
Caller.Domain = this.Domain;
Caller.Colour = this.Colour;
Caller.VehicleType = this.VehicleType;
Caller.Photo = this.Photo;
Caller.PhotoType = this.PhotoType;
Caller.VehicleBrand = this.VehicleBrand;
Caller.VehicleModel = this.VehicleModel;
Caller.OwnerTypeId = this.OwnerTypeId;
Caller.OwnerId = this.OwnerId;
Caller.DriverTypeId = this.DriverTypeId;
Caller.DriverId = this.DriverId;
Caller.SIM1 = this.SIM1;
Caller.CompaniaSIM1 = this.CompaniaSIM1;
Caller.SIM2 = this.SIM2;
Caller.CompaniaSIM2 = this.CompaniaSIM2;
Caller.NroMotor = this.NroMotor;
Caller.NroChasis = this.NroChasis;
Caller.PersonaDNI = this.PersonaDNI;
Caller.PersonaGenero = this.PersonaGenero;
Caller.PersonaFechaNacimiento  = this.PersonaFechaNacimiento ;
Caller.MascotaRaza = this.MascotaRaza;
Caller.MascotaFechaNacimiento = this.MascotaFechaNacimiento;
Caller.MascotaGenero = this.MascotaGenero;
Caller.MascotaColor = this.MascotaColor;
Caller.OtroTextolibre = this.OtroTextolibre;
Caller.MaxSpeed = this.MaxSpeed;
Caller.Odometer = this.Odometer;
Caller.OdometerDate = this.OdometerDate;
Caller.ParkingLot = this.ParkingLot;

			return (CallerObject) Caller;
		}
///<summary>
    ///Get DataTable of objetdata
    ///</summary>
		public override DataTable GetDataObject()
    {												                
               //create Table
               DataTable dt = new DataTable("Data");                              
               DataRow dr;
							 
							 dt.Columns.Add(new DataColumn("Id", typeof(int)));
							 dt.Columns.Add(new DataColumn("Name", typeof(string)));							 
               dt.Columns.Add(new DataColumn("Brand", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Model", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Year", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Domain", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Colour", typeof (string)));               
							 dt.Columns.Add(new DataColumn("VehicleType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Photo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("PhotoType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("VehicleBrand", typeof (int)));               
							 dt.Columns.Add(new DataColumn("VehicleModel", typeof (int)));               
							 dt.Columns.Add(new DataColumn("OwnerTypeId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("OwnerId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("DriverTypeId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("DriverId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("SIM1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("CompaniaSIM1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("SIM2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("CompaniaSIM2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("NroMotor", typeof (string)));               
							 dt.Columns.Add(new DataColumn("NroChasis", typeof (string)));               
							 dt.Columns.Add(new DataColumn("PersonaDNI", typeof (string)));               
							 dt.Columns.Add(new DataColumn("PersonaGenero", typeof (string)));               
							 dt.Columns.Add(new DataColumn("PersonaFechaNacimiento ", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("MascotaRaza", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MascotaFechaNacimiento", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("MascotaGenero", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MascotaColor", typeof (string)));               
							 dt.Columns.Add(new DataColumn("OtroTextolibre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MaxSpeed", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Odometer", typeof (int)));               
							 dt.Columns.Add(new DataColumn("OdometerDate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ParkingLot", typeof (bool)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["Brand"] = (object)this.Brand ?? System.DBNull.Value;
dr["Model"] = (object)this.Model ?? System.DBNull.Value;
dr["Year"] = (object)this.Year ?? System.DBNull.Value;
dr["Domain"] = (object)this.Domain ?? System.DBNull.Value;
dr["Colour"] = (object)this.Colour ?? System.DBNull.Value;
dr["VehicleType"] = (object)this.VehicleType ?? System.DBNull.Value;
dr["Photo"] = (object)this.Photo ?? System.DBNull.Value;
dr["PhotoType"] = (object)this.PhotoType ?? System.DBNull.Value;
dr["VehicleBrand"] = (object)this.VehicleBrand ?? System.DBNull.Value;
dr["VehicleModel"] = (object)this.VehicleModel ?? System.DBNull.Value;
dr["OwnerTypeId"] = (object)this.OwnerTypeId ?? System.DBNull.Value;
dr["OwnerId"] = (object)this.OwnerId ?? System.DBNull.Value;
dr["DriverTypeId"] = (object)this.DriverTypeId ?? System.DBNull.Value;
dr["DriverId"] = (object)this.DriverId ?? System.DBNull.Value;
dr["SIM1"] = (object)this.SIM1 ?? System.DBNull.Value;
dr["CompaniaSIM1"] = (object)this.CompaniaSIM1 ?? System.DBNull.Value;
dr["SIM2"] = (object)this.SIM2 ?? System.DBNull.Value;
dr["CompaniaSIM2"] = (object)this.CompaniaSIM2 ?? System.DBNull.Value;
dr["NroMotor"] = (object)this.NroMotor ?? System.DBNull.Value;
dr["NroChasis"] = (object)this.NroChasis ?? System.DBNull.Value;
dr["PersonaDNI"] = (object)this.PersonaDNI ?? System.DBNull.Value;
dr["PersonaGenero"] = (object)this.PersonaGenero ?? System.DBNull.Value;
dr["PersonaFechaNacimiento "] = (object)this.PersonaFechaNacimiento  ?? System.DBNull.Value;
dr["MascotaRaza"] = (object)this.MascotaRaza ?? System.DBNull.Value;
dr["MascotaFechaNacimiento"] = (object)this.MascotaFechaNacimiento ?? System.DBNull.Value;
dr["MascotaGenero"] = (object)this.MascotaGenero ?? System.DBNull.Value;
dr["MascotaColor"] = (object)this.MascotaColor ?? System.DBNull.Value;
dr["OtroTextolibre"] = (object)this.OtroTextolibre ?? System.DBNull.Value;
dr["MaxSpeed"] = (object)this.MaxSpeed ?? System.DBNull.Value;
dr["Odometer"] = (object)this.Odometer ?? System.DBNull.Value;
dr["OdometerDate"] = (object)this.OdometerDate ?? System.DBNull.Value;
dr["ParkingLot"] = (object)this.ParkingLot ?? System.DBNull.Value;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
///<summary>
  ///Get XmlDataDocument
  ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
		  DataSet ds = new DataSet("Object"); 
		  ds.EnforceConstraints = false;														                
               							 
 		  ds.Tables.Add(GetDataObject());
	  	  ds.Tables.Add(this.Type.GetDataObject());  	  

          XmlDataDocument XmlDoc = new XmlDataDocument(ds);
		  if(this.CallerObject != null)			 	 
		     XmlDoc.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;                    
		  if(this.Dependencies.Count != 0)
			 XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;          
			 
          return XmlDoc;							    
    }
 
			}

}
