Ext.define('Administrator.view.ReporteAutoridadesSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.WebReporteAutSecurity',
    
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Autoridad',
            itemId: 'autoridadCombo',
            //multiselect : false,
            editable : false,
            queryMode: 'local',
            forceSelection: true,
            typeAhead: false,
            displayField: 'aut_cnombre',
            valueField: 'aut_ccodigo'
        },{
            xtype: 'container',
            layout: 'hbox',
            items: [
        
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo disponible',
                    itemId: 'tiempodisponible',
                    width:250,
                    maxValue: 12,
                    minValue: 0
                },{
                    xtype: 'displayfield',
                    fieldLabel: '',
                    value: 'meses',
                    margin: '0 0 0 5'
                }
            ]
        }
    ],
    
	initComponent : function() {
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
	} // cierro init

});
