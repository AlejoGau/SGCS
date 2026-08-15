Ext.define('AdministratorSearch.view.t_redirectodestinoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_redirectordestinoformview'],
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
        align : 'stretch'
    },
    items : [
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