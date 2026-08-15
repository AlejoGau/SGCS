//MIGRADO2024
Ext.define('Common.view.SmartMailSearchGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.smartsearchgridview',
    title : 'Person',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    //ns: [{ptype : '//pagingselectpersist'}],
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
    		header : 'Email',
			dataIndex : 'Email',
            flex: 1
		}
    ],
    
    initComponent: function () {
        //console.log(this.record);
        this.callParent(arguments);  
        
        var comboSearch =  [
                             ['Email','Email']
                             /*['SentDate', 'Fecha de envio']*/
                           ];
        
        if(!this.record) {
            comboSearch.push(['Subject','Subject']);
        }
  
           
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: 'Email'
                                          
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
                },'->',{
                    xtype:'displayfield',
                    value:'Solo lectura'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});