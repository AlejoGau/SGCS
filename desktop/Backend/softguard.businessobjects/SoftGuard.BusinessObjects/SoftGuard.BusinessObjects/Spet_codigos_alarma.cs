
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
    public abstract class Spet_codigos_alarma : ISpecialization, ICanCopyProperties
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
	protected Dalt_codigos_alarma _DalObject;
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
     ///cod_ccodigo property   
     ///</summary>	
     public string  cod_ccodigo 
		 { 
		        
                    get{ return this._DalObject.cod_ccodigo; }
        						set{ this._DalObject.cod_ccodigo = value; } 										
	   }
	  ///<summary>
     ///cod_cdescripcion property   
     ///</summary>	
     public string  cod_cdescripcion 
		 { 
		        
                    get{ return this._DalObject.cod_cdescripcion; }
        						set{ this._DalObject.cod_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///cod_nalerta property   
     ///</summary>	
     public Decimal  cod_nalerta 
		 { 
		        
                    get{ return this._DalObject.cod_nalerta; }
        						set{ this._DalObject.cod_nalerta = value; } 										
	   }
	  ///<summary>
     ///cod_nprioridad property   
     ///</summary>	
     public Decimal  cod_nprioridad 
		 { 
		        
                    get{ return this._DalObject.cod_nprioridad; }
        						set{ this._DalObject.cod_nprioridad = value; } 										
	   }
	  ///<summary>
     ///cod_ntipo property   
     ///</summary>	
     public int  cod_ntipo 
		 { 
		        
                    get{ return this._DalObject.cod_ntipo; }
        						set{ this._DalObject.cod_ntipo = value; } 										
	   }
	  ///<summary>
     ///cod_nsistema property   
     ///</summary>	
     public Decimal  cod_nsistema 
		 { 
		        
                    get{ return this._DalObject.cod_nsistema; }
        						set{ this._DalObject.cod_nsistema = value; } 										
	   }
	  ///<summary>
     ///cod_ncolor property   
     ///</summary>	
     public int  cod_ncolor 
		 { 
		        
                    get{ return this._DalObject.cod_ncolor; }
        						set{ this._DalObject.cod_ncolor = value; } 										
	   }
	  ///<summary>
     ///cod_cSonido property   
     ///</summary>	
     public string  cod_cSonido 
		 { 
		        
                    get{ return this._DalObject.cod_cSonido; }
        						set{ this._DalObject.cod_cSonido = value; } 										
	   }
	  ///<summary>
     ///cod_nColorLetra property   
     ///</summary>	
     public int  cod_nColorLetra 
		 { 
		        
                    get{ return this._DalObject.cod_nColorLetra; }
        						set{ this._DalObject.cod_nColorLetra = value; } 										
	   }
	  ///<summary>
     ///cod_nResuelve property   
     ///</summary>	
     public Decimal  cod_nResuelve 
		 { 
		        
                    get{ return this._DalObject.cod_nResuelve; }
        						set{ this._DalObject.cod_nResuelve = value; } 										
	   }
	  ///<summary>
     ///cod_cGrupo property   
     ///</summary>	
     public string  cod_cGrupo 
		 { 
		        
                    get{ return this._DalObject.cod_cGrupo; }
        						set{ this._DalObject.cod_cGrupo = value; } 										
	   }
	  ///<summary>
     ///cod_nSms property   
     ///</summary>	
     public Decimal  cod_nSms 
		 { 
		        
                    get{ return this._DalObject.cod_nSms; }
        						set{ this._DalObject.cod_nSms = value; } 										
	   }
	  ///<summary>
     ///cod_nMail property   
     ///</summary>	
     public Decimal  cod_nMail 
		 { 
		        
                    get{ return this._DalObject.cod_nMail; }
        						set{ this._DalObject.cod_nMail = value; } 										
	   }
	  ///<summary>
     ///cod_nVideo property   
     ///</summary>	
     public Decimal  cod_nVideo 
		 { 
		        
                    get{ return this._DalObject.cod_nVideo; }
        						set{ this._DalObject.cod_nVideo = value; } 										
	   }
	  ///<summary>
     ///cod_nManual property   
     ///</summary>	
     public Decimal  cod_nManual 
		 { 
		        
                    get{ return this._DalObject.cod_nManual; }
        						set{ this._DalObject.cod_nManual = value; } 										
	   }
	  ///<summary>
     ///cod_nMovil property   
     ///</summary>	
     public Decimal  cod_nMovil 
		 { 
		        
                    get{ return this._DalObject.cod_nMovil; }
        						set{ this._DalObject.cod_nMovil = value; } 										
	   }
	  ///<summary>
     ///cod_nAutoridad property   
     ///</summary>	
     public Decimal  cod_nAutoridad 
		 { 
		        
                    get{ return this._DalObject.cod_nAutoridad; }
        						set{ this._DalObject.cod_nAutoridad = value; } 										
	   }
	  ///<summary>
     ///cod_nLeeSonido property   
     ///</summary>	
     public Decimal  cod_nLeeSonido 
		 { 
		        
                    get{ return this._DalObject.cod_nLeeSonido; }
        						set{ this._DalObject.cod_nLeeSonido = value; } 										
	   }
	  ///<summary>
     ///cod_nMultiMonitor property   
     ///</summary>	
     public Decimal  cod_nMultiMonitor 
		 { 
		        
                    get{ return this._DalObject.cod_nMultiMonitor; }
        						set{ this._DalObject.cod_nMultiMonitor = value; } 										
	   }
	  ///<summary>
     ///cod_cinstrucciones_DSS property   
     ///</summary>	
     public string  cod_cinstrucciones_DSS 
		 { 
		        
                    get{ return this._DalObject.cod_cinstrucciones_DSS; }
        						set{ this._DalObject.cod_cinstrucciones_DSS = value; } 										
	   }
	  ///<summary>
     ///cod_cconfiguracion_DSS property   
     ///</summary>	
     public string  cod_cconfiguracion_DSS 
		 { 
		        
                    get{ return this._DalObject.cod_cconfiguracion_DSS; }
        						set{ this._DalObject.cod_cconfiguracion_DSS = value; } 										
	   }
	  ///<summary>
     ///cod_nWebCliente property   
     ///</summary>	
     public Decimal  cod_nWebCliente 
		 { 
		        
                    get{ return this._DalObject.cod_nWebCliente; }
        						set{ this._DalObject.cod_nWebCliente = value; } 										
	   }
	  ///<summary>
     ///cod_cAlarmaAutoprocesa property   
     ///</summary>	
     public string  cod_cAlarmaAutoprocesa 
		 { 
		        
                    get{ return this._DalObject.cod_cAlarmaAutoprocesa; }
        						set{ this._DalObject.cod_cAlarmaAutoprocesa = value; } 										
	   }
	  ///<summary>
     ///cod_iTemplate property   
     ///</summary>	
     public int  cod_iTemplate 
		 { 
		        
                    get{ return this._DalObject.cod_iTemplate; }
        						set{ this._DalObject.cod_iTemplate = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public Spet_codigos_alarma(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spet_codigos_alarma(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spet_codigos_alarma(SqlHelper SqlConfig, int UserId, Simplet_codigos_alarma Simple)
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
		public virtual void Load(Simplet_codigos_alarma Simple)
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
			   throw new RuntimeException("The t_codigos_alarma has dependencies.");
			
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
		public Dalt_codigos_alarma GetDalObject()
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
		
		public IEnumerable<Simplet_codigos_alarma> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<Simplet_codigos_alarma> GetByChild(string ObjectType, int ObjectId)
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
				throw new InvalidObjectException(this.GetObject(), "The t_codigos_alarma is null.");

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
			this._DalObject = new Dalt_codigos_alarma(SqlConfig, UserId);		
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
			var o = (SoftGuard.BusinessObjects.t_codigos_alarma)Object;
			o.Name = this.Name;

			o.cod_ccodigo = this.cod_ccodigo;

			o.cod_cdescripcion = this.cod_cdescripcion;

			o.cod_nalerta = this.cod_nalerta;

			o.cod_nprioridad = this.cod_nprioridad;

			o.cod_ntipo = this.cod_ntipo;

			o.cod_nsistema = this.cod_nsistema;

			o.cod_ncolor = this.cod_ncolor;

			o.cod_cSonido = this.cod_cSonido;

			o.cod_nColorLetra = this.cod_nColorLetra;

			o.cod_nResuelve = this.cod_nResuelve;

			o.cod_cGrupo = this.cod_cGrupo;

			o.cod_nSms = this.cod_nSms;

			o.cod_nMail = this.cod_nMail;

			o.cod_nVideo = this.cod_nVideo;

			o.cod_nManual = this.cod_nManual;

			o.cod_nMovil = this.cod_nMovil;

			o.cod_nAutoridad = this.cod_nAutoridad;

			o.cod_nLeeSonido = this.cod_nLeeSonido;

			o.cod_nMultiMonitor = this.cod_nMultiMonitor;

			o.cod_cinstrucciones_DSS = this.cod_cinstrucciones_DSS;

			o.cod_cconfiguracion_DSS = this.cod_cconfiguracion_DSS;

			o.cod_nWebCliente = this.cod_nWebCliente;

			o.cod_cAlarmaAutoprocesa = this.cod_cAlarmaAutoprocesa;

			o.cod_iTemplate = this.cod_iTemplate;

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
