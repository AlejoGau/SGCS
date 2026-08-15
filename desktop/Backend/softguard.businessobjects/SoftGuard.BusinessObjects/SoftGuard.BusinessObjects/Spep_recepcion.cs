
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
    public abstract class Spep_recepcion : ISpecialization, ICanCopyProperties
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
	protected Dalp_recepcion _DalObject;
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
     ///rec_iidcuenta property   
     ///</summary>	
     public int  rec_iidcuenta 
		 { 
		        
                    get{ return this._DalObject.rec_iidcuenta; }
        						set{ this._DalObject.rec_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///rec_calarma property   
     ///</summary>	
     public string  rec_calarma 
		 { 
		        
                    get{ return this._DalObject.rec_calarma; }
        						set{ this._DalObject.rec_calarma = value; } 										
	   }
	  ///<summary>
     ///rec_czona property   
     ///</summary>	
     public string  rec_czona 
		 { 
		        
                    get{ return this._DalObject.rec_czona; }
        						set{ this._DalObject.rec_czona = value; } 										
	   }
	  ///<summary>
     ///rec_iusuario property   
     ///</summary>	
     public int  rec_iusuario 
		 { 
		        
                    get{ return this._DalObject.rec_iusuario; }
        						set{ this._DalObject.rec_iusuario = value; } 										
	   }
	  ///<summary>
     ///rec_tfechahora property   
     ///</summary>	
     public DateTime?  rec_tfechahora 
		 { 
		        
                    get{ return this._DalObject.rec_tfechahora; }
        						set{ this._DalObject.rec_tfechahora = value; } 										
	   }
	  ///<summary>
     ///rec_nestado property   
     ///</summary>	
     public Decimal  rec_nestado 
		 { 
		        
                    get{ return this._DalObject.rec_nestado; }
        						set{ this._DalObject.rec_nestado = value; } 										
	   }
	  ///<summary>
     ///rec_cContenido property   
     ///</summary>	
     public string  rec_cContenido 
		 { 
		        
                    get{ return this._DalObject.rec_cContenido; }
        						set{ this._DalObject.rec_cContenido = value; } 										
	   }
	  ///<summary>
     ///rec_tFechaProceso property   
     ///</summary>	
     public DateTime?  rec_tFechaProceso 
		 { 
		        
                    get{ return this._DalObject.rec_tFechaProceso; }
        						set{ this._DalObject.rec_tFechaProceso = value; } 										
	   }
	  ///<summary>
     ///rec_ioperador property   
     ///</summary>	
     public int  rec_ioperador 
		 { 
		        
                    get{ return this._DalObject.rec_ioperador; }
        						set{ this._DalObject.rec_ioperador = value; } 										
	   }
	  ///<summary>
     ///rec_cObservaciones property   
     ///</summary>	
     public string  rec_cObservaciones 
		 { 
		        
                    get{ return this._DalObject.rec_cObservaciones; }
        						set{ this._DalObject.rec_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///rec_cTerminal property   
     ///</summary>	
     public string  rec_cTerminal 
		 { 
		        
                    get{ return this._DalObject.rec_cTerminal; }
        						set{ this._DalObject.rec_cTerminal = value; } 										
	   }
	  ///<summary>
     ///rec_idResolucion property   
     ///</summary>	
     public string  rec_idResolucion 
		 { 
		        
                    get{ return this._DalObject.rec_idResolucion; }
        						set{ this._DalObject.rec_idResolucion = value; } 										
	   }
	  ///<summary>
     ///rec_idReceptor property   
     ///</summary>	
     public int  rec_idReceptor 
		 { 
		        
                    get{ return this._DalObject.rec_idReceptor; }
        						set{ this._DalObject.rec_idReceptor = value; } 										
	   }
	  ///<summary>
     ///rec_cCategorizacion property   
     ///</summary>	
     public string  rec_cCategorizacion 
		 { 
		        
                    get{ return this._DalObject.rec_cCategorizacion; }
        						set{ this._DalObject.rec_cCategorizacion = value; } 										
	   }
	  ///<summary>
     ///rec_iNYR property   
     ///</summary>	
     public int  rec_iNYR 
		 { 
		        
                    get{ return this._DalObject.rec_iNYR; }
        						set{ this._DalObject.rec_iNYR = value; } 										
	   }
	  ///<summary>
     ///rec_iTE property   
     ///</summary>	
     public int  rec_iTE 
		 { 
		        
                    get{ return this._DalObject.rec_iTE; }
        						set{ this._DalObject.rec_iTE = value; } 										
	   }
	  ///<summary>
     ///rec_tFechaRecepcion property   
     ///</summary>	
     public DateTime?  rec_tFechaRecepcion 
		 { 
		        
                    get{ return this._DalObject.rec_tFechaRecepcion; }
        						set{ this._DalObject.rec_tFechaRecepcion = value; } 										
	   }
	  ///<summary>
     ///rec_nOrigen property   
     ///</summary>	
     public Decimal  rec_nOrigen 
		 { 
		        
                    get{ return this._DalObject.rec_nOrigen; }
        						set{ this._DalObject.rec_nOrigen = value; } 										
	   }
	  ///<summary>
     ///rec_idMap property   
     ///</summary>	
     public int  rec_idMap 
		 { 
		        
                    get{ return this._DalObject.rec_idMap; }
        						set{ this._DalObject.rec_idMap = value; } 										
	   }
	  ///<summary>
     ///rec_idFwd property   
     ///</summary>	
     public int  rec_idFwd 
		 { 
		        
                    get{ return this._DalObject.rec_idFwd; }
        						set{ this._DalObject.rec_idFwd = value; } 										
	   }
	  ///<summary>
     ///rec_iMinutosEspera property   
     ///</summary>	
     public int  rec_iMinutosEspera 
		 { 
		        
                    get{ return this._DalObject.rec_iMinutosEspera; }
        						set{ this._DalObject.rec_iMinutosEspera = value; } 										
	   }
	  ///<summary>
     ///rec_iPuerto property   
     ///</summary>	
     public int  rec_iPuerto 
		 { 
		        
                    get{ return this._DalObject.rec_iPuerto; }
        						set{ this._DalObject.rec_iPuerto = value; } 										
	   }
	  ///<summary>
     ///rec_idLoc property   
     ///</summary>	
     public int  rec_idLoc 
		 { 
		        
                    get{ return this._DalObject.rec_idLoc; }
        						set{ this._DalObject.rec_idLoc = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public Spep_recepcion(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spep_recepcion(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spep_recepcion(SqlHelper SqlConfig, int UserId, Simplep_recepcion Simple)
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
		public virtual void Load(Simplep_recepcion Simple)
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
			   throw new RuntimeException("The p_recepcion has dependencies.");
			
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
		public Dalp_recepcion GetDalObject()
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
		
		public IEnumerable<Simplep_recepcion> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<Simplep_recepcion> GetByChild(string ObjectType, int ObjectId)
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
				throw new InvalidObjectException(this.GetObject(), "The p_recepcion is null.");

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
			this._DalObject = new Dalp_recepcion(SqlConfig, UserId);		
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
			var o = (SoftGuard.BusinessObjects.p_recepcion)Object;
			o.Name = this.Name;

			o.rec_iidcuenta = this.rec_iidcuenta;

			o.rec_calarma = this.rec_calarma;

			o.rec_czona = this.rec_czona;

			o.rec_iusuario = this.rec_iusuario;

			o.rec_tfechahora = this.rec_tfechahora;

			o.rec_nestado = this.rec_nestado;

			o.rec_cContenido = this.rec_cContenido;

			o.rec_tFechaProceso = this.rec_tFechaProceso;

			o.rec_ioperador = this.rec_ioperador;

			o.rec_cObservaciones = this.rec_cObservaciones;

			o.rec_cTerminal = this.rec_cTerminal;

			o.rec_idResolucion = this.rec_idResolucion;

			o.rec_idReceptor = this.rec_idReceptor;

			o.rec_cCategorizacion = this.rec_cCategorizacion;

			o.rec_iNYR = this.rec_iNYR;

			o.rec_iTE = this.rec_iTE;

			o.rec_tFechaRecepcion = this.rec_tFechaRecepcion;

			o.rec_nOrigen = this.rec_nOrigen;

			o.rec_idMap = this.rec_idMap;

			o.rec_idFwd = this.rec_idFwd;

			o.rec_iMinutosEspera = this.rec_iMinutosEspera;

			o.rec_iPuerto = this.rec_iPuerto;

			o.rec_idLoc = this.rec_idLoc;

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
