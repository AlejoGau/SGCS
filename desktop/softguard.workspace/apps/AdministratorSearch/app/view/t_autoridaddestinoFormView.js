Ext.define('AdministratorSearch.view.t_autoridaddestinoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_autoridaddestinoformview'],
    frame: false,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        //width:'100%',
        anchor:'100%',
        enforceMaxLength: true
    },
    layout: {
        type: 'vbox',
        //align : 'stretch'
    },
    items : [
        /*{
            xtype: 'panel',
            items:[
                {
                    xtype : 'combo',
                    fieldLabel : 'Redirector',
                    itemId: 'redirector',
                    //name : 'trd_idestino',
                    displayField : 'trd_cnombre',
                    multiSelect: false,
                    valueField : 'Id',
                    flex:1,
                    queryMode: 'local'
                    
                }                
            ]
        },*/
        {
            xtype: 'fieldset',
            title: 'Configuración',
            itemId: 'configfields',
            hidden:true
        }
    ],   

	initComponent : function() {
        
		this.callParent();
        var view = this;
       // this.down('videoxcuentagridview').record = this.record;

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});