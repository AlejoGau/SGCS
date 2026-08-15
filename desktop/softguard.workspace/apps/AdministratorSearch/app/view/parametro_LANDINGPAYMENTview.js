Ext.define('AdministratorSearch.view.parametro_LANDINGPAYMENTview', {
    extend : 'Ext.form.Panel',
    alias : 'widget.parametro_LANDINGPAYMENTview',
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    
    items:[{    
        xtype:'combobox', 
        name:'par_ivalor',
        itemId:'valor', 
        fieldLabel:'Valor',
        store:[[0,getLocale('No')],[1,getLocale('Sí')]], 
        value:0
    },{
        xtype: 'textarea',
        name: 'par_cvalor',
        fieldLabel:'Valor',
        anchor:'100%',
        itemId:'jsonvalues',
        alowBlank: false,
        hidden:true
    }],
        
    initComponent : function() {
        this.callParent();            
    }

});