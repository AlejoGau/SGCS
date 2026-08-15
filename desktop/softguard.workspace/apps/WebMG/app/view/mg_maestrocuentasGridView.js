Ext.define('WebMG.view.mg_maestrocuentasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mg_maestrocuentasgridview'],
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    //viewConfig: {
        //trackOver: true,
        //stripeRows: false,
        //getRowClass: function(record) { 
        //    return record.get('mgmc_imputacion')===0 ? 'rowBold x-grid-row-selected' : ''; 
        //},
        //loadMask: false
    //},
    /*
    features : [
        {
            ftype : 'groupingsummary',
           // id: 'groupingsummary',
            groupByText : getLocale('Agrupar'),
            startCollapsed: false,
            enableGroupingMenu: true,
            showGroupsText : getLocale('Mostrar en grupos')
        }
    ],*/
    activeHelp:true,
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-table-edit',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('mg_maestrocuentasgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-table-go',
                    tooltip: 'Movimientos',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('mg_maestrocuentasgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('movimientos',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
            header : 'Código',
            dataIndex : 'mgmc_ccodigo',                	
            width:150,
            sortable : true
		},{
            xtype : 'gridcolumn',
            header : 'Nombre',
            dataIndex : 'mgmc_descripcion',                	
            width:250
		}/*,{
            xtype : 'gridcolumn',
        	header : 'Saldo',
            dataIndex : 'mgmc_saldo',					
            flex:1,
            renderer: function(value, metadata,record){
                var mny = record.get('mgmc_moncodigo')+' ';
                if (record.get('mgmc_imputacion')===0 && value == 0){
                    return ''
                }
                if(mny) {
                    if (value<0) { 
                            return '<span style="color:red">'+Ext.util.Format.currency(value,mny)+'</span>';
                      } else {
                            return Ext.util.Format.currency(value,mny);   
                      }
                } else {
                   return value;
                } 
            }*/
             
		/*},{
            xtype : 'gridcolumn',
            header : 'Tipo',
            dataIndex : 'mgmc_ctipo',                    
            width:150,
            sortable : true,
            hidden: true,
            renderer: function(value){    									
				var store = Ext.data.StoreManager.get('mgmc_ctipoStore');
				var record = store.findRecord('Value', value);
				if(record == undefined)
					return '';
				else					
					return record.get('Name');
			}
		}*/
    
    ],
    
    initComponent: function () {

        this.callParent(arguments);        
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        if(this.record && this.record.recordOrganizacion) {
            this.moneySymbol = this.record.recordOrganizacion.get('mon_csymbol')
        }
        
        this.addDocked(pagingtoolbar);




        //this.callParent(arguments); 
        //this.view.targetTab = this.targetTab;
        //var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
       //     dock: 'bottom',
        //    displayInfo: true
        //});
        
        /*if(this.recordOrganizacion) {
            this.moneySymbol = this.recordOrganizacion.get('mon_csymbol')+' '
        } 
        
        if (!this.moneySymbol){
            // BC 380460088 : JUAN, obtengo del parametro si no viene por VIEW el currency
            this.moneySymbol = getParametro('SYSTEMCURRENCY',false,true).codigo+' '
        }

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
                    xtype: 'combo',
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: 'Organización',
                    lastQuery: '',
                    name:'org_organizacionId',
                    itemId:'org_organizacionId',
                    displayField : 'org_cnombre',
                    valueField : 'Id',
                    width: 350
                },
                /*{
                    iconCls : 'icon-table-add',
                    text    : 'Nueva cuenta',
                    itemId: 'new',
                    action  : 'new',
                   // hidden:true
                },{
                    iconCls: 'icon-application-view-list',
                    text: 'Agrupar por tipo',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupTipo',
                    itemId: 'groupTipo'
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 320,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'combo',
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: 'Tipo',
                                        lastQuery: '',
                                        name:'cbc_ctipocbte',
                                        itemId:'cbc_ctipocbte',
                                        displayField : 'Name',
                                        valueField : 'Id',
                                    },

                                    {
                                        xtype:'textfield',
                                        fieldLabel:'Nombre',
                                        itemId:'nombre'                                                                    
                                    }
                                ]
                            }
                        ]
                    }
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            
            ]// cierro items
         }); */
        
        //this.addDocked(toolbar);
        //this.addDocked(pagingtoolbar);
    } 
});