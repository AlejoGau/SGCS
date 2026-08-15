//MIGRADO2024
Ext.define('Common.view.MGComprobantesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mgcomprobantessearchview', 'widget.mgcomprobantesgridview'],
    title : 'Productos',
    autoHeight : true,
    viewConfig: {
     getRowClass: function(record, rowIndex, rowParams, store) {
      if (record.get('cta_ySaldo')>0) return 'nohabilitado';
     }
    },
    stateId:'mgcomprobantessearchview2',
    features : [
        {
            ftype : 'grouping',
            groupHeaderTpl: [
                
                '{[this.getTitle(values)]}',
                {
                    getTitle: function (values) {  
                        return values.name
                    }
                }
                
            ],
            groupByText : getLocale('Agrupar'),
            startCollapsed: true,
            enableGroupingMenu: false,
            showGroupsText : getLocale('Mostrar en grupos')
    	}
    ],
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-printer',
                    tooltip: 'Ver comprobante',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('mgcomprobantesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('vercomprobante',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',            
            header : 'Fecha',
			dataIndex : 'cbc_dFecha',
            flex:1,
            renderer: function (v,metadata,r) {
                return  Ext.Date.format(new Date(r.get('cbc_dFecha')),'d/m/Y') ;
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Fecha vencimiento',
    		dataIndex : 'cta_dVencimiento',
            flex:1,
            renderer: function (v,metadata,r) {
                return  Ext.Date.format(new Date(v),'d/m/Y') ;
            }
		}
        
        
        
        /*,{
        	xtype : 'gridcolumn',
			header : 'Número',
            dataIndex : 'cbc_iNumeroCbte',					
            renderer: function(value, metadata,record){
                return record.get('cbt_cletra')+' '+record.get('cbc_cPrefijoCbte')+'-'+Ext.String.leftPad(record.get('cbc_iNumeroCbte'),5,'0')
            },
            flex:1			
		}*/,{
            xtype : 'gridcolumn',
			header : 'Número',
            dataIndex : '_ncomprobante',					
            renderer: function(value, metadata,record){
                return record.get('cbt_cletra')+' '+record.get('_ncomprobante')
            },
            flex:1			
		},{
            xtype : 'gridcolumn',
			header : 'Descripción',
            dataIndex : 'cbt_cdescripcion',
            flex:1			
		},{
            xtype : 'gridcolumn',            
            header : 'Cuota',
            dataIndex : 'cta_nCuota',   
            renderer: function(value, metadata,record){
                return value+1
            },         
            flex:1
    	},{
            xtype : 'gridcolumn',            
            header : 'Total',
    		dataIndex : 'cta_yTotal',
            renderer: function (value){
                return Ext.util.Format.currency(value,this.moneySymbol)
            },
            flex:1
		},{
            xtype : 'gridcolumn',            
            header : 'Saldo',
        	dataIndex : 'cta_ySaldo',
            renderer: function (value){
                return Ext.util.Format.currency(value,this.moneySymbol)
            },
            flex:1
		}
        
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);        
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
         if(this.record.recordOrganizacion) {
            this.moneySymbol = this.record.recordOrganizacion.get('mon_csymbol')
        }
        
        this.addDocked(pagingtoolbar);
    } 
});