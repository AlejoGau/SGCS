//MIGRADO2024
Ext.define('Common.view.MG_MovientosCuentasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mg_movimientoscuentasgridview'],
    title : 'Productos',
    autoHeight : true,
    /*viewConfig: {
     getRowClass: function(record, rowIndex, rowParams, store) {
      if (record.get('mgm_monto')<0) { 
            return 'nohabilitado';
      } else {
            return 'habilitado'
      }
     }
    }, */
    columns : [{
            xtype : 'gridcolumn',            
            header : 'Fecha',
			dataIndex : 'mgm_fecha',
            flex:1,
            renderer: function (v,metadata,r) {
                return  Ext.Date.format(new Date(r.get('mgm_fecha')),'d/m/Y') ;
            }
		},{
            xtype : 'gridcolumn',
			header : 'Comprobante',
            dataIndex : '_ncomprobante',					
            renderer: function(value, metadata,record){
                return record.get('cbt_cletra')+' '+record.get('_ncomprobante') + ' ' + record.get('cbt_cdescripcion')
            },
            flex:1			
		},{
            xtype : 'gridcolumn',
    		header : 'Monto',
            dataIndex : 'mgm_monto',
            renderer: function(value, metadata,record){
                var mny = record.get('mgmc_moncodigo')+' ';
                if(mny) {
                    if (value<0) { 
                            return '<span style="color:red">'+Ext.util.Format.currency(value,mny)+'</span>';
                      } else {
                            return Ext.util.Format.currency(value,mny);   
                      }
                } else {
                   return value;
                } 
            },
            flex:1			
            
		},{
            xtype : 'gridcolumn',
        	header : 'Saldo',
            dataIndex : 'mgm_saldo',renderer: function(value, metadata,record){
                var mny = record.get('mgmc_moncodigo')+' ';
                if(mny) {
                    if (value<0) { 
                            return '<span style="color:red">'+Ext.util.Format.currency(value,mny)+'</span>';
                      } else {
                            return Ext.util.Format.currency(value,mny);   
                      }
                    
                } else {
                   return value;
                } 
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
        
        if(this.record && this.record.recordOrganizacion) {
            this.moneySymbol = this.record.recordOrganizacion.get('mon_csymbol')
        }
        
        this.addDocked(pagingtoolbar);
    } 
});