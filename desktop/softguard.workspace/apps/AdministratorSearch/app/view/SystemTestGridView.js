Ext.define('AdministratorSearch.view.SystemTestGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.systemtestgridview'],
    title : '',
    autoHeight : true, 
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    features: [{
       ftype: 'grouping',
       groupHeaderTpl: new Ext.XTemplate('<tpl for=".">', '{name}', '</tpl>')
    }],
    columns : [
        {
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            renderer: function(v){
                return getLocale(v);
            },
            flex:1
    	},{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : 'Status',
            renderer: function(value, object, record) {
                if (value == 2){
                    object.tdAttr = "style='background-color: #FAAC58; color: #fff'";    
                }
                if (value == 3){
                    object.tdAttr = "style='background-color: #ff0000; color: #fff'";    
                }
                return getLocale(record.get('Message')); 
    		   
	    	},
            flex:1
		},{
            xtype : 'datecolumn',            
            header : 'Fecha',
            dataIndex : 'LastExecution',
            format: 'D d-m-Y G:i:s',
            flex:1
        }
       
    ],
   
    initComponent: function () {
       this.callParent();
    }
});