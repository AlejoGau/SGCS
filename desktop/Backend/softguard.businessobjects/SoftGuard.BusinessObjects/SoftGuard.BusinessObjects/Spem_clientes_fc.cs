
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
    public abstract class Spem_clientes_fc : ISpecialization, ICanCopyProperties
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
	protected Dalm_clientes_fc _DalObject;
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
     ///cli_cnombre property   
     ///</summary>	
     public string  cli_cnombre 
		 { 
		        
                    get{ return this._DalObject.cli_cnombre; }
        						set{ this._DalObject.cli_cnombre = value; } 										
	   }
	  ///<summary>
     ///cli_cidentificacion property   
     ///</summary>	
     public string  cli_cidentificacion 
		 { 
		        
                    get{ return this._DalObject.cli_cidentificacion; }
        						set{ this._DalObject.cli_cidentificacion = value; } 										
	   }
	  ///<summary>
     ///cli_ccategoriaimpositiva property   
     ///</summary>	
     public string  cli_ccategoriaimpositiva 
		 { 
		        
                    get{ return this._DalObject.cli_ccategoriaimpositiva; }
        						set{ this._DalObject.cli_ccategoriaimpositiva = value; } 										
	   }
	  ///<summary>
     ///cli_ivendedor property   
     ///</summary>	
     public int  cli_ivendedor 
		 { 
		        
                    get{ return this._DalObject.cli_ivendedor; }
        						set{ this._DalObject.cli_ivendedor = value; } 										
	   }
	  ///<summary>
     ///cli_icobrador property   
     ///</summary>	
     public int  cli_icobrador 
		 { 
		        
                    get{ return this._DalObject.cli_icobrador; }
        						set{ this._DalObject.cli_icobrador = value; } 										
	   }
	  ///<summary>
     ///cli_czona property   
     ///</summary>	
     public string  cli_czona 
		 { 
		        
                    get{ return this._DalObject.cli_czona; }
        						set{ this._DalObject.cli_czona = value; } 										
	   }
	  ///<summary>
     ///cli_ccallefiscal property   
     ///</summary>	
     public string  cli_ccallefiscal 
		 { 
		        
                    get{ return this._DalObject.cli_ccallefiscal; }
        						set{ this._DalObject.cli_ccallefiscal = value; } 										
	   }
	  ///<summary>
     ///cli_clocalidadfiscal property   
     ///</summary>	
     public string  cli_clocalidadfiscal 
		 { 
		        
                    get{ return this._DalObject.cli_clocalidadfiscal; }
        						set{ this._DalObject.cli_clocalidadfiscal = value; } 										
	   }
	  ///<summary>
     ///cli_cprovinciafiscal property   
     ///</summary>	
     public string  cli_cprovinciafiscal 
		 { 
		        
                    get{ return this._DalObject.cli_cprovinciafiscal; }
        						set{ this._DalObject.cli_cprovinciafiscal = value; } 										
	   }
	  ///<summary>
     ///cli_ccodigopostalfiscal property   
     ///</summary>	
     public string  cli_ccodigopostalfiscal 
		 { 
		        
                    get{ return this._DalObject.cli_ccodigopostalfiscal; }
        						set{ this._DalObject.cli_ccodigopostalfiscal = value; } 										
	   }
	  ///<summary>
     ///cli_ccallecobranza property   
     ///</summary>	
     public string  cli_ccallecobranza 
		 { 
		        
                    get{ return this._DalObject.cli_ccallecobranza; }
        						set{ this._DalObject.cli_ccallecobranza = value; } 										
	   }
	  ///<summary>
     ///cli_clocalidadcobranza property   
     ///</summary>	
     public string  cli_clocalidadcobranza 
		 { 
		        
                    get{ return this._DalObject.cli_clocalidadcobranza; }
        						set{ this._DalObject.cli_clocalidadcobranza = value; } 										
	   }
	  ///<summary>
     ///cli_cprovinciacobranza property   
     ///</summary>	
     public string  cli_cprovinciacobranza 
		 { 
		        
                    get{ return this._DalObject.cli_cprovinciacobranza; }
        						set{ this._DalObject.cli_cprovinciacobranza = value; } 										
	   }
	  ///<summary>
     ///cli_ccodigopostalcobranza property   
     ///</summary>	
     public string  cli_ccodigopostalcobranza 
		 { 
		        
                    get{ return this._DalObject.cli_ccodigopostalcobranza; }
        						set{ this._DalObject.cli_ccodigopostalcobranza = value; } 										
	   }
	  ///<summary>
     ///cli_nlunes property   
     ///</summary>	
     public Decimal  cli_nlunes 
		 { 
		        
                    get{ return this._DalObject.cli_nlunes; }
        						set{ this._DalObject.cli_nlunes = value; } 										
	   }
	  ///<summary>
     ///cli_nmartes property   
     ///</summary>	
     public Decimal  cli_nmartes 
		 { 
		        
                    get{ return this._DalObject.cli_nmartes; }
        						set{ this._DalObject.cli_nmartes = value; } 										
	   }
	  ///<summary>
     ///cli_nmiercoles property   
     ///</summary>	
     public Decimal  cli_nmiercoles 
		 { 
		        
                    get{ return this._DalObject.cli_nmiercoles; }
        						set{ this._DalObject.cli_nmiercoles = value; } 										
	   }
	  ///<summary>
     ///cli_njueves property   
     ///</summary>	
     public Decimal  cli_njueves 
		 { 
		        
                    get{ return this._DalObject.cli_njueves; }
        						set{ this._DalObject.cli_njueves = value; } 										
	   }
	  ///<summary>
     ///cli_nviernes property   
     ///</summary>	
     public Decimal  cli_nviernes 
		 { 
		        
                    get{ return this._DalObject.cli_nviernes; }
        						set{ this._DalObject.cli_nviernes = value; } 										
	   }
	  ///<summary>
     ///cli_nsabado property   
     ///</summary>	
     public Decimal  cli_nsabado 
		 { 
		        
                    get{ return this._DalObject.cli_nsabado; }
        						set{ this._DalObject.cli_nsabado = value; } 										
	   }
	  ///<summary>
     ///cli_ndomingo property   
     ///</summary>	
     public Decimal  cli_ndomingo 
		 { 
		        
                    get{ return this._DalObject.cli_ndomingo; }
        						set{ this._DalObject.cli_ndomingo = value; } 										
	   }
	  ///<summary>
     ///cli_chora property   
     ///</summary>	
     public string  cli_chora 
		 { 
		        
                    get{ return this._DalObject.cli_chora; }
        						set{ this._DalObject.cli_chora = value; } 										
	   }
	  ///<summary>
     ///cli_cservicio property   
     ///</summary>	
     public string  cli_cservicio 
		 { 
		        
                    get{ return this._DalObject.cli_cservicio; }
        						set{ this._DalObject.cli_cservicio = value; } 										
	   }
	  ///<summary>
     ///cli_dproximafactura property   
     ///</summary>	
     public DateTime?  cli_dproximafactura 
		 { 
		        
                    get{ return this._DalObject.cli_dproximafactura; }
        						set{ this._DalObject.cli_dproximafactura = value; } 										
	   }
	  ///<summary>
     ///cli_cformatoimpresion property   
     ///</summary>	
     public string  cli_cformatoimpresion 
		 { 
		        
                    get{ return this._DalObject.cli_cformatoimpresion; }
        						set{ this._DalObject.cli_cformatoimpresion = value; } 										
	   }
	  ///<summary>
     ///cli_ccondicionpago property   
     ///</summary>	
     public string  cli_ccondicionpago 
		 { 
		        
                    get{ return this._DalObject.cli_ccondicionpago; }
        						set{ this._DalObject.cli_ccondicionpago = value; } 										
	   }
	  ///<summary>
     ///cli_ctelefono property   
     ///</summary>	
     public string  cli_ctelefono 
		 { 
		        
                    get{ return this._DalObject.cli_ctelefono; }
        						set{ this._DalObject.cli_ctelefono = value; } 										
	   }
	  ///<summary>
     ///cli_ccontacto property   
     ///</summary>	
     public string  cli_ccontacto 
		 { 
		        
                    get{ return this._DalObject.cli_ccontacto; }
        						set{ this._DalObject.cli_ccontacto = value; } 										
	   }
	  ///<summary>
     ///cli_cobservacion property   
     ///</summary>	
     public string  cli_cobservacion 
		 { 
		        
                    get{ return this._DalObject.cli_cobservacion; }
        						set{ this._DalObject.cli_cobservacion = value; } 										
	   }
	  ///<summary>
     ///cli_nsituacion property   
     ///</summary>	
     public Decimal  cli_nsituacion 
		 { 
		        
                    get{ return this._DalObject.cli_nsituacion; }
        						set{ this._DalObject.cli_nsituacion = value; } 										
	   }
	  ///<summary>
     ///cli_inumero property   
     ///</summary>	
     public int  cli_inumero 
		 { 
		        
                    get{ return this._DalObject.cli_inumero; }
        						set{ this._DalObject.cli_inumero = value; } 										
	   }
	  ///<summary>
     ///cli_nDocCAE property   
     ///</summary>	
     public Decimal  cli_nDocCAE 
		 { 
		        
                    get{ return this._DalObject.cli_nDocCAE; }
        						set{ this._DalObject.cli_nDocCAE = value; } 										
	   }
	  ///<summary>
     ///cli_cDatosExtra property   
     ///</summary>	
     public string  cli_cDatosExtra 
		 { 
		        
                    get{ return this._DalObject.cli_cDatosExtra; }
        						set{ this._DalObject.cli_cDatosExtra = value; } 										
	   }
	  ///<summary>
     ///cli_iorganizacion property   
     ///</summary>	
     public int  cli_iorganizacion 
		 { 
		        
                    get{ return this._DalObject.cli_iorganizacion; }
        						set{ this._DalObject.cli_iorganizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public Spem_clientes_fc(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spem_clientes_fc(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spem_clientes_fc(SqlHelper SqlConfig, int UserId, Simplem_clientes_fc Simple)
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
		public virtual void Load(Simplem_clientes_fc Simple)
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
			   throw new RuntimeException("The m_clientes_fc has dependencies.");
			
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
		public Dalm_clientes_fc GetDalObject()
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
		
		public IEnumerable<Simplem_clientes_fc> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<Simplem_clientes_fc> GetByChild(string ObjectType, int ObjectId)
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
				throw new InvalidObjectException(this.GetObject(), "The m_clientes_fc is null.");

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
			this._DalObject = new Dalm_clientes_fc(SqlConfig, UserId);		
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
			var o = (m_clientes_fc)Object;
			o.Name = this.Name;

			o.cli_cnombre = this.cli_cnombre;

			o.cli_cidentificacion = this.cli_cidentificacion;

			o.cli_ccategoriaimpositiva = this.cli_ccategoriaimpositiva;

			o.cli_ivendedor = this.cli_ivendedor;

			o.cli_icobrador = this.cli_icobrador;

			o.cli_czona = this.cli_czona;

			o.cli_ccallefiscal = this.cli_ccallefiscal;

			o.cli_clocalidadfiscal = this.cli_clocalidadfiscal;

			o.cli_cprovinciafiscal = this.cli_cprovinciafiscal;

			o.cli_ccodigopostalfiscal = this.cli_ccodigopostalfiscal;

			o.cli_ccallecobranza = this.cli_ccallecobranza;

			o.cli_clocalidadcobranza = this.cli_clocalidadcobranza;

			o.cli_cprovinciacobranza = this.cli_cprovinciacobranza;

			o.cli_ccodigopostalcobranza = this.cli_ccodigopostalcobranza;

			o.cli_nlunes = this.cli_nlunes;

			o.cli_nmartes = this.cli_nmartes;

			o.cli_nmiercoles = this.cli_nmiercoles;

			o.cli_njueves = this.cli_njueves;

			o.cli_nviernes = this.cli_nviernes;

			o.cli_nsabado = this.cli_nsabado;

			o.cli_ndomingo = this.cli_ndomingo;

			o.cli_chora = this.cli_chora;

			o.cli_cservicio = this.cli_cservicio;

			o.cli_dproximafactura = this.cli_dproximafactura;

			o.cli_cformatoimpresion = this.cli_cformatoimpresion;

			o.cli_ccondicionpago = this.cli_ccondicionpago;

			o.cli_ctelefono = this.cli_ctelefono;

			o.cli_ccontacto = this.cli_ccontacto;

			o.cli_cobservacion = this.cli_cobservacion;

			o.cli_nsituacion = this.cli_nsituacion;

			o.cli_inumero = this.cli_inumero;

			o.cli_nDocCAE = this.cli_nDocCAE;

			o.cli_cDatosExtra = this.cli_cDatosExtra;

			o.cli_iorganizacion = this.cli_iorganizacion;

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
