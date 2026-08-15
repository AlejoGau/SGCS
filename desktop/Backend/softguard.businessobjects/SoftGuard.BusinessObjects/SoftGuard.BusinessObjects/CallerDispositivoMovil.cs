
    using System;
    using System.Xml;
    using System.Data;
    using Slbf;
    using Slbf.Helpers;	    	 

namespace SoftGuard.BusinessObjects
{ 	
   ///<summary>
     ///Caller object class   
     ///</summary>
    public class CallerDispositivoMovil : CallerObject
    { 	
				     private string _Brand;
					
				     private string _Model;
					
				     private int _Year;
					
				     private string _Domain;
					
				     private string _Colour;
					
				     private string _VehicleType;
					
				     private string _Photo;
					
				     private string _PhotoType;
					
				     private int _VehicleBrand;
					
				     private int _VehicleModel;
					
				     private int _OwnerTypeId;
					
				     private int _OwnerId;
					
				     private int _DriverTypeId;
					
				     private int _DriverId;
					
				     private string _SIM1;
					
				     private string _CompaniaSIM1;
					
				     private string _SIM2;
					
				     private string _CompaniaSIM2;
					
				     private string _NroMotor;
					
				     private string _NroChasis;
					
				     private string _PersonaDNI;
					
				     private string _PersonaGenero;
					
				     private DateTime? _PersonaFechaNacimiento ;
					
				     private string _MascotaRaza;
					
				     private DateTime? _MascotaFechaNacimiento;
					
				     private string _MascotaGenero;
					
				     private string _MascotaColor;
					
				     private string _OtroTextolibre;
					
				     private int _MaxSpeed;
					
				     private int _Odometer;
					
				     private DateTime? _OdometerDate;
					
