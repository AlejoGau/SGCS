
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
    public abstract class SpeCuenta : ISpecialization, ICanCopyProperties
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
	protected DalCuenta _DalObject;
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
     ///cue_clinea property   
     ///</summary>	
     public string  cue_clinea 
		 { 
		        
                    get{ return this._DalObject.cue_clinea; }
        						set{ this._DalObject.cue_clinea = value; } 										
	   }
	  ///<summary>
     ///cue_ncuenta property   
     ///</summary>	
     public string  cue_ncuenta 
		 { 
		        
                    get{ return this._DalObject.cue_ncuenta; }
        						set{ this._DalObject.cue_ncuenta = value; } 										
	   }
	  ///<summary>
     ///cue_cnombre property   
     ///</summary>	
     public string  cue_cnombre 
		 { 
		        
                    get{ return this._DalObject.cue_cnombre; }
        						set{ this._DalObject.cue_cnombre = value; } 										
	   }
	  ///<summary>
     ///cue_ccalle property   
     ///</summary>	
     public string  cue_ccalle 
		 { 
		        
                    get{ return this._DalObject.cue_ccalle; }
        						set{ this._DalObject.cue_ccalle = value; } 										
	   }
	  ///<summary>
     ///cue_clocalidad property   
     ///</summary>	
     public string  cue_clocalidad 
		 { 
		        
                    get{ return this._DalObject.cue_clocalidad; }
        						set{ this._DalObject.cue_clocalidad = value; } 										
	   }
	  ///<summary>
     ///cue_cprovincia property   
     ///</summary>	
     public string  cue_cprovincia 
		 { 
		        
                    get{ return this._DalObject.cue_cprovincia; }
        						set{ this._DalObject.cue_cprovincia = value; } 										
	   }
	  ///<summary>
     ///cue_ccodigopostal property   
     ///</summary>	
     public string  cue_ccodigopostal 
		 { 
		        
                    get{ return this._DalObject.cue_ccodigopostal; }
        						set{ this._DalObject.cue_ccodigopostal = value; } 										
	   }
	  ///<summary>
     ///cue_ccallecorreo property   
     ///</summary>	
     public string  cue_ccallecorreo 
		 { 
		        
                    get{ return this._DalObject.cue_ccallecorreo; }
        						set{ this._DalObject.cue_ccallecorreo = value; } 										
	   }
	  ///<summary>
     ///cue_clocalidadcorreo property   
     ///</summary>	
     public string  cue_clocalidadcorreo 
		 { 
		        
                    get{ return this._DalObject.cue_clocalidadcorreo; }
        						set{ this._DalObject.cue_clocalidadcorreo = value; } 										
	   }
	  ///<summary>
     ///cue_cprovinciacorreo property   
     ///</summary>	
     public string  cue_cprovinciacorreo 
		 { 
		        
                    get{ return this._DalObject.cue_cprovinciacorreo; }
        						set{ this._DalObject.cue_cprovinciacorreo = value; } 										
	   }
	  ///<summary>
     ///cue_ccodigopostalcorreo property   
     ///</summary>	
     public string  cue_ccodigopostalcorreo 
		 { 
		        
                    get{ return this._DalObject.cue_ccodigopostalcorreo; }
        						set{ this._DalObject.cue_ccodigopostalcorreo = value; } 										
	   }
	  ///<summary>
     ///cue_ctelefono property   
     ///</summary>	
     public string  cue_ctelefono 
		 { 
		        
                    get{ return this._DalObject.cue_ctelefono; }
        						set{ this._DalObject.cue_ctelefono = value; } 										
	   }
	  ///<summary>
     ///cue_cclave property   
     ///</summary>	
     public string  cue_cclave 
		 { 
		        
                    get{ return this._DalObject.cue_cclave; }
        						set{ this._DalObject.cue_cclave = value; } 										
	   }
	  ///<summary>
     ///cue_cpermiso property   
     ///</summary>	
     public string  cue_cpermiso 
		 { 
		        
                    get{ return this._DalObject.cue_cpermiso; }
        						set{ this._DalObject.cue_cpermiso = value; } 										
	   }
	  ///<summary>
     ///cue_ctipo property   
     ///</summary>	
     public string  cue_ctipo 
		 { 
		        
                    get{ return this._DalObject.cue_ctipo; }
        						set{ this._DalObject.cue_ctipo = value; } 										
	   }
	  ///<summary>
     ///cue_cubicacion property   
     ///</summary>	
     public string  cue_cubicacion 
		 { 
		        
                    get{ return this._DalObject.cue_cubicacion; }
        						set{ this._DalObject.cue_cubicacion = value; } 										
	   }
	  ///<summary>
     ///cue_nparticion property   
     ///</summary>	
     public int  cue_nparticion 
		 { 
		        
                    get{ return this._DalObject.cue_nparticion; }
        						set{ this._DalObject.cue_nparticion = value; } 										
	   }
	  ///<summary>
     ///cue_cobservacion property   
     ///</summary>	
     public string  cue_cobservacion 
		 { 
		        
                    get{ return this._DalObject.cue_cobservacion; }
        						set{ this._DalObject.cue_cobservacion = value; } 										
	   }
	  ///<summary>
     ///cue_cfoto property   
     ///</summary>	
     public string  cue_cfoto 
		 { 
		        
                    get{ return this._DalObject.cue_cfoto; }
        						set{ this._DalObject.cue_cfoto = value; } 										
	   }
	  ///<summary>
     ///cue_dfechaalta property   
     ///</summary>	
     public DateTime?  cue_dfechaalta 
		 { 
		        
                    get{ return this._DalObject.cue_dfechaalta; }
        						set{ this._DalObject.cue_dfechaalta = value; } 										
	   }
	  ///<summary>
     ///cue_dservicio property   
     ///</summary>	
     public DateTime?  cue_dservicio 
		 { 
		        
                    get{ return this._DalObject.cue_dservicio; }
        						set{ this._DalObject.cue_dservicio = value; } 										
	   }
	  ///<summary>
     ///cue_nmostrar property   
     ///</summary>	
     public Decimal  cue_nmostrar 
		 { 
		        
                    get{ return this._DalObject.cue_nmostrar; }
        						set{ this._DalObject.cue_nmostrar = value; } 										
	   }
	  ///<summary>
     ///cue_nsonidoul property   
     ///</summary>	
     public Decimal  cue_nsonidoul 
		 { 
		        
                    get{ return this._DalObject.cue_nsonidoul; }
        						set{ this._DalObject.cue_nsonidoul = value; } 										
	   }
	  ///<summary>
     ///cue_nllaveul property   
     ///</summary>	
     public Decimal  cue_nllaveul 
		 { 
		        
                    get{ return this._DalObject.cue_nllaveul; }
        						set{ this._DalObject.cue_nllaveul = value; } 										
	   }
	  ///<summary>
     ///cue_cemail property   
     ///</summary>	
     public string  cue_cemail 
		 { 
		        
                    get{ return this._DalObject.cue_cemail; }
        						set{ this._DalObject.cue_cemail = value; } 										
	   }
	  ///<summary>
     ///cue_cinstalador property   
     ///</summary>	
     public string  cue_cinstalador 
		 { 
		        
                    get{ return this._DalObject.cue_cinstalador; }
        						set{ this._DalObject.cue_cinstalador = value; } 										
	   }
	  ///<summary>
     ///cue_cIMEI property   
     ///</summary>	
     public string  cue_cIMEI 
		 { 
		        
                    get{ return this._DalObject.cue_cIMEI; }
        						set{ this._DalObject.cue_cIMEI = value; } 										
	   }
	  ///<summary>
     ///cue_cLatLng property   
     ///</summary>	
     public string  cue_cLatLng 
		 { 
		        
                    get{ return this._DalObject.cue_cLatLng; }
        						set{ this._DalObject.cue_cLatLng = value; } 										
	   }
	  ///<summary>
     ///Situacion property   
     ///</summary>	
     public string  Situacion 
		 { 
		        
                    get{ return this._DalObject.Situacion; }
        						set{ this._DalObject.Situacion = value; } 										
	   }
	  ///<summary>
     ///cue_nEfectiva property   
     ///</summary>	
     public Decimal  cue_nEfectiva 
		 { 
		        
                    get{ return this._DalObject.cue_nEfectiva; }
        						set{ this._DalObject.cue_nEfectiva = value; } 										
	   }
	  ///<summary>
     ///cue_cIdExtendido property   
     ///</summary>	
     public string  cue_cIdExtendido 
		 { 
		        
                    get{ return this._DalObject.cue_cIdExtendido; }
        						set{ this._DalObject.cue_cIdExtendido = value; } 										
	   }
	  ///<summary>
     ///cue_iZonaHoraria property   
     ///</summary>	
     public int  cue_iZonaHoraria 
		 { 
		        
                    get{ return this._DalObject.cue_iZonaHoraria; }
        						set{ this._DalObject.cue_iZonaHoraria = value; } 										
	   }
	  ///<summary>
     ///cue_cPartitionInfo property   
     ///</summary>	
     public string  cue_cPartitionInfo 
		 { 
		        
                    get{ return this._DalObject.cue_cPartitionInfo; }
        						set{ this._DalObject.cue_cPartitionInfo = value; } 										
	   }
	  ///<summary>
     ///cue_nAutoMonitoreo property   
     ///</summary>	
     public Decimal  cue_nAutoMonitoreo 
		 { 
		        
                    get{ return this._DalObject.cue_nAutoMonitoreo; }
        						set{ this._DalObject.cue_nAutoMonitoreo = value; } 										
	   }
	  ///<summary>
     ///cue_nPrioridad property   
     ///</summary>	
     public Decimal  cue_nPrioridad 
		 { 
		        
                    get{ return this._DalObject.cue_nPrioridad; }
        						set{ this._DalObject.cue_nPrioridad = value; } 										
	   }
	  ///<summary>
     ///cue_cCustom property   
     ///</summary>	
     public string  cue_cCustom 
		 { 
		        
                    get{ return this._DalObject.cue_cCustom; }
        						set{ this._DalObject.cue_cCustom = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public SpeCuenta(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public SpeCuenta(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public SpeCuenta(SqlHelper SqlConfig, int UserId, SimpleCuenta Simple)
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
		public virtual void Load(SimpleCuenta Simple)
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
			   throw new RuntimeException("The Cuenta has dependencies.");
			
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
		public DalCuenta GetDalObject()
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
		
		public IEnumerable<SimpleCuenta> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<SimpleCuenta> GetByChild(string ObjectType, int ObjectId)
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
				throw new InvalidObjectException(this.GetObject(), "The Cuenta is null.");

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
			this._DalObject = new DalCuenta(SqlConfig, UserId);		
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
			var o = (Cuenta)Object;
			o.Name = this.Name;

			o.cue_clinea = this.cue_clinea;

			o.cue_ncuenta = this.cue_ncuenta;

			o.cue_cnombre = this.cue_cnombre;

			o.cue_ccalle = this.cue_ccalle;

			o.cue_clocalidad = this.cue_clocalidad;

			o.cue_cprovincia = this.cue_cprovincia;

			o.cue_ccodigopostal = this.cue_ccodigopostal;

			o.cue_ccallecorreo = this.cue_ccallecorreo;

			o.cue_clocalidadcorreo = this.cue_clocalidadcorreo;

			o.cue_cprovinciacorreo = this.cue_cprovinciacorreo;

			o.cue_ccodigopostalcorreo = this.cue_ccodigopostalcorreo;

			o.cue_ctelefono = this.cue_ctelefono;

			o.cue_cclave = this.cue_cclave;

			o.cue_cpermiso = this.cue_cpermiso;

			o.cue_ctipo = this.cue_ctipo;

			o.cue_cubicacion = this.cue_cubicacion;

			o.cue_nparticion = this.cue_nparticion;

			o.cue_cobservacion = this.cue_cobservacion;

			o.cue_cfoto = this.cue_cfoto;

			o.cue_dfechaalta = this.cue_dfechaalta;

			o.cue_dservicio = this.cue_dservicio;

			o.cue_nmostrar = this.cue_nmostrar;

			o.cue_nsonidoul = this.cue_nsonidoul;

			o.cue_nllaveul = this.cue_nllaveul;

			o.cue_cemail = this.cue_cemail;

			o.cue_cinstalador = this.cue_cinstalador;

			o.cue_cIMEI = this.cue_cIMEI;

			o.cue_cLatLng = this.cue_cLatLng;

			o.Situacion = this.Situacion;

			o.cue_nEfectiva = this.cue_nEfectiva;

			o.cue_cIdExtendido = this.cue_cIdExtendido;

			o.cue_iZonaHoraria = this.cue_iZonaHoraria;

			o.cue_cPartitionInfo = this.cue_cPartitionInfo;

			o.cue_nAutoMonitoreo = this.cue_nAutoMonitoreo;

			o.cue_nPrioridad = this.cue_nPrioridad;

			o.cue_cCustom = this.cue_cCustom;

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
