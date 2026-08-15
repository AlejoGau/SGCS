
    using System;
    using System.Xml;
    using System.Data;
	using System.Collections.Generic;
    using System.Data.SqlClient;
    using Slbf;
    using Slbf.Helpers;     

namespace SoftGuard.BusinessObjects
{ 
   ///<summary>
     ///Specialization class   
     ///</summary>
    public abstract class SpeDispositivoMovil : ISpecialization, ICanCopyProperties
    { 
		public event SpecializationHandler BeforeAddChild;
		public event SpecializationHandler AfterAddChild;

		public event SpecializationHandler BeforeRemoveChild; 
		public event SpecializationHandler AfterRemoveChild; 

		public event SpecializationHandler BeforeNewChild;    
		public event SpecializationHandler AfterNewChild;   
 
		public event SpecializationHandler BeforeNewParent;    
		public event SpecializationHandler AfterNewParent;   
 
		public event SpecializationHandler AfterSelect; 
		public event SpecializationHandler AfterDelete; 
		public event SpecializationHandler AfterInsert; 
		public event SpecializationHandler AfterUpdate; 
		public event SpecializationHandler AfterCheck;  
	
	private bool _AutoCommit = false;	 
	protected DalDispositivoMovil _DalObject;
	protected TaxonomyCollection _Taxonomies;
	protected RelationCollection _Relations;	
		
	
 ///<summary>
     ///Sets the transaction Autocommit property   
     ///</summary>
		public bool AutoCommit
		{
			get{ return this._AutoCommit; }
			set{ this._AutoCommit = value; }
		}		
 ///<summary>
     ///Gets taxonomyCollection   
     ///</summary>		
		public TaxonomyCollection Taxonomies
		{
			get{ return this._Taxonomies; }
		}		
		 ///<summary>
     ///Gets object's Id   
     ///</summary>
		public int Id
		{			
			get{ return this._DalObject.Id; }
		}
		 ///<summary>
     ///Gets object's Name   
     ///</summary>
		public string Name
		{
			set{ this._DalObject.Name = value; }
			get{ return this._DalObject.Name; }
		} 
		 ///<summary>
     ///Gets a frameworkSecurity object   
     ///</summary>
		public FrameworkSecurity Security
		{			
			get{ return this._DalObject.Security; }
		} 		
		 ///<summary>
     ///Gets the callerobject   
     ///</summary>
		public CallerObject CallerObject
		{
			set{ this._DalObject.CallerObject = value; }
			get{ return this._DalObject.CallerObject; }
		}
		 ///<summary>
     ///Gets a baseobject colletction   
     ///</summary>
		public BaseObjectCollection Objects
		{	
			set{ this._DalObject.Objects = value; }
			get{ return this._DalObject.Objects; }
		} 
		 ///<summary>
     ///Gets a simplebaseobjectCollection   
     ///</summary>
		public SimpleBaseObjectCollection Dependencies
		{			
			set{ this._DalObject.Dependencies = value; }
			get{ return this._DalObject.Dependencies; }
		}  				
     ///<summary>
     ///Brand property   
     ///</summary>	
     public string  Brand 
		 { 
		        
                    get{ return this._DalObject.Brand; }
        						set{ this._DalObject.Brand = value; } 										
	   }
	  ///<summary>
     ///Model property   
     ///</summary>	
     public string  Model 
		 { 
		        
                    get{ return this._DalObject.Model; }
        						set{ this._DalObject.Model = value; } 										
	   }
	  ///<summary>
     ///Year property   
     ///</summary>	
     public int  Year 
		 { 
		        
                    get{ return this._DalObject.Year; }
        						set{ this._DalObject.Year = value; } 										
	   }
	  ///<summary>
     ///Domain property   
     ///</summary>	
     public string  Domain 
		 { 
		        
                    get{ return this._DalObject.Domain; }
        						set{ this._DalObject.Domain = value; } 										
	   }
	  ///<summary>
     ///Colour property   
     ///</summary>	
     public string  Colour 
		 { 
		        
                    get{ return this._DalObject.Colour; }
        						set{ this._DalObject.Colour = value; } 										
	   }
	  ///<summary>
     ///VehicleType property   
     ///</summary>	
     public string  VehicleType 
		 { 
		        
                    get{ return this._DalObject.VehicleType; }
        						set{ this._DalObject.VehicleType = value; } 										
	   }
	  ///<summary>
     ///Photo property   
     ///</summary>	
     public string  Photo 
		 { 
		        
                    get{ return this._DalObject.Photo; }
        						set{ this._DalObject.Photo = value; } 										
	   }
	  ///<summary>
     ///PhotoType property   
     ///</summary>	
     public string  PhotoType 
		 { 
		        
                    get{ return this._DalObject.PhotoType; }
        						set{ this._DalObject.PhotoType = value; } 										
	   }
	  ///<summary>
     ///VehicleBrand property   
     ///</summary>	
     public int  VehicleBrand 
		 { 
		        
                    get{ return this._DalObject.VehicleBrand; }
        						set{ this._DalObject.VehicleBrand = value; } 										
	   }
	  ///<summary>
     ///VehicleModel property   
     ///</summary>	
     public int  VehicleModel 
		 { 
		        
                    get{ return this._DalObject.VehicleModel; }
        						set{ this._DalObject.VehicleModel = value; } 										
	   }
	  ///<summary>
     ///OwnerTypeId property   
     ///</summary>	
     public int  OwnerTypeId 
		 { 
		        
                    get{ return this._DalObject.OwnerTypeId; }
        						set{ this._DalObject.OwnerTypeId = value; } 										
	   }
	  ///<summary>
     ///OwnerId property   
     ///</summary>	
     public int  OwnerId 
		 { 
		        
                    get{ return this._DalObject.OwnerId; }
        						set{ this._DalObject.OwnerId = value; } 										
	   }
	  ///<summary>
     ///DriverTypeId property   
     ///</summary>	
     public int  DriverTypeId 
		 { 
		        
                    get{ return this._DalObject.DriverTypeId; }
        						set{ this._DalObject.DriverTypeId = value; } 										
	   }
	  ///<summary>
     ///DriverId property   
     ///</summary>	
     public int  DriverId 
		 { 
		        
                    get{ return this._DalObject.DriverId; }
        						set{ this._DalObject.DriverId = value; } 										
	   }
	  ///<summary>
     ///SIM1 property   
     ///</summary>	
     public string  SIM1 
		 { 
		        
                    get{ return this._DalObject.SIM1; }
        						set{ this._DalObject.SIM1 = value; } 										
	   }
	  ///<summary>
     ///CompaniaSIM1 property   
     ///</summary>	
     public string  CompaniaSIM1 
		 { 
		        
                    get{ return this._DalObject.CompaniaSIM1; }
        						set{ this._DalObject.CompaniaSIM1 = value; } 										
	   }
	  ///<summary>
     ///SIM2 property   
     ///</summary>	
     public string  SIM2 
		 { 
		        
                    get{ return this._DalObject.SIM2; }
        						set{ this._DalObject.SIM2 = value; } 										
	   }
	  ///<summary>
     ///CompaniaSIM2 property   
     ///</summary>	
     public string  CompaniaSIM2 
		 { 
		        
                    get{ return this._DalObject.CompaniaSIM2; }
        						set{ this._DalObject.CompaniaSIM2 = value; } 										
	   }
	  ///<summary>
     ///NroMotor property   
     ///</summary>	
     public string  NroMotor 
		 { 
		        
                    get{ return this._DalObject.NroMotor; }
        						set{ this._DalObject.NroMotor = value; } 										
	   }
	  ///<summary>
     ///NroChasis property   
     ///</summary>	
     public string  NroChasis 
		 { 
		        
                    get{ return this._DalObject.NroChasis; }
        						set{ this._DalObject.NroChasis = value; } 										
	   }
	  ///<summary>
     ///PersonaDNI property   
     ///</summary>	
     public string  PersonaDNI 
		 { 
		        
                    get{ return this._DalObject.PersonaDNI; }
        						set{ this._DalObject.PersonaDNI = value; } 										
	   }
	  ///<summary>
     ///PersonaGenero property   
     ///</summary>	
     public string  PersonaGenero 
		 { 
		        
                    get{ return this._DalObject.PersonaGenero; }
        						set{ this._DalObject.PersonaGenero = value; } 										
	   }
	  ///<summary>
     ///PersonaFechaNacimiento  property   
     ///</summary>	
     public DateTime?  PersonaFechaNacimiento  
		 { 
		        
                    get{ return this._DalObject.PersonaFechaNacimiento ; }
        						set{ this._DalObject.PersonaFechaNacimiento  = value; } 										
	   }
	  ///<summary>
     ///MascotaRaza property   
     ///</summary>	
     public string  MascotaRaza 
		 { 
		        
                    get{ return this._DalObject.MascotaRaza; }
        						set{ this._DalObject.MascotaRaza = value; } 										
	   }
	  ///<summary>
     ///MascotaFechaNacimiento property   
     ///</summary>	
     public DateTime?  MascotaFechaNacimiento 
		 { 
		        
                    get{ return this._DalObject.MascotaFechaNacimiento; }
        						set{ this._DalObject.MascotaFechaNacimiento = value; } 										
	   }
	  ///<summary>
     ///MascotaGenero property   
     ///</summary>	
     public string  MascotaGenero 
		 { 
		        
                    get{ return this._DalObject.MascotaGenero; }
        						set{ this._DalObject.MascotaGenero = value; } 										
	   }
	  ///<summary>
     ///MascotaColor property   
     ///</summary>	
     public string  MascotaColor 
		 { 
		        
                    get{ return this._DalObject.MascotaColor; }
        						set{ this._DalObject.MascotaColor = value; } 										
	   }
	  ///<summary>
     ///OtroTextolibre property   
     ///</summary>	
     public string  OtroTextolibre 
		 { 
		        
                    get{ return this._DalObject.OtroTextolibre; }
        						set{ this._DalObject.OtroTextolibre = value; } 										
	   }
	  ///<summary>
     ///MaxSpeed property   
     ///</summary>	
     public int  MaxSpeed 
		 { 
		        
                    get{ return this._DalObject.MaxSpeed; }
        						set{ this._DalObject.MaxSpeed = value; } 										
	   }
	  ///<summary>
     ///Odometer property   
     ///</summary>	
     public int  Odometer 
		 { 
		        
                    get{ return this._DalObject.Odometer; }
        						set{ this._DalObject.Odometer = value; } 										
	   }
	  ///<summary>
     ///OdometerDate property   
     ///</summary>	
     public DateTime?  OdometerDate 
		 { 
		        
                    get{ return this._DalObject.OdometerDate; }
        						set{ this._DalObject.OdometerDate = value; } 										
	   }
	  ///<summary>
     ///ParkingLot property   
     ///</summary>	
     public bool  ParkingLot 
		 { 
		        
                    get{ return this._DalObject.ParkingLot; }
        						set{ this._DalObject.ParkingLot = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public SpeDispositivoMovil(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public SpeDispositivoMovil(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public SpeDispositivoMovil(SqlHelper SqlConfig, int UserId, SimpleDispositivoMovil Simple)
    		{
    			InitClass(SqlConfig, UserId);    			
    			Load(Simple);								
    		}														
 ///<summary>
     ///Load object data   
     ///</summary>
		public virtual void Load(int Id)
		{
			this._DalObject.Load(Id);
			this._Taxonomies.Load(this.Security.UserId, this._DalObject);
			this._Relations.Load(this._DalObject);			
		}
		 ///<summary>
     ///Load object data   
     ///</summary>
		public virtual void Load(SimpleDispositivoMovil Simple)
		{
			this._DalObject.Load(Simple.Id);
			this._Taxonomies.Load(this.Security.UserId, this._DalObject);				
			this._Relations.Load(this._DalObject);
		}		
 ///<summary>
     ///Save object data   
     ///</summary>
        public virtual void Save()
        { 							
				   BeginTran();				        			
        		try
        		{							  
        			this._DalObject.Save();
        			this._Relations.Save(this._DalObject);
        			this._Taxonomies.Save(this._DalObject);
        			
					   CommitTran();                
        		}
        		finally
        		{
        		       EndTran();               
        		}						
        }
 ///<summary>
     ///Delete object   
     ///</summary>
		public virtual void Delete()
		{
			if(this._Relations.Count != 0)
			   throw new RuntimeException("The DispositivoMovil has dependencies.");
			
			if(this._AutoCommit)
				BeginTran();				        			
			try
			{							  
				this._DalObject.Delete();				
        			
				if(this._AutoCommit)
					CommitTran();                
			}
			catch(Exception ex)
			{
				if(this._AutoCommit)
					RollbackTran();
				throw;
			}
			finally
			{
				if(this._AutoCommit)
					EndTran();               
			}
		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>	
		public BaseObject GetObject()
		{
			return (BaseObject) this._DalObject;
		}
 ///<summary>
     ///Gets a DAL object   
     ///</summary>
		public DalDispositivoMovil GetDalObject()
		{
			return this._DalObject;
		}
 ///<summary>
     ///Gets a transaction Object   
     ///</summary>	
		public TransactionObject GetTransactionObject()
		{
			return (TransactionObject) this._DalObject;
		}
 ///<summary>
     ///Gets object type   
     ///</summary>
	   public ObjectType GetObjectType(){
			 return this._DalObject.Type;
	   }
 ///<summary>
     ///Gets the caller object   
     ///</summary>	
		public CallerObject GetCallerObject()
		{
			return this._DalObject.GetCallerObject();;
		}
 ///<summary>
     ///Gets a SimpleBaseObject   
     ///</summary>	
		public SimpleBaseObject GetSimpleObject()
		{
			return this._DalObject.GetSimpleObject();
		}
 ///<summary>
     ///Sets a SimpleBaseObject   
     ///</summary>	
		public void SetSimpleObject(SimpleBaseObject Simple)
		{
			this._DalObject.SetSimpleObject(Simple);
		}
 ///<summary>
     ///Gets a DataTable of the object   
     ///</summary>
		public DataTable GetDataObject()
		{												                
			return this._DalObject.GetDataObject();        												    
        }
 ///<summary>
     ///Gets an Xml of the object   
     ///</summary>
		public XmlDataDocument GetXmlObject()
		{
			return this._DalObject.GetXmlObject(); 							    
        }
 ///<summary>
     ///Gets children   
     ///</summary>
		public DataTable GetDataChildsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetDataChildsByObject(Object);
		}
		 ///<summary>
     ///Gets children   
     ///</summary>
		public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetChildsByObject(Object);
		}
		
		 ///<summary>
     ///Gets children   
     ///</summary>
		public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
		{
			return this._DalObject.GetChildsByObject(Object, Recursive);
		}		
		
		public IEnumerable<SimpleDispositivoMovil> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<SimpleDispositivoMovil> GetByChild(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByChild(ObjectType, ObjectId);
		}
		 ///<summary>
     ///Get parents   
     ///</summary>
		public DataTable GetDataParentsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetDataParentsByObject(Object);
		}
		 ///<summary>
     ///Get parents   
     ///</summary>
		public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetParentsByObject(Object);
		}
 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, OrderBy, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies)
		{
			int PageTotal = 0;
			int RowTotal = 0;
			return GetDataByName(Name, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
		  return this._DalObject.GetDataByNameWithChild(Name, Taxonomies, FilterChildObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
		  return this._DalObject.GetDataByNameWithParent(Name, Taxonomies, FilterParentObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}	
 ///<summary>
     ///Search objects   
     ///</summary>		
		public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies)
		{
			int PageTotal = 0;
			int RowTotal = 0;
			return GetDataByText(Text, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
		}
		
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByText(Text, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		
		public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
        {
            return this._DalObject.GetDataByFilter(Page, Start, Limit, Sort, Group, Filter, ref TotalRows);
        }
 ///<summary>
     ///Add child   
     ///</summary>
		public BaseObject NewChild(ISpecialization Child)
		{
			return NewChild(Child, null);
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public BaseObject NewChild(ISpecialization Child, ValueCollection Values)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(this._DalObject.Id == 0)
				throw new InvalidObjectException(this.GetObject(), "The DispositivoMovil is null.");

			if(BeforeNewChild != null)
				BeforeNewChild(this, new SimpleEventArgs(Child.GetSimpleObject()));

			RelationCollection Relations = new RelationCollection(this.Security.SqlConfig);

			try
			{
				TranObject.BeginTran();
				Relations.BeginTran();
				
				TranObject.Save();				
				
				if(Values == null)			
					Relations.CreateRelation(TranObject);
				else
					Relations.CreateRelation(TranObject, Values);
							
				Relations.Save(this._DalObject);
				
				TranObject.CommitTran();
				Relations.CommitTran();		
				
				if(AfterNewChild != null)
					AfterNewChild(this, new SimpleEventArgs(Child.GetSimpleObject()));									
			}
			catch(Exception ex)
			{
				TranObject.RollbackTran();
				Relations.RollbackTran();
				throw;
			}
			finally
			{
				TranObject.EndTran();
				Relations.EndTran();
			}		
			return TranObject;
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public void AddChild(ISpecialization Child)
		{
			AddChild(Child, null);
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public void AddChild(ISpecialization Child, ValueCollection Values)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(TranObject.Id == 0)
				throw new InvalidObjectException(TranObject, "The " + TranObject.Type.Name + " is null.");
			
			if(BeforeAddChild != null)
				BeforeAddChild(this, new SimpleEventArgs(Child.GetSimpleObject()));
			
			if(Values == null)
				this._Relations.CreateRelation(TranObject);
			else
				this._Relations.CreateRelation(TranObject, Values);
				
			if(AfterAddChild != null)
				AfterAddChild(this, new SimpleEventArgs(Child.GetSimpleObject()));				
		}
			 ///<summary>
     ///Add Parent   
     ///</summary>	
    public void NewParent(ISpecialization Parent, ValueCollection Values)
    {                 
        if(this.Id == 0)
              throw new InvalidObjectException(this.GetTransactionObject(), "The " + GetObjectType().Name + " is null.");

		if(BeforeNewParent != null)
			BeforeNewParent(this, new SimpleEventArgs(Parent.GetSimpleObject()));

        if(Values == null)
              Parent.NewChild(this);

        if(Values != null)
           Parent.NewChild(this, Values);
           
		if(AfterNewParent != null)
			AfterNewParent(this, new SimpleEventArgs(Parent.GetSimpleObject()));           
    }
	 ///<summary>
     ///Add Parent   
     ///</summary>
    public void NewParent(ISpecialization Parent)
    {                 
        NewParent(Parent, null);
    }		
 ///<summary>
     ///Remove child   
     ///</summary>
		public void RemoveChild(ISpecialization Child)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(TranObject.Id == 0)
				throw new InvalidObjectException(TranObject, "The " + TranObject.Type.Name + " is null.");

			if(BeforeRemoveChild != null)
				BeforeRemoveChild(this, new SimpleEventArgs(Child.GetSimpleObject()));
						
			this._Relations.RemoveRelation(TranObject);
			
			if(AfterRemoveChild != null)
				AfterRemoveChild(this, new SimpleEventArgs(Child.GetSimpleObject()));			
		}		
 ///<summary>
     ///Initialices class instance   
     ///</summary>
		private void InitClass(SqlHelper SqlConfig, int UserId)
		{			
			this._DalObject = new DalDispositivoMovil(SqlConfig, UserId);		
			this._Taxonomies = new TaxonomyCollection(SqlConfig, UserId);
			this._Relations = new RelationCollection(SqlConfig);

			this._AutoCommit = true;
			this._DalObject.AutoCommit = false;
			this._Taxonomies.AutoCommit = false;						
			this._Relations.AutoCommit = false;		
		}
 ///<summary>
     ///Transaction   
     ///</summary>
		public void BeginTran()
		{
			this._DalObject.BeginTran();
			this._Taxonomies.BeginTran();
			this._Relations.BeginTran();			
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void CommitTran()
		{					
			this._DalObject.CommitTran();			
			this._Taxonomies.CommitTran();
			this._Relations.CommitTran();			
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void RollbackTran()
		{					    
			this._DalObject.RollbackTran();
			this._Taxonomies.RollbackTran();			
			this._Relations.RollbackTran();
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void EndTran()
		{			
			this._DalObject.EndTran();
			this._Taxonomies.EndTran();
			this._Relations.EndTran();
		}

		public void CopyPropertiesTo(ISpecialization Object)
        {
			var o = (DispositivoMovil)Object;
			o.Name = this.Name;

			o.Brand = this.Brand;

			o.Model = this.Model;

			o.Year = this.Year;

			o.Domain = this.Domain;

			o.Colour = this.Colour;

			o.VehicleType = this.VehicleType;

			o.Photo = this.Photo;

			o.PhotoType = this.PhotoType;

			o.VehicleBrand = this.VehicleBrand;

			o.VehicleModel = this.VehicleModel;

			o.OwnerTypeId = this.OwnerTypeId;

			o.OwnerId = this.OwnerId;

			o.DriverTypeId = this.DriverTypeId;

			o.DriverId = this.DriverId;

			o.SIM1 = this.SIM1;

			o.CompaniaSIM1 = this.CompaniaSIM1;

			o.SIM2 = this.SIM2;

			o.CompaniaSIM2 = this.CompaniaSIM2;

			o.NroMotor = this.NroMotor;

			o.NroChasis = this.NroChasis;

			o.PersonaDNI = this.PersonaDNI;

			o.PersonaGenero = this.PersonaGenero;

			o.PersonaFechaNacimiento  = this.PersonaFechaNacimiento ;

			o.MascotaRaza = this.MascotaRaza;

			o.MascotaFechaNacimiento = this.MascotaFechaNacimiento;

			o.MascotaGenero = this.MascotaGenero;

			o.MascotaColor = this.MascotaColor;

			o.OtroTextolibre = this.OtroTextolibre;

			o.MaxSpeed = this.MaxSpeed;

			o.Odometer = this.Odometer;

			o.OdometerDate = this.OdometerDate;

			o.ParkingLot = this.ParkingLot;

        }

		protected void OnAfterSelect(SimpleEventArgs Arg)
		{
			if (AfterSelect != null) AfterSelect(this, Arg);
		}
		protected void OnAfterInsert(SimpleEventArgs Arg)
		{
			if (AfterInsert != null) AfterInsert(this, Arg);
		}
		protected void OnAfterUpdate(SimpleEventArgs Arg)
		{
			if (AfterUpdate != null) AfterUpdate(this, Arg);
		}
		protected void OnAfterDelete(SimpleEventArgs Arg)
		{
			if (AfterDelete != null) AfterDelete(this, Arg);
		}
		protected void OnAfterCheck(SimpleEventArgs Arg)
		{
			if (AfterCheck != null) AfterCheck(this, Arg);
		}
 }

}