				     private bool _ParkingLot;
				 ///<summary>
     ///Brand property   
     ///</summary>   
     public string Brand 
		 { 
		        
                    get{ return this._Brand; }
        						set{ this._Brand = value; } 										
	   }
	  ///<summary>
     ///Model property   
     ///</summary>   
     public string Model 
		 { 
		        
                    get{ return this._Model; }
        						set{ this._Model = value; } 										
	   }
	  ///<summary>
     ///Year property   
     ///</summary>   
     public int Year 
		 { 
		        
                    get{ return this._Year; }
        						set{ this._Year = value; } 										
	   }
	  ///<summary>
     ///Domain property   
     ///</summary>   
     public string Domain 
		 { 
		        
                    get{ return this._Domain; }
        						set{ this._Domain = value; } 										
	   }
	  ///<summary>
     ///Colour property   
     ///</summary>   
     public string Colour 
		 { 
		        
                    get{ return this._Colour; }
        						set{ this._Colour = value; } 										
	   }
	  ///<summary>
     ///VehicleType property   
     ///</summary>   
     public string VehicleType 
		 { 
		        
                    get{ return this._VehicleType; }
        						set{ this._VehicleType = value; } 										
	   }
	  ///<summary>
     ///Photo property   
     ///</summary>   
     public string Photo 
		 { 
		        
                    get{ return this._Photo; }
        						set{ this._Photo = value; } 										
	   }
	  ///<summary>
     ///PhotoType property   
     ///</summary>   
     public string PhotoType 
		 { 
		        
                    get{ return this._PhotoType; }
        						set{ this._PhotoType = value; } 										
	   }
	  ///<summary>
     ///VehicleBrand property   
     ///</summary>   
     public int VehicleBrand 
		 { 
		        
                    get{ return this._VehicleBrand; }
        						set{ this._VehicleBrand = value; } 										
	   }
	  ///<summary>
     ///VehicleModel property   
     ///</summary>   
     public int VehicleModel 
		 { 
		        
                    get{ return this._VehicleModel; }
        						set{ this._VehicleModel = value; } 										
	   }
	  ///<summary>
     ///OwnerTypeId property   
     ///</summary>   
     public int OwnerTypeId 
		 { 
		        
                    get{ return this._OwnerTypeId; }
        						set{ this._OwnerTypeId = value; } 										
	   }
	  ///<summary>
     ///OwnerId property   
     ///</summary>   
     public int OwnerId 
		 { 
		        
                    get{ return this._OwnerId; }
        						set{ this._OwnerId = value; } 										
	   }
	  ///<summary>
     ///DriverTypeId property   
     ///</summary>   
     public int DriverTypeId 
		 { 
		        
                    get{ return this._DriverTypeId; }
        						set{ this._DriverTypeId = value; } 										
	   }
	  ///<summary>
     ///DriverId property   
     ///</summary>   
     public int DriverId 
		 { 
		        
                    get{ return this._DriverId; }
        						set{ this._DriverId = value; } 										
	   }
	  ///<summary>
     ///SIM1 property   
     ///</summary>   
     public string SIM1 
		 { 
		        
                    get{ return this._SIM1; }
        						set{ this._SIM1 = value; } 										
	   }
	  ///<summary>
     ///CompaniaSIM1 property   
     ///</summary>   
     public string CompaniaSIM1 
		 { 
		        
                    get{ return this._CompaniaSIM1; }
        						set{ this._CompaniaSIM1 = value; } 										
	   }
	  ///<summary>
     ///SIM2 property   
     ///</summary>   
     public string SIM2 
		 { 
		        
                    get{ return this._SIM2; }
        						set{ this._SIM2 = value; } 										
	   }
	  ///<summary>
     ///CompaniaSIM2 property   
     ///</summary>   
     public string CompaniaSIM2 
		 { 
		        
                    get{ return this._CompaniaSIM2; }
        						set{ this._CompaniaSIM2 = value; } 										
	   }
	  ///<summary>
     ///NroMotor property   
     ///</summary>   
     public string NroMotor 
		 { 
		        
                    get{ return this._NroMotor; }
        						set{ this._NroMotor = value; } 										
	   }
	  ///<summary>
     ///NroChasis property   
     ///</summary>   
     public string NroChasis 
		 { 
		        
                    get{ return this._NroChasis; }
        						set{ this._NroChasis = value; } 										
	   }
	  ///<summary>
     ///PersonaDNI property   
     ///</summary>   
     public string PersonaDNI 
		 { 
		        
                    get{ return this._PersonaDNI; }
        						set{ this._PersonaDNI = value; } 										
	   }
	  ///<summary>
     ///PersonaGenero property   
     ///</summary>   
     public string PersonaGenero 
		 { 
		        
                    get{ return this._PersonaGenero; }
        						set{ this._PersonaGenero = value; } 										
	   }
	  ///<summary>
     ///PersonaFechaNacimiento  property   
     ///</summary>   
     public DateTime? PersonaFechaNacimiento  
		 { 
		        
                    get{ return this._PersonaFechaNacimiento ; }
        						set{ this._PersonaFechaNacimiento  = value; } 										
	   }
	  ///<summary>
     ///MascotaRaza property   
     ///</summary>   
     public string MascotaRaza 
		 { 
		        
                    get{ return this._MascotaRaza; }
        						set{ this._MascotaRaza = value; } 										
	   }
	  ///<summary>
     ///MascotaFechaNacimiento property   
     ///</summary>   
     public DateTime? MascotaFechaNacimiento 
		 { 
		        
                    get{ return this._MascotaFechaNacimiento; }
        						set{ this._MascotaFechaNacimiento = value; } 										
	   }
	  ///<summary>
     ///MascotaGenero property   
     ///</summary>   
     public string MascotaGenero 
		 { 
		        
                    get{ return this._MascotaGenero; }
        						set{ this._MascotaGenero = value; } 										
	   }
	  ///<summary>
     ///MascotaColor property   
     ///</summary>   
     public string MascotaColor 
		 { 
		        
                    get{ return this._MascotaColor; }
        						set{ this._MascotaColor = value; } 										
	   }
	  ///<summary>
     ///OtroTextolibre property   
     ///</summary>   
     public string OtroTextolibre 
		 { 
		        
                    get{ return this._OtroTextolibre; }
        						set{ this._OtroTextolibre = value; } 										
	   }
	  ///<summary>
     ///MaxSpeed property   
     ///</summary>   
     public int MaxSpeed 
		 { 
		        
                    get{ return this._MaxSpeed; }
        						set{ this._MaxSpeed = value; } 										
	   }
	  ///<summary>
     ///Odometer property   
     ///</summary>   
     public int Odometer 
		 { 
		        
                    get{ return this._Odometer; }
        						set{ this._Odometer = value; } 										
	   }
	  ///<summary>
     ///OdometerDate property   
     ///</summary>   
     public DateTime? OdometerDate 
		 { 
		        
                    get{ return this._OdometerDate; }
        						set{ this._OdometerDate = value; } 										
	   }
	  ///<summary>
     ///ParkingLot property   
     ///</summary>   
     public bool ParkingLot 
		 { 
		        
                    get{ return this._ParkingLot; }
        						set{ this._ParkingLot = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerDispositivoMovil() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerDispositivoMovil(int Id, string Name, string Brand, string Model, int Year, string Domain, string Colour, string VehicleType, string Photo, string PhotoType, int VehicleBrand, int VehicleModel, int OwnerTypeId, int OwnerId, int DriverTypeId, int DriverId, string SIM1, string CompaniaSIM1, string SIM2, string CompaniaSIM2, string NroMotor, string NroChasis, string PersonaDNI, string PersonaGenero, DateTime? PersonaFechaNacimiento , string MascotaRaza, DateTime? MascotaFechaNacimiento, string MascotaGenero, string MascotaColor, string OtroTextolibre, int MaxSpeed, int Odometer, DateTime? OdometerDate, bool ParkingLot) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._Brand = Brand;
this._Model = Model;
this._Year = Year;
this._Domain = Domain;
this._Colour = Colour;
this._VehicleType = VehicleType;
this._Photo = Photo;
this._PhotoType = PhotoType;
this._VehicleBrand = VehicleBrand;
this._VehicleModel = VehicleModel;
this._OwnerTypeId = OwnerTypeId;
this._OwnerId = OwnerId;
this._DriverTypeId = DriverTypeId;
this._DriverId = DriverId;
this._SIM1 = SIM1;
this._CompaniaSIM1 = CompaniaSIM1;
this._SIM2 = SIM2;
this._CompaniaSIM2 = CompaniaSIM2;
this._NroMotor = NroMotor;
this._NroChasis = NroChasis;
this._PersonaDNI = PersonaDNI;
this._PersonaGenero = PersonaGenero;
this._PersonaFechaNacimiento  = PersonaFechaNacimiento ;
this._MascotaRaza = MascotaRaza;
this._MascotaFechaNacimiento = MascotaFechaNacimiento;
this._MascotaGenero = MascotaGenero;
this._MascotaColor = MascotaColor;
this._OtroTextolibre = OtroTextolibre;
this._MaxSpeed = MaxSpeed;
this._Odometer = Odometer;
this._OdometerDate = OdometerDate;
this._ParkingLot = ParkingLot;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3045, "DispositivoMovil");
        }
 ///<summary>
     ///Gets the caller object   
     ///</summary>		
		public override CallerObject GetObject()
		{
			return (CallerObject) this;
		}
 ///<summary>
     ///Gets a simpleobject   
     ///</summary>	
		public override SimpleBaseObject GetSimpleObject()
		{
			SimpleDispositivoMovil Simple = new SimpleDispositivoMovil();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.Brand = this._Brand;
Simple.Model = this._Model;
Simple.Year = this._Year;
Simple.Domain = this._Domain;
Simple.Colour = this._Colour;
Simple.VehicleType = this._VehicleType;
Simple.Photo = this._Photo;
Simple.PhotoType = this._PhotoType;
Simple.VehicleBrand = this._VehicleBrand;
Simple.VehicleModel = this._VehicleModel;
Simple.OwnerTypeId = this._OwnerTypeId;
Simple.OwnerId = this._OwnerId;
Simple.DriverTypeId = this._DriverTypeId;
Simple.DriverId = this._DriverId;
Simple.SIM1 = this._SIM1;
Simple.CompaniaSIM1 = this._CompaniaSIM1;
Simple.SIM2 = this._SIM2;
Simple.CompaniaSIM2 = this._CompaniaSIM2;
Simple.NroMotor = this._NroMotor;
Simple.NroChasis = this._NroChasis;
Simple.PersonaDNI = this._PersonaDNI;
Simple.PersonaGenero = this._PersonaGenero;
Simple.PersonaFechaNacimiento  = this._PersonaFechaNacimiento ;
Simple.MascotaRaza = this._MascotaRaza;
Simple.MascotaFechaNacimiento = this._MascotaFechaNacimiento;
Simple.MascotaGenero = this._MascotaGenero;
Simple.MascotaColor = this._MascotaColor;
Simple.OtroTextolibre = this._OtroTextolibre;
Simple.MaxSpeed = this._MaxSpeed;
Simple.Odometer = this._Odometer;
Simple.OdometerDate = this._OdometerDate;
Simple.ParkingLot = this._ParkingLot;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleDispositivoMovil Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._Brand = Simple.Brand;
this._Model = Simple.Model;
this._Year = Simple.Year;
this._Domain = Simple.Domain;
this._Colour = Simple.Colour;
this._VehicleType = Simple.VehicleType;
this._Photo = Simple.Photo;
this._PhotoType = Simple.PhotoType;
this._VehicleBrand = Simple.VehicleBrand;
this._VehicleModel = Simple.VehicleModel;
this._OwnerTypeId = Simple.OwnerTypeId;
this._OwnerId = Simple.OwnerId;
this._DriverTypeId = Simple.DriverTypeId;
this._DriverId = Simple.DriverId;
this._SIM1 = Simple.SIM1;
this._CompaniaSIM1 = Simple.CompaniaSIM1;
this._SIM2 = Simple.SIM2;
this._CompaniaSIM2 = Simple.CompaniaSIM2;
this._NroMotor = Simple.NroMotor;
this._NroChasis = Simple.NroChasis;
this._PersonaDNI = Simple.PersonaDNI;
this._PersonaGenero = Simple.PersonaGenero;
this._PersonaFechaNacimiento  = Simple.PersonaFechaNacimiento ;
this._MascotaRaza = Simple.MascotaRaza;
this._MascotaFechaNacimiento = Simple.MascotaFechaNacimiento;
this._MascotaGenero = Simple.MascotaGenero;
this._MascotaColor = Simple.MascotaColor;
this._OtroTextolibre = Simple.OtroTextolibre;
this._MaxSpeed = Simple.MaxSpeed;
this._Odometer = Simple.Odometer;
this._OdometerDate = Simple.OdometerDate;
this._ParkingLot = Simple.ParkingLot;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalDispositivoMovil(SqlConfig, UserId, (SimpleDispositivoMovil) GetSimpleObject());
		}
 ///<summary>
     ///Get object's data   
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
dr["Brand"] = this._Brand;
dr["Model"] = this._Model;
dr["Year"] = this._Year;
dr["Domain"] = this._Domain;
dr["Colour"] = this._Colour;
dr["VehicleType"] = this._VehicleType;
dr["Photo"] = this._Photo;
dr["PhotoType"] = this._PhotoType;
dr["VehicleBrand"] = this._VehicleBrand;
dr["VehicleModel"] = this._VehicleModel;
dr["OwnerTypeId"] = this._OwnerTypeId;
dr["OwnerId"] = this._OwnerId;
dr["DriverTypeId"] = this._DriverTypeId;
dr["DriverId"] = this._DriverId;
dr["SIM1"] = this._SIM1;
dr["CompaniaSIM1"] = this._CompaniaSIM1;
dr["SIM2"] = this._SIM2;
dr["CompaniaSIM2"] = this._CompaniaSIM2;
dr["NroMotor"] = this._NroMotor;
dr["NroChasis"] = this._NroChasis;
dr["PersonaDNI"] = this._PersonaDNI;
dr["PersonaGenero"] = this._PersonaGenero;
dr["PersonaFechaNacimiento "] = this._PersonaFechaNacimiento ;
dr["MascotaRaza"] = this._MascotaRaza;
dr["MascotaFechaNacimiento"] = this._MascotaFechaNacimiento;
dr["MascotaGenero"] = this._MascotaGenero;
dr["MascotaColor"] = this._MascotaColor;
dr["OtroTextolibre"] = this._OtroTextolibre;
dr["MaxSpeed"] = this._MaxSpeed;
dr["Odometer"] = this._Odometer;
dr["OdometerDate"] = this._OdometerDate;
dr["ParkingLot"] = this._ParkingLot;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
 ///<summary>
     ///Get object's Xml representation   
     ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
			DataSet ds = new DataSet("Caller"); 
			ds.EnforceConstraints = false;														                
               							 
			ds.Tables.Add(GetDataObject());
			ds.Tables.Add(this.Type.GetDataObject());
			XmlDataDocument XmlDoc = new XmlDataDocument(ds);
			if(this.Relation != null)
				XmlDoc.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
			return XmlDoc;	
    }
 }

}
