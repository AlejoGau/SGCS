
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
    public abstract class SpeReporte : ISpecialization, ICanCopyProperties
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
	protected DalReporte _DalObject;
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
     ///rep_iidcuenta property   
     ///</summary>	
     public int  rep_iidcuenta 
		 { 
		        
                    get{ return this._DalObject.rep_iidcuenta; }
        						set{ this._DalObject.rep_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///rep_ntipo property   
     ///</summary>	
     public Decimal  rep_ntipo 
		 { 
		        
                    get{ return this._DalObject.rep_ntipo; }
        						set{ this._DalObject.rep_ntipo = value; } 										
	   }
	  ///<summary>
     ///rep_tproximoenvio property   
     ///</summary>	
     public DateTime?  rep_tproximoenvio 
		 { 
		        
                    get{ return this._DalObject.rep_tproximoenvio; }
        						set{ this._DalObject.rep_tproximoenvio = value; } 										
	   }
	  ///<summary>
     ///rep_nfrecuencia property   
     ///</summary>	
     public Decimal  rep_nfrecuencia 
		 { 
		        
                    get{ return this._DalObject.rep_nfrecuencia; }
        						set{ this._DalObject.rep_nfrecuencia = value; } 										
	   }
	  ///<summary>
     ///rep_cmail property   
     ///</summary>	
     public string  rep_cmail 
		 { 
		        
                    get{ return this._DalObject.rep_cmail; }
        						set{ this._DalObject.rep_cmail = value; } 										
	   }
	  ///<summary>
     ///rep_iLimiteSMS property   
     ///</summary>	
     public int  rep_iLimiteSMS 
		 { 
		        
                    get{ return this._DalObject.rep_iLimiteSMS; }
        						set{ this._DalObject.rep_iLimiteSMS = value; } 										
	   }
	  ///<summary>
     ///rep_nLimiteCada property   
     ///</summary>	
     public Decimal  rep_nLimiteCada 
		 { 
		        
                    get{ return this._DalObject.rep_nLimiteCada; }
        						set{ this._DalObject.rep_nLimiteCada = value; } 										
	   }
	  ///<summary>
     ///rep_nCadaUnidadTiempo property   
     ///</summary>	
     public Decimal  rep_nCadaUnidadTiempo 
		 { 
		        
                    get{ return this._DalObject.rep_nCadaUnidadTiempo; }
        						set{ this._DalObject.rep_nCadaUnidadTiempo = value; } 										
	   }
	  ///<summary>
     ///rep_cMailRuteoSMS property   
     ///</summary>	
     public string  rep_cMailRuteoSMS 
		 { 
		        
                    get{ return this._DalObject.rep_cMailRuteoSMS; }
        						set{ this._DalObject.rep_cMailRuteoSMS = value; } 										
	   }
	  ///<summary>
     ///rep_cSMSParaInforme property   
     ///</summary>	
     public string  rep_cSMSParaInforme 
		 { 
		        
                    get{ return this._DalObject.rep_cSMSParaInforme; }
        						set{ this._DalObject.rep_cSMSParaInforme = value; } 										
	   }
	  ///<summary>
     ///rep_iModemSMS property   
     ///</summary>	
     public int  rep_iModemSMS 
		 { 
		        
                    get{ return this._DalObject.rep_iModemSMS; }
        						set{ this._DalObject.rep_iModemSMS = value; } 										
	   }
	  ///<summary>
     ///rep_idGrupo property   
     ///</summary>	
     public int  rep_idGrupo 
		 { 
		        
                    get{ return this._DalObject.rep_idGrupo; }
        						set{ this._DalObject.rep_idGrupo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public SpeReporte(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public SpeReporte(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public SpeReporte(SqlHelper SqlConfig, int UserId, SimpleReporte Simple)
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
		public virtual void Load(SimpleReporte Simple)
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
			   throw new RuntimeException("The Reporte has dependencies.");
			
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
		public DalReporte GetDalObject()
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
		
		public IEnumerable<SimpleReporte> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<SimpleReporte> GetByChild(string ObjectType, int ObjectId)
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
				throw new InvalidObjectException(this.GetObject(), "The Reporte is null.");

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
			this._DalObject = new DalReporte(SqlConfig, UserId);		
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
			var o = (Reporte)Object;
			o.Name = this.Name;

			o.rep_iidcuenta = this.rep_iidcuenta;

			o.rep_ntipo = this.rep_ntipo;

			o.rep_tproximoenvio = this.rep_tproximoenvio;

			o.rep_nfrecuencia = this.rep_nfrecuencia;

			o.rep_cmail = this.rep_cmail;

			o.rep_iLimiteSMS = this.rep_iLimiteSMS;

			o.rep_nLimiteCada = this.rep_nLimiteCada;

			o.rep_nCadaUnidadTiempo = this.rep_nCadaUnidadTiempo;

			o.rep_cMailRuteoSMS = this.rep_cMailRuteoSMS;

			o.rep_cSMSParaInforme = this.rep_cSMSParaInforme;

			o.rep_iModemSMS = this.rep_iModemSMS;

			o.rep_idGrupo = this.rep_idGrupo;

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
